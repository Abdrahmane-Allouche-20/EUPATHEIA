import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const quotes = await prisma.quote.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    });

    // Transform the data to ensure author is a string
    const transformedQuotes = quotes.map(quote => ({
      id: quote.id,
      content: quote.content,
      author: quote.author?.name || 'Unknown Author', // Convert object to string
      category: quote.category,
      createdAt: quote.createdAt.toISOString(),
      user: {
        id: quote.author?.id || '',
        name: quote.author?.name || 'Unknown'
      }
    }));

    return NextResponse.json(transformedQuotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
