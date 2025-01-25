'use server';

import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403 };
    }

    const userExist = await prisma.user.findUnique({
      where: {
        accountId: user.id,
      },
    });
    if (userExist) {
      return { status: 200, user: userExist };
    }

    const newUser = await prisma.user.create({
      data: {
        accountId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: user.fullName ?? 'No Name',
        image: user.imageUrl,
      },
    });
    if (newUser) {
      return { status: 201, user: newUser };
    }
    return { status: 400 };
  } catch (error) {
    console.log('🔴 ERROR', error);
    return { status: 500 };
  }
};

export const getUserProfile = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404, data: null };
    const profile = await prisma.user.findUnique({
      where: {
        accountId: user.id,
      },
      select: {
        image: true,
        id: true,
        email: true,
        name: true,
      },
    });

    if (profile) return { status: 200, data: profile };
    return { status: 404, data: null };
  } catch (error) {
    return { status: 400, data: null };
  }
};
