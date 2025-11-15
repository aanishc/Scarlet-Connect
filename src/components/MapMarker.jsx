import { Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

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
      <Popup>
        <div className="min-w-[160px]">
          <p className="font-semibold">{person.name}</p>
          {person.major && <p className="text-xs text-neutral-600">{person.major}</p>}
        </div>
      </Popup>
    </Marker>
  )
}
