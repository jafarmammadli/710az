import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default async function ProductsPage() {
  const { data: products } = await supabase
    .from('products')
    .select('*, categories(name, slug)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-white mb-2">All Products</h1>
          <p className="text-gray-500">
            {products?.length ?? 0} products available
          </p>
        </div>

        {/* EMPTY STATE */}
        {(!products || products.length === 0) && (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔧</div>
            <h2 className="text-white text-2xl font-bold mb-2">No products yet</h2>
            <p className="text-gray-500">Products will appear here once added.</p>
          </div>
        )}

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-orange-500 transition-colors group"
            >
              {/* IMAGE */}
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

              {/* INFO */}
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

      </div>
    </main>
  )
}