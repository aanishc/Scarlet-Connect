import { useEffect, useState, useContext } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { DarkModeContext } from '../context/DarkModeContext'
import 'leaflet/dist/leaflet.css'
import MapMarker from '../components/MapMarker'
import BuildingsLeaderboard from '../components/BuildingsLeaderboard'

export default function MapView() {
  const { isDark } = useContext(DarkModeContext)
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const center = [40.504, -74.451] // College Ave area

  // Keep map in light mode for readability; labels are essential
  // Dark map tiles don't include labels, so we always use the standard OSM tile
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  const tileAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const res = await fetch('/students.json')
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

  if (loading) {
    return <section><p className="text-neutral-700 dark:text-neutral-300">Loading map…</p></section>
  }

  if (error) {
    return (
      <section>
        <h1 className="text-3xl font-black leading-tight mb-2 text-neutral-900 dark:text-neutral-100">Campus Map</h1>
        <p className="text-red-600 dark:text-red-400">Error loading students: {error}</p>
      </section>
    )
  }

  return (
    <section>
      <div className="flex items-end justify-between mb-4">
        <div>
          <h1 className="text-3xl font-black leading-tight text-neutral-900 dark:text-neutral-100">Campus Map</h1>
          <p className="text-neutral-700 dark:text-neutral-300">Click a marker to preview a student profile.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-soft">
          <MapContainer center={center} zoom={14} style={{ height: '70vh', width: '100%' }}>
            <TileLayer
              attribution={tileAttribution}
              url={tileUrl}
            />
            {students.map((s) => (
              <MapMarker key={s.id} person={s} />
            ))}
          </MapContainer>
        </div>

        {/* Leaderboard Section */}
        <div className="lg:col-span-1">
          <BuildingsLeaderboard />
        </div>
      </div>
    </section>
  )
}
