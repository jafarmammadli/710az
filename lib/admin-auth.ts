import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const SECRET = process.env.ADMIN_JWT_SECRET || 'dev-secret-change-in-production'

export function signAdminToken(adminId: number, email: string) {
  return jwt.sign({ adminId, email }, SECRET, { expiresIn: '7d' })
}

export function verifyAdminToken(token: string) {
  try {
    return jwt.verify(token, SECRET) as { adminId: number; email: string }
  } catch {
    return null
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  if (!token) return null
  return verifyAdminToken(token)
}