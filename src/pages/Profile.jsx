import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import DMPanel from '../components/DMPanel'

export default function Profile() {
  const { id } = useParams()
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const url = `${import.meta.env.BASE_URL}students.json`
        const res = await fetch(url, { headers: { Accept: 'application/json' } })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setStudents(Array.isArray(data) ? data : [])
      } catch (err) {
        setError(err.message || 'Failed to load students')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const s = useMemo(() => students.find(st => String(st.id) === String(id)), [students, id])

  if (loading) return <section><p className="text-neutral-700">Loading profile…</p></section>
  if (error)   return <section><p className="text-red-600">Error: {error}</p></section>
  if (!s)      return <section><p className="text-neutral-700">Profile not found.</p></section>

  return (
    <section className="grid grid-cols-1 md:grid-cols-[280px,1fr] gap-8">
      <aside className="rounded-2xl border bg-white p-5 shadow-soft">
        <img src={s.avatar} alt={s.name} className="w-32 h-32 rounded-full object-cover border mx-auto mb-4" />
        <h1 className="text-xl font-extrabold text-center mb-1">{s.name}</h1>
        <p className="text-center text-sm text-neutral-600">{s.major} • {s.year}</p>
        <div className="h-1 w-full sc-gradient rounded mt-4" />
        <div className="text-center mt-4">
          <Link to="/map" className="underline" style={{ color: '#CC0033' }}>← Back to Map</Link>
        </div>
      </aside>

      <div className="space-y-6">
        <div className="rounded-2xl border bg-white p-5 shadow-soft">
          <h2 className="font-semibold mb-2">About</h2>
          <p className="text-neutral-700">{s.bio}</p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-soft">
          <h2 className="font-semibold mb-2">Clubs</h2>
          <div className="flex gap-2 flex-wrap">
            {(s.clubs || []).map(c => (
              <span key={c} className="text-sm px-3 py-1 rounded-full border bg-neutral-50">{c}</span>
            ))}
            {(!s.clubs || s.clubs.length === 0) && <p className="text-neutral-600 text-sm">No clubs listed.</p>}
          </div>
        </div>

        {/* DM panel lives on the profile page */}
        <DMPanel target={s} />
      </div>
    </section>
  )
}
