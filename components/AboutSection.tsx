'use client'

import { useRef, useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="relative py-20 md:py-32 section-padding">
      <div className="max-w-screen-xl mx-auto">
        <div
          ref={ref}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="relative flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="absolute -top-4 -left-4 w-40 h-40 rounded-full border border-cyan-400/20 animate-spin-slow" />
            <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-full border border-purple-500/20" style={{ animation: 'spin 15s linear infinite reverse' }} />

            <div className="relative w-full max-w-sm lg:max-w-md">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border-2 border-slate-700/50">
                <img
                  src="/images/amitgupta.jpg"
                  alt="Amit Gupta"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/45 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <SectionHeader
              title="About"
              highlight="Me"
              comment="hi_there();"
            />

            <div className="space-y-4 text-slate-300 text-base leading-relaxed mb-8">
              <p>
                Hi! I&apos;m <strong className="text-white">Amit Gupta</strong>, a passionate programmer from India.
                I graduated from DY Patil College in 2021 with a degree in Electronics Engineering.
              </p>
              <p>
                My enthusiasm for technology led me to transition into Software Engineering, where I create impactful products.
                With <strong className="text-cyan-400">3.5+ years</strong> of experience in React JS and React Native.
              </p>
              <p>
                Contributed to projects with <strong className="text-white">Brained Company</strong> (ICICI Bank Projects) and{' '}
                <strong className="text-white">Boppo Technologies</strong>. Eager to keep learning and contributing to innovative teams.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { value: '3.5+', label: 'Years Exp.' },
                { value: '10+', label: 'Projects' },
                { value: '2', label: 'Companies' },
              ].map(stat => (
                <div
                  key={stat.label}
                  className="bg-[#0d1117] border border-slate-700/50 rounded-xl p-4 text-center card-glow"
                >
                  <div className="text-2xl font-bold text-cyan-400 mb-1">{stat.value}</div>
                  <div className="text-slate-500 text-xs font-mono">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-cyan-400 text-black font-bold rounded-xl hover:bg-cyan-300 transition-all hover:scale-105"
              >
                Get In Touch
              </button>
              <a
                href="https://codewithamit.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border-2 border-cyan-400 text-cyan-400 font-bold rounded-xl hover:bg-cyan-400/10 transition-all hover:scale-105"
              >
                Old Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
