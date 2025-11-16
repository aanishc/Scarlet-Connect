import { useEffect, useState } from 'react'

export default function BuildingsLeaderboard() {
  const [buildings, setBuildings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadBuildings() {
      try {
        setLoading(true)
        const res = await fetch('/buildings.json')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        
        // Sort buildings by timeStudied in descending order
        const sorted = Array.isArray(data)
          ? data.sort((a, b) => (b.timeStudied || 0) - (a.timeStudied || 0))
          : []
        
        setBuildings(sorted)
      } catch (err) {
        setError(err.message || 'Failed to load buildings')
      } finally {
        setLoading(false)
      }
    }
    loadBuildings()
  }, [])

  if (loading) {
    return (
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-soft">
        <p className="text-neutral-700 dark:text-neutral-300">Loading leaderboard…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-soft">
        <p className="text-red-600 dark:text-red-400">Error: {error}</p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 shadow-soft">
      <h2 className="text-2xl font-black mb-4 text-neutral-900 dark:text-neutral-100">Study Leaderboard</h2>
      
      <div className="space-y-3">
        {buildings.map((building, idx) => (
          <div
            key={building.id}
            className="flex items-center justify-between p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: 'var(--scarlet-color)' }}>
                #{idx + 1}
              </span>
              <div>
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">{building.name}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-neutral-900 dark:text-neutral-100">{building.timeStudied}</p>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">hours</p>
            </div>
          </div>
        ))}
      </div>

      {buildings.length === 0 && (
        <p className="text-neutral-600 dark:text-neutral-400 text-center py-6">No buildings data available</p>
      )}
    </div>
  )
}
