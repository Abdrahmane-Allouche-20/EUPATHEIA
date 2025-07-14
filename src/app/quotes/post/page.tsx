'use client'

import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AddQuotePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  

  const [formData, setFormData] = useState({
    text: '',
    author: '',
    mood: 'happy',
    isPublic: false
  })

  const moods = [
    { value: 'happy', label: '😊 Happy', color: 'from-yellow-400 to-orange-500' },
    { value: 'inspired', label: '✨ Inspired', color: 'from-purple-400 to-pink-500' },
    { value: 'motivated', label: '🚀 Motivated', color: 'from-blue-400 to-cyan-500' },
    { value: 'peaceful', label: '🧘 Peaceful', color: 'from-green-400 to-teal-500' },
    { value: 'grateful', label: '🙏 Grateful', color: 'from-pink-400 to-rose-500' },
    { value: 'confident', label: '💪 Confident', color: 'from-indigo-400 to-purple-500' },
    { value: 'reflective', label: '🤔 Reflective', color: 'from-gray-400 to-slate-500' },
    { value: 'hopeful', label: '🌅 Hopeful', color: 'from-orange-400 to-red-500' }
  ]

  // Redirect if not authenticated
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    router.push('/auth/signin')
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
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
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSuccess(true)
        setFormData({
          text: '',
          author: '',
          mood: 'happy',
          isPublic: false
        })
        setTimeout(() => {
          router.push('/')
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

  const selectedMood = moods.find(mood => mood.value === formData.mood)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/quotes" className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Quotes
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Create New Quote</h1>
          <p className="text-white/70">Share your thoughts and inspiration with the world</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-500/20 border border-green-500/50 text-green-200 px-6 py-4 rounded-lg mb-6 text-center">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Quote created successfully!
            </div>
            <p className="text-sm">Redirecting to quotes page...</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-6 py-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Quote Text */}
            <div>
              <label htmlFor="text" className="block text-sm font-medium text-white/90 mb-2">
                Your Quote *
              </label>
              <textarea
                id="text"
                name="text"
                required
                rows={4}
                value={formData.text}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-white/20 placeholder-white/50 text-white bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm resize-none"
                placeholder="Enter your inspiring quote here..."
              />
              <p className="text-white/60 text-sm mt-1">{formData.text.length}/500 characters</p>
            </div>

            {/* Author */}
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-white/90 mb-2">
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-white/20 placeholder-white/50 text-white bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                placeholder="Author name (leave empty for anonymous)"
              />
            </div>

            {/* Mood Selection */}
            <div>
              <label className="block text-sm font-medium text-white/90 mb-3">
                Mood & Feeling
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {moods.map((mood) => (
                  <label
                    key={mood.value}
                    className={`relative cursor-pointer rounded-lg p-3 border-2 transition-all duration-200 ${
                      formData.mood === mood.value
                        ? 'border-white bg-white/20'
                        : 'border-white/20 bg-white/10 hover:border-white/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="mood"
                      value={mood.value}
                      checked={formData.mood === mood.value}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className="text-center">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${mood.color} mx-auto mb-1`}></div>
                      <span className="text-white/90 text-xs font-medium">{mood.label}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Privacy Setting */}
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
              <div>
                <label htmlFor="isPublic" className="block text-sm font-medium text-white/90">
                  Make this quote public
                </label>
                <p className="text-white/60 text-xs mt-1">
                  Public quotes can be seen by other users
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="isPublic"
                  name="isPublic"
                  checked={formData.isPublic}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
              </label>
            </div>

            {/* Preview */}
            {formData.text && (
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h3 className="text-white/90 font-medium mb-2">Preview</h3>
                <div className={`bg-gradient-to-r ${selectedMood?.color} p-4 rounded-lg`}>
                  <blockquote className="text-white text-lg italic">
                    "{formData.text}"
                  </blockquote>
                  {formData.author && (
                    <cite className="text-white/80 text-sm mt-2 block">
                      — {formData.author}
                    </cite>
                  )}
                  <div className="flex items-center justify-between mt-3 text-white/70 text-xs">
                    <span>{selectedMood?.label}</span>
                    <span>{formData.isPublic ? '🌍 Public' : '🔒 Private'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 py-3 px-4 border border-white/20 text-white/90 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || !formData.text.trim()}
                className="flex-1 flex justify-center py-3 px-4 border border-transparent text-white font-medium rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
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
                  'Create Quote'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
          <h3 className="text-white font-medium mb-3">💡 Tips for great quotes</h3>
          <ul className="text-white/70 text-sm space-y-2">
            <li>• Keep it concise and impactful</li>
            <li>• Choose a mood that reflects the quote's feeling</li>
            <li>• Add proper attribution if it's not your original quote</li>
            <li>• Make it public to inspire others in the community</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
