import { prisma } from './db';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function registerUser(email: string, password: string, name?: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  return prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return null;

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) return null;

  return user;
}

export async function getCurrentUser() {
  const cookieStore = cookies();
  const session = cookieStore.get('session');

  if (!session?.value) return null;

  return prisma.user.findUnique({
    where: { id: session.value },
  });
}

export async function createSession(userId: string) {
  cookies().set('session', userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  });
}

export async function destroySession() {
  cookies().delete('session');
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) redirect('/auth/login');
  return user;
}