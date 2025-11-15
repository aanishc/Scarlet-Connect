import { useEffect, useMemo, useRef, useState } from 'react'

/**
 * Demo-only DM panel.
 * Stores threads in localStorage under "dmThreads".
 * Schema: { [studentId]: [{sender:'me'|'them', text:string, ts:number}] }
 */
const STORAGE_KEY = 'dmThreads'

function loadThreads() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}
function saveThreads(obj) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj))
  } catch {}
}

export default function DMPanel({ target }) {
  const [threads, setThreads] = useState(loadThreads)
  const [text, setText] = useState('')
  const listRef = useRef(null)

  const thread = useMemo(() => threads[target.id] || [], [threads, target.id])

  useEffect(() => {
    // scroll to bottom when messages change
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [thread.length])

  function send() {
    const msg = text.trim()
    if (!msg) return
    const next = { ...threads, [target.id]: [...thread, { sender: 'me', text: msg, ts: Date.now() }] }
    setThreads(next)
    saveThreads(next)
    setText('')
  }

  // (Optional) seed an auto-reply for demo flair
  function seedAutoReply() {
    const next = { ...threads, [target.id]: [...thread, { sender: 'them', text: 'Hey! What’s up?', ts: Date.now() }] }
    setThreads(next)
    saveThreads(next)
  }

  return (
    <div className="rounded-2xl border bg-white shadow-soft">
      <div className="p-4 border-b flex items-center gap-3">
        <img src={target.avatar} alt={target.name} className="w-8 h-8 rounded-full object-cover border" />
        <div>
          <p className="font-semibold leading-tight">Direct Message</p>
          <p className="text-xs text-neutral-600">Chat with {target.name}</p>
        </div>
        <button
          onClick={seedAutoReply}
          className="ml-auto text-xs underline"
          style={{ color: '#CC0033' }}
          title="Add a sample reply"
        >
          add sample reply
        </button>
      </div>

      <div ref={listRef} className="px-4 py-3 max-h-[40vh] overflow-y-auto space-y-2 bg-neutral-50">
        {thread.length === 0 && (
          <p className="text-sm text-neutral-600">No messages yet. Say hi 👋</p>
        )}
        {thread.map((m, i) => (
          <div key={i} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`px-3 py-2 rounded-2xl text-sm border ${
                m.sender === 'me' ? 'bg-scarlet text-white border-transparent' : 'bg-white'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-3 border-t flex gap-2">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder={`Message ${target.name}…`}
          className="flex-1 border rounded-xl px-3 py-2 outline-none focus:ring-2"
          style={{ focusRingColor: '#CC0033' }}
        />
        <button
          onClick={send}
          className="rounded-xl px-4 py-2 font-semibold text-white"
          style={{ background: '#CC0033' }}
        >
          Send
        </button>
      </div>
    </div>
  )
}
