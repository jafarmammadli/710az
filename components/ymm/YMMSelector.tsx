'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Make, Model, Year } from '@/types'
import { useRouter } from 'next/navigation'

export default function YMMSelector() {
  const router = useRouter()

  const [makes, setMakes] = useState<Make[]>([])
  const [models, setModels] = useState<Model[]>([])
  const [years, setYears] = useState<Year[]>([])

  const [selectedMake, setSelectedMake] = useState<string>('')
  const [selectedModel, setSelectedModel] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string>('')

  const [loading, setLoading] = useState(false)

  // Load makes on mount
  useEffect(() => {
    supabase
      .from('makes')
      .select('*')
      .order('name')
      .then(({ data }) => setMakes(data || []))
  }, [])

  // Load models when make is selected
  useEffect(() => {
    if (!selectedMake) return
    setSelectedModel('')
    setSelectedYear('')
    setModels([])
    setYears([])

    supabase
      .from('models')
      .select('*')
      .eq('make_id', selectedMake)
      .order('name')
      .then(({ data }) => setModels(data || []))
  }, [selectedMake])

  // Load years when model is selected
  useEffect(() => {
    if (!selectedModel) return
    setSelectedYear('')
    setYears([])

    supabase
      .from('years')
      .select('*')
      .order('year', { ascending: false })
      .then(({ data }) => setYears(data || []))
  }, [selectedModel])

  const handleSearch = () => {
    if (!selectedMake || !selectedModel || !selectedYear) return
    setLoading(true)
    router.push(`/products?make=${selectedMake}&model=${selectedModel}&year=${selectedYear}`)
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-3xl mx-auto">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Find parts for your car
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
        {/* MAKE */}
        <select
          value={selectedMake}
          onChange={(e) => setSelectedMake(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-3 text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <option value="">Select Make</option>
          {makes.map((make) => (
            <option key={make.id} value={make.id}>
              {make.name}
            </option>
          ))}
        </select>

        {/* MODEL */}
        <select
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          disabled={!selectedMake}
          className="border border-gray-200 rounded-xl px-4 py-3 text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-40"
        >
          <option value="">Select Model</option>
          {models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>

        {/* YEAR */}
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          disabled={!selectedModel}
          className="border border-gray-200 rounded-xl px-4 py-3 text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-40"
        >
          <option value="">Select Year</option>
          {years.map((y) => (
            <option key={y.id} value={y.id}>
              {y.year}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSearch}
        disabled={!selectedMake || !selectedModel || !selectedYear || loading}
        className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-bold py-3 rounded-xl transition-colors"
      >
        {loading ? 'Searching...' : 'Find Compatible Products →'}
      </button>
    </div>
  )
}