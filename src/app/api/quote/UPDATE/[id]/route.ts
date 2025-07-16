import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/nextAuth"
import { prisma } from '@/lib/prisma'

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> } // Updated type
) {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || !session.user.id) {
        return new NextResponse('Unauthorized', { status: 401 })
    }
    
    try {
        const { id: quoteId } = await params // Await params, then destructure
        const data = await request.json()
        
        // Validate required fields
        if (!data.content && !data.text) {
            return new NextResponse('Content is required', { status: 400 })
        }
        
        // First, check if the quote exists and belongs to the user
        const existingQuote = await prisma.quote.findUnique({
            where: { id: quoteId },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })
        
        if (!existingQuote) {
            return new NextResponse('Quote not found', { status: 404 })
        }
        
        // Check if user owns the quote
        if (existingQuote.authorId !== session.user.id) {
            return new NextResponse('Forbidden: You can only update your own quotes', { status: 403 })
        }
        
        // Update the quote
        const updatedQuote = await prisma.quote.update({
            where: { id: quoteId },
            data: {
                content: (data.content || data.text).trim(),
                category: data.category || existingQuote.category, // Allow category updates
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        })
        
        // Transform response to match expected format
        const transformedQuote = {
            id: updatedQuote.id,
            content: updatedQuote.content,
            author: updatedQuote.author?.name || 'Unknown',
            category: updatedQuote.category,
            createdAt: updatedQuote.createdAt.toISOString(),
            updatedAt: updatedQuote.updatedAt.toISOString(),
            user: {
                id: updatedQuote.author?.id || '',
                name: updatedQuote.author?.name || 'Unknown'
            }
        }
        
        return NextResponse.json({ 
            message: 'Quote updated successfully', 
            quote: transformedQuote 
        })
    } catch (error) {
        console.error('Error updating quote:', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}

