import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { agents } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// GET /api/a2a/agents/:id/card - Get agent card (A2A protocol format)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const [agent] = await db
      .select()
      .from(agents)
      .where(eq(agents.id, id));

    if (!agent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    // Format as A2A Agent Card
    const agentCard = {
      id: agent.id,
      name: agent.name,
      description: agent.description,
      capabilities: agent.capabilities,
      status: agent.status,
      endpoint: agent.endpoint,
      authentication: agent.authConfig ? {
        type: agent.authConfig.type,
        // Don't expose credentials in the card
      } : undefined,
      metadata: agent.metadata,
      version: '1.0',
      protocol: 'A2A',
    };

    return NextResponse.json(agentCard);
  } catch (error) {
    console.error('Error fetching agent card:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agent card' },
      { status: 500 }
    );
  }
}
