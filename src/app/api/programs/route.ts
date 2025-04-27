import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';
import { requireAuth } from '@/lib/auth';

const programSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

export async function GET() {
  try {
    await requireAuth();
    const programs = await prisma.program.findMany();
    return NextResponse.json(programs);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch programs' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await requireAuth();
    const body = await request.json();
    const validatedData = programSchema.parse(body);

    const program = await prisma.program.create({
      data: validatedData,
    });

    return NextResponse.json(program, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create program' },
      { status: 500 }
    );
  }
}