'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Admin = {
  id: number
  email: string
  name: string | null
  created_at: string
}

export default function AdminsClient({
  admins,
  currentEmail,
}: {
  admins: Admin[]
  currentEmail: string
}) {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [changingPassword, setChangingPassword] = useState<number | null>(null)
  const [newPassword, setNewPassword] = useState('')

  const handleAdd = async () => {
    setLoading(true)
    setError('')
    setSuccess('')

    const res = await fetch('/api/admin/admins', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await res.json()
    if (!res.ok) {
      setError(data.error || 'Failed to add admin')
      setLoading(false)
      return
    }

    setForm({ name: '', email: '', password: '' })
    setSuccess('Admin added successfully')
    setLoading(false)
    router.refresh()
  }

  const handleDelete = async (id: number, email: string) => {
    if (email === currentEmail) {
      alert("You can't delete your own account.")
      return
    }
    if (!confirm(`Remove admin ${email}?`)) return

    await fetch(`/api/admin/admins/${id}`, { method: 'DELETE' })
    router.refresh()
  }

  const handleChangePassword = async (id: number) => {
    if (!newPassword) return
    setLoading(true)

    const res = await fetch(`/api/admin/admins/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: newPassword }),
    })

    if (res.ok) {
      setChangingPassword(null)
      setNewPassword('')
      setSuccess('Password updated')
    }
    setLoading(false)
  }

  return (
    <div className="space-y-8">

      {/* ADD NEW ADMIN */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-white font-bold mb-4">Add New Admin</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Name"
            className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder="Email"
            className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            placeholder="Password"
            className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
        {success && <p className="text-green-400 text-sm mb-3">{success}</p>}
        <button
          onClick={handleAdd}
          disabled={loading || !form.email || !form.password}
          className="bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-bold px-6 py-3 rounded-xl transition-colors"
        >
          {loading ? 'Adding...' : 'Add Admin'}
        </button>
      </div>

      {/* ADMINS LIST */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Name</th>
              <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Email</th>
              <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Added</th>
              <th className="text-left text-gray-500 text-xs uppercase tracking-wider px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id} className="border-b border-gray-800 last:border-0">
                <td className="px-6 py-4 text-white font-medium">
                  {admin.name ?? '—'}
                  {admin.email === currentEmail && (
                    <span className="ml-2 text-xs bg-orange-500/10 text-orange-400 px-2 py-0.5 rounded-full">You</span>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-400 text-sm">{admin.email}</td>
                <td className="px-6 py-4 text-gray-500 text-sm">
                  {new Date(admin.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  {changingPassword === admin.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New password"
                        className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-32"
                      />
                      <button
                        onClick={() => handleChangePassword(admin.id)}
                        className="text-green-400 hover:text-green-300 text-sm font-medium"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => { setChangingPassword(null); setNewPassword('') }}
                        className="text-gray-500 hover:text-white text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setChangingPassword(admin.id)}
                        className="text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors"
                      >
                        Change Password
                      </button>
                      {admin.email !== currentEmail && (
                        <button
                          onClick={() => handleDelete(admin.id, admin.email)}
                          className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}