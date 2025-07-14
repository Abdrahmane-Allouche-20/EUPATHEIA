import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/nextAuth"
import { prisma } from '@/lib/prisma'

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || !session.user.id) {
        return new NextResponse('Unauthorized', { status: 401 })
    }
    
    try {
        const quoteId = params.id
        
        // First, check if the quote exists and belongs to the user
        const existingQuote = await prisma.quote.findUnique({
            where: { id: quoteId }
        })
        
        if (!existingQuote) {
            return new NextResponse('Quote not found', { status: 404 })
        }
        
        // Check if user owns the quote or is admin
        if (existingQuote.authorId !== session.user.id && !session.user.isAdmin) {
            return new NextResponse('Forbidden: You can only delete your own quotes', { status: 403 })
        }
        
        // Delete the quote
        const deletedQuote = await prisma.quote.delete({
            where: { id: quoteId }
        })
        
        return NextResponse.json({ message: 'Quote deleted successfully', quote: deletedQuote })
    } catch (error) {
        console.error('Error deleting quote:', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}