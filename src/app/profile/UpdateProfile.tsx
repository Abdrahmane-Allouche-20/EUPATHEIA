'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

interface UpdateProfileProps {
  isOpen: boolean
  onClose: () => void
  onUpdate?: () => void  // Add this back
}

export default function UpdateProfile({ isOpen, onClose, onUpdate }: UpdateProfileProps) {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  
  // Update form when session changes or modal opens
  useEffect(() => {
    if (session?.user && isOpen) {
      setName(session.user.name || '')
      setEmail(session.user.email || '')
    }
  }, [session, isOpen])

  const handleClose = () => {
    setError('')
    setSuccess('')
    onClose()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)
    
    try {
      // Basic validation
      if (!name.trim() || !email.trim()) {
        setError('Name and email are required')
        setIsLoading(false)
        return
      }

      const response = await fetch('/api/user/update-profile', { // Fixed URL
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: name.trim(), 
          email: email.trim() 
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Failed to update profile')
        return
      }

      // Success
      setSuccess('Profile updated successfully!')
      
      // Call parent update function if provided
      if (onUpdate) {
        onUpdate()
      }

      // Close modal after 2 seconds
      setTimeout(() => {
        handleClose()
      }, 2000)

    } catch (error) {
      console.error('Update error:', error)
      setError('An error occurred while updating your profile. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-white via-[#BFC9D9]/30 to-[#B5AACF]/30 rounded-2xl shadow-2xl border border-white/40 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-[#2D3142]">Update Profile</h2>
            <button
              onClick={handleClose}
              className="text-[#2D3142]/70 hover:text-[#2D3142] transition-colors p-2 hover:bg-white/20 rounded-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Success Message */}
          {success && (
            <div className="bg-[#7B9E5F]/20 border border-[#7B9E5F]/50 text-[#7B9E5F] px-4 py-3 rounded-lg mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {success}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-[#FF8882]/20 border border-[#FF8882]/50 text-[#FF8882] px-4 py-3 rounded-lg mb-6 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#2D3142]/90 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-white/40 placeholder-[#2D3142]/50 text-[#2D3142] bg-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B9E5F] focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#2D3142]/90 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-white/40 placeholder-[#2D3142]/50 text-[#2D3142] bg-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B9E5F] focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Info Note */}
            <div className="bg-[#7B9E5F]/10 border border-[#7B9E5F]/30 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-[#7B9E5F] mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-[#2D3142]">
                  <p className="font-medium mb-1">Note:</p>
                  <p>This form only updates your basic profile information. To change your password or profile picture, please use the dedicated options in your profile settings.</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 bg-white/30 hover:bg-white/40 text-[#2D3142] px-6 py-3 rounded-lg font-medium transition-colors border border-white/40"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-[#7B9E5F] hover:bg-[#7B9E5F]/80 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Update Profile
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