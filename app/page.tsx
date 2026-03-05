import YMMSelector from '@/components/ymm/YMMSelector'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950">
      {/* HERO */}
      <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="text-6xl font-black text-white mb-2 tracking-tight">
          710<span className="text-orange-500">.</span>az
        </h1>
        <p className="text-gray-400 text-lg mb-10">
          The right parts. For your exact car.
        </p>
        <YMMSelector />
      </section>
    </main>
  )
}