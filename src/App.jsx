import { useState } from 'react'
import Hero from './components/Hero'
import DonationForm from './components/DonationForm'
import BadgeGenerator from './components/BadgeGenerator'
import Visit from './components/Visit'
import AboutImpact from './components/AboutImpact'

function App() {
  const [postDonation, setPostDonation] = useState(null)

  return (
    <div className="min-h-screen bg-[#FFF7ED]">
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="font-extrabold text-[#B45309]">Panvel Go-Shala</div>
          <nav className="hidden sm:flex gap-6 text-slate-700">
            <a href="#donate" className="hover:text-[#B45309]">Donate</a>
            <a href="#visit" className="hover:text-[#B45309]">Visit</a>
            <a href="#about" className="hover:text-[#B45309]">About</a>
          </nav>
          <a href="#donate" className="px-4 py-2 rounded-full bg-[#B45309] text-white font-semibold">Donate Now</a>
        </div>
      </header>

      <Hero onDonate={() => document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth' })} />

      <main className="max-w-6xl mx-auto px-4 -mt-12 relative z-10">
        <section id="donate" className="grid md:grid-cols-2 gap-6">
          <DonationForm onSuccess={(d)=>setPostDonation(d)} />
          {postDonation ? (
            <BadgeGenerator orderId={postDonation.orderId} amount={postDonation.amount} showAmount={postDonation.showAmount} />
          ) : (
            <div className="bg-white rounded-2xl p-6 border shadow flex items-center justify-center text-center">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Post-Donation Badge</h3>
                <p className="text-slate-600">After your donation, generate a shareable AI badge here.</p>
                <p className="text-xs text-slate-500 mt-2">UTM tracking is applied to share buttons.</p>
              </div>
            </div>
          )}
        </section>

        <div id="about">
          <AboutImpact />
        </div>

        <Visit />

        <footer className="py-10 text-center text-sm text-slate-600">
          <p>© {new Date().getFullYear()} Shree Panjarapol Go-Rakshan Sanstha – Panvel. All rights reserved.</p>
        </footer>
      </main>
    </div>
  )
}

export default App
