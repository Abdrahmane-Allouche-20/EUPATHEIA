'use client'

import React, { useState } from 'react'

interface QuoteDeleteActionsProps {
  quoteId: string
  onDeleteSuccess: () => void
}

export default function QuoteDeleteActions({
  quoteId,
  onDeleteSuccess,
}: QuoteDeleteActionsProps) {
  const [confirming, setConfirming] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const deleteQuote = async () => {
    setDeleting(true)
    try {
      const response = await fetch(`/api/quote/DELETE/${quoteId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        const result = await response.json()
        
        onDeleteSuccess()
      } else {
        const errorData = await response.json()
        console.error('❌ Failed to delete quote:', errorData.error || 'Unknown error')
      }
    } catch (error) {
      console.error('❌ Error deleting quote:', error)
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      {confirming ? (
        <div className="flex space-x-1">
          <button
            onClick={deleteQuote}
            disabled={deleting}
            className="text-slate-950 hover:text-red-500 p-1 rounded transition-colors text-xs"
            title="Confirm Delete"
          >
            {deleting ? '...' : '✓'}
          </button>
          <button
            onClick={() => setConfirming(false)}
            className="text-slate-950 hover:text-green-500 p-1 rounded transition-colors text-xs"
            title="Cancel"
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          onClick={() => setConfirming(true)}
          className="text-red-500 hover:text-red-600 p-2 rounded-lg hover:bg-white/10 transition-colors"
          title="Delete"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      )}
    </>
  )
}
