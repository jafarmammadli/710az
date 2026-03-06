'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Subscriber = {
  id: number
  email: string
  created_at: string
}

export default function SubscribersClient({ subscribers }: { subscribers: Subscriber[] }) {
  const router = useRouter()
  const [newEmail, setNewEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleAdd = async () => {
    if (!newEmail) return
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/subscribers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: newEmail }),
    })

    const data = await res.json()
    if (!res.ok) {
      setError(data.error || 'Failed to add subscriber')
      setLoading(false)
      return
    }

    setNewEmail('')
    setLoading(false)
    router.refresh()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Remove this subscriber?')) return

    await fetch(`/api/admin/subscribers/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  const handleExport = () => {
    const csv = ['Email,Date Added', ...subscribers.map((s) =>
      `${s.email},${new Date(s.created_at).toLocaleDateString()}`
    )].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = '710az-subscribers.csv'
    a.click()
  }

  return (
    <div className="space-y-6">

      {/* ADD + EXPORT */}
      <div className="flex gap-3">
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Add email manually..."
          className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          onClick={handleAdd}
          disabled={loading || !newEmail}
          className="bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-bold px-5 py-3 rounded-xl transition-colors"
        >
          Add
        </button>
        <button
          onClick={handleExport}
          disabled={subscribers.length === 0}
          className="bg-gray-800 hover:bg-gray-700 disabled:opacity-40 text-gray-300 font-medium px-5 py-3 rounded-xl transition-colors"
        >
          Export CSV
        </button>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* LIST */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        {subscribers.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">No subscribers yet.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Email</th>
                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Date Added</th>
                <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub) => (
                <tr key={sub.id} className="border-b border-gray-800 last:border-0">
                  <td className="px-6 py-4 text-white">{sub.email}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {new Date(sub.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(sub.id)}
                      className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}