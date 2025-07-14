"use client"

import { useSession } from 'next-auth/react'
import Loading from '../component/Loading'
import SignInButton from '../component/SignInButtonGoogle'
import Profile from '../profile/page'
import Link from 'next/link'
function NavBar() {
  const { data: session, status } = useSession()
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Contact', href: '/contact' },
    { name: 'About', href: '/about' },
    { name: 'Quotes', href: '/quotes' } // Changed from 'Add Quote' to 'Quotes'
  ]
  
  console.log(session)
  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center">
        {status === 'loading' && <Loading size="sm" text="" />}
        {status === 'unauthenticated' && (
          <div className="flex space-x-4">
            <Link href='/auth/signin'>
              <button className='bg-white px-3 py-2 rounded-lg text-black cursor-pointer'>
                Sign In
              </button>
            </Link>
            <Link href='/auth/register'>
              <button className='bg-purple-600 px-3 py-2 rounded-lg text-white cursor-pointer hover:bg-purple-700'>
                Register
              </button>
            </Link>
          </div>
        )}
        {status === 'authenticated' && session?.user && (
          <ul className='flex space-x-6 items-center'>
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.href} className="text-white hover:text-blue-600 font-medium transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          {session.user.isAdmin && <Link href={'/dashboard'}>dashboard</Link>}
            <li><Profile user={session.user} /></li>
          </ul>
        )}
      </div>
    </nav>
  )
}

export default NavBar