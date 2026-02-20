'use client'

import { useEffect, useRef } from 'react'

export default function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animFrameId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Stars
    const stars: { x: number; y: number; r: number; alpha: number; speed: number; twinkleSpeed: number }[] = []
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.5 + 0.3,
        alpha: Math.random(),
        speed: Math.random() * 0.005 + 0.002,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
      })
    }

    // Colored square/dot particles scattered around
    const particles: { x: number; y: number; size: number; color: string; vx: number; vy: number }[] = []
    const colors = ['#00e5ff', '#8b5cf6', '#3b82f6', '#06b6d4', '#a855f7']
    for (let i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      })
    }

    let t = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      stars.forEach(s => {
        s.alpha += s.twinkleSpeed
        if (s.alpha > 1 || s.alpha < 0) s.twinkleSpeed *= -1
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${Math.abs(s.alpha) * 0.8})`
        ctx.fill()
      })

      // Draw colored particles (squares)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.fillStyle = p.color + '66'
        ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size)
      })

      t += 0.01
      animFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.9 }}
    />
  )
}
