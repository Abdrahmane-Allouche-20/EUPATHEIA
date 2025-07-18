import React from 'react'
import { User } from '../page'
import { Quote } from '../page'
function OverView({user,userQuotes}:{user:User,userQuotes:Quote[]}) {
  return (
    <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#2D3142] mb-6">Account Overview</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-[#2D3142] mb-4">Personal Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-[#2D3142]/90 mb-1">Full Name</label>
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
                      <div>
                        <label className="block text-sm font-medium text-[#2D3142]/90 mb-1">Account Type</label>
                        <p className="text-[#2D3142] bg-white/10 rounded-lg px-4 py-2">
                          {user?.isAdmin ? 'Administrator' : 'Standard User'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-[#2D3142] mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      {userQuotes.slice(0, 3).map((quote) => (
                        <div key={quote.id} className="flex items-center space-x-3 bg-white/10 rounded-lg p-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <div className="flex-1">
                            <p className="text-[#2D3142] text-sm truncate">"{quote.content}"</p>
                            <p className="text-[#2D3142]/60 text-xs">
                              {new Date(quote.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                      {userQuotes.length === 0 && (
                        <p className="text-[#2D3142]/60 text-center py-4">No quotes yet. Create your first quote!</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
  )
}

export default OverView