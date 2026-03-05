import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 px-4 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* BRAND */}
        <div>
          <div className="text-2xl font-black text-white mb-3">
            710<span className="text-orange-500">.</span>az
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            Azerbaijan's first digital-native automotive parts store. The right parts, for your exact car.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Shop</h4>
          <div className="flex flex-col gap-2">
            <Link href="/products?category=engine-oils" className="text-gray-500 hover:text-white text-sm transition-colors">Engine Oils</Link>
            <Link href="/products?category=oil-filters" className="text-gray-500 hover:text-white text-sm transition-colors">Oil Filters</Link>
            <Link href="/products?category=coolants" className="text-gray-500 hover:text-white text-sm transition-colors">Coolants</Link>
            <Link href="/products?category=brake-fluids" className="text-gray-500 hover:text-white text-sm transition-colors">Brake Fluids</Link>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
          <div className="flex flex-col gap-2">
            <a href="https://wa.me/994XXXXXXXXX" className="text-gray-500 hover:text-white text-sm transition-colors">WhatsApp</a>
            <a href="mailto:info@710.az" className="text-gray-500 hover:text-white text-sm transition-colors">info@710.az</a>
            <span className="text-gray-500 text-sm">Baku, Azerbaijan</span>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-gray-800 text-center">
        <p className="text-gray-600 text-xs">© 2026 710.az — All rights reserved</p>
      </div>
    </footer>
  )
}