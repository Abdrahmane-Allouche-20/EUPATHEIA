import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/nextAuth'
import { prisma } from '@/lib/prisma'

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    // Delete all quotes belonging to the user
    await prisma.quote.deleteMany({
      where: { author: { id: userId } },
    })

    // Delete the user account
    await prisma.user.delete({
      where: { id: userId },
    })

    // Clear the session cookie
    const response = NextResponse.json(
      { message: 'User and all quotes deleted successfully.' },
      { status: 200 }
    )

    response.cookies.set('next-auth.session-token', '', { maxAge: 0, path: '/' })
    response.cookies.set('__Secure-next-auth.session-token', '', { maxAge: 0, path: '/' }) // For secure cookie
    response.cookies.set('next-auth.csrf-token', '', { maxAge: 0, path: '/' }) // Optional

    return response
  } catch (error) {
    console.error('Error deleting user and quotes:', error)
    return NextResponse.json(
      { error: 'Failed to delete user and quotes.' },
      { status: 500 }
    )
  }
}
