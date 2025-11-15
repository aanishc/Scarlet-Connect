import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import MapView from './pages/MapView'
import Navbar from './components/Navbar'
import Profile from './pages/Profile' // make sure this file exists

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen text-neutral-900">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-8">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="border-t mt-12 py-6 text-center text-sm text-neutral-600">
        <p>
          Built for demo — <span className="font-semibold" style={{ color: '#CC0033' }}>Scarlet Connect</span>
        </p>
      </footer>
    </div>
  )
}
