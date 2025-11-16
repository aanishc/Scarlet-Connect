import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { DarkModeContext } from '../context/DarkModeContext'

export default function Navbar() {
  const { isDark, toggleDarkMode } = useContext(DarkModeContext)
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-neutral-900/90 backdrop-blur border-b border-neutral-200 dark:border-neutral-800 shadow-soft">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md sc-gradient" />
          <span className="font-extrabold tracking-tight text-xl text-neutral-900 dark:text-neutral-100" style={{ color: 'var(--scarlet-color)' }}>
            Scarlet Connect
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm ${isActive ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/map"
            className={({ isActive }) =>
              `text-sm ${isActive ? 'text-neutral-900 dark:text-neutral-100' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'}`
            }
          >
            Map
          </NavLink>
          <a
            href="https://rutgers.edu"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            Rutgers
          </a>
          <button
            onClick={toggleDarkMode}
            className="ml-2 px-3 py-1 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 font-semibold transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
            title="Toggle dark mode"
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </nav>
      </div>
      <div className="h-1 w-full sc-gradient" />
    </header>
  )
}
