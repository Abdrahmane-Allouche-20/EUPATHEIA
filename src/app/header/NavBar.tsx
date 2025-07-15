"use client"
//#7B9E5F OLIVE GREEN
//B5AACF
//BFC9D9 silver
//FF8882  light red
//2D3142  midnight blue
import { useSession } from 'next-auth/react'
import Loading from '../component/Loading'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function NavBar() {
  const { data: session, status } = useSession()
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Quotes', href: '/quotes' } // Changed from 'Add Quote' to 'Quotes'
  ]
  const pathname=usePathname()
  const isActive = (href: string) => pathname === href

  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center">
        {status === 'loading' && <Loading size="sm" text="" />}
        {status === 'unauthenticated' && (
          <div className="flex space-x-4">
            <Link href='/auth/signin'>
              <button className='bg-white px-3 py-2 rounded-lg text-[#2D3142] font-bold cursor-pointer'>
                Sign In
              </button>
            </Link>
            <Link href='/auth/register'>
              <button className='bg-[#2D3142] px-3 py-2 rounded-lg text-white font-bold cursor-pointer '>
                Register
              </button>
            </Link>
          </div>
        )}
        {status === 'authenticated' && session?.user && (
          <ul className='flex space-x-6 items-center'>
            {navLinks.map((link, index) => (
              
              <li key={index}>
                <Link href={link.href} 
                  className={`font-medium transition-colors ${
                    isActive(link.href) 
                      ? 'text-blue-500 border-b-2 border-blue-500 pb-1' 
                      : 'text-[#2D3142] hover:text-blue-500'
                  }`}  >                
                  {link.name}
                </Link>
              </li>
            ))}
          {session.user.isAdmin && 
          <Link
            className={`font-medium transition-colors ${
                    isActive('/dashboard') 
                      ? 'text-blue-500 border-b-2 border-blue-500 pb-1' 
                      : 'text-[#2D3142] hover:text-blue-500'
                  }`}
          href={'/dashboard'}>dashboard</Link>}
            <li><Link href='/profile'>
      <Image 
        src={session?.user.image || '' } 
        alt='user picture' 
        className='rounded-full w-12 h-12 object-cover border-2 border-white' 
        width={40} 
        height={40}
      />
      </Link></li>
          </ul>
        )}
      </div>
    </nav>
  )
}

export default NavBar