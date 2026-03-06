import { getAdminSession } from '@/lib/admin-auth'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default async function AdminCategories() {
  const session = await getAdminSession()
  if (!session) redirect('/admin/login')

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-12">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/admin" className="text-gray-500 hover:text-white text-sm transition-colors">
              ← Dashboard
            </Link>
            <h1 className="text-3xl font-black text-white mt-1">Categories</h1>
          </div>
          <Link
            href="/admin/categories/new"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl transition-colors"
          >
            + Add Category
          </Link>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Name</th>
                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Slug</th>
                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Description</th>
                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((cat) => (
                <tr key={cat.id} className="border-b border-gray-800 last:border-0">
                  <td className="px-6 py-4 text-white font-medium">{cat.name}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm font-mono">{cat.slug}</td>
                  <td className="px-6 py-4 text-gray-400 text-sm">{cat.description ?? '—'}</td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/categories/${cat.id}/edit`}
                      className="text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </main>
  )
}