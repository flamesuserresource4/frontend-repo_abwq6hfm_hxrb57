export default function AboutImpact() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold text-slate-900">About & Impact</h2>
      <p className="text-slate-700">Heritage of compassion since 1908.</p>

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <div className="bg-white border rounded-xl p-5 shadow">
          <h3 className="font-semibold">100+ Cows</h3>
          <p className="text-slate-600 text-sm">Rescued, sheltered and cared for with love.</p>
        </div>
        <div className="bg-white border rounded-xl p-5 shadow">
          <h3 className="font-semibold">Monthly Costs</h3>
          <p className="text-slate-600 text-sm">Feed, medical care and maintenance require steady support.</p>
        </div>
        <div className="bg-white border rounded-xl p-5 shadow">
          <h3 className="font-semibold">1908 Heritage</h3>
          <p className="text-slate-600 text-sm">A century-old legacy of Gau Seva in Panvel.</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[1,2,3,4,5,6,7,8].map(i => (
          <div key={i} className="aspect-square overflow-hidden rounded-lg">
            <img src={`https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=600&q=60`} alt="gallery" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  )
}
