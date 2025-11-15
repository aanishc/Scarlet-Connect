import { Link } from 'react-router-dom'
import React from 'react'

export default function PrimaryButton({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold text-white shadow-soft transition-transform active:scale-[0.98]"
      style={{ background: '#CC0033' }}
    >
      {children}
    </Link>
  )
}
