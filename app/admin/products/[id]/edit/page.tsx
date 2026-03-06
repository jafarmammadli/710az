import { getAdminSession } from '@/lib/admin-auth'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import AdminProductForm from '../../ProductForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditProduct({ params }: Props) {
  const session = await getAdminSession()
  if (!session) redirect('/admin/login')

  const { id } = await params

  const [{ data: product }, { data: categories }] = await Promise.all([
    supabase.from('products').select('*').eq('id', id).single(),
    supabase.from('categories').select('*').order('name'),
  ])

  if (!product) redirect('/admin/products')

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <a href="/admin/products" className="text-gray-500 hover:text-white text-sm transition-colors">
            ← Back to Products
          </a>
          <h1 className="text-3xl font-black text-white mt-1">Edit Product</h1>
        </div>
        <AdminProductForm categories={categories ?? []} product={product} />
      </div>
    </main>
  )
}