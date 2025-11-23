import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { agents } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/a2a/agents - List all agents
export async function GET() {
  try {
    const allAgents = await db.select().from(agents);
    return NextResponse.json({ agents: allAgents });
  } catch (error) {
    console.error('Error fetching agents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agents' },
      { status: 500 }
    );
  }
}

// POST /api/a2a/agents - Register a new agent
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, capabilities, endpoint, authConfig, metadata } = body;

    // Validate required fields
    if (!name || !capabilities) {
      return NextResponse.json(
        { error: 'Missing required fields: name and capabilities are required' },
        { status: 400 }
      );
    }

    // Insert new agent
    const [newAgent] = await db
      .insert(agents)
      .values({
        name,
        description,
        capabilities,
        endpoint,
        authConfig,
        metadata: metadata || {},
        status: 'active',
      })
      .returning();

    return NextResponse.json({ agent: newAgent }, { status: 201 });
  } catch (error) {
    console.error('Error creating agent:', error);
    return NextResponse.json(
      { error: 'Failed to create agent' },
      { status: 500 }
    );
  }
}
