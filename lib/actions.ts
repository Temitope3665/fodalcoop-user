'use server';

import { cookies } from 'next/headers';

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
  const token = cookies().get('user');
  return token;
}
