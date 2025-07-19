'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { quoteCategories } from '@/lib/categories'
import QuoteEditForm from '@/app/component/UpdateQuote'
import QuoteDeleteActions from '@/app/component/DeleteQuote'
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

 

  const stats: Record<string, number> = { all: quotes.length }
  quoteCategories.forEach(cat => {
    stats[cat.value] = quotes.filter(q => q.category === cat.value).length
  })

  const getCategoryColor = (val: string) =>
    quoteCategories.find(c => c.value === val)?.color || 'from-gray-400 to-gray-500'

  return (
    <div className="min-h-screen">
      <div className="flex">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-white/50 backdrop-blur z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-80  backdrop-blur-lg border-r border-white/90
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-white/20">
              <div className="flex justify-between items-center">
                <h2 className="text-xl md:text-2xl font-bold text-[#2D3142]">Categories</h2>
                <button
                  className="lg:hidden text-[#2D3142] hover:text-green-400"
                  onClick={() => setSidebarOpen(false)}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="relative mt-4">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#2D3142]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search quotes..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 py-2 pr-4 bg-black/10 border border-black/20 rounded-lg text-[#2D3142] placeholder-[#2D3142]/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left p-3 rounded-lg transition-colors text-[#2D3142] duration-200 ${
                  selectedCategory === 'all' ? 'bg-white/30  font-semibold ' : ' hover:bg-cyan-400/10 '
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
                  className={`w-full text-left p-3 rounded-lg text-[#2D3142] transition-colors duration-200 ${
                    selectedCategory === cat.value ? 'bg-white/30 font-semibold ' : ' hover:bg-cyan-400/10 '
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`w-4 h-4 text-sm rounded-full bg-gradient-to-r ${cat.color} mr-3`}></div>
                      <span>{cat.label}</span>
                    </div>
                    <span className="text-sm bg-white/20 px-2 py-1 rounded-full">{stats[cat.value] || 0}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="p-4 border-t border-white/20">
              <Link href="/quotes/create">
                <button className="w-full bg-gradient-to-r  from-green-500 to-yellow-500 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center shadow-lg">
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
          <header className=" backdrop-blur-lg border-b border-white/90 p-6 flex justify-between items-center">
            <div className="flex items-center">
              <button
                className="lg:hidden mr-4 text-[#2D3142]/70 hover:text-[#2D3142]"
                onClick={() => setSidebarOpen(true)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-[#2D3142]">
                  {selectedCategory === 'all'
                    ? 'All Quotes'
                    : quoteCategories.find(c => c.value === selectedCategory)?.label || 'Quotes'
                  }
                </h1>
                <p className="text-[#2D3142]/80 mt-1">
                  {isLoading ? 'Loading...' : `${filteredQuotes.length} quotes found`}
                </p>
              </div>
            </div>
            <Link href="/quotes/create" className="hidden lg:block">
              <button className="bg-gradient-to-r from-green-300 to-cyan-300 hover:from-blue-400 hover:to-cyan-400 text-white font-medium text-base py-2 px-6 rounded-lg transition-all duration-200 flex items-center shadow-lg">
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
                <div className="animate-spin h-12 w-12 border-b-2 border-cyan-400 rounded-full" />
              </div>
            ) : filteredQuotes.length === 0 ? (
              <div className="text-center text-white py-16">
                <div className="bg-white/40 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-[#2D3142]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-1l-4 4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#2D3142] mb-3">No quotes found</h3>
                <p className="text-[#2D3142]/70 mb-8">
                  {searchTerm ? `No quotes match "${searchTerm}"` : 'No quotes in this category yet.'}
                </p>
                <Link href="/quotes/create">
                  <button className="bg-gradient-to-r from-green-300 to-cyan-300 hover:from-blue-400 hover:to-cyan-400 text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 inline-flex items-center shadow-lg">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create First Quote
                  </button>
                </Link>
              </div>
            ) : (
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 ">
                {filteredQuotes.map(q => (
                  <div key={q.id} className={`group bg-gradient-to-r  ${getCategoryColor(q.category)} backdrop-blur-lg rounded-2xl p-6 border border-white/90 hover:bg-white/60 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl `}>
                    {/* Edit Mode */}
                    {editingQuote === q.id ? (
                      <QuoteEditForm
                        quote={{ id: q.id, content: q.content, category: q.category }}
                        onCancel={cancelEdit}
                        onSaveComplete={async () => {
                          await fetchQuotes()
                          cancelEdit()
                        }}
                      />
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
                          <div className="flex justify-between items-center">
                            <cite className="text-white/80 font-medium">
                              — {typeof q.author === 'string' ? q.author : q.author?.name || 'Unknown Author'}
                            </cite>
                            <span className="text-white/60 text-xs absolute top-3 right-3">
                            {new Date(q.createdAt).toLocaleDateString()}
                          </span>
                          </div>
                        </div>

                        {/* Category & Date */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/20 text-white">
                            {quoteCategories.find(cat => cat.value === q.category)?.label || q.category}
                          </span>
                         
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                         
                           
                          {/* Edit/Delete buttons for own quotes */}
                          {session?.user?.id === q.user?.id && (
                            <div className="flex items-center justify-end w-full space-x-2">
                              <button
                                onClick={() => startEdit(q)}
                                className="text-white/60 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
                                title="Edit"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <QuoteDeleteActions
  quoteId={q.id}
  onDeleteSuccess={async () => {
    await fetchQuotes()
  }}
/>
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
