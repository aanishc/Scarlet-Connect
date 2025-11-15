import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import DMPanel from '../components/DMPanel'
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts'

// Demo “You” traits (0–100). Change or persist via localStorage if you want.
const defaultYou = { study: 80, social: 55, clubs: 70, sports: 25, events: 50 }

function getYouTraits() {
  try {
    const raw = localStorage.getItem('youTraits')
    if (!raw) return defaultYou
    const obj = JSON.parse(raw)
    return { ...defaultYou, ...obj }
  } catch {
    return defaultYou
  }
}

// Simple % match by cosine similarity on the five trait axes
// Calibrated overall % match using normalized L2 distance (0..100 scale per axis).
// Typical outputs fall in ~40–95% (never a perfect 100 unless truly identical).
function matchPercentCalibrated(a, b) {
  const keys = ['study', 'social', 'clubs', 'sports', 'events']
  const va = keys.map(k => Math.max(0, Math.min(100, a?.[k] ?? 0)))
  const vb = keys.map(k => Math.max(0, Math.min(100, b?.[k] ?? 0)))

  // normalized L2 distance (0..1)
  const sumSq = va.reduce((s, v, i) => s + Math.pow(v - vb[i], 2), 0)
  const maxSq = keys.length * Math.pow(100, 2) // worst-case distance
  const d = Math.sqrt(sumSq / maxSq) // 0 identical, 1 maximally different

  // Convert distance to similarity, then calibrate the band
  const similarity = 1 - d            // 0..1
  const raw = similarity * 100        // 0..100

  // Calibrate so it doesn't look unrealistic:
  // - shrink extremes a bit
  // - clamp to [40, 95]
  const shrunk = 20 + 0.8 * raw       // shift & shrink
  const clamped = Math.max(40, Math.min(95, Math.round(shrunk)))
  return clamped
}


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
  const you = getYouTraits()

  if (loading) return <section><p className="text-neutral-700">Loading profile…</p></section>
  if (error)   return <section><p className="text-red-600">Error: {error}</p></section>
  if (!s)      return <section><p className="text-neutral-700">Profile not found.</p></section>

  // Prepare radar data
  const radarData = [
    { axis: 'Study', value: s.traits?.study ?? 0, you: you.study },
    { axis: 'Social', value: s.traits?.social ?? 0, you: you.social },
    { axis: 'Clubs', value: s.traits?.clubs ?? 0, you: you.clubs },
    { axis: 'Sports', value: s.traits?.sports ?? 0, you: you.sports },
    { axis: 'Events', value: s.traits?.events ?? 0, you: you.events },
  ]
    const overallMatch = matchPercentCalibrated(s.traits || {}, you)

  return (
    <section className="grid grid-cols-1 md:grid-cols-[280px,1fr] gap-8">
      {/* Sidebar */}
      <aside className="rounded-2xl border bg-white p-5 shadow-soft">
        <img src={s.avatar} alt={s.name} className="w-32 h-32 rounded-full object-cover border mx-auto mb-4" />
        <h1 className="text-xl font-extrabold text-center mb-1">{s.name}</h1>
        <p className="text-center text-sm text-neutral-600">{s.major} • {s.year}</p>
        <div className="h-1 w-full sc-gradient rounded mt-4" />
        <div className="text-center mt-4">
          <Link to="/map" className="underline" style={{ color: '#CC0033' }}>← Back to Map</Link>
        </div>
      </aside>

      {/* Main */}
      <div className="space-y-6">
        {/* About */}
        <div className="rounded-2xl border bg-white p-5 shadow-soft">
          <h2 className="font-semibold mb-2">About</h2>
          <p className="text-neutral-700">{s.bio}</p>
        </div>

        {/* Time on Campus (average time per place) */}
        <div className="rounded-2xl border bg-white p-5 shadow-soft">
          <h2 className="font-semibold mb-3">Time on Campus (avg minutes/day)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-neutral-600">
                  <th className="py-2 pr-4">Place</th>
                  <th className="py-2 pr-4">Minutes</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(s.timeAt || {}).map(([place, mins]) => (
                  <tr key={place} className="border-t">
                    <td className="py-2 pr-4">{place}</td>
                    <td className="py-2 pr-4">{mins}</td>
                  </tr>
                ))}
                {(!s.timeAt || Object.keys(s.timeAt).length === 0) && (
                  <tr><td colSpan={2} className="py-2 text-neutral-600">No time data available.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Match Radar */}
        <div className="rounded-2xl border bg-white p-5 shadow-soft">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">Match Meter</h2>
            <span className="text-sm text-neutral-700">
              Overall match: <span className="font-semibold">{overallMatch}%</span>
            </span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="axis" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                {/* Student radar */}
                <Radar name={s.name} dataKey="value" stroke="#CC0033" fill="#CC0033" fillOpacity={0.35} />
                {/* You radar */}
                <Radar name="You" dataKey="you" stroke="#111111" fill="#111111" fillOpacity={0.15} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-neutral-600 mt-2">
            Based on similarity across Study, Social, Clubs, Sports, and Events.
          </p>
        </div>

        {/* DM panel */}
        <DMPanel target={s} />
      </div>
    </section>
  )
}
