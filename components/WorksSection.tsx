'use client'

import { useRef, useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'

const projects = [
  {
    title: 'Youtube Clone',
    desc: 'A full-featured YouTube clone with video browsing, search, and playback.',
    tags: ['React', 'YouTube API'],
    category: 'React',
    image: 'yt.png',
  },
  {
    title: 'Zoom Clone',
    desc: 'A video conferencing app with real-time communication capabilities.',
    tags: ['React', 'WebRTC', 'Socket.io'],
    category: 'React',
    image: 'zoom.png',
  },
  {
    title: 'Blog Website',
    desc: 'A responsive blog website with clean layout and smooth navigation.',
    tags: ['HTML', 'CSS', 'JS'],
    category: 'HTML',
    image: 'responsive.png',
  },
  {
    title: 'Amit Quiz',
    desc: 'An interactive quiz application with multiple categories and score tracking.',
    tags: ['React', 'Firebase'],
    category: 'Firebase',
    image: 'quiz.png',
  },
  {
    title: 'Google Keep Clone',
    desc: 'A note-taking app inspired by Google Keep with CRUD functionality.',
    tags: ['React', 'Firebase'],
    category: 'Firebase',
    image: 'googlekeep.png',
  },
  {
    title: 'Xiaomi E-Commerce',
    desc: 'A full e-commerce website with product listing, cart, and checkout.',
    tags: ['React', 'E-commerce'],
    category: 'E-commerce',
    image: 'mi.png',
  },
]

const filters = ['All', 'React', 'HTML', 'E-commerce', 'Firebase']

export default function WorksSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState('All')

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const filtered = projects.filter(p => activeFilter === 'All' || p.category === activeFilter)

  return (
    <section id="works" className="relative py-20 md:py-32 section-padding bg-[#080c10]/50">
      <div className="max-w-screen-xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <SectionHeader title="My" highlight="Works" comment="check_out_some_of_my_works();" />

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-mono transition-all ${
                  activeFilter === f
                    ? 'bg-cyan-400 text-black font-bold'
                    : 'border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <div
                key={project.title}
                className="bg-[#0d1117] border border-slate-700/40 rounded-2xl overflow-hidden card-glow"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Preview */}
                <div className="w-full h-44 relative overflow-hidden bg-[#111827]">
                  <img
                    src={`/images/portfolio/${project.image}`}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-white font-bold text-lg mb-2">{project.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full border border-cyan-400/20 text-cyan-400/80 text-xs font-mono"
                      >
                        {tag}
                      </span>
                    ))}
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
