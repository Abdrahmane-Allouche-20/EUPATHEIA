'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Quote } from '../page'
import QuoteEditForm from '@/app/component/UpdateQuote'
import QuoteDeleteActions from '@/app/component/DeleteQuote'

function Quotes({ isLoading, userQuotes }: { isLoading: boolean, userQuotes: Quote[] }) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [quotes, setQuotes] = useState<Quote[]>(userQuotes)

  const refreshQuotes = async () => {
    // You might want to replace this with a prop function or API call
    // For now, we'll just simulate a re-fetch
    const response = await fetch('/api/quotes') // Adjust as needed
    const data = await response.json()
    setQuotes(data)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-[#2D3142]">My Quotes ({quotes.length})</h2>
        <Link href="/quotes/create">
          <button className="bg-gradient-to-r from-yellow-400 to-red-400 hover:scale-105  text-white px-5 md:px-6 py-2 md:py-3 text-sm md:text-bae rounded-lg font-medium transition-colors flex items-center shadow-md">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Quote
          </button>
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
          <p className="text-[#2D3142]/70 mt-4 text-lg">Loading your quotes...</p>
        </div>
      ) : quotes.length > 0 ? (
        <div className="grid gap-6">
          {quotes.map((quote) => (
            <div 
              key={quote.id} 
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 shadow-lg"
            >
              {editingId === quote.id ? (
                <QuoteEditForm
              quote={{ id: quote.id, content: quote.content, category: quote.category }}
                  onCancel={() => setEditingId(null)}
                  onSaveComplete={async () => {
                    await refreshQuotes()
                    setEditingId(null)
                  }}
                />
              ) : (
                <>
                  <blockquote className="text-lg text-[#2D3142] italic mb-4 leading-relaxed">
                    "{quote.content}"
                  </blockquote>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    

                    <div className="flex items-center text-[#2D3142]/60 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(quote.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="flex justify-end mt-4 pt-4 border-t border-white/10">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingId(quote.id)}
                        className="text-blue-500 hover:text-blue-400 p-2 rounded-lg hover:bg-white/10 transition-colors"
                        title="Edit Quote"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>

                      <QuoteDeleteActions
                        quoteId={quote.id}
                        onDeleteSuccess={async () => {
                          await refreshQuotes()
                        }}
                      />
                    </div>
                  </div>
                  </div>

                  
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="bg-white/5 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-[#2D3142]/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-4 4z" />
            </svg>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-[#2D3142] mb-3">No quotes yet</h3>
          <p className="text-[#2D3142]/70 mb-8 text-base md:text-lg max-w-md mx-auto">
            You haven't created any quotes yet. Start sharing your wisdom and inspiration with the world!
          </p>
          <Link href="/quotes/create">
            <button className="bg-green-400 hover:bg-green-500 text-white px-6  md:px-8 py-3 md:py-4 md:text-base test-sm rounded-lg font-semibold transition-colors flex items-center mx-auto shadow-lg">
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Your First Quote
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Quotes
