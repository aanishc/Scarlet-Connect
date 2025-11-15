import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import MapMarker from '../components/MapMarker'

// Demo coordinates around Rutgers–New Brunswick
const PEOPLE = [
  { id: '1', name: 'Mia Patel', major: 'CS', coords: [40.505, -74.451] },
  { id: '2', name: 'Jordan Lee', major: 'Economics', coords: [40.502, -74.457] },
  { id: '3', name: 'Samir Shah', major: 'Math', coords: [40.499, -74.445] },
]

export default function MapView() {
  const center = [40.504, -74.451] // College Ave area

  return (
    <section>
      <div className="flex items-end justify-between mb-4">
        <div>
          <h1 className="text-3xl font-black leading-tight">Campus Map</h1>
          <p className="text-neutral-700">Tap a marker to view a student card.</p>
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden border bg-white shadow-soft">
        <MapContainer center={center} zoom={14} style={{ height: '70vh', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {PEOPLE.map((p) => (
            <MapMarker key={p.id} person={p} />
          ))}
        </MapContainer>
      </div>
    </section>
  )
}
