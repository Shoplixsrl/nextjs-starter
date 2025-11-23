import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tasks, taskHistory } from '@/lib/db/schema';
import { eq, desc, and } from 'drizzle-orm';

// GET /api/a2a/tasks - List all tasks with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const agentId = searchParams.get('agentId');
    const priority = searchParams.get('priority');

    // Build where conditions
    const conditions = [];
    if (status) {
      conditions.push(eq(tasks.status, status as 'pending' | 'in_progress' | 'blocked' | 'completed' | 'failed' | 'cancelled'));
    }
    if (agentId) {
      conditions.push(eq(tasks.assignedAgentId, agentId));
    }
    if (priority) {
      conditions.push(eq(tasks.priority, priority as 'low' | 'medium' | 'high' | 'critical'));
    }

    const allTasks = conditions.length > 0
      ? await db.select().from(tasks).where(and(...conditions)).orderBy(desc(tasks.createdAt))
      : await db.select().from(tasks).orderBy(desc(tasks.createdAt));

    return NextResponse.json({ tasks: allTasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST /api/a2a/tasks - Create a new task
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      priority,
      requirements,
      blockers,
      createdByAgentId,
      assignedAgentId,
      metadata,
      dueAt,
    } = body;

    // Validate required fields
    if (!title) {
      return NextResponse.json(
        { error: 'Missing required field: title' },
        { status: 400 }
      );
    }

    // Insert new task
    const [newTask] = await db
      .insert(tasks)
      .values({
        title,
        description,
        priority: priority || 'medium',
        requirements: requirements || [],
        blockers: blockers || [],
        createdByAgentId,
        assignedAgentId,
        metadata: metadata || {},
        dueAt: dueAt ? new Date(dueAt) : undefined,
        status: 'pending',
      })
      .returning();

    // Log task creation in history
    await db.insert(taskHistory).values({
      taskId: newTask.id,
      agentId: createdByAgentId,
      action: 'created',
      changes: [
        {
          field: 'status',
          oldValue: null,
          newValue: 'pending',
        },
      ],
    });

    return NextResponse.json({ task: newTask }, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}
