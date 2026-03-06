import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params

  const { data: product } = await supabase
    .from('products')
    .select('*, categories(name, slug)')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (!product) notFound()

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-12">
      <div className="max-w-6xl mx-auto">

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-white transition-colors">Products</Link>
          <span>/</span>
          {product.categories && (
            <>
              <Link
                href={`/products?category=${product.categories.slug}`}
                className="hover:text-white transition-colors"
              >
                {product.categories.name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-gray-300">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* LEFT — IMAGE */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl h-96 lg:h-auto flex items-center justify-center">
            {product.images?.[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover rounded-2xl"
              />
            ) : (
              <span className="text-9xl">🛢️</span>
            )}
          </div>

          {/* RIGHT — INFO */}
          <div className="flex flex-col">

            {/* CATEGORY + BRAND */}
            <div className="flex items-center gap-3 mb-3">
              {product.categories && (
                <span className="text-orange-500 text-xs font-semibold uppercase tracking-wider">
                  {product.categories.name}
                </span>
              )}
              {product.brand && (
                <span className="text-gray-600 text-xs">•</span>
              )}
              {product.brand && (
                <span className="text-gray-400 text-xs font-medium">{product.brand}</span>
              )}
            </div>

            {/* NAME */}
            <h1 className="text-3xl font-black text-white mb-4">{product.name}</h1>

            {/* PRICE + STOCK */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-black text-white">
                ₼{product.price.toFixed(2)}
              </span>
              <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                product.stock > 0
                  ? 'bg-green-500/10 text-green-400'
                  : 'bg-red-500/10 text-red-400'
              }`}>
                {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
              </span>
            </div>

            {/* DESCRIPTION */}
            {product.description && (
              <p className="text-gray-400 leading-relaxed mb-8">{product.description}</p>
            )}

            {/* SPECS */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-8 space-y-3">
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Specifications</h3>
              {product.viscosity && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Viscosity</span>
                  <span className="text-white font-medium">{product.viscosity}</span>
                </div>
              )}
              {product.volume_liters && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Volume</span>
                  <span className="text-white font-medium">{product.volume_liters}L</span>
                </div>
              )}
              {product.brand && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Brand</span>
                  <span className="text-white font-medium">{product.brand}</span>
                </div>
              )}
              {product.oem_approvals?.length > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Approvals</span>
                  <span className="text-white font-medium text-right max-w-48">
                    {product.oem_approvals.join(', ')}
                  </span>
                </div>
              )}
            </div>

            {/* ADD TO CART */}
            <button
              disabled={product.stock === 0}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-lg py-4 rounded-xl transition-colors mb-3"
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>

            <Link
              href="/products"
              className="text-center text-gray-500 hover:text-white text-sm transition-colors"
            >
              ← Back to Products
            </Link>

          </div>
        </div>
      </div>
    </main>
  )
}