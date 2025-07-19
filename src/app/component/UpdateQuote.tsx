'use client'

import React, { useState } from 'react'
import { quoteCategories } from '@/lib/categories'

interface QuoteEditFormProps {
  quote: {
    id: string
    content: string
    category: string
  }
  onCancel: () => void
  onSaveComplete: () => void
}

export default function QuoteEditForm({
  quote,
  onCancel,
  onSaveComplete,
}: QuoteEditFormProps) {
  const [editText, setEditText] = useState(quote.content)
  const [editCategory, setEditCategory] = useState(quote.category)
  const [saving, setSaving] = useState(false)

  const saveEdit = async () => {
    setSaving(true)
    try {
      const response = await fetch(`/api/quote/UPDATE/${quote.id}`, {
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
        onSaveComplete()
      } else {
        console.error('Failed to update quote')
      }
    } catch (_error) { // renamed to _error to avoid unused var warning
      console.error('Error updating quote')
    } finally {
      setSaving(false)
    }
  }

  return (
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
          onClick={saveEdit}
          disabled={saving}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save'}
        </button>
        <button
          onClick={onCancel}
          className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
