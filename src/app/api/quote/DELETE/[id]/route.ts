import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/nextAuth"
import { prisma } from '@/lib/prisma'

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> } // Fixed: params is now a Promise
) {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || !session.user.id) {
        return new NextResponse('Unauthorized', { status: 401 })
    }
    
    try {
        const { id: quoteId } = await params // Fixed: Await params first, then destructure
        
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
        
        // Check if user owns the quote or is admin
        if (existingQuote.authorId !== session.user.id && !session.user.isAdmin) {
            return new NextResponse('Forbidden: You can only delete your own quotes', { status: 403 })
        }
        
        // Delete the quote
        await prisma.quote.delete({
            where: { id: quoteId }
        })
        
        return NextResponse.json({ 
            message: 'Quote deleted successfully',
            deletedQuote: {
                id: existingQuote.id,
                content: existingQuote.content,
                author: existingQuote.author?.name || 'Unknown',
                category: existingQuote.category
            }
        })
    } catch (error) {
        console.error('Error deleting quote:', error)
        return NextResponse.json(
            { error: 'Internal Server Error' }, 
            { status: 500 }
        )
    }
}