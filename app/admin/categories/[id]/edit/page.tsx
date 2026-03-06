import { getAdminSession } from '@/lib/admin-auth'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import CategoryForm from '../../CategoryForm'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditCategory({ params }: Props) {
  const session = await getAdminSession()
  if (!session) redirect('/admin/login')

  const { id } = await params
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single()

  if (!category) redirect('/admin/categories')

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <a href="/admin/categories" className="text-gray-500 hover:text-white text-sm transition-colors">
            ← Back to Categories
          </a>
          <h1 className="text-3xl font-black text-white mt-1">Edit Category</h1>
        </div>
        <CategoryForm category={category} />
      </div>
    </main>
  )
}