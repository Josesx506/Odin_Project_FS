import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req) {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get('refresh_token')?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
  }

  // Call your backend or validate the refresh token
  const newAccessToken = await refreshAccessToken(refreshToken);

  const res = NextResponse.json({ success: true });
  res.cookies.set('access_token', newAccessToken, {
    httpOnly: false,
    secure: true,
    sameSite: 'Strict',
    maxAge: 60 * 5,
    path: '/',
  });

  return res;
}
