'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Category = { id: number; name: string; slug: string }
type Product = {
  id?: number
  name?: string
  slug?: string
  description?: string
  brand?: string
  category_id?: number
  price?: number
  stock?: number
  viscosity?: string
  volume_liters?: number
  oem_approvals?: string[]
  is_featured?: boolean
  is_active?: boolean
}

interface Props {
  categories: Category[]
  product?: Product
}

export default function AdminProductForm({ categories, product }: Props) {
  const router = useRouter()
  const isEdit = !!product?.id

  const [form, setForm] = useState({
    name: product?.name ?? '',
    slug: product?.slug ?? '',
    description: product?.description ?? '',
    brand: product?.brand ?? '',
    category_id: product?.category_id ?? '',
    price: product?.price ?? '',
    stock: product?.stock ?? 0,
    viscosity: product?.viscosity ?? '',
    volume_liters: product?.volume_liters ?? '',
    oem_approvals: product?.oem_approvals?.join(', ') ?? '',
    is_featured: product?.is_featured ?? false,
    is_active: product?.is_active ?? true,
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

    const payload = {
      ...form,
      price: Number(form.price) || 0,
      stock: Number(form.stock) || 0,
      category_id: form.category_id ? Number(form.category_id) : null,
      volume_liters: form.volume_liters ? Number(form.volume_liters) : null,
      oem_approvals: form.oem_approvals
        ? form.oem_approvals.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
    }

    const url = isEdit ? `/api/admin/products/${product!.id}` : '/api/admin/products'
    const method = isEdit ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'Something went wrong')
      setLoading(false)
      return
    }

    router.push('/admin/products')
    router.refresh()
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this product?')) return
    setLoading(true)

    const res = await fetch(`/api/admin/products/${product!.id}`, { method: 'DELETE' })
    if (res.ok) {
      router.push('/admin/products')
      router.refresh()
    }
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">

      {/* NAME */}
      <div>
        <label className="text-gray-400 text-sm font-medium block mb-2">Product Name *</label>
        <input
          value={form.name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="e.g. Mobil 1 Extended Performance 5W-30"
          className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* SLUG */}
      <div>
        <label className="text-gray-400 text-sm font-medium block mb-2">Slug *</label>
        <input
          value={form.slug}
          onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
          placeholder="auto-generated-from-name"
          className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* BRAND + CATEGORY */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-gray-400 text-sm font-medium block mb-2">Brand</label>
          <input
            value={form.brand}
            onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
            placeholder="e.g. Mobil 1"
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="text-gray-400 text-sm font-medium block mb-2">Category *</label>
          <select
            value={form.category_id}
            onChange={(e) => setForm((f) => ({ ...f, category_id: e.target.value }))}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* PRICE + STOCK */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-gray-400 text-sm font-medium block mb-2">Price (₼) *</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            placeholder="0.00"
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="text-gray-400 text-sm font-medium block mb-2">Stock</label>
          <input
            type="number"
            value={form.stock}
            onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value as any }))}
            placeholder="0"
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="text-gray-400 text-sm font-medium block mb-2">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          placeholder="Describe the product..."
          rows={4}
          className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
        />
      </div>

      {/* VISCOSITY + VOLUME */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-gray-400 text-sm font-medium block mb-2">Viscosity</label>
          <input
            value={form.viscosity}
            onChange={(e) => setForm((f) => ({ ...f, viscosity: e.target.value }))}
            placeholder="e.g. 5W-30"
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="text-gray-400 text-sm font-medium block mb-2">Volume (Liters)</label>
          <input
            type="number"
            value={form.volume_liters}
            onChange={(e) => setForm((f) => ({ ...f, volume_liters: e.target.value as any }))}
            placeholder="e.g. 4.0"
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* OEM APPROVALS */}
      <div>
        <label className="text-gray-400 text-sm font-medium block mb-2">
          OEM Approvals <span className="text-gray-600">(comma separated)</span>
        </label>
        <input
          value={form.oem_approvals}
          onChange={(e) => setForm((f) => ({ ...f, oem_approvals: e.target.value }))}
          placeholder="e.g. API SN, BMW LL-04, VW 502.00"
          className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* TOGGLES */}
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <div
            onClick={() => setForm((f) => ({ ...f, is_active: !f.is_active }))}
            className={`w-11 h-6 rounded-full transition-colors ${form.is_active ? 'bg-orange-500' : 'bg-gray-700'}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform ${form.is_active ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </div>
          <span className="text-gray-400 text-sm">Active (visible on site)</span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <div
            onClick={() => setForm((f) => ({ ...f, is_featured: !f.is_featured }))}
            className={`w-11 h-6 rounded-full transition-colors ${form.is_featured ? 'bg-orange-500' : 'bg-gray-700'}`}
          >
            <div className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform ${form.is_featured ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </div>
          <span className="text-gray-400 text-sm">Featured</span>
        </label>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* BUTTONS */}
      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={handleSubmit}
          disabled={loading || !form.name || !form.price || !form.category_id}
          className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-bold py-3 rounded-xl transition-colors"
        >
          {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Product'}
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
