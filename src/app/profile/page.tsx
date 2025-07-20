'use client'

import React, { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import OverView from './(tabs)/OverView'
import Quotes from './(tabs)/Quotes'
import Settings from './(tabs)/Settings'
import Image from 'next/image'

// Updated Quote interface to match your API response
export interface Quote {
  id: string
  content: string
  author:{
    name:string
  }// Simple string, not object
  category: string
  createdAt: string
}

export interface User {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
  isAdmin?: boolean
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [userQuotes, setUserQuotes] = useState<Quote[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserQuotes()
    }
  }, [session])

  const fetchUserQuotes = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/quote/user/${session?.user?.id}`)
      if (response.ok) {
        const quotes = await response.json()
        
        setUserQuotes(quotes)
      } else {
        console.error('Failed to fetch quotes:', response.status)
      }
    } catch (error) {
      console.error('Error fetching user quotes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Update your handleProfileUpdate function in page.tsx:
 

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400"></div>
      </div>
    )
  }

  if (!session) {
    redirect('/auth/signin')
  }

  const user = session.user
  

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-400 bg-white/10 flex items-center justify-center">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt="Profile picture"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                    loading='lazy'
                  />
                ) : (
                  <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </div>
              {/* Online Status Indicator */}
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-[#10b341] rounded-full border-2 border-white"></div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-lg md:text-2xl lg:text-4xl font-bold text-[#2D3142] mb-2">
                {user?.name || 'User'}
              </h1>
              <p className="text-[#2D3142]/80 text-base lg:text-lg mb-2 md:mb-4">
                {user?.email}
              </p>
              
              {/* User Stats */}
              <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-6">
                <div className="bg-white/50 rounded-lg px-3 md:px-4 py-2 md:py-3 text-center">
                  <div className="text-lg md:text-2xl font-bold text-green-500">{userQuotes.length}</div>
                  <div className="text-[#2D3142]/70 text-sm">Quotes</div>
                </div>

                <div className="bg-white/50 rounded-lg px-3 md:px-4 py-2 md:py-3  text-center">
                  <div className="text-lg md:text-2xl font-bold text-blue-500">
                    {new Date().getFullYear()}
                  </div>
                  <div className="text-[#2D3142]/70 text-sm">Member Since</div>
                </div>
              </div>

              {/* Role Badge */}
              {user?.isAdmin && (
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#7B9E5F]/20 border border-[#7B9E5F]/30 mb-4">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-slate-950 font-medium">Administrator</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Link href="/quotes/create">
                  <button className="text-sm md:text-base bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-green-500 hover:to-blue-400 text-white px-3 md:px-6 py-2 md:py-3 rounded-lg font-medium transition-colors flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Quote
                  </button>
                </Link>
                
              

                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="text-sm md:text-base  bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-400 text-white px-3 md:px-6 py-2 md:py-3 rounded-lg font-medium transition-colors flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ADD THE MISSING TABS SECTION */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 mb-8">
          <div className="flex border-b border-white/20">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-5 md:px-6  py-3 md:py-4 font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'text-[#2D3142] border-b-2 border-[#2D3142]'
                  : 'text-blue-500 hover:text-[#2D3142]'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('quotes')}
              className={`px-5 md:px-6  py-3 md:py-4 font-medium transition-colors ${
                activeTab === 'quotes'
                  ? 'text-[#2D3142] border-b-2 border-[#2D3142]'
                  : 'text-blue-500 hover:text-[#2D3142]'
              }`}
            >
              My Quotes
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-5 md:px-6  py-3 md:py-4 font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'text-[#2D3142] border-b-2 border-[#2D3142]'
                  : 'text-blue-500 hover:text-[#2D3142]'
              }`}
            >
              Settings
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'overview' && (
              <OverView user={user} userQuotes={userQuotes}/>
            )}

            {activeTab === 'quotes' && (
              <Quotes isLoading={isLoading} userQuotes={userQuotes}/>
            )}

            {activeTab === 'settings' && (
              <Settings user={user}/>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}