'use client'

import { useEffect, useRef, useState } from 'react'

const GemSVG = ({ size = 40, color = '#8b5cf6', style = {} }: { size?: number; color?: string; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="gem" style={style}>
    <polygon
      points="50,5 95,35 85,85 15,85 5,35"
      stroke={color}
      strokeWidth="2"
      fill="none"
      opacity="0.8"
    />
    <polygon
      points="50,20 80,40 70,75 30,75 20,40"
      stroke={color}
      strokeWidth="1"
      fill={color}
      opacity="0.15"
    />
    <line x1="50" y1="5" x2="20" y2="40" stroke={color} strokeWidth="1" opacity="0.5" />
    <line x1="50" y1="5" x2="80" y2="40" stroke={color} strokeWidth="1" opacity="0.5" />
    <line x1="50" y1="5" x2="50" y2="75" stroke={color} strokeWidth="1" opacity="0.3" />
  </svg>
)

const TYPING_TEXTS = [
  'Web Developer & App Developer',
  'React JS Specialist',
  'React Native Developer',
  'Frontend Engineer',
]

export default function HeroSection() {
  const [typedText, setTypedText] = useState('')
  const [textIdx, setTextIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const currentText = TYPING_TEXTS[textIdx]
    let timeout: NodeJS.Timeout

    if (!isDeleting && typedText.length < currentText.length) {
      timeout = setTimeout(() => {
        setTypedText(currentText.slice(0, typedText.length + 1))
      }, 80)
    } else if (!isDeleting && typedText.length === currentText.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800)
    } else if (isDeleting && typedText.length > 0) {
      timeout = setTimeout(() => {
        setTypedText(currentText.slice(0, typedText.length - 1))
      }, 40)
    } else if (isDeleting && typedText.length === 0) {
      setIsDeleting(false)
      setTextIdx((prev) => (prev + 1) % TYPING_TEXTS.length)
    }

    return () => clearTimeout(timeout)
  }, [typedText, isDeleting, textIdx])

  useEffect(() => {
    const interval = setInterval(() => setShowCursor(p => !p), 500)
    return () => clearInterval(interval)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
    >
      {/* Floating Gems */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-[8%] gem" style={{ '--duration': '7s', '--delay': '0s' } as React.CSSProperties}>
          <GemSVG size={45} color="#8b5cf6" />
        </div>
        <div className="absolute top-[30%] left-[15%] gem" style={{ '--duration': '5s', '--delay': '1s' } as React.CSSProperties}>
          <GemSVG size={30} color="#06b6d4" />
        </div>
        <div className="absolute top-[20%] right-[10%] gem" style={{ '--duration': '8s', '--delay': '0.5s' } as React.CSSProperties}>
          <GemSVG size={50} color="#8b5cf6" />
        </div>
        <div className="absolute top-[45%] right-[5%] gem" style={{ '--duration': '6s', '--delay': '2s' } as React.CSSProperties}>
          <GemSVG size={35} color="#a78bfa" />
        </div>
        <div className="absolute bottom-[25%] left-[5%] gem" style={{ '--duration': '9s', '--delay': '0.8s' } as React.CSSProperties}>
          <GemSVG size={40} color="#06b6d4" />
        </div>
        <div className="absolute bottom-[30%] right-[12%] gem" style={{ '--duration': '7s', '--delay': '1.5s' } as React.CSSProperties}>
          <GemSVG size={55} color="#8b5cf6" />
        </div>
        <div className="absolute top-[60%] left-[20%] gem" style={{ '--duration': '6s', '--delay': '0.3s' } as React.CSSProperties}>
          <GemSVG size={28} color="#3b82f6" />
        </div>

        {/* Radial glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto" style={{ animation: 'fadeInUp 0.8s ease forwards' }}>
        {/* Available badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 mb-8 badge-pulse">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
          <span className="text-cyan-400 text-xs font-mono tracking-[0.2em]">AVAILABLE FOR WORK</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-sans leading-tight mb-4">
          <span className="text-white">Welcome To</span>
          <br />
          <span
            className="neon-cyan glitch-text"
            data-text="Code with Amit"
          >
            Code with Amit
          </span>
        </h1>

        {/* Subtitle with typing */}
        <p className="text-slate-400 text-lg md:text-xl font-mono mt-6 mb-8 tracking-wider">
          <span className="text-slate-500">{'// '}</span>
          <span>{typedText}</span>
          <span style={{ opacity: showCursor ? 1 : 0 }} className="text-cyan-400">|</span>
        </p>

        {/* Social buttons */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {[
            { label: 'GH', href: 'https://github.com/amit8830', title: 'GitHub' },
            { label: 'LI', href: 'https://www.linkedin.com/in/amit-gupta-bb6b40199/', title: 'LinkedIn' },
            { label: '@', href: 'https://twitter.com/gamit9022', title: 'Twitter' },
            { label: 'yt', href: 'https://www.youtube.com/channel/UCI9vUtA81go3WUZmiR4X8eg/featured', title: 'YouTube' },



          ].map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              title={s.title}
              className="w-12 h-12 rounded-xl border border-slate-700 bg-slate-800/50 flex items-center justify-center text-sm font-mono font-bold text-slate-300 hover:border-cyan-400/50 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-200 hover:scale-110"
            >
              {s.label}
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => scrollTo('works')}
            className="px-8 py-4 rounded-xl bg-cyan-400 text-black font-bold text-base hover:bg-cyan-300 transition-all duration-200 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,229,255,0.4)] w-full sm:w-auto"
          >
            View Works
          </button>
          <a
            href="https://drive.google.com/file/d/16lkPnciSoN29QKYShxmygjYfp06aBBrb/view?usp=drivesdk"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-xl border-2 border-white text-white font-bold text-base hover:bg-white hover:text-black transition-all duration-200 hover:scale-105 w-full sm:w-auto text-center"
          >
            Download Resume
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 scroll-indicator">
        <span className="text-slate-500 text-xs font-mono tracking-[0.2em]">SCROLL DOWN</span>
        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}

