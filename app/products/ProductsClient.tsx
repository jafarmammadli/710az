'use client'

import { useState } from 'react'
import Link from 'next/link'

type Product = {
  id: number
  name: string
  slug: string
  brand: string | null
  price: number
  stock: number
  images: string[]
  categories: { name: string; slug: string } | null
}

type Category = {
  id: number
  name: string
  slug: string
}

interface Props {
  products: Product[]
  categories: Category[]
  initialCategory?: string
}

export default function ProductsClient({ products = [], categories = [], initialCategory }: Props) {
  const [activeCategory, setActiveCategory] = useState(initialCategory ?? '')

  const filtered = activeCategory
    ? products.filter((p) => p.categories?.slug === activeCategory)
    : products

  return (
    <>
      {/* CATEGORY FILTER BAR */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveCategory('')}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
            !activeCategory
              ? 'bg-orange-500 text-white'
              : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.slug)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeCategory === cat.slug
                ? 'bg-orange-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* COUNT */}
      <p className="text-gray-500 mb-6">{filtered.length} products available</p>

      {/* EMPTY STATE */}
      {filtered.length === 0 && (
        <div className="text-center py-24">
          <div className="text-6xl mb-4">🔧</div>
          <h2 className="text-white text-2xl font-bold mb-2">No products found</h2>
          <p className="text-gray-500">Try a different category.</p>
        </div>
      )}

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-orange-500 transition-colors group"
          >
            <div className="bg-gray-800 h-48 flex items-center justify-center">
              {product.images?.[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-5xl">🛢️</span>
              )}
            </div>
            <div className="p-4">
              <span className="text-orange-500 text-xs font-semibold uppercase tracking-wider">
                {product.categories?.name ?? 'Uncategorized'}
              </span>
              <h3 className="text-white font-bold mt-1 mb-1 group-hover:text-orange-400 transition-colors">
                {product.name}
              </h3>
              {product.brand && (
                <p className="text-gray-500 text-sm mb-3">{product.brand}</p>
              )}
              <div className="flex items-center justify-between">
                <span className="text-white font-black text-lg">
                  ₼{product.price.toFixed(2)}
                </span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  product.stock > 0
                    ? 'bg-green-500/10 text-green-400'
                    : 'bg-red-500/10 text-red-400'
                }`}>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}