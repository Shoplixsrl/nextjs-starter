import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';

const publicRoutes = ['/', '/signin', '/signup'];
const authRoutes = ['/signin', '/signup'];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);
  const isAuthRoute = authRoutes.includes(path);

  const cookie = request.cookies.get('session')?.value;
  const session = cookie ? await decrypt(cookie) : null;

  // Redirect to signin if trying to access protected route without session
  if (!isPublicRoute && !session) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // Redirect to dashboard if trying to access auth routes with active session
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png).*)'],
};
