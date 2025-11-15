import { useEffect, useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import MapMarker from '../components/MapMarker'

export default function MapView() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const center = [40.504, -74.451] // College Ave area

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
    return <section><p className="text-neutral-700">Loading map…</p></section>
  }

  if (error) {
    return (
      <section>
        <h1 className="text-3xl font-black leading-tight mb-2">Campus Map</h1>
        <p className="text-red-600">Error loading students: {error}</p>
      </section>
    )
  }

  return (
    <section>
      <div className="flex items-end justify-between mb-4">
        <div>
          <h1 className="text-3xl font-black leading-tight">Campus Map</h1>
          <p className="text-neutral-700">Click a marker to preview a student profile.</p>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden border bg-white shadow-soft">
        <MapContainer center={center} zoom={14} style={{ height: '70vh', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {students.map((s) => (
            <MapMarker key={s.id} person={s} />
          ))}
        </MapContainer>
      </div>
    </section>
  )
}
