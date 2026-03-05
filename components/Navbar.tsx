'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        
        {/* LOGO */}
        <Link href="/" className="text-2xl font-black text-white tracking-tight">
          710<span className="text-orange-500">.</span>az
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/products" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
            Products
          </Link>
          <Link href="/products?category=engine-oils" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
            Engine Oils
          </Link>
          <Link href="/products?category=filters" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
            Filters
          </Link>
          <Link href="/products?category=fluids" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">
            Fluids
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/cart" className="text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </Link>
          <Link href="/account" className="text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-400 hover:text-white"
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-gray-950 border-t border-gray-800 px-4 py-4 flex flex-col gap-4">
          <Link href="/products" onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white text-sm font-medium">Products</Link>
          <Link href="/products?category=engine-oils" onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white text-sm font-medium">Engine Oils</Link>
          <Link href="/products?category=filters" onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white text-sm font-medium">Filters</Link>
          <Link href="/products?category=fluids" onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white text-sm font-medium">Fluids</Link>
          <Link href="/cart" onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white text-sm font-medium">Cart</Link>
          <Link href="/account" onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white text-sm font-medium">Account</Link>
        </div>
      )}
    </nav>
  )
}