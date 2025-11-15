import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { Link } from 'react-router-dom'

// Leaflet marker icon
const personIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

// “You” trait baseline (0–100). Override via localStorage key `youTraits`.
const defaultYou = { study: 80, social: 55, clubs: 70, sports: 25, events: 50 }
function getYouTraits() {
  try {
    const raw = localStorage.getItem('youTraits')
    return raw ? { ...defaultYou, ...JSON.parse(raw) } : defaultYou
  } catch {
    return defaultYou
  }
}

// Calibrated overall % match using normalized L2 distance.
// Output sits in a believable ~40–95% band (never perfect 100 unless identical).
function matchPercentCalibrated(a, b) {
  const keys = ['study', 'social', 'clubs', 'sports', 'events']
  const clamp = (n) => Math.max(0, Math.min(100, n ?? 0))
  const va = keys.map(k => clamp(a?.[k]))
  const vb = keys.map(k => clamp(b?.[k]))
  const sumSq = va.reduce((s, v, i) => s + Math.pow(v - vb[i], 2), 0)
  const maxSq = keys.length * Math.pow(100, 2)
  const d = Math.sqrt(sumSq / maxSq)      // 0..1 (0 identical, 1 far)
  const similarity = 1 - d                // 0..1
  const raw = similarity * 100            // 0..100
  const shrunk = 20 + 0.8 * raw           // shrink extremes a bit
  const clamped = Math.max(40, Math.min(95, Math.round(shrunk)))
  return clamped
}

export default function MapMarker({ person }) {
  const you = getYouTraits()
  const overall = matchPercentCalibrated(person.traits || {}, you)

  return (
    <Marker position={person.coords} icon={personIcon}>
      <Popup closeButton>
        <div className="min-w-[240px]">
          {/* Header row with avatar and match badge */}
          <div className="flex items-center gap-3 mb-2">
            <img
              src={person.avatar}
              alt={person.name}
              className="w-12 h-12 rounded-full object-cover border"
            />
            <div className="flex-1">
              <p className="font-semibold leading-tight">{person.name}</p>
              <p className="text-xs text-neutral-600">
                {person.major} • {person.year}
              </p>
            </div>
            <span
              className="text-xs font-bold px-2 py-1 rounded-full border"
              style={{ background: '#FFFFFF', color: 'black', borderColor: '#CC0033' }}
              title="Overall match"
            >
              {overall}%
            </span>
          </div>

          {/* Optional location label */}
          {person.locationLabel && (
            <p className="text-[11px] text-neutral-600 -mt-1 mb-2">{person.locationLabel}</p>
          )}

          {/* Bio snippet */}
          {person.bio && (
            <p className="text-sm text-neutral-700 mb-3 line-clamp-2">{person.bio}</p>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <Link
              to={`/profile/${person.id}`}
              className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold border transition hover:opacity-80"
              style={{
                background: '#CC0033',   // scarlet
                color: 'black',           // black text
                borderColor: '#CC0033',
              }}
            >
              View Profile
            </Link>
            <Link
              to={`/profile/${person.id}#dm`}
              className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold border transition hover:opacity-80"
              style={{
                background: '#FFFFFF',    // white
                color: 'black',           // black text
                borderColor: '#CC0033',   // scarlet border
              }}
            >
              Message
            </Link>
          </div>
        </div>
      </Popup>
    </Marker>
  )
}
