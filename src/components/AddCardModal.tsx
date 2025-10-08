'use client'

import React, { CSSProperties, useState } from 'react'
import Select from 'react-select';
import { dropdownStyle } from '@/utils/selectStyle';
import { FlashCard } from '@/data/cards'

import {
  LanguageOption,
  languageOptions,
} from '../data/languages';

interface AddCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCardAdded: (card: FlashCard) => void;
}

export default function AddCardModal({ isOpen, onClose, onCardAdded }: AddCardModalProps) {
  const [front, setFront] = useState('')
  const [back, setBack] = useState('')
  const [frontLang, setFrontLang] = useState('English')
  const [backLang, setBackLang] = useState('Vietnamese')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!front.trim() || !back.trim()) {
      setError('Please fill in both front and back text')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          front: front.trim(),
          back: back.trim(),
          frontLang,
          backLang,
          category: category.trim() || null
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create card')
      }

      const newCard = await response.json()
      onCardAdded(newCard)
      
      // Reset form
      setFront('')
      setBack('')
      setCategory('')
      onClose()
    } catch (err) {
      console.error('Error creating card:', err)
      setError('Failed to create card. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Add New Card</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Front Text */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Front Text
            </label>
            <input
              type="text"
              value={front}
              onChange={(e) => setFront(e.target.value)}
              placeholder="e.g., Hello"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              disabled={loading}
            />
          </div>

          {/* Front Language */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Front Language
            </label>
            <Select<LanguageOption>
              defaultValue={languageOptions[0]}
              options={languageOptions}
              className="react-select-container mt-3"
              classNamePrefix="react-select"
              isDisabled={loading}
              styles={dropdownStyle}
              onChange={(option) => setFrontLang(option?.value || 'English')}
            />
          </div>

          {/* Back Text */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Back Text
            </label>
            <input
              type="text"
              value={back}
              onChange={(e) => setBack(e.target.value)}
              placeholder="e.g., Xin chào"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500/20"
              disabled={loading}
            />
          </div>

          {/* Back Language */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Back Language
            </label>
            <Select<LanguageOption>
              defaultValue={languageOptions[3]}
              options={languageOptions}
              className="react-select-container mt-3"
              classNamePrefix="react-select"
              isDisabled={loading}
              styles={dropdownStyle}
              onChange={(option) => setBackLang(option?.value || 'Vietnamese')}
            />
          </div>

          {/* Category (Optional) */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Category <span className="text-gray-500">(optional)</span>
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., greetings, food"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              disabled={loading}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Card'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}