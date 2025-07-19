'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import MoodSelector from '../../component/Mood'
import {quoteCategories} from '@/lib/categories'
export default function AddQuotePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [formData,setFormData]=useState({
    text:'',
    category:'motivational'
  })


  if (status === 'loading') {
    return (
      <div className="min-h-screen  flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400"></div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    router.push('/auth/signin')
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCategoryChange = (category: string) => {
    console.log('🔄 Category changed to:', category)
    setFormData(prev => ({
      ...prev,
      category
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

  

    try {
      const response = await fetch('/api/quote/POST', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: formData.text,
          category: formData.category
        }),
      })

      if (response.ok) {
        setSuccess(true)
        setFormData({
          text: '',
          category: 'motivational',
        })
        
        setTimeout(() => {
          router.push('/quotes')
        }, 2000)
        
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to create quote')
      }
    } catch (error) {
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const selectedCategory = quoteCategories.find(cat => cat.value === formData.category)

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/quotes" className="inline-flex items-center text-[#2D3142] mb-4 hover:text-[#2D3142]/80 transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Quotes
          </Link>
          <h1 className="text-4xl font-bold text-[#2D3142] mb-2">Create New Quote</h1>
          <p className="text-[#2D3142]">Share your thoughts and inspiration with the world</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-500/20 border border-green-500/50 text-[#2D3142] px-6 py-4 rounded-lg mb-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Quote created successfully! Redirecting...
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-[#2D3142] px-6 py-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 md:p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Quote Text */}
            <div>
              <label htmlFor="text" className="block text-sm font-medium text-[#2D3142] mb-2">
                Your Quote 
              </label>
              <textarea
                id="text"
                name="text"
                required
                rows={4}
                value={formData.text}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-[#2D3142]/20 placeholder-[#2D3142]/50 text-[#2D3142] bg-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent backdrop-blur-sm resize-none"
                placeholder="Enter your inspiring quote here..."
                maxLength={500}
              />
              <p className="text-[#2D3142]/60 text-sm mt-1">{formData.text.length}/500 characters</p>
            </div>

            {/* Category Selector - Fixed */}
            <MoodSelector
              selectedMood={formData.category}
              onMoodChange={handleCategoryChange}
              moods={quoteCategories}
              title="Quote Category"
              gridCols="grid-cols-3"
              size="md"
            />

            

            {/* Preview */}
            {formData.text && (
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-[#2D3142]/90 font-medium mb-2">Preview</h3>
                <div className={`bg-gradient-to-r ${selectedCategory?.color || 'from-blue-400 to-purple-500'} p-4 rounded-lg shadow-lg`}>
                  <blockquote className="text-white text-lg italic">
                    "{formData.text}"
                  </blockquote>
                  <cite className="text-white/80 text-sm mt-2 block">
                    — {session?.user?.name || 'You'}
                  </cite>
                  <div className="flex items-center justify-between mt-3 text-white/70 text-xs">
                    <span>{selectedCategory?.label || formData.category}</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 py-2 px-3 md:text-base text-sm md:py-3 md:px-4 border border-[#2D3142]/20 text-[#2D3142] rounded-lg bg-white/50 hover:bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#2D3142]/50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || !formData.text.trim()}
                className="flex-1 flex justify-center py-2 px-3 md:text-base text-sm md:py-3 md:px-4 border border-transparent text-white font-medium rounded-lg bg-gradient-to-r  from-blue-400 to-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7B9E5F]  disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </div>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Quote
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
