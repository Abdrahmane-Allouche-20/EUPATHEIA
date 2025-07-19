import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextAuth';
import { prisma } from '@/lib/prisma';

type Params = {
  params: {
    id: string;
  };
};

export async function GET(request: NextRequest, context: Params) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = context.params.id;

  if (session.user.id !== userId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const userQuotes = await prisma.quote.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        content: true,
        author: true,
        createdAt: true,
      },
    });

    return NextResponse.json(userQuotes);
  } catch (error) {
    console.error('Error fetching user quotes:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
