'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Category = {
  id?: number
  name?: string
  slug?: string
  description?: string
}

interface Props {
  category?: Category
}

export default function CategoryForm({ category }: Props) {
  const router = useRouter()
  const isEdit = !!category?.id

  const [form, setForm] = useState({
    name: category?.name ?? '',
    slug: category?.slug ?? '',
    description: category?.description ?? '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const handleNameChange = (name: string) => {
    setForm((f) => ({
      ...f,
      name,
      slug: isEdit ? f.slug : generateSlug(name),
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    const url = isEdit ? `/api/admin/categories/${category!.id}` : '/api/admin/categories'
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'Something went wrong')
      setLoading(false)
      return
    }

    router.push('/admin/categories')
    router.refresh()
  }

  const handleDelete = async () => {
    if (!confirm('Delete this category? Products in this category will be uncategorized.')) return
    setLoading(true)

    const res = await fetch(`/api/admin/categories/${category!.id}`, { method: 'DELETE' })
    if (res.ok) {
      router.push('/admin/categories')
      router.refresh()
    }
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">

      <div>
        <label className="text-gray-400 text-sm font-medium block mb-2">Category Name *</label>
        <input
          value={form.name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="e.g. Engine Oils"
          className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="text-gray-400 text-sm font-medium block mb-2">Slug *</label>
        <input
          value={form.slug}
          onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
          placeholder="engine-oils"
          className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      <div>
        <label className="text-gray-400 text-sm font-medium block mb-2">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          placeholder="Short description of this category..."
          rows={3}
          className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
        />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={handleSubmit}
          disabled={loading || !form.name || !form.slug}
          className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-bold py-3 rounded-xl transition-colors"
        >
          {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Category'}
        </button>

        {isEdit && (
          <button
            onClick={handleDelete}
            disabled={loading}
            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold py-3 px-5 rounded-xl transition-colors"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  )
}