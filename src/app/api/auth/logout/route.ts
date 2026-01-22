import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Create a redirect response to the login page
  const response = NextResponse.redirect(new URL('/admin/login', request.url), {
    status: 303, // See Other (recommended for POST->GET redirect)
  });

  // Clear the token cookie
  response.cookies.set('admin_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });

  return response;
}
