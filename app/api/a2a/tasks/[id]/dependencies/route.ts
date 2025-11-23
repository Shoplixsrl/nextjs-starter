import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { tasks, taskDependencies } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

// GET /api/a2a/tasks/:id/dependencies - Get task dependencies
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const dependencies = await db
      .select()
      .from(taskDependencies)
      .where(eq(taskDependencies.taskId, id));

    return NextResponse.json({ dependencies });
  } catch (error) {
    console.error('Error fetching dependencies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dependencies' },
      { status: 500 }
    );
  }
}

// POST /api/a2a/tasks/:id/dependencies - Add a dependency
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { dependsOnTaskId, dependencyType, metadata } = body;

    if (!dependsOnTaskId) {
      return NextResponse.json(
        { error: 'Missing required field: dependsOnTaskId' },
        { status: 400 }
      );
    }

    // Verify both tasks exist
    const [task] = await db
      .select()
      .from(tasks)
      .where(eq(tasks.id, id));

    const [dependsOnTask] = await db
      .select()
      .from(tasks)
      .where(eq(tasks.id, dependsOnTaskId));

    if (!task || !dependsOnTask) {
      return NextResponse.json(
        { error: 'Task not found' },
        { status: 404 }
      );
    }

    // Check for circular dependencies (simple check)
    if (id === dependsOnTaskId) {
      return NextResponse.json(
        { error: 'Cannot create circular dependency' },
        { status: 400 }
      );
    }

    // Check if dependency already exists
    const existingDep = await db
      .select()
      .from(taskDependencies)
      .where(
        and(
          eq(taskDependencies.taskId, id),
          eq(taskDependencies.dependsOnTaskId, dependsOnTaskId)
        )
      );

    if (existingDep.length > 0) {
      return NextResponse.json(
        { error: 'Dependency already exists' },
        { status: 400 }
      );
    }

    // Create dependency
    const [newDependency] = await db
      .insert(taskDependencies)
      .values({
        taskId: id,
        dependsOnTaskId,
        dependencyType: dependencyType || 'requires',
        metadata: metadata || {},
      })
      .returning();

    return NextResponse.json({ dependency: newDependency }, { status: 201 });
  } catch (error) {
    console.error('Error creating dependency:', error);
    return NextResponse.json(
      { error: 'Failed to create dependency' },
      { status: 500 }
    );
  }
}

// DELETE /api/a2a/tasks/:id/dependencies - Remove a dependency
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dependencyId = searchParams.get('dependencyId');

    if (!dependencyId) {
      return NextResponse.json(
        { error: 'Missing required parameter: dependencyId' },
        { status: 400 }
      );
    }

    const [deletedDependency] = await db
      .delete(taskDependencies)
      .where(eq(taskDependencies.id, dependencyId))
      .returning();

    if (!deletedDependency) {
      return NextResponse.json(
        { error: 'Dependency not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting dependency:', error);
    return NextResponse.json(
      { error: 'Failed to delete dependency' },
      { status: 500 }
    );
  }
}
