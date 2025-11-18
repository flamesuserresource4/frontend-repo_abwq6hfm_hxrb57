import { useState } from 'react'

const donationTypes = [
  { label: 'Gud Daan', value: 'Gud Daan' },
  { label: 'Adopt a Cow (monthly)', value: 'Adopt a Cow (monthly)' },
  { label: 'Adopt a Cow (year)', value: 'Adopt a Cow (year)' },
  { label: 'Adopt a Cow (lifetime)', value: 'Adopt a Cow (lifetime)' },
  { label: 'Feed a Cow', value: 'Feed a Cow' },
  { label: 'General Fund', value: 'General Fund' },
]

export default function DonationForm({ onSuccess }) {
  const [amount, setAmount] = useState('501')
  const [form, setForm] = useState({
    donation_type: donationTypes[0].value,
    name: '',
    email: '',
    phone: '',
    pan: '',
    show_amount_on_badge: true,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const presets = ['251', '501', '1100', '2100', '5100', '11000']

  async function createOrder() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/donations/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, amount: parseInt(amount, 10) || 0 })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed to create order')

      // Simulate payment success immediately for demo
      const confirm = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/donations/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order_id: data.order_id, payment_method: 'UPI' })
      })
      const confirmed = await confirm.json()
      if (!confirm.ok) throw new Error(confirmed.detail || 'Payment confirmation failed')

      onSuccess({ orderId: confirmed.order_id, amount, showAmount: form.show_amount_on_badge })
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-900">Make a Donation</h3>
      <p className="text-slate-600 text-sm">Choose an amount or enter custom</p>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {presets.map(p => (
          <button key={p} onClick={() => setAmount(p)} className={`py-2 rounded border ${amount===p? 'bg-[#F59E0B] text-white border-[#F59E0B]' : 'border-slate-300 hover:bg-slate-50'}`}>
            ₹{p}
          </button>
        ))}
        <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Custom" className="col-span-3 mt-2 px-3 py-2 border rounded" />
      </div>

      <div className="mt-4">
        <label className="text-sm font-medium">Donation Type</label>
        <select value={form.donation_type} onChange={e=>setForm({ ...form, donation_type: e.target.value })} className="mt-1 w-full border rounded px-3 py-2">
          {donationTypes.map(dt => <option key={dt.value} value={dt.value}>{dt.label}</option>)}
        </select>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3">
        <input className="border rounded px-3 py-2" placeholder="Full name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <input className="border rounded px-3 py-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        <input className="border rounded px-3 py-2" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
        <input className="border rounded px-3 py-2" placeholder="PAN (optional)" value={form.pan} onChange={e=>setForm({...form, pan:e.target.value})} />
        <label className="inline-flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.show_amount_on_badge} onChange={e=>setForm({...form, show_amount_on_badge:e.target.checked})} />
          Show amount on badge
        </label>
      </div>

      {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}

      <button onClick={createOrder} disabled={loading} className="mt-4 w-full py-3 rounded bg-[#B45309] text-white font-semibold hover:bg-[#92400E] disabled:opacity-50">
        {loading ? 'Processing...' : 'Donate via UPI/Card/Wallet'}
      </button>

      <p className="text-xs text-slate-500 mt-2">80G receipt auto-generated when PAN is provided.</p>
    </div>
  )
}
