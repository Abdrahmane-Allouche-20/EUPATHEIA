'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { quoteCategories } from '@/lib/categories'

interface Quote {
  id: string
  content: string
  author: string | { name?: string; id?: string }
  category: string
  createdAt: string
  user?: {
    id: string
    name: string
  }
}

export default function QuotesPage() {
  const { data: session } = useSession()
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [editingQuote, setEditingQuote] = useState<string | null>(null)
  const [editText, setEditText] = useState('')
  const [editCategory, setEditCategory] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => { fetchQuotes() }, [])
  useEffect(() => { applyFilter() }, [quotes, selectedCategory, searchTerm])

  const fetchQuotes = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/quote/GET')
      if (res.ok) {
        const data: Quote[] = await res.json()
        console.log('📝 Fetched quotes:', data[0]) // Debug log
        setQuotes(data)
      } else {
        console.error('Failed to fetch quotes')
      }
    } catch (err) {
      console.error('Error fetching quotes:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const applyFilter = () => {
    let result = quotes
    if (selectedCategory !== 'all') {
      result = result.filter(q => q.category === selectedCategory)
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      result = result.filter(q => {
        const authorText = typeof q.author === 'string' ? q.author : q.author?.name || ''
        return (
          q.content.toLowerCase().includes(term) ||
          authorText.toLowerCase().includes(term)
        )
      })
    }
    setFilteredQuotes(result)
  }

  // Edit Quote Function
  const startEdit = (quote: Quote) => {
    setEditingQuote(quote.id)
    setEditText(quote.content)
    setEditCategory(quote.category)
  }

  const cancelEdit = () => {
    setEditingQuote(null)
    setEditText('')
    setEditCategory('')
  }

  const saveEdit = async (quoteId: string) => {
    try {
      const response = await fetch(`/api/quote/UPDATE/${quoteId}`, { // Add the ID to URL
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: editText,
          category: editCategory
        }),
      })

      if (response.ok) {
        await fetchQuotes() // Refresh quotes
        cancelEdit()
      } else {
        console.error('Failed to update quote')
      }
    } catch (error) {
      console.error('Error updating quote:', error)
    }
  }

  // Delete Quote Function
  const deleteQuote = async (quoteId: string) => {
    try {
      const response = await fetch(`/api/quote/DELETE/${quoteId}`, { // Fixed: Add ID to URL
        method: 'DELETE',
      })

      if (response.ok) {
        const result = await response.json()
        console.log('✅ Quote deleted:', result.message)
        await fetchQuotes() // Refresh quotes
        setDeleteConfirm(null)
      } else {
        const errorData = await response.json()
        console.error('❌ Failed to delete quote:', errorData.error || 'Unknown error')
      }
    } catch (error) {
      console.error('❌ Error deleting quote:', error)
    }
  }

  const stats: Record<string, number> = { all: quotes.length }
  quoteCategories.forEach(cat => {
    stats[cat.value] = quotes.filter(q => q.category === cat.value).length
  })

  const getCategoryColor = (val: string) =>
    quoteCategories.find(c => c.value === val)?.color || 'from-gray-400 to-gray-500'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800">
      <div className="flex">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-80 bg-white/10 backdrop-blur-lg border-r border-white/20
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-white/20">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Categories</h2>
                <button
                  className="lg:hidden text-white/70 hover:text-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="relative mt-4">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search quotes..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 py-2 pr-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                  selectedCategory === 'all' ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 mr-3"></div>
                    <span>All Categories</span>
                  </div>
                  <span className="text-sm bg-white/20 px-2 py-1 rounded-full">{stats.all}</span>
                </div>
              </button>
              {quoteCategories.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                    selectedCategory === cat.value ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${cat.color} mr-3`}></div>
                      <span>{cat.label}</span>
                    </div>
                    <span className="text-sm bg-white/20 px-2 py-1 rounded-full">{stats[cat.value] || 0}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="p-4 border-t border-white/20">
              <Link href="/quotes/create">
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Create Quote
                </button>
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 p-6 flex justify-between items-center">
            <div className="flex items-center">
              <button
                className="lg:hidden mr-4 text-white/70 hover:text-white"
                onClick={() => setSidebarOpen(true)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  {selectedCategory === 'all'
                    ? 'All Quotes'
                    : quoteCategories.find(c => c.value === selectedCategory)?.label || 'Quotes'
                  }
                </h1>
                <p className="text-white/80 mt-1">
                  {isLoading ? 'Loading...' : `${filteredQuotes.length} quotes found`}
                </p>
              </div>
            </div>
            <Link href="/quotes/create" className="hidden lg:block">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200 flex items-center shadow-lg">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Quote
              </button>
            </Link>
          </header>

          <section className="p-6">
            {isLoading ? (
              <div className="flex justify-center py-16">
                <div className="animate-spin h-12 w-12 border-b-2 border-white rounded-full" />
              </div>
            ) : filteredQuotes.length === 0 ? (
              <div className="text-center text-white py-16">
                <div className="bg-white/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-4 4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">No quotes found</h3>
                <p className="text-white/70 mb-8">
                  {searchTerm ? `No quotes match "${searchTerm}"` : 'No quotes in this category yet.'}
                </p>
                <Link href="/quotes/create">
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 inline-flex items-center shadow-lg">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create First Quote
                  </button>
                </Link>
              </div>
            ) : (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredQuotes.map(q => (
                  <div key={q.id} className="group bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    {/* Edit Mode */}
                    {editingQuote === q.id ? (
                      <div className="space-y-4">
                        <textarea
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 resize-none"
                          rows={3}
                        />
                        <select
                          value={editCategory}
                          onChange={(e) => setEditCategory(e.target.value)}
                          className="w-full p-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                        >
                          {quoteCategories.map(cat => (
                            <option key={cat.value} value={cat.value} className="bg-gray-800">
                              {cat.label}
                            </option>
                          ))}
                        </select>
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveEdit(q.id)}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Quote Content */}
                        <div className="mb-4">
                          <blockquote className="text-white text-lg leading-relaxed italic">
                            "{q.content}"
                          </blockquote>
                        </div>

                        {/* Quote Footer */}
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getCategoryColor(q.category)} mr-2`}></div>
                            <cite className="text-white/80 font-medium">
                              — {typeof q.author === 'string' ? q.author : q.author?.name || 'Unknown Author'}
                            </cite>
                          </div>
                        </div>

                        {/* Category & Date */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                            {quoteCategories.find(cat => cat.value === q.category)?.label || q.category}
                          </span>
                          <span className="text-white/60 text-xs">
                            {new Date(q.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <div className="flex items-center space-x-2">
                            <button className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors" title="Like">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </button>
                            <button className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors" title="Share">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                              </svg>
                            </button>
                          </div>
                          
                          {/* Edit/Delete buttons for own quotes */}
                          {session?.user?.id === q.user?.id && (
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => startEdit(q)}
                                className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                                title="Edit"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              {deleteConfirm === q.id ? (
                                <div className="flex space-x-1">
                                  <button
                                    onClick={() => deleteQuote(q.id)}
                                    className="text-red-400 hover:text-red-300 p-1 rounded transition-colors text-xs"
                                    title="Confirm Delete"
                                  >
                                    ✓
                                  </button>
                                  <button
                                    onClick={() => setDeleteConfirm(null)}
                                    className="text-white/60 hover:text-white p-1 rounded transition-colors text-xs"
                                    title="Cancel"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => setDeleteConfirm(q.id)}
                                  className="text-white/60 hover:text-red-400 p-2 rounded-lg hover:bg-white/10 transition-colors"
                                  title="Delete"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}
