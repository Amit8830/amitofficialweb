'use client'

import { useRef, useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'

const education = [
  {
    degree: 'Bachelor of Engineering in Electronics Engineering',
    year: '2021',
    institution: 'Ramrao Adik Institute of Technology, Mumbai University',
    description:
      'Completed BE in Electronics Engineering with strong fundamentals that supported the transition into software engineering.',
    tags: ['Mumbai University'],
  },
  {
    degree: 'Diploma in Electronics and Communication Engineering',
    year: '2018',
    institution: 'Dr. D Y Patil Polytechnic College, Mumbai University',
    description:
      'Completed diploma with focus on electronics and communication systems, building technical discipline and problem-solving ability.',
    tags: ['Mumbai University'],
  },
]

const experience = [
  {
    role: 'Senior Frontend Developer',
    year: 'Oct 2025 - Present',
    company: 'Skima AI, Andheri, Mumbai',
    description:
      'Built CareerFit AI product experiences, redesigned CareerFit marketing website, developed dashboard modules with API integrations, delivered a React Native call recording app with AWS S3 uploads, and worked on an AI interview and proctoring platform with real-time video and anti-cheating features.',
    tags: ['Next.js', 'React Native', 'WebRTC', 'AWS S3', 'Google Analytics'],
    yearColor: 'text-cyan-400',
  },
  {
    role: 'Senior Executive React Native Developer',
    year: 'Nov 2023 - Oct 2025',
    company: 'Brained, Andheri, Mumbai',
    description:
      'Worked on enterprise platforms for ICICI programs including ICICI Careers, UOTM, and ICICI Alumni. Delivered features for application tracking, employee management, payroll records, leave workflows, interview panels, referrals, and community engagement.',
    tags: ['React Native', 'Enterprise Apps', 'Stakeholder Management'],
    yearColor: 'text-purple-400',
  },
  {
    role: 'Software Engineer',
    year: 'Jan 2022 - Aug 2023',
    company: 'Boppo Technologies Pvt Ltd, Ghansoli, Navi Mumbai',
    description:
      'Built and launched BollywoodMDB app, integrated Google and Facebook auth, contributed to Rangeplus e-commerce web and mobile experience, and developed frontend modules for Boppo Stream including search and payment-related flows.',
    tags: ['React Native', 'React.js', 'Tailwind CSS', 'API Integration'],
    yearColor: 'text-blue-400',
  },
]

const certifications = [
  'Front-End Web Development with React - The Hong Kong University of Science and Technology (Coursera, 2021)',
  'Succeeding in Web Development: Full Stack and Front End Development - LinkedIn Learning (2021)',
  'Front-End Web Development - GeeksforGeeks (2021)',
]

function TimelineCard({ title, sub, year, desc, tags, yearColor = 'text-cyan-400' }: {
  title: string
  sub: string
  year: string
  desc: string
  tags: string[]
  yearColor?: string
}) {
  return (
    <div className="relative pl-6">
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
          <SectionHeader title="My" highlight="Resume" comment="education_experience_and_certifications();" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-12">
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
                <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-700/50" />
                {education.map((e, i) => (
                  <TimelineCard key={i} title={e.degree} sub={e.institution} year={e.year} desc={e.description} tags={e.tags} />
                ))}
              </div>
            </div>

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

          <div className="bg-[#0d1117] border border-slate-700/40 rounded-xl p-6 card-glow">
            <h3 className="text-white font-bold text-xl mb-4">Certifications</h3>
            <div className="space-y-3">
              {certifications.map((cert, idx) => (
                <p key={idx} className="text-slate-300 text-sm leading-relaxed">
                  {cert}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
