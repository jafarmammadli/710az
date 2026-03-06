import { getAdminSession } from '@/lib/admin-auth'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import SubscribersClient from './SubscribersClient'

export default async function AdminSubscribers() {
  const session = await getAdminSession()
  if (!session) redirect('/admin/login')

  const { data: subscribers } = await supabase
    .from('subscribers')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <a href="/admin" className="text-gray-500 hover:text-white text-sm transition-colors">
              ← Dashboard
            </a>
            <h1 className="text-3xl font-black text-white mt-1">Subscribers</h1>
            <p className="text-gray-500 text-sm mt-1">{subscribers?.length ?? 0} total subscribers</p>
          </div>
        </div>
        <SubscribersClient subscribers={subscribers ?? []} />
      </div>
    </main>
  )
}