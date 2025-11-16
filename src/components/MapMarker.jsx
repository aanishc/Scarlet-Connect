import { useEffect, useRef, useState } from 'react'
import { Circle, Popup, useMap } from 'react-leaflet'
import { Link } from 'react-router-dom'

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

// Helper component to handle zoom-dependent circle radius
// Uses metric radius (meters) so circles scale with the map zoom level
function ZoomAwareCircleMarker({ center, person, overall }) {
  const map = useMap()
  const [radius, setRadius] = useState(200) // meters
  const [visible, setVisible] = useState(true)

  // Calculate radius based on zoom level
  // At higher zoom, larger radius in meters; at low zoom, smaller or invisible
  const calculateRadius = () => {
    if (!map) return
    const zoom = map.getZoom()
    
    // Minimum zoom to show circles (e.g., hide at zoom < 12)
    if (zoom < 12) {
      setVisible(false)
      return
    }
    
    setVisible(true)
    
    // Scale radius with zoom: grows as you zoom in at ~33% the exponential rate
    // Base radius of ~150m at zoom 14, uses cubic root scaling for gentler growth
    const baseRadius = 60
    setRadius(Math.max(50, baseRadius)) // minimum 50m
  }

  useEffect(() => {
    calculateRadius()
    map.on('zoom', calculateRadius)
    map.on('zoomend', calculateRadius)
    return () => {
      map.off('zoom', calculateRadius)
      map.off('zoomend', calculateRadius)
    }
  }, [map])

  if (!visible) {
    return null // Circle is not rendered at low zoom
  }

  return (
    <Circle
      center={center}
      radius={radius}
      pathOptions={{ color: 'var(--scarlet-color)', fillColor: 'var(--scarlet-color)', fillOpacity: 0.3, weight: 2 }}
    >
      <Popup closeButton>
        <div className="min-w-[240px]">
          {/* Header row with avatar and match badge */}
          <div className="flex items-center gap-3 mb-2">
            <img
              src={person.avatar}
              alt={person.name}
              className="w-12 h-12 rounded-full object-cover border border-neutral-300"
            />
            <div className="flex-1">
              <p className="font-semibold leading-tight text-neutral-900">{person.name}</p>
              <p className="text-xs text-neutral-600">
                {person.major} • {person.year}
              </p>
            </div>
            <span
              className="text-xs font-bold px-2 py-1 rounded-full border"
              style={{ background: '#FFFFFF', color: 'black', borderColor: 'var(--scarlet-color)' }}
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
                background: 'var(--scarlet-color)',
                color: 'white',
                borderColor: 'var(--scarlet-color)',
              }}
            >
              View Profile
            </Link>
            <Link
              to={`/profile/${person.id}#dm`}
              className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold border transition hover:opacity-80"
              style={{
                background: '#FFFFFF',
                color: 'black',
                borderColor: 'var(--scarlet-color)',
              }}
            >
              Message
            </Link>
          </div>
        </div>
      </Popup>
    </Circle>
  )
}

export default function MapMarker({ person }) {
  const you = getYouTraits()
  const overall = matchPercentCalibrated(person.traits || {}, you)

  return <ZoomAwareCircleMarker center={person.coords} person={person} overall={overall} />
}
