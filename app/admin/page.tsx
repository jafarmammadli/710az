import { getAdminSession } from '@/lib/admin-auth'
import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default async function AdminDashboard() {
  const session = await getAdminSession()
  if (!session) redirect('/admin/login')

  // Fetch stats
  const [
    { count: productCount },
    { count: orderCount },
    { count: subscriberCount },
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('subscribers').select('*', { count: 'exact', head: true }),
  ])

  const stats = [
    { label: 'Products', value: productCount ?? 0, href: '/admin/products', emoji: '📦' },
    { label: 'Orders', value: orderCount ?? 0, href: '/admin/orders', emoji: '🛒' },
    { label: 'Subscribers', value: subscriberCount ?? 0, href: '/admin/subscribers', emoji: '📧' },
  ]

  const navItems = [
    { label: 'Products', href: '/admin/products', emoji: '📦', desc: 'Add, edit, delete products' },
    { label: 'Categories', href: '/admin/categories', emoji: '🗂️', desc: 'Manage product categories' },
    { label: 'Banners', href: '/admin/banners', emoji: '🖼️', desc: 'Homepage promotional banners' },
    { label: 'Subscribers', href: '/admin/subscribers', emoji: '📧', desc: 'Email newsletter list' },
    { label: 'Orders', href: '/admin/orders', emoji: '🛒', desc: 'View and update orders' },
    { label: 'Admins', href: '/admin/admins', emoji: '👤', desc: 'Manage admin accounts' },
  ]

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-12">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-black text-white">
              710<span className="text-orange-500">.</span>az Admin
            </h1>
            <p className="text-gray-500 text-sm mt-1">Welcome back, {session.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              View Site →
            </Link>
            <Link
              href="/api/admin/logout"
              className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm px-4 py-2 rounded-xl transition-colors"
            >
              Logout
            </Link>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-orange-500 transition-colors"
            >
              <div className="text-3xl mb-2">{stat.emoji}</div>
              <div className="text-3xl font-black text-white">{stat.value}</div>
              <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
            </Link>
          ))}
        </div>

        {/* NAV GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-orange-500 transition-colors group"
            >
              <div className="text-3xl mb-3">{item.emoji}</div>
              <h3 className="text-white font-bold group-hover:text-orange-400 transition-colors">
                {item.label}
              </h3>
              <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
            </Link>
          ))}
        </div>

      </div>
    </main>
  )
}
