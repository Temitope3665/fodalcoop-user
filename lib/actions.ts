'use server';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

interface StoreTokenRequest {
  token: string;
  refreshToken: string;
}

// Token
export async function storeAccess({
  token,
  user,
}: {
  token?: string;
  user?: any;
}) {
  if (token) {
    cookies().set({
      name: 'accessToken',
      value: token,
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });
  }

  if (user) {
    cookies().set({
      name: 'user',
      value: JSON.stringify(user),
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    });
  }
}

export async function getToken() {
  const token = cookies().get('accessToken');
  return token;
}

export async function deleteToken() {
  cookies().delete('accessToken');
  cookies().delete('user');
}

// User
export async function storeUser(details: {
  username: string;
  password: string;
  otp: string;
}) {
  cookies().set({
    name: 'user',
    value: JSON.stringify(details),
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  });
}

// User

export async function getUser() {
  const userCookie = cookies().get('user');

  if (userCookie) {
    try {
      const user = JSON.parse(userCookie.value); // Parse the JSON string
      return user;
    } catch (error) {
      return null;
    }
  }

  return null; // Return null if the cookie doesn't exist
}

export async function userLogoutAction() {
  try {
    const cookieStore = cookies();
    const response = NextResponse.json({
      message: 'Logout successful',
      success: true,
    }).json();
    cookieStore.set('accessToken', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    cookieStore.set('user', '', { httpOnly: true, expires: new Date(0) });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 }).json();
  }
}
