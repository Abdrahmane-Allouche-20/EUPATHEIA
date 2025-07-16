'use client'

import React from 'react'

export interface Mood {
  value: string
  label: string
  color: string
  icon?: string
}

interface MoodSelectorProps {
  selectedMood: string
  onMoodChange: (mood: string) => void
  moods?: Mood[]
  title?: string
  gridCols?: 'grid-cols-2' | 'grid-cols-3' | 'grid-cols-4' | 'grid-cols-5'
  size?: 'sm' | 'md' | 'lg'
}

const defaultMoods: Mood[] = [
  { value: 'happy', label: '😊 Happy', color: 'from-yellow-400 to-orange-500' },
  { value: 'inspired', label: '✨ Inspired', color: 'from-purple-400 to-pink-500' },
  { value: 'motivated', label: '🚀 Motivated', color: 'from-blue-400 to-cyan-500' },
  { value: 'peaceful', label: '🧘 Peaceful', color: 'from-green-400 to-teal-500' },
  { value: 'grateful', label: '🙏 Grateful', color: 'from-pink-400 to-rose-500' },
  { value: 'confident', label: '💪 Confident', color: 'from-indigo-400 to-purple-500' },
  { value: 'reflective', label: '🤔 Reflective', color: 'from-gray-400 to-slate-500' },
  { value: 'hopeful', label: '🌅 Hopeful', color: 'from-orange-400 to-red-500' },
  { value: 'wisdom', label: '🦉 Wisdom', color: 'from-amber-400 to-yellow-500' },
  { value: 'love', label: '❤️ Love', color: 'from-red-400 to-pink-500' },
  { value: 'success', label: '🏆 Success', color: 'from-green-500 to-emerald-500' },
  { value: 'adventure', label: '🌍 Adventure', color: 'from-teal-400 to-blue-500' }
]

export default function MoodSelector({
  selectedMood,
  onMoodChange,
  moods = defaultMoods,
  title = 'Mood & Category',
  gridCols = 'grid-cols-4',
  size = 'md'
}: MoodSelectorProps) {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'p-2',
          circle: 'w-6 h-6',
          text: 'text-xs'
        }
      case 'lg':
        return {
          container: 'p-4',
          circle: 'w-10 h-10',
          text: 'text-sm'
        }
      default:
        return {
          container: 'p-3',
          circle: 'w-8 h-8',
          text: 'text-xs'
        }
    }
  }

  const sizeClasses = getSizeClasses()

  return (
    <div>
      <label className="block text-sm font-medium text-[#2D3142]/90 mb-3">
        {title}
      </label>
      <div className={`grid ${gridCols} gap-3`}>
        {moods.map((mood) => (
          <label
            key={mood.value}
            className={`relative cursor-pointer rounded-lg border-2 transition-all duration-200 hover:scale-105 ${sizeClasses.container} ${
              selectedMood === mood.value
                ? 'border-[#2D3142] bg-[#2D3142]/10 shadow-lg'
                : 'border-[#2D3142]/20 bg-white/10 hover:border-[#2D3142]/40'
            }`}
          >
            <input
              type="radio"
              name="mood"
              value={mood.value}
              checked={selectedMood === mood.value}
              onChange={(e) => onMoodChange(e.target.value)}
              className="sr-only"
            />
            <div className="text-center">
              <div
                className={`${sizeClasses.circle} rounded-full bg-gradient-to-r ${mood.color} mx-auto mb-1 shadow-md`}
              ></div>
              <span className={`text-[#2D3142]/90 ${sizeClasses.text} font-medium block leading-tight`}>
                {typeof mood.label === 'string' ? mood.label : JSON.stringify(mood.label)}
              </span>
            </div>

            {selectedMood === mood.value && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#2D3142] rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </label>
        ))}
      </div>
    </div>
  )
}
