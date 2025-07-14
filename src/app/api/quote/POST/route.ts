import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/nextAuth"
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || !session.user.id) {
        return new NextResponse('Unauthorized', { status: 401 })
    }
    
    try {
        const data = await request.json()
        
        const quote = await prisma.quote.create({
            data: {
                content: data.text || data.content,
                authorId: session.user.id,
            }
        })
        
        return NextResponse.json(quote)
    } catch (error) {
        console.error('Error creating quote:', error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}