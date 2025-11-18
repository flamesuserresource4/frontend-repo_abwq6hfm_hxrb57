import { useState } from 'react'

export default function BadgeGenerator({ orderId, amount, showAmount }) {
  const [name, setName] = useState('')
  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)

  async function generate() {
    setLoading(true)
    try {
      const form = new FormData()
      form.append('name', name || 'Generous Donor')
      form.append('show_amount', showAmount ? 'true' : 'false')
      if (showAmount) form.append('amount', amount)
      if (file) form.append('photo', file)

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/badge/generate`, {
        method: 'POST',
        body: form,
      })
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      setImageUrl(url)
    } finally {
      setLoading(false)
    }
  }

  const shareText = encodeURIComponent("I donated for a cause — when will you? #GauSeva #PanvelGoShala")
  const pageUrl = encodeURIComponent(window.location.href + '?utm_source=share_badge')

  return (
    <div className="bg-white rounded-2xl p-6 shadow border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-900">Your Digital Donor Badge</h3>
      <p className="text-slate-600 text-sm">Upload a photo and generate a shareable badge.</p>

      <div className="mt-4 grid gap-3">
        <input type="text" placeholder="Your name" className="border rounded px-3 py-2" value={name} onChange={e=>setName(e.target.value)} />
        <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0] || null)} />
        <button onClick={generate} disabled={loading} className="py-2 rounded bg-[#15803D] text-white font-semibold hover:bg-[#166534] disabled:opacity-50">{loading ? 'Generating...' : 'Generate Badge'}</button>
      </div>

      {imageUrl && (
        <div className="mt-4">
          <img src={imageUrl} alt="Badge" className="w-full rounded-lg border" />
          <div className="mt-3 flex flex-wrap gap-2">
            <a className="px-4 py-2 rounded bg-slate-900 text-white" href={imageUrl} download={`donor-badge-${orderId}.png`}>Download</a>
            <a className="px-4 py-2 rounded bg-[#25D366] text-white" href={`https://wa.me/?text=${shareText}%20${pageUrl}`} target="_blank" rel="noreferrer">Share WhatsApp</a>
            <a className="px-4 py-2 rounded bg-[#E1306C] text-white" href={`https://www.instagram.com/?url=${pageUrl}`} target="_blank" rel="noreferrer">Share Instagram</a>
            <a className="px-4 py-2 rounded bg-[#1877F2] text-white" href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`} target="_blank" rel="noreferrer">Share Facebook</a>
          </div>
        </div>
      )}

      <div className="mt-3 text-sm">
        <a className="text-[#B45309] underline" href={`${import.meta.env.VITE_BACKEND_URL}/api/donations/${orderId}/receipt.pdf`} target="_blank" rel="noreferrer">Download 80G Receipt</a>
      </div>
    </div>
  )
}
