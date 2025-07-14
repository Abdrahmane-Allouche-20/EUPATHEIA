import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/nextAuth"
import { prisma } from '@/lib/prisma'

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || !session.user.id) {
        return new NextResponse('Unauthorized', { status: 401 })
    }
    
    try {
        const quoteId = params.id
        const data = await request.json()
        
        // First, check if the quote exists and belongs to the user
        const existingQuote = await prisma.quote.findUnique({
            where: { id: quoteId }
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
                content: data.content || data.text,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true
                    }
                }
            }
        })
        
        return NextResponse.json({ message: 'Quote updated successfully', quote: updatedQuote })
    } catch (error) {
        console.error('Error updating quote:', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}

