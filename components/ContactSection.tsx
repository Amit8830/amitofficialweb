'use client'

import { useState } from 'react'
import SectionHeader from './SectionHeader'

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch('https://formsubmit.co/ajax/gamit9022@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject || 'Portfolio Contact Form',
          message: form.message,
          _subject: `New Portfolio Message: ${form.subject || 'No subject'}`,
          _captcha: 'false',
          _template: 'table',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setStatus('sent')
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 3000)
    } catch {
      setStatus('error')
      setErrorMessage('Message failed. Please try again.')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const inputClass =
    'w-full bg-[#0d1117] border border-slate-700/50 rounded-xl px-4 py-3 text-white placeholder-slate-600 font-mono text-sm focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all'

  return (
    <section id="contact" className="relative py-20 md:py-32 section-padding">
      <div className="max-w-screen-xl mx-auto">
        <SectionHeader title="Get In" highlight="Touch" comment="let_us_talk();" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Info */}
          <div>
            <p className="text-slate-300 text-base leading-relaxed mb-8">
              I&apos;m always open to new opportunities, interesting projects, and conversations.
              Feel free to reach out. Let&apos;s create something amazing together!
            </p>

            <div className="space-y-4">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  label: 'Email',
                  value: 'gamit9022@gmail.com',
                  href: 'mailto:gamit9022@gmail.com',
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  label: 'Location',
                  value: 'Bhiwandi, Maharashtra, India',
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  ),
                  label: 'GitHub',
                  value: 'github.com/amit8830',
                  href: 'https://github.com/amit8830',
                },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0d1117] border border-slate-700/50 flex items-center justify-center text-cyan-400 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs font-mono">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-white text-sm hover:text-cyan-400 transition-colors">{item.value}</a>
                    ) : (
                      <p className="text-white text-sm">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 text-xs font-mono mb-1.5 block">Name *</label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Amit Gupta"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-slate-400 text-xs font-mono mb-1.5 block">Email *</label>
                <input
                  type="email"
                  className={inputClass}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-slate-400 text-xs font-mono mb-1.5 block">Subject</label>
              <input
                type="text"
                className={inputClass}
                placeholder="Project Discussion"
                value={form.subject}
                onChange={e => setForm({ ...form, subject: e.target.value })}
              />
            </div>
            <div>
              <label className="text-slate-400 text-xs font-mono mb-1.5 block">Message *</label>
              <textarea
                className={`${inputClass} resize-y min-h-[140px]`}
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                required
                rows={5}
              />
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className={`px-8 py-4 rounded-xl font-bold text-base transition-all hover:scale-105 w-full sm:w-auto ${
                status === 'sent'
                  ? 'bg-green-500 text-white'
                  : status === 'sending'
                    ? 'bg-slate-600 text-slate-200 cursor-not-allowed'
                    : 'bg-cyan-400 text-black hover:bg-cyan-300 hover:shadow-[0_0_30px_rgba(0,229,255,0.4)]'
              }`}
            >
              {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message Sent!' : 'Send Message'}
            </button>
            {status === 'error' && (
              <p className="text-red-400 text-sm font-mono">{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
