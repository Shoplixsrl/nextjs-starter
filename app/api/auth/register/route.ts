import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { hashPassword } from '@/lib/auth/password';
import { createSession, setSessionCookie } from '@/lib/auth/session';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  username: z.string().min(3, 'Username must be at least 3 characters').max(50),
  displayName: z.string().min(1).max(100).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, username, displayName } = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email.toLowerCase()),
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Check if username is taken
    const existingUsername = await db.query.users.findFirst({
      where: eq(users.username, username.toLowerCase()),
    });

    if (existingUsername) {
      return NextResponse.json(
        { error: 'Username is already taken' },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const [newUser] = await db.insert(users).values({
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      displayName: displayName || username,
      passwordHash,
    }).returning({
      id: users.id,
      email: users.email,
      username: users.username,
      displayName: users.displayName,
      avatar: users.avatar,
      createdAt: users.createdAt,
    });

    // Create session
    const token = await createSession({
      userId: newUser.id,
      email: newUser.email,
      username: newUser.username,
    });

    await setSessionCookie(token);

    return NextResponse.json({
      user: newUser,
      message: 'Registration successful',
    }, { status: 201 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
