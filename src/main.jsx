import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app'
import './index.css'

// 🧹 Clear chat data on each dev server restart
if (import.meta.env.DEV) {
  localStorage.removeItem('dmThreads')
  console.log('💬 Cleared localStorage: dmThreads (dev mode)')
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
