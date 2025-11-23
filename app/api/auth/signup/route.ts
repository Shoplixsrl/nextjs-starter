import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { organizations, users } from '@/lib/db/schema';
import { signUpSchema } from '@/lib/validations/auth';
import bcrypt from 'bcryptjs';
import { createSession } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = signUpSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.errors },
        { status: 400 }
      );
    }

    const { email, password, name, organizationName } = validation.data;

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Create organization
    const slug = organizationName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const [organization] = await db
      .insert(organizations)
      .values({
        name: organizationName,
        slug,
      })
      .returning();

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const [user] = await db
      .insert(users)
      .values({
        email,
        name,
        passwordHash,
        organizationId: organization.id,
        role: 'owner',
      })
      .returning();

    // Create session
    await createSession({
      userId: user.id,
      organizationId: organization.id,
      email: user.email,
      role: user.role,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return NextResponse.json(
      {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        organization: {
          id: organization.id,
          name: organization.name,
          slug: organization.slug,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
