'use client'

import React, { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'

//#7B9E5F OLIVE GREEN
//B5AACF LAVENDER
//BFC9D9 SILVER
//FF8882 LIGHT RED
//2D3142 MIDNIGHT BLUE

interface Quote {
  id: string
  content: string
  author: string
  category: string
  createdAt: string
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [userQuotes, setUserQuotes] = useState<Quote[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (session?.user?.id) {
      fetchUserQuotes()
    }
  }, [session])

  const fetchUserQuotes = async () => {
    try {
      const response = await fetch(`/api/quotes/user/${session?.user?.id}`)
      if (response.ok) {
        const quotes = await response.json()
        setUserQuotes(quotes)
      }
    } catch (error) {
      console.error('Error fetching user quotes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#7B9E5F]"></div>
      </div>
    )
  }

  if (!session) {
    redirect('/auth/signin')
  }

  const user = session.user

  return (
    <div className="min-h-screen  p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#7B9E5F]/30 bg-white/10 flex items-center justify-center">
                {user?.image ? (
                  <img
                    src={user.image}
                    alt="Profile picture"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : (
                  <svg className="w-16 h-16 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </div>
              {/* Online Status Indicator */}
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-[#7B9E5F] rounded-full border-2 border-white"></div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-white mb-2">
                {user?.name || 'User'}
              </h1>
              <p className="text-white/80 text-lg mb-4">
                {user?.email}
              </p>
              
              {/* User Stats */}
              <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-6">
                <div className="bg-white/10 rounded-lg px-4 py-3 text-center">
                  <div className="text-2xl font-bold text-[#7B9E5F]">{userQuotes.length}</div>
                  <div className="text-white/70 text-sm">Quotes</div>
                </div>
                <div className="bg-white/10 rounded-lg px-4 py-3 text-center">
                  <div className="text-2xl font-bold text-[#FF8882]">0</div>
                  <div className="text-white/70 text-sm">Favorites</div>
                </div>
                <div className="bg-white/10 rounded-lg px-4 py-3 text-center">
                  <div className="text-2xl font-bold text-[#B5AACF]">
                    {new Date(user?.createdAt || Date.now()).getFullYear()}
                  </div>
                  <div className="text-white/70 text-sm">Member Since</div>
                </div>
              </div>

              {/* Role Badge */}
              {user?.isAdmin && (
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#7B9E5F]/20 border border-[#7B9E5F]/30 mb-4">
                  <svg className="w-4 h-4 text-[#7B9E5F] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[#7B9E5F] font-medium">Administrator</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Link href="/quotes/create">
                  <button className="bg-[#7B9E5F] hover:bg-[#7B9E5F]/80 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Quote
                  </button>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="bg-[#FF8882] hover:bg-[#FF8882]/80 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
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

        {/* Tabs */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 mb-8">
          <div className="flex border-b border-white/20">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'text-[#7B9E5F] border-b-2 border-[#7B9E5F]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('quotes')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'quotes'
                  ? 'text-[#7B9E5F] border-b-2 border-[#7B9E5F]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              My Quotes
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-4 font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'text-[#7B9E5F] border-b-2 border-[#7B9E5F]'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Settings
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Account Overview</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Personal Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-1">Full Name</label>
                        <p className="text-white bg-white/10 rounded-lg px-4 py-2">
                          {user?.name || 'Not provided'}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-1">Email Address</label>
                        <p className="text-white bg-white/10 rounded-lg px-4 py-2">
                          {user?.email || 'Not provided'}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-1">Account Type</label>
                        <p className="text-white bg-white/10 rounded-lg px-4 py-2">
                          {user?.isAdmin ? 'Administrator' : 'Standard User'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      {userQuotes.slice(0, 3).map((quote) => (
                        <div key={quote.id} className="flex items-center space-x-3 bg-white/10 rounded-lg p-3">
                          <div className="w-2 h-2 bg-[#7B9E5F] rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-white text-sm truncate">"{quote.content}"</p>
                            <p className="text-white/60 text-xs">
                              {new Date(quote.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                      {userQuotes.length === 0 && (
                        <p className="text-white/60 text-center py-4">No quotes yet. Create your first quote!</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'quotes' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">My Quotes ({userQuotes.length})</h2>
                  <Link href="/quotes/create">
                    <button className="bg-[#7B9E5F] hover:bg-[#7B9E5F]/80 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      Add New Quote
                    </button>
                  </Link>
                </div>

                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7B9E5F] mx-auto"></div>
                    <p className="text-white/70 mt-4">Loading your quotes...</p>
                  </div>
                ) : userQuotes.length > 0 ? (
                  <div className="grid gap-6">
                    {userQuotes.map((quote) => (
                      <div key={quote.id} className="bg-white/5 rounded-lg p-6 border border-white/10">
                        <blockquote className="text-lg text-white italic mb-4">
                          "{quote.content}"
                        </blockquote>
                        <div className="flex justify-between items-center text-sm">
                          <div className="flex items-center space-x-4">
                            <span className="text-[#7B9E5F] font-medium">— {quote.author}</span>
                            <span className="bg-[#B5AACF]/20 text-[#B5AACF] px-2 py-1 rounded">
                              {quote.category}
                            </span>
                          </div>
                          <span className="text-white/60">
                            {new Date(quote.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-white/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-4 4z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-white mb-2">No quotes yet</h3>
                    <p className="text-white/70 mb-6">Start sharing your wisdom with the world!</p>
                    <Link href="/quotes/create">
                      <button className="bg-[#7B9E5F] hover:bg-[#7B9E5F]/80 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                        Create Your First Quote
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Profile Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-1">Username</label>
                        <p className="text-white bg-white/10 rounded-lg px-4 py-2">
                          {user?.name || 'Not provided'}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-1">Email Address</label>
                        <p className="text-white bg-white/10 rounded-lg px-4 py-2">
                          {user?.email || 'Not provided'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Security</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white/90 mb-1">Password</label>
                        <p className="text-white bg-white/10 rounded-lg px-4 py-2">
                          ********
                        </p>
                      </div>
                      
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button className="bg-[#FF8882] hover:bg-[#FF8882]/80 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M3 12h18m-9 6h9" />
                    </svg>
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}