'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import StarBackground from '@/components/StarBackground'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ResumeSection from '@/components/ResumeSection'
import SkillsSection from '@/components/SkillsSection'
import WorksSection from '@/components/WorksSection'
import GameSection from '@/components/GameSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'resume', 'skills', 'works', 'game', 'testimonials', 'contact']
      const scrollY = window.scrollY + 100

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <StarBackground />
      <Navbar activeSection={activeSection} />
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ResumeSection />
        <SkillsSection />
        <WorksSection />
        <GameSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  )
}
