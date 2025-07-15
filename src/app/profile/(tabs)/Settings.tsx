import React from 'react'
import { User } from '../page'
function Settings({user}:{user:User}) {
  return (
     <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#2D3142] mb-6">Account Settings</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-[#2D3142] mb-4">Profile Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#2D3142]/90 mb-1">Username</label>
                        <p className="text-[#2D3142] bg-white/10 rounded-lg px-4 py-2">
                          {user?.name || 'Not provided'}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2D3142]/90 mb-1">Email Address</label>
                        <p className="text-[#2D3142] bg-white/10 rounded-lg px-4 py-2">
                          {user?.email || 'Not provided'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-[#2D3142] mb-4">Security</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#2D3142]/90 mb-1">Password</label>
                        <p className="text-[#2D3142] bg-white/10 rounded-lg px-4 py-2">
                          ********
                        </p>
                      </div>
                      
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <button className="bg-[#FF8882] hover:bg-[#FF8882]/80 text-[#2D3142] px-6 py-3 rounded-lg font-medium transition-colors flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M3 12h18m-9 6h9" />
                    </svg>
                    Delete Account
                  </button>
                </div>
              </div>
  )
}

export default Settings