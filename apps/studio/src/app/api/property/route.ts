import { NextRequest, NextResponse } from 'next/server';
import { APIFault, resolveAPIErrors } from '../_api-helper';
import { auth } from '@clerk/nextjs/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { domain } = await req.json();

    if (!domain) {
      throw new APIFault('Domain is required', 400);
    }

    const { userId } = await auth();

    if (!userId) {
      throw new APIFault('User is not authenticated', 401);
    }

    const user = await prisma.user.findUnique({
      where: { accountId: userId },
    });

    if (!user) {
      throw new APIFault('User not found', 404);
    }

    const existingProperty = await prisma.property.findUnique({
      where: { domain },
    });

    if (existingProperty) {
      throw new APIFault('Property already exists', 409);
    }

    const property = await prisma.property.create({
      data: {
        domain,
        userId: user.id,
      },
    });

    return NextResponse.json({ success: true, property: property.id });
  } catch (error: any) {
    return resolveAPIErrors(error);
  }
}
