import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyPassword } from '@/lib/auth'
import { createSession } from '@/lib/auth'
import { userSchema } from '@/lib/schemas'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = userSchema.parse(body)

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    const passwordValid = await verifyPassword(password, user.password)
    if (!passwordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    await createSession(user.id)

    return NextResponse.json({
      id: user.id,
      email: user.email,
      name: user.name,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}