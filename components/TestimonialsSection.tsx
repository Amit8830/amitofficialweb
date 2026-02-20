'use client'

import { useRef, useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'

const testimonials = [
  {
    quote: 'Websites promote you 24/7: No employee will do that.',
    name: 'Amit Gupta',
    role: 'Developer Motto',
    initials: 'AG',
    color: 'bg-cyan-600',
  },
  {
    quote: "We don't just build websites, we build websites that SELL.",
    name: 'Amit Gupta',
    role: 'Core Philosophy',
    initials: 'AG',
    color: 'bg-cyan-600',
  },
  {
    quote: "Code is like humor. When you have to explain it, it's bad.",
    name: 'Cory House',
    role: 'Software Developer',
    initials: 'CH',
    color: 'bg-purple-600',
  },
  {
    quote: 'The best error message is the one that never shows up.',
    name: 'Thomas Fuchs',
    role: 'JavaScript Developer',
    initials: 'TF',
    color: 'bg-blue-600',
  },
]

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="testimonials" className="relative py-20 md:py-32 section-padding bg-[#080c10]/50">
      <div className="max-w-screen-xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <SectionHeader title="Inspiring" highlight="Quotes" comment="client_testimonials();" />

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-[#0d1117] border border-slate-700/40 rounded-2xl p-6 card-glow flex flex-col gap-4"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <p className="text-slate-300 text-sm leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold font-mono flex-shrink-0`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-slate-500 text-xs font-mono">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
