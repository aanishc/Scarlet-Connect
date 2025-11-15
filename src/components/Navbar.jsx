import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b shadow-soft">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md sc-gradient" />
          <span className="font-extrabold tracking-tight text-xl" style={{ color: '#CC0033' }}>
            Scarlet Connect
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm ${isActive ? 'text-neutral-900' : 'text-neutral-600 hover:text-neutral-900'}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/map"
            className={({ isActive }) =>
              `text-sm ${isActive ? 'text-neutral-900' : 'text-neutral-600 hover:text-neutral-900'}`
            }
          >
            Map
          </NavLink>
          <a
            href="https://rutgers.edu"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-neutral-600 hover:text-neutral-900"
          >
            Rutgers
          </a>
        </nav>
      </div>
      <div className="h-1 w-full sc-gradient" />
    </header>
  )
}
