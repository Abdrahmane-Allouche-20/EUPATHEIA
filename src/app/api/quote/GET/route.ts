import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/nextAuth"
import { prisma } from '@/lib/prisma'
export  async function GET(request:Request){
    const session=await getServerSession(authOptions)
    if(!session?.user ||!session.user.id){
         return new NextResponse('Unauthorized', { status: 401 })
    }
    try{
        const quotes=await prisma.quote.findMany({orderBy:{createdAt:'desc'},include:{author:true}})
        return NextResponse.json(quotes)
    }catch(err){
         console.error('Error creating quote:', err)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
    }
