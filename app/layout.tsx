import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '710.az — Automotive Parts for Your Car',
  description: 'Find the right engine oils, filters, and parts for your exact vehicle in Azerbaijan.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="az">
      <body className={`${geist.className} bg-gray-950`}>
        <Navbar />
        <div className="pt-16">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}