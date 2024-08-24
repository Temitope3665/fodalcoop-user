import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  DASHBOARD_HOME_URL,
  LOGIN_URL,
  authRoutes,
  protectedRoutes,
} from './config/paths';

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('accessToken')?.value;

  if (protectedRoutes.includes(request.nextUrl.pathname) && !currentUser) {
    request.cookies.delete('accessToken');
    request.cookies.delete('user');
    const response = NextResponse.redirect(new URL(LOGIN_URL, request.url));
    response.cookies.delete('currentUser');

    return response;
  }

  if (authRoutes.includes(request.nextUrl.pathname) && currentUser) {
    const response = NextResponse.redirect(
      new URL(DASHBOARD_HOME_URL, request.url)
    ); // Redirect to a protected route

    return response;
  }
}
