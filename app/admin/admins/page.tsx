import { getAdminSession } from '@/lib/admin-auth'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import AdminsClient from './AdminsClient'

export default async function AdminsManager() {
  const session = await getAdminSession()
  if (!session) redirect('/admin/login')

  const { data: admins } = await supabase
    .from('admins')
    .select('id, email, name, created_at')
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <a href="/admin" className="text-gray-500 hover:text-white text-sm transition-colors">
            ← Dashboard
          </a>
          <h1 className="text-3xl font-black text-white mt-1">Admin Accounts</h1>
          <p className="text-gray-500 text-sm mt-1">{admins?.length ?? 0} admins</p>
        </div>
        <AdminsClient admins={admins ?? []} currentEmail={session.email} />
      </div>
    </main>
  )
}