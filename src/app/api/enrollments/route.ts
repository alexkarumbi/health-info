import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';
import { requireAuth } from '@/lib/auth';

const enrollmentSchema = z.object({
  clientId: z.string().min(1),
  programId: z.string().min(1),
  status: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const user = await requireAuth();
    const body = await request.json();
    const validatedData = enrollmentSchema.parse(body);

    // Verify client belongs to user
    const client = await prisma.client.findUnique({
      where: {
        id: validatedData.clientId,
        userId: user.id,
      },
    });

    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      );
    }

    const enrollment = await prisma.enrollment.create({
      data: validatedData,
      include: {
        client: true,
        program: true,
      },
    });

    return NextResponse.json(enrollment, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to enroll client' },
      { status: 500 }
    );
  }
}