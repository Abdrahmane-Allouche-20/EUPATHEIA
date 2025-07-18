'use client'

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
import React, { useState } from 'react'

function NavBar() {
  const { data: session, status } = useSession()
  const [menuOpen, setMenuOpen] = useState(false)
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Quotes', href: '/quotes' }
  ]
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href

  const handleNavClick = () => setMenuOpen(false)

  return (
    <nav className="relative">
      {/* Hamburger for mobile */}
      <button
        className="lg:hidden flex items-center px-2 py-2 text-[#2D3142] focus:outline-none"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Open menu"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
          )}
        </svg>
      </button>

      {/* Desktop Nav */}
      <div className="hidden lg:flex items-center">
        {status === 'loading' && <Loading size="sm" text="" />}

        {status === 'unauthenticated' && (
          <div className="flex space-x-4">
            <Link href="/auth/signin">
              <button className="bg-white px-3 py-2 rounded-lg text-[#2D3142] font-bold cursor-pointer">
                Sign In
              </button>
            </Link>
            <Link href="/auth/register">
              <button className="bg-[#2D3142] px-3 py-2 rounded-lg text-white font-bold cursor-pointer">
                Register
              </button>
            </Link>
          </div>
        )}

        {status === 'authenticated' && session?.user && (
          <ul className="flex space-x-6 items-center">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className={`font-medium transition-colors ${
                    isActive(link.href)
                      ? 'text-blue-500 border-b-2 border-blue-500 pb-1'
                      : 'text-[#2D3142] hover:text-blue-500'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {session.user.isAdmin && (
              <Link
                href="/dashboard"
                className={`font-medium transition-colors ${
                  isActive('/dashboard')
                    ? 'text-blue-500 border-b-2 border-blue-500 pb-1'
                    : 'text-[#2D3142] hover:text-blue-500'
                }`}
              >
                Dashboard
              </Link>
            )}
            <li>
              <Link href="/profile">
                <Image
                  src={session?.user.image || ''}
                  alt="user picture"
                  className="rounded-full w-12 h-12 object-cover border-2 border-white"
                  width={40}
                  height={40}
                />
              </Link>
            </li>
          </ul>
        )}
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-[350px] bg-white rounded-lg shadow-lg py-4 z-50 flex flex-col space-y-2 lg:hidden">
          {status === 'loading' && <Loading size="sm" text="" />}

          {status === 'unauthenticated' && (
            <>
              <Link href="/auth/signin" onClick={handleNavClick} className="w-full">
                <button className="w-full text-left px-4 py-2 text-[#2D3142] font-bold hover:bg-gray-100">
                  Sign In
                </button>
              </Link>
              <Link href="/auth/register" onClick={handleNavClick} className="w-full">
                <button className="w-full text-left px-4 py-2 text-white font-bold bg-[#2D3142] hover:bg-[#2D3142]/90 rounded">
                  Register
                </button>
              </Link>
            </>
          )}

          {status === 'authenticated' && session?.user && (
            <>
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  onClick={handleNavClick}
                  className={`w-full block px-4 py-2 font-medium transition-colors ${
                    isActive(link.href)
                      ? 'text-blue-500'
                      : 'text-[#2D3142] hover:text-blue-500 hover:bg-gray-100'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {session.user.isAdmin && (
                <Link
                  href="/dashboard"
                  onClick={handleNavClick}
                  className={`w-full block px-4 py-2 font-medium transition-colors ${
                    isActive('/dashboard')
                      ? 'text-blue-500 bg-blue-50'
                      : 'text-[#2D3142] hover:text-blue-500 hover:bg-gray-100'
                  }`}
                >
                  Dashboard
                </Link>
              )}
              <Link
                href="/profile"
                onClick={handleNavClick}
                className="w-full flex items-center px-4 py-2"
              >
                <Image
                  src={session?.user.image || ''}
                  alt="user picture"
                  className="rounded-full w-10 h-10 object-cover border-2 border-white mr-2"
                  width={36}
                  height={36}
                />
                <span className="font-medium text-[#2D3142]">
                  {session.user.name || 'Profile'}
                </span>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default NavBar
