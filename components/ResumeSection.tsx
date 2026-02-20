'use client'

import { useRef, useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'

const education = [
  {
    degree: 'BE, Electronic Engineering',
    year: '2017 – 2021',
    institution: 'University Of Mumbai — DY Patil College',
    description: 'Graduated with First Class. Developed a strong foundation in engineering which later transitioned into a passion for software development.',
    tags: ['First Class'],
  },
  {
    degree: 'Diploma, Electronic & Communication Eng.',
    year: '2014 – 2017',
    institution: 'Maharastra State Board Of Technical Education',
    description: 'Completed diploma with First Class distinction, building core knowledge in electronics and communication systems.',
    tags: ['First Class'],
  },
]

const experience = [
  {
    role: 'React Developer',
    year: '2021 – 2023',
    company: 'Brained Company',
    description: 'Worked on ICICI Bank Projects including ICICI Careers, UOTM, and iCare. Built complex React JS applications for enterprise-scale banking solutions.',
    tags: ['React JS', 'Redux', 'TypeScript'],
    yearColor: 'text-cyan-400',
  },
  {
    role: 'React Native Developer',
    year: '2023 – Present',
    company: 'Boppo Technologies',
    description: 'Building cross-platform mobile applications including Boppo Stream, BMDB, and Bumping. Delivering high-performance mobile experiences.',
    tags: ['React Native', 'JavaScript', 'Mobile'],
    yearColor: 'text-purple-400',
  },
]

function TimelineCard({ title, sub, year, desc, tags, yearColor = 'text-cyan-400' }: {
  title: string; sub: string; year: string; desc: string; tags: string[]; yearColor?: string
}) {
  return (
    <div className="relative pl-6">
      {/* Timeline dot */}
      <div className="absolute left-0 top-6 w-3 h-3 rounded-full bg-cyan-400 -translate-x-[6px] timeline-dot" />

      <div className="bg-[#0d1117] border border-slate-700/40 rounded-xl p-5 card-glow cursor-default">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <h3 className="text-white font-bold text-base md:text-lg">{title}</h3>
          <span className={`text-sm font-mono ${yearColor}`}>{year}</span>
        </div>
        <p className="text-slate-500 text-sm font-mono mb-3">{sub}</p>
        <p className="text-slate-300 text-sm leading-relaxed mb-4">{desc}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
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
  )
}

export default function ResumeSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="resume" className="relative py-20 md:py-32 section-padding bg-[#080c10]/50">
      <div className="max-w-screen-xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <SectionHeader title="My" highlight="Resume" comment="education_and_experience();" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-xl">Education</h3>
              </div>
              <div className="relative space-y-6">
                {/* Timeline line */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-700/50" />
                {education.map((e, i) => (
                  <TimelineCard
                    key={i}
                    title={e.degree}
                    sub={e.institution}
                    year={e.year}
                    desc={e.description}
                    tags={e.tags}
                  />
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-white font-bold text-xl">Experience</h3>
              </div>
              <div className="relative space-y-6">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-700/50" />
                {experience.map((e, i) => (
                  <TimelineCard
                    key={i}
                    title={e.role}
                    sub={e.company}
                    year={e.year}
                    desc={e.description}
                    tags={e.tags}
                    yearColor={e.yearColor}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
