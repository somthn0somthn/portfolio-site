'use client'

import { useEffect, useRef } from 'react'
import type p5 from 'p5'

const PALETTE = ['#06D6A0', '#118AB2', '#FFD166', '#EF476F', '#073B4C']
const DIST_MOUSE = 50
const DOT_SIZE = 30

export default function P5Background() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let p5Instance: p5 | undefined
    let cancelled = false

    // Dynamic import so p5 never runs on the server
    ;(async () => {
      const p5Module = await import('p5')
      if (cancelled || !containerRef.current) return

      const P5 = p5Module.default

      const sketch = (p: p5) => {
        let circles: Dot[] = []
        let objects = 0

        class Dot {
          x: number
          y: number
          size: number
          col: p5.Color
          speed: number
          vx: number
          vy: number
          captured: number

          constructor(x: number, y: number, size: number) {
            this.x = x
            this.y = y
            this.size = size
            this.col = p.color(p.random(PALETTE))
            this.col.setAlpha(150)

            this.speed = p.random(0.5, 2)
            const angle = p.random(360)
            this.vx = p.cos(angle) * this.speed
            this.vy = p.sin(angle) * this.speed

            this.captured = 0
          }

          display() {
            p.noStroke()

            const s = this.size * (1 + 0.15 * this.captured)
            const c = p.lerpColor(this.col, p.color(255), 0.15 * this.captured)

            p.fill(c)
            p.ellipse(this.x, this.y, s, s)

            if (this.captured > 0.01) {
              p.noFill()
              p.stroke(255, 160 * this.captured)
              p.strokeWeight(1)
              p.ellipse(this.x, this.y, s + 6, s + 6)
            }
          }

          update() {
            const isNear = this.steerTowardMouseIfClose()
            this.captured = p.lerp(this.captured, isNear ? 1 : 0, 0.15)

            this.x += this.vx
            this.y += this.vy

            // wrap around
            this.x = ((this.x % p.width) + p.width) % p.width
            this.y = ((this.y % p.height) + p.height) % p.height
          }

          steerTowardMouseIfClose() {
            const dx = p.mouseX - this.x
            const dy = p.mouseY - this.y
            const r = DIST_MOUSE
            const d2 = dx * dx + dy * dy

            if (d2 <= r * r) {
              const d = Math.sqrt(d2) || 1
              const tx = (dx / d) * this.speed
              const ty = (dy / d) * this.speed

              const turn = 0.2
              this.vx = p.lerp(this.vx, tx, turn)
              this.vy = p.lerp(this.vy, ty, turn)

              return true
            }
            return false
          }
        }

        const initDots = () => {
          circles = []
          const w = p.width
          const h = p.height

          objects = Math.min(120, Math.floor((w * h) / 40000))

          for (let i = 0; i < objects; i++) {
            circles.push(new Dot(p.random(w), p.random(h), DOT_SIZE))
          }
        }

        p.setup = () => {
          const rect = containerRef.current!.getBoundingClientRect()
          p.createCanvas(rect.width, rect.height).parent(containerRef.current!)
          p.angleMode(p.DEGREES)
          p.frameRate(60)
          initDots()
        }

        p.windowResized = () => {
          if (!containerRef.current) return
          const rect = containerRef.current.getBoundingClientRect()
          p.resizeCanvas(rect.width, rect.height)
          initDots()
        }

        p.draw = () => {
          // Darker background tends to look nicer under content
          p.background(6, 10, 20)

          for (let i = 0; i < circles.length; i++) {
            circles[i].update()
            circles[i].display()
          }
        }
      }

      p5Instance = new P5(sketch)
    })()

    return () => {
      cancelled = true
      p5Instance?.remove()
    }
  }, [])

  // This sits BEHIND everything else on the page
  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    />
  )
}
