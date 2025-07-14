'use client'

import React from 'react'
import Image from 'next/image'
import { signOut } from 'next-auth/react'

type User = {
  name?: string | null,
  email?: string | null,
  image?: string | null
}

interface ProfileProps {
  user?: User
}

function Profile({ user }: ProfileProps) {
  if (!user) {
    return null;
  }
console.log(user.image)
  return (
    <div className='flex items-center gap-3'>
      <Image 
        src={user.image || '' } 
        alt='user picture' 
        className='rounded-full border-2 border-white' 
        width={40} 
        height={40}
      />
      <div className='flex flex-col'>
        <span className='text-sm font-medium'>{user.name}</span>
        <span className='text-xs text-white'>{user.email}</span>
      </div>
      <button
        onClick={() => signOut()}
        className="ml-3 bg-red-600 hover:bg-red-700 cursor-pointer text-white px-3 py-1 rounded text-sm font-medium transition-colors"
      >
        Sign Out
      </button>
    </div>
  )
}

export default Profile