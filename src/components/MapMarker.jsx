import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { Link } from 'react-router-dom'

const personIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

export default function MapMarker({ person }) {
  return (
    <Marker position={person.coords} icon={personIcon}>
      <Popup closeButton>
        <div className="min-w-[220px]">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={person.avatar}
              alt={person.name}
              className="w-12 h-12 rounded-full object-cover border"
            />
            <div>
              <p className="font-semibold leading-tight">{person.name}</p>
              <p className="text-xs text-neutral-600">
                {person.major} • {person.year}
              </p>
            </div>
          </div>

          {person.bio && (
            <p className="text-sm text-neutral-700 mb-3 line-clamp-2">{person.bio}</p>
          )}

          <div className="flex gap-2">
            <Link
              to={`/profile/${person.id}`}
              className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold text-white"
              style={{ background: '#CC0033' }}
            >
              View Profile
            </Link>
            <Link
              to={`/profile/${person.id}#dm`}
              className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold border"
            >
              Message
            </Link>
          </div>
        </div>
      </Popup>
    </Marker>
  )
}
