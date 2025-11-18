export default function Visit() {
  const info = {
    location: {
      address: 'Panvel, Maharashtra',
      maps: 'https://www.google.com/maps?q=Panvel+Go+Shala'
    },
    timings: '9 AM – 6 PM (All days)'
  }
  return (
    <section id="visit" className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold text-slate-900">Visit the Go-shala</h2>
      <p className="text-slate-600">We welcome families, schools and devotees.</p>
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="aspect-video rounded-lg overflow-hidden shadow">
          <iframe title="map" src={info.location.maps} className="w-full h-full border-0" loading="lazy" />
        </div>
        <div className="bg-white rounded-xl p-6 border shadow">
          <form onSubmit={(e)=>{e.preventDefault(); alert('Thank you! We will confirm your visit via email.')}} className="grid gap-3">
            <input className="border rounded px-3 py-2" placeholder="Name" required />
            <input className="border rounded px-3 py-2" placeholder="Email" required />
            <input className="border rounded px-3 py-2" placeholder="Phone" required />
            <input className="border rounded px-3 py-2" placeholder="Preferred date" type="date" />
            <textarea className="border rounded px-3 py-2" placeholder="Message (optional)" />
            <button className="mt-2 py-2 rounded bg-[#15803D] text-white font-semibold hover:bg-[#166534]">Submit</button>
          </form>
          <p className="text-sm text-slate-600 mt-3">Timings: {info.timings}</p>
          <p className="text-sm text-slate-600">Address: {info.location.address}</p>
        </div>
      </div>
    </section>
  )
}
