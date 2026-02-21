'use client'

import { useRef, useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'

const proficiencySkills = [
  { name: 'React.js', level: 92, color: 'from-cyan-400 to-cyan-600' },
  { name: 'React Native', level: 90, color: 'from-cyan-400 to-blue-500' },
  { name: 'Next.js', level: 86, color: 'from-purple-400 to-purple-600' },
  { name: 'TypeScript', level: 85, color: 'from-indigo-400 to-indigo-600' },
  { name: 'JavaScript (ES6+)', level: 91, color: 'from-blue-400 to-blue-600' },
  { name: 'Redux / Zustand', level: 84, color: 'from-cyan-400 to-teal-500' },
  { name: 'Tailwind CSS', level: 88, color: 'from-cyan-400 to-sky-500' },
  { name: 'WebRTC / Socket.io', level: 78, color: 'from-purple-400 to-pink-500' },
]

const techStack = [
  { name: 'React.js', icon: 'R' },
  { name: 'Next.js', icon: 'N' },
  { name: 'React Native', icon: 'RN' },
  { name: 'TypeScript', icon: 'TS' },
  { name: 'Redux', icon: 'RX' },
  { name: 'Zustand', icon: 'ZU' },
]

const otherTools = [
  'HTML',
  'CSS',
  'Tailwind CSS',
  'REST APIs',
  'Axios',
  'JWT Authentication',
  'Context API',
  'Google Analytics',
  'Git',
  'JIRA',
  'AWS S3',
  'Socket.io',
  'WebRTC',
]

function SkillBar({ name, level, color, visible }: { name: string; level: number; color: string; visible: boolean }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white text-sm font-medium">{name}</span>
        <span className="text-cyan-400 text-sm font-mono">{level}%</span>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: visible ? `${level}%` : '0%', transitionDelay: '0.2s' }}
        />
      </div>
    </div>
  )
}

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="skills" className="relative py-20 md:py-32 section-padding">
      <div className="max-w-screen-xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <SectionHeader title="My" highlight="Skills" comment="frontend_mobile_and_realtime_stack();" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <p className="text-slate-500 text-xs font-mono tracking-[0.2em] mb-6">PROFICIENCY</p>
              <div>
                {proficiencySkills.map(skill => (
                  <SkillBar key={skill.name} {...skill} visible={visible} />
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <p className="text-slate-500 text-xs font-mono tracking-[0.2em] mb-6">TECH STACK</p>
                <div className="grid grid-cols-3 gap-3">
                  {techStack.map(tech => (
                    <div
                      key={tech.name}
                      className="bg-[#0d1117] border border-slate-700/40 rounded-xl p-4 flex flex-col items-center gap-2 card-glow"
                    >
                      <span className="text-sm font-bold text-cyan-400">{tech.icon}</span>
                      <span className="text-slate-300 text-xs font-mono text-center">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-slate-500 text-xs font-mono tracking-[0.2em] mb-4">TOOLS AND PLATFORM SKILLS</p>
                <div className="flex flex-wrap gap-2">
                  {otherTools.map(tool => (
                    <span
                      key={tool}
                      className="px-3 py-2 rounded-full border border-slate-700/50 bg-[#0d1117] text-slate-300 text-sm font-mono hover:border-cyan-400/30 hover:text-cyan-400 transition-colors cursor-default"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
