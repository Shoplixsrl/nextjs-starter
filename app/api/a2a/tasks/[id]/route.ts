import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tasks, taskHistory, taskDependencies } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/a2a/tasks/:id - Get specific task with dependencies
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [task] = await db
      .select()
      .from(tasks)
      .where(eq(tasks.id, id));

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    // Get dependencies
    const dependencies = await db
      .select()
      .from(taskDependencies)
      .where(eq(taskDependencies.taskId, id));

    // Get dependents (tasks that depend on this one)
    const dependents = await db
      .select()
      .from(taskDependencies)
      .where(eq(taskDependencies.dependsOnTaskId, id));

    return NextResponse.json({
      task,
      dependencies,
      dependents,
    });
  } catch (error) {
    console.error('Error fetching task:', error);
    return NextResponse.json(
      { error: 'Failed to fetch task' },
      { status: 500 }
    );
  }
}

// PATCH /api/a2a/tasks/:id - Update task
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      title,
      description,
      status,
      priority,
      requirements,
      blockers,
      result,
      assignedAgentId,
      metadata,
      agentId, // Agent making the update
    } = body;

    // Get current task state for history
    const [currentTask] = await db
      .select()
      .from(tasks)
      .where(eq(tasks.id, id));

    if (!currentTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    // Track changes for history
    const changes: Array<{ field: string; oldValue: unknown; newValue: unknown }> = [];

    if (status && status !== currentTask.status) {
      changes.push({ field: 'status', oldValue: currentTask.status, newValue: status });
    }
    if (priority && priority !== currentTask.priority) {
      changes.push({ field: 'priority', oldValue: currentTask.priority, newValue: priority });
    }

    // Update task
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: Record<string, any> = {
      ...(title && { title }),
      ...(description !== undefined && { description }),
      ...(priority && { priority }),
      ...(requirements !== undefined && { requirements }),
      ...(blockers !== undefined && { blockers }),
      ...(result !== undefined && { result }),
      ...(assignedAgentId !== undefined && { assignedAgentId }),
      ...(metadata !== undefined && { metadata }),
      updatedAt: new Date(),
    };

    if (status) {
      updateData.status = status;
      if (status === 'in_progress' && !currentTask.startedAt) {
        updateData.startedAt = new Date();
      }
      if ((status === 'completed' || status === 'failed') && !currentTask.completedAt) {
        updateData.completedAt = new Date();
      }
    }

    const [updatedTask] = await db
      .update(tasks)
      .set(updateData)
      .where(eq(tasks.id, id))
      .returning();

    // Log update in history if there are changes
    if (changes.length > 0) {
      await db.insert(taskHistory).values({
        taskId: id,
        agentId,
        action: 'updated',
        changes,
      });
    }

    return NextResponse.json({ task: updatedTask });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
}

// DELETE /api/a2a/tasks/:id - Delete task
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [deletedTask] = await db
      .delete(tasks)
      .where(eq(tasks.id, id))
      .returning();

    if (!deletedTask) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.json(
      { error: 'Failed to delete task' },
      { status: 500 }
    );
  }
}
