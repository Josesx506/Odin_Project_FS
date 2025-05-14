import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export default async function verifyAccessToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessJwt')?.value;

  if (!token) return null;

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return payload; // includes user id or role
  } catch (err) {
    return null;
  }
}
