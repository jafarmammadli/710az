import { supabase } from '@/lib/supabase'
import ProductsClient from './ProductsClient'

interface Props {
  searchParams: Promise<{ category?: string }>
}

export default async function ProductsPage({ searchParams }: Props) {
  const { category } = await searchParams

  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase
      .from('products')
      .select('*, categories(name, slug)')
      .eq('is_active', true)
      .order('created_at', { ascending: false }),
    supabase
      .from('categories')
      .select('*')
      .order('name'),
  ])

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2">Products</h1>
        </div>
        <ProductsClient
          products={products ?? []}
          categories={categories ?? []}
          initialCategory={category}
        />
      </div>
    </main>
  )
}