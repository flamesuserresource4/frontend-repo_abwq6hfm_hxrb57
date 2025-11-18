import { motion } from 'framer-motion'

export default function Hero({ onDonate }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#F59E0B] via-[#FDE68A] to-[#ECFCCB]" />
      <div className="relative max-w-6xl mx-auto px-4 py-16 sm:py-24">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl font-extrabold text-slate-900 text-center"
        >
          Shree Panjarapol Go-Rakshan Sanstha – Panvel
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-4 text-slate-700 text-center max-w-3xl mx-auto"
        >
          Since 1908, serving and protecting cows with compassion. Your support keeps our Gau Seva alive.
        </motion.p>
        <div className="mt-8 flex justify-center gap-4">
          <button onClick={onDonate} className="px-6 py-3 rounded-full bg-[#B45309] text-white font-semibold shadow hover:bg-[#92400E]">
            Donate Now
          </button>
          <a href="#visit" className="px-6 py-3 rounded-full bg-white text-slate-900 font-semibold shadow border border-slate-200 hover:bg-slate-50">
            Visit the Go-shala
          </a>
        </div>
      </div>
    </section>
  )
}
