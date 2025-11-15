import { Link } from 'react-router-dom'

export default function ProfileCard({ student, compact = false }) {
  if (!student) return null;

  return (
    <div className={`rounded-2xl border bg-white ${compact ? 'p-3' : 'p-4'} shadow-soft min-w-[220px]`}>
      <div className="flex items-center gap-3 mb-2">
        <img
          src={student.avatar}
          alt={student.name}
          className="w-12 h-12 rounded-full object-cover border"
        />
        <div>
          <p className="font-semibold leading-tight">{student.name}</p>
          <p className="text-xs text-neutral-600">{student.major} • {student.year}</p>
        </div>
      </div>
      {!compact && (
        <p className="text-sm text-neutral-700 mb-3 line-clamp-2">{student.bio}</p>
      )}
      <div className="flex gap-2 flex-wrap mb-3">
        {(student.clubs || []).slice(0, 3).map(c => (
          <span key={c} className="text-[11px] px-2 py-1 rounded-full border bg-neutral-50">{c}</span>
        ))}
      </div>
      <Link
        to={`/profile/${student.id}`}
        className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold text-white"
        style={{ background: '#CC0033' }}
      >
        View Profile
      </Link>
    </div>
  )
}
