import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { verifyPassword } from '@/lib/auth/password';
import { createSession, setSessionCookie } from '@/lib/auth/session';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    // Find user by email
    const user = await db.query.users.findFirst({
      where: eq(users.email, email.toLowerCase()),
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.passwordHash);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Create session
    const token = await createSession({
      userId: user.id,
      email: user.email,
      username: user.username,
    });

    await setSessionCookie(token);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        displayName: user.displayName,
        avatar: user.avatar,
        isVerified: user.isVerified,
      },
      message: 'Login successful',
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }

    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
