'use client'
//#7B9E5F OLIVE GREEN
//B5AACF
//BFC9D9 silver
//FF8882  light red
//2D3142  midnight blue
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    try {
      setIsLoading(true)
      
      // Create FormData object instead of JSON
      const submitData = new FormData()
      submitData.append('name', formData.name)
      submitData.append('email', formData.email)
      submitData.append('password', formData.password)
      
      // Add avatar file if selected
      if (avatarFile) {
        submitData.append('avatar', avatarFile)
        console.log('Uploading avatar:', avatarFile.name)
      }

      console.log('Sending FormData with:', {
        name: formData.name,
        email: formData.email,
        hasAvatar: !!avatarFile
      })

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        body: submitData, // Send FormData instead of JSON
        // Don't set Content-Type header - let browser set it with boundary for multipart/form-data
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Registration failed')
        return
      }

      console.log('Registration successful:', data)
      // Registration successful, redirect to sign in
      router.push('/auth/signin?message=Registration successful! Please sign in.')

    } catch (error) {
      console.error('Registration error:', error)
      setError('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl bg-gradient-to-r from-blue-400  to-green-300 shadow-2xl p-8 border border-white/20 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2D3142] mb-2">Create Account</h1>
          <p className="text-[#2D3142]/80">Join us to start sharing quotes</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Upload */}
          <div className="text-center">
            <div className="mb-4">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-12 h-12 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </div>
            </div>
            <label htmlFor="avatar" className="cursor-pointer">
              <span className="bg-white/20 hover:bg-white/30 text-[#2D3142]/90 px-4 py-2 rounded-lg transition-colors inline-block">
                Choose Avatar
              </span>
              <input
                type="file"
                id="avatar"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Existing form fields */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#2D3142]/90 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-white/20 placeholder-[#2D3142]/50 text-[#2D3142] bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent  backdrop-blur-sm"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#2D3142]/90 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-white/20 placeholder-[#2D3142]/50 text-[#2D3142] bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent  backdrop-blur-sm"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#2D3142]/90 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-white/20 placeholder-[#2D3142]/50 text-[#2D3142] bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent  backdrop-blur-sm"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#2D3142]/90 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-white/20 placeholder-[#2D3142]/50 text-[#2D3142] bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent  backdrop-blur-sm"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full  bg-gradient-to-br from-[#ff4e44] cursor-pointer to-yellow-300 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[#2D3142]/80">
            Already have an account?{' '}
            <Link href="/auth/signin" className="text-red-500 hover:text-red-600 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}