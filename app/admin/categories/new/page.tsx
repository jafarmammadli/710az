import { getAdminSession } from '@/lib/admin-auth'
import { redirect } from 'next/navigation'
import CategoryForm from '../CategoryForm'

export default async function NewCategory() {
  const session = await getAdminSession()
  if (!session) redirect('/admin/login')

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <a href="/admin/categories" className="text-gray-500 hover:text-white text-sm transition-colors">
            ← Back to Categories
          </a>
          <h1 className="text-3xl font-black text-white mt-1">Add Category</h1>
        </div>
        <CategoryForm />
      </div>
    </main>
  )
}