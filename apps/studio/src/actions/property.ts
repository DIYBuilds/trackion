'use server';

import prisma from '@/lib/prisma';

export async function getProperties() {
  try {
    const properties = await prisma.property.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
      select: {
        id: true,
        domain: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            eventTemplates: true,
          },
        },
      },
    });

    return properties.map((property) => ({
      ...property,
      eventTemplates: property._count.eventTemplates,
    }));
  } catch (error) {
    console.error('Failed to fetch properties:', error);
    throw new Error('Failed to fetch properties');
  }
}
