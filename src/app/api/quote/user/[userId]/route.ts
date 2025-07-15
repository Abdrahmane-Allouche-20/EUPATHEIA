// Create: src/app/api/quotes/user/[userId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextAuth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userId } = params;

    // Only allow users to fetch their own quotes (or admins)
    if (session.user.id !== userId && !session.user.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const userQuotes = await prisma.quote.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        content: true,
        author: true,
        createdAt: true,
      }
    });

    return NextResponse.json(userQuotes);

  } catch (error) {
    console.error('Error fetching user quotes:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}