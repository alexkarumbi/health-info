'use server'

import { createSession, destroySession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { hashPassword, verifyPassword } from '@/lib/auth'
import { userSchema } from '@/lib/schemas'
import { redirect } from 'next/navigation'

export async function signIn(formData: FormData) {
  const rawFormData = Object.fromEntries(formData)
  const { email, password } = userSchema.parse(rawFormData)

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    throw new Error('Invalid credentials')
  }

  const passwordValid = await verifyPassword(password, user.password)
  if (!passwordValid) {
    throw new Error('Invalid credentials')
  }

  await createSession(user.id)
  redirect('/dashboard')
}

export async function signUp(formData: FormData) {
  const rawFormData = Object.fromEntries(formData)
  const { email, password, name } = userSchema.parse(rawFormData)

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    throw new Error('User already exists')
  }

  const hashedPassword = await hashPassword(password)
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  })

  await createSession(user.id)
  redirect('/dashboard')
}

export async function signOut() {
  await destroySession()
  redirect('/auth/login')
}