import React, { useState } from 'react'
import { signOut } from 'next-auth/react'
import { User } from '../page'

function Settings({ user }: { user: User }) {
  const [loading, setLoading] = useState(false)

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This cannot be undone.')) return
    setLoading(true)
    try {
      const res = await fetch('/api/user/DELETE', { method: 'DELETE' })
      if (res.ok) {
        alert('Account deleted. Goodbye!')
        await signOut({ callbackUrl: '/' })
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to delete account.')
      }
    } catch (err) {
      alert('Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl md:text-2xl font-bold text-[#2D3142] mb-6">Account Settings</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-lg p-4 sm:p-6">
          <h3 className="text-lg md:text-xl font-semibold text-[#2D3142] mb-4">Profile Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#2D3142]/90 mb-1">Username</label>
              <p className="text-[#2D3142] bg-white/10 rounded-lg px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base">
                {user?.name || 'Not provided'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2D3142]/90 mb-1">Email Address</label>
              <p className="text-[#2D3142] bg-white/10 rounded-lg px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base">
                {user?.email || 'Not provided'}
              </p>
            </div>
          </div>
        </div>
        {/* You can add more settings sections here if needed */}
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-4">
        <button
          className="bg-red-500 hover:bg-red-600 text-white cursor-pointer px-5 md:px-6 py-2 md:py-3 md:text-base text-sm rounded-lg font-medium transition-colors flex items-center disabled:opacity-60"
          onClick={handleDeleteAccount}
          disabled={loading}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M3 12h18m-9 6h9" />
          </svg>
          {loading ? 'Deleting...' : 'Delete Account'}
        </button>
      </div>
    </div>
  )
}

export default Settings