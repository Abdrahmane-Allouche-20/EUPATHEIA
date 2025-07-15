import React from 'react'
import Link from 'next/link'
import { Quote } from '../page'
function Quotes({isLoading,userQuotes}:{isLoading:Boolean,userQuotes:Quote[]}) {
  return (
    <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-[#2D3142]">My Quotes ({userQuotes.length})</h2>
                      <Link href="/quotes/create">
                        <button className="bg-[#7B9E5F] hover:bg-[#7B9E5F]/80 text-[#2D3142] px-4 py-2 rounded-lg font-medium transition-colors">
                          Add New Quote
                        </button>
                      </Link>
                    </div>
    
                    {isLoading ? (
                      <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7B9E5F] mx-auto"></div>
                        <p className="text-[#2D3142]/70 mt-4">Loading your quotes...</p>
                      </div>
                    ) : userQuotes.length > 0 ? (
                      <div className="grid gap-6">
                        {userQuotes.map((quote) => (
                          <div key={quote.id} className="bg-white/5 rounded-lg p-6 border border-white/10">
                            <blockquote className="text-lg text-[#2D3142] italic mb-4">
                              "{quote.content}"
                            </blockquote>
                            <div className="flex justify-between items-center text-sm">
                              <div className="flex items-center space-x-4">
                                <span className="text-[#7B9E5F] font-medium">— {quote.author}</span>
                                <span className="bg-[#B5AACF]/20 text-[#B5AACF] px-2 py-1 rounded">
                                  {quote.category}
                                </span>
                              </div>
                              <span className="text-[#2D3142]/60">
                                {new Date(quote.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <svg className="w-16 h-16 text-[#2D3142]/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-4 4z" />
                        </svg>
                        <h3 className="text-xl font-semibold text-[#2D3142] mb-2">No quotes yet</h3>
                        <p className="text-[#2D3142]/70 mb-6">Start sharing your wisdom with the world!</p>
                        <Link href="/quotes/create">
                          <button className="bg-[#7B9E5F] hover:bg-[#7B9E5F]/80 text-[#2D3142] px-6 py-3 rounded-lg font-medium transition-colors">
                            Create Your First Quote
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
  )
}

export default Quotes