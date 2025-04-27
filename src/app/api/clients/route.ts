import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';
import { requireAuth } from '@/lib/auth';

const clientSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  gender: z.enum(['Male', 'Female', 'Other']),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
});

export async function GET(request: Request) {
  try {
    const user = await requireAuth();
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');

    const clients = await prisma.client.findMany({
      where: {
        userId: user.id,
        ...(search ? {
          OR: [
            { firstName: { contains: search, mode: 'insensitive' } },
            { lastName: { contains: search, mode: 'insensitive' } },
          ],
        } : {}),
      },
      include: {
        enrollments: {
          include: {
            program: true,
          },
        },
      },
    });

    return NextResponse.json(clients);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const validatedData = clientSchema.parse(body);

    const client = await prisma.client.create({
      data: {
        ...validatedData,
        dob: new Date(validatedData.dob),
        userId: user.id,
      },
    });

    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create client' },
      { status: 500 }
    );
  }
}