import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tasks, taskHistory, agents } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// POST /api/a2a/tasks/:id/assign - Assign task to an agent
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { agentId, assignedBy } = body;

    if (!agentId) {
      return NextResponse.json(
        { error: 'Missing required field: agentId' },
        { status: 400 }
      );
    }

    // Verify agent exists
    const [agent] = await db
      .select()
      .from(agents)
      .where(eq(agents.id, agentId));

    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    // Verify task exists
    const [currentTask] = await db
      .select()
      .from(tasks)
      .where(eq(tasks.id, id));

    if (!currentTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    // Update task assignment
    const [updatedTask] = await db
      .update(tasks)
      .set({
        assignedAgentId: agentId,
        updatedAt: new Date(),
      })
      .where(eq(tasks.id, id))
      .returning();

    // Log assignment in history
    await db.insert(taskHistory).values({
      taskId: id,
      agentId: assignedBy,
      action: 'assigned',
      changes: [
        {
          field: 'assignedAgentId',
          oldValue: currentTask.assignedAgentId,
          newValue: agentId,
        },
      ],
    });

    return NextResponse.json({ task: updatedTask });
  } catch (error) {
    console.error('Error assigning task:', error);
    return NextResponse.json(
      { error: 'Failed to assign task' },
      { status: 500 }
    );
  }
}
