import { getAdminSession } from '@/lib/admin-auth'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default async function AdminProducts() {
  const session = await getAdminSession()
  if (!session) redirect('/admin/login')

  const { data: products } = await supabase
    .from('products')
    .select('*, categories(name)')
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-12">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/admin" className="text-gray-500 hover:text-white text-sm transition-colors">
              ← Dashboard
            </Link>
            <h1 className="text-3xl font-black text-white mt-1">Products</h1>
          </div>
          <Link
            href="/admin/products/new"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl transition-colors"
          >
            + Add Product
          </Link>
        </div>

        {/* TABLE */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Product</th>
                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Category</th>
                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Price</th>
                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Stock</th>
                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Status</th>
                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product, i) => (
                <tr
                  key={product.id}
                  className={`border-b border-gray-800 last:border-0 ${i % 2 === 0 ? '' : 'bg-gray-900/50'}`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} className="w-full h-full object-cover rounded-lg" />
                        ) : '🛢️'}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{product.name}</p>
                        <p className="text-gray-500 text-xs">{product.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{product.categories?.name ?? '—'}</td>
                  <td className="px-6 py-4 text-white font-bold text-sm">₼{product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      product.is_active
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-red-500/10 text-red-400'
                    }`}>
                      {product.is_active ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors"
                      >
                        Edit
                      </Link>
                      <Link
                        href={`/products/${product.slug}`}
                        target="_blank"
                        className="text-gray-500 hover:text-white text-sm transition-colors"
                      >
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {(!products || products.length === 0) && (
            <div className="text-center py-16">
              <p className="text-gray-500">No products yet.</p>
              <Link href="/admin/products/new" className="text-orange-500 hover:text-orange-400 text-sm mt-2 inline-block">
                Add your first product →
              </Link>
            </div>
          )}
        </div>

      </div>
    </main>
  )
}
