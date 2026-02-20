'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import SectionHeader from './SectionHeader'

interface GameObject {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  sides: number
  rotation: number
  rotSpeed: number
}

interface Bullet {
  x: number
  y: number
  vy: number
}

interface Star {
  x: number
  y: number
  r: number
  alpha: number
  speed: number
}

const COLORS = ['#ff6b35', '#f7c59f', '#8338ec', '#ffd60a', '#06d6a0', '#ef476f']

export default function GameSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<{
    player: { x: number; y: number; w: number; h: number; speed: number }
    objects: GameObject[]
    bullets: Bullet[]
    stars: Star[]
    score: number
    lives: number
    level: number
    running: boolean
    paused: boolean
    keys: Set<string>
    lastSpawn: number
    lastShot: number
    animId: number
    frameCount: number
    gameOver: boolean
  } | null>(null)

  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle')
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [level, setLevel] = useState(1)

  const drawPolygon = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, sides: number, rotation: number, color: string) => {
    ctx.beginPath()
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2 + rotation
      const px = x + r * Math.cos(angle)
      const py = y + r * Math.sin(angle)
      if (i === 0) ctx.moveTo(px, py)
      else ctx.lineTo(px, py)
    }
    ctx.closePath()
    ctx.fillStyle = color
    ctx.fill()
    ctx.strokeStyle = 'rgba(255,255,255,0.3)'
    ctx.lineWidth = 1
    ctx.stroke()
  }

  const startGame = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const W = canvas.width
    const H = canvas.height

    const stars: Star[] = []
    for (let i = 0; i < 80; i++) {
      stars.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.5 + 0.3, alpha: Math.random(), speed: Math.random() * 0.3 + 0.1 })
    }

    gameRef.current = {
      player: { x: W / 2, y: H - 80, w: 30, h: 40, speed: 5 },
      objects: [],
      bullets: [],
      stars,
      score: 0,
      lives: 3,
      level: 1,
      running: true,
      paused: false,
      keys: new Set(),
      lastSpawn: 0,
      lastShot: 0,
      animId: 0,
      frameCount: 0,
      gameOver: false,
    }

    setGameState('playing')
    setScore(0)
    setLives(3)
    setLevel(1)
  }, [])

  useEffect(() => {
    if (gameState !== 'playing') return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx || !gameRef.current) return

    const W = canvas.width
    const H = canvas.height
    const g = gameRef.current

    const onKey = (e: KeyboardEvent, down: boolean) => {
      down ? g.keys.add(e.key) : g.keys.delete(e.key)
      if (e.key === ' ' && down) e.preventDefault()
    }
    window.addEventListener('keydown', (e) => onKey(e, true))
    window.addEventListener('keyup', (e) => onKey(e, false))

    let mobileLeft = false
    let mobileRight = false
    let mobileShoot = false

    const setBtnLeft = (v: boolean) => { mobileLeft = v }
    const setBtnRight = (v: boolean) => { mobileRight = v }
    const setBtnShoot = (v: boolean) => { mobileShoot = v }

    // Touch controls
    const leftBtn = document.getElementById('btn-left')
    const rightBtn = document.getElementById('btn-right')
    const shootBtn = document.getElementById('btn-shoot')

    leftBtn?.addEventListener('touchstart', () => setBtnLeft(true))
    leftBtn?.addEventListener('touchend', () => setBtnLeft(false))
    rightBtn?.addEventListener('touchstart', () => setBtnRight(true))
    rightBtn?.addEventListener('touchend', () => setBtnRight(false))
    shootBtn?.addEventListener('touchstart', () => setBtnShoot(true))
    shootBtn?.addEventListener('touchend', () => setBtnShoot(false))

    const spawnObject = () => {
      const sides = [3, 4, 5, 6, 7, 8][Math.floor(Math.random() * 6)]
      g.objects.push({
        x: Math.random() * (W - 40) + 20,
        y: -30,
        vx: (Math.random() - 0.5) * 1.5,
        vy: 1.5 + g.level * 0.3 + Math.random() * 1.5,
        size: 18 + Math.random() * 20,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        sides,
        rotation: 0,
        rotSpeed: (Math.random() - 0.5) * 0.04,
      })
    }

    const loop = (timestamp: number) => {
      if (!g.running) return
      g.frameCount++
      g.score++

      ctx.fillStyle = '#080c10'
      ctx.fillRect(0, 0, W, H)

      // Stars
      g.stars.forEach(s => {
        s.y += s.speed
        if (s.y > H) { s.y = 0; s.x = Math.random() * W }
        s.alpha = 0.2 + 0.6 * Math.abs(Math.sin(g.frameCount * 0.02 + s.x))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`
        ctx.fill()
      })

      // Player movement
      const moveLeft = g.keys.has('ArrowLeft') || g.keys.has('a') || g.keys.has('A') || mobileLeft
      const moveRight = g.keys.has('ArrowRight') || g.keys.has('d') || g.keys.has('D') || mobileRight
      const shooting = g.keys.has(' ') || g.keys.has('ArrowUp') || g.keys.has('w') || g.keys.has('W') || mobileShoot

      if (moveLeft) g.player.x = Math.max(g.player.w / 2, g.player.x - g.player.speed)
      if (moveRight) g.player.x = Math.min(W - g.player.w / 2, g.player.x + g.player.speed)

      // Shoot
      if (shooting && timestamp - g.lastShot > 250) {
        g.bullets.push({ x: g.player.x, y: g.player.y - 20, vy: -8 })
        g.lastShot = timestamp
      }

      // Spawn
      const spawnInterval = Math.max(500, 1200 - g.level * 80)
      if (timestamp - g.lastSpawn > spawnInterval) {
        spawnObject()
        g.lastSpawn = timestamp
      }

      // Level up
      g.level = Math.floor(g.score / 500) + 1

      // Draw player (spaceship)
      ctx.save()
      ctx.translate(g.player.x, g.player.y)
      // Body
      ctx.beginPath()
      ctx.moveTo(0, -20)
      ctx.lineTo(-12, 15)
      ctx.lineTo(0, 8)
      ctx.lineTo(12, 15)
      ctx.closePath()
      ctx.fillStyle = '#00e5ff'
      ctx.fill()
      // Engine glow
      ctx.beginPath()
      ctx.moveTo(-6, 15)
      ctx.lineTo(0, 15 + 8 + Math.random() * 8)
      ctx.lineTo(6, 15)
      ctx.fillStyle = 'rgba(255,165,0,0.8)'
      ctx.fill()
      ctx.restore()

      // Bullets
      g.bullets = g.bullets.filter(b => b.y > -10)
      g.bullets.forEach(b => {
        b.y += b.vy
        ctx.beginPath()
        ctx.rect(b.x - 2, b.y - 8, 4, 16)
        ctx.fillStyle = '#00e5ff'
        ctx.fill()
        // Glow
        ctx.shadowBlur = 8
        ctx.shadowColor = '#00e5ff'
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Objects
      g.objects = g.objects.filter(o => o.y < H + 50)
      g.objects.forEach((obj, oi) => {
        obj.x += obj.vx
        obj.y += obj.vy
        obj.rotation += obj.rotSpeed
        if (obj.x < obj.size || obj.x > W - obj.size) obj.vx *= -1

        drawPolygon(ctx, obj.x, obj.y, obj.size, obj.sides, obj.rotation, obj.color)

        // Bullet collision
        g.bullets.forEach((b, bi) => {
          const dx = b.x - obj.x
          const dy = b.y - obj.y
          if (Math.sqrt(dx * dx + dy * dy) < obj.size) {
            g.objects.splice(oi, 1)
            g.bullets.splice(bi, 1)
            g.score += 50
          }
        })

        // Player collision
        const px = g.player.x
        const py = g.player.y
        const dx = px - obj.x
        const dy = py - obj.y
        if (Math.sqrt(dx * dx + dy * dy) < obj.size + 12) {
          g.objects.splice(oi, 1)
          g.lives--
          setLives(g.lives)
          if (g.lives <= 0) {
            g.running = false
            g.gameOver = true
            setGameState('gameover')
            return
          }
        }
      })

      // Scan lines effect
      ctx.fillStyle = 'rgba(0,0,0,0.015)'
      for (let y = 0; y < H; y += 4) {
        ctx.fillRect(0, y, W, 2)
      }

      // HUD
      ctx.fillStyle = '#00e5ff'
      ctx.font = 'bold 14px "JetBrains Mono", monospace'
      ctx.fillText(`SCORE: ${g.score}`, 14, 28)

      ctx.textAlign = 'center'
      ctx.fillText(`LVL ${g.level}`, W / 2, 28)

      ctx.textAlign = 'right'
      ctx.fillStyle = '#ffffff'
      ctx.fillText('LIVES:', W - 14 - 44, 28)
      for (let i = 0; i < g.lives; i++) {
        ctx.fillStyle = '#ef4444'
        ctx.font = '16px sans-serif'
        ctx.fillText('❤', W - 14 - i * 22, 30)
      }
      ctx.textAlign = 'left'
      ctx.font = '14px "JetBrains Mono", monospace'

      setScore(g.score)
      setLevel(g.level)

      g.animId = requestAnimationFrame(loop)
    }

    g.animId = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(g.animId)
      window.removeEventListener('keydown', (e) => onKey(e, true))
      window.removeEventListener('keyup', (e) => onKey(e, false))
    }
  }, [gameState])

  return (
    <section id="game" className="relative py-20 md:py-32 section-padding">
      <div className="max-w-screen-xl mx-auto">
        <SectionHeader title="Play" highlight="Space Dodge" comment="interactive_three_js_game();" />

        <div className="flex flex-col items-center gap-6">
          {/* Game canvas */}
          <div className="relative w-full max-w-3xl">
            <div className="game-container rounded-2xl overflow-hidden border border-cyan-400/20 relative">
              <canvas
                ref={canvasRef}
                width={800}
                height={500}
                className="w-full block bg-[#080c10]"
                style={{ imageRendering: 'pixelated' }}
              />

              {/* Overlay for idle/gameover */}
              {gameState !== 'playing' && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#080c10]/90 backdrop-blur-sm">
                  {gameState === 'gameover' && (
                    <>
                      <p className="text-red-400 font-mono text-lg mb-2 tracking-widest">GAME OVER</p>
                      <p className="text-cyan-400 font-mono text-3xl font-bold mb-6">SCORE: {score}</p>
                    </>
                  )}
                  {gameState === 'idle' && (
                    <>
                      <div className="text-6xl mb-4">🚀</div>
                      <h3 className="text-white font-bold text-2xl mb-2">Space Dodge</h3>
                      <p className="text-slate-400 text-sm font-mono mb-6 text-center max-w-xs">
                        Dodge asteroids & shoot them down. Arrow keys to move, Space to shoot.
                      </p>
                    </>
                  )}
                  <button
                    onClick={startGame}
                    className="px-8 py-4 bg-cyan-400 text-black font-bold rounded-xl hover:bg-cyan-300 transition-all hover:scale-105 text-lg"
                  >
                    {gameState === 'gameover' ? 'Play Again' : 'Start Game'}
                  </button>
                </div>
              )}
            </div>

            {/* Mobile controls */}
            {gameState === 'playing' && (
              <div className="flex items-center justify-between mt-4 md:hidden px-2">
                <div className="flex gap-3">
                  <button
                    id="btn-left"
                    className="w-16 h-16 rounded-xl bg-[#0d1117] border border-cyan-400/30 text-cyan-400 text-2xl font-bold active:bg-cyan-400/20 select-none touch-none"
                    onTouchStart={(e) => { e.preventDefault(); document.getElementById('btn-left')?.dispatchEvent(new Event('touchstart')) }}
                  >
                    ←
                  </button>
                  <button
                    id="btn-right"
                    className="w-16 h-16 rounded-xl bg-[#0d1117] border border-cyan-400/30 text-cyan-400 text-2xl font-bold active:bg-cyan-400/20 select-none touch-none"
                  >
                    →
                  </button>
                </div>
                <button
                  id="btn-shoot"
                  className="w-20 h-16 rounded-xl bg-cyan-400/10 border border-cyan-400/40 text-cyan-400 text-sm font-mono font-bold active:bg-cyan-400/20 select-none touch-none"
                >
                  SHOOT
                </button>
              </div>
            )}
          </div>

          {/* Controls info */}
          <div className="flex flex-wrap gap-4 justify-center text-xs font-mono text-slate-500">
            <span>← → Arrow Keys: Move</span>
            <span>|</span>
            <span>Space / ↑: Shoot</span>
            <span>|</span>
            <span>Dodge asteroids for points</span>
          </div>
        </div>
      </div>
    </section>
  )
}
