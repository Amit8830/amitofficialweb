'use client'

import { useState, useEffect } from 'react'

const navLinks = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'resume', label: 'RESUME' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'works', label: 'WORKS' },
  { id: 'game', label: 'GAME' },
  { id: 'testimonials', label: 'TESTIMONIALS' },
  { id: 'contact', label: 'CONTACT' },
]

export default function Navbar({ activeSection }: { activeSection: string }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#080c10]/95 backdrop-blur-md border-b border-white/5 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={() => scrollTo('home')}
          className="text-xl font-bold font-mono tracking-tight hover:opacity-80 transition-opacity"
        >
          <span className="text-white">Amit</span>
          <span className="text-cyan-400"> .dev</span>
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`px-3 py-1.5 text-xs font-mono tracking-widest transition-all duration-200 rounded
                ${activeSection === link.id
                  ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                }
                ${link.id === 'works' ? 'font-bold text-white' : ''}
              `}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className={`lg:hidden hamburger flex flex-col gap-1.5 p-2 ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } bg-[#0d1117]/98 backdrop-blur-md border-b border-white/5`}
      >
        <div className="flex flex-col px-4 py-4 gap-1">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-left px-4 py-3 text-sm font-mono tracking-widest rounded transition-all
                ${activeSection === link.id
                  ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
