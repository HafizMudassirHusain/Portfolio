import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import logo from '../assets/splashimage.png'

export default function SplashScreen({ onComplete }) {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  const rootRef = useRef(null)
  const logoRef = useRef(null)
  const nameRef = useRef(null)
  const barRef = useRef(null)
  const scanRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scan line
      gsap.fromTo(
        scanRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 1.2, ease: 'power3.out' }
      )

      // Logo
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4 }
      )

      // Name reveal (mask-like)
      gsap.fromTo(
        nameRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1,
          delay: 0.7,
          ease: 'power3.out',
        }
      )

      // Progress
      gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 2.2,
          delay: 1,
          ease: 'power2.inOut',
          onUpdate() {
            setProgress(Math.round(this.progress() * 100))
          },
        }
      )

      // Exit
      gsap.timeline({
        delay: 4,
        onComplete: () => {
          setVisible(false)
          onComplete()
        },
      })
        .to(rootRef.current, { opacity: 0, duration: 0.6 })
    }, rootRef)

    return () => ctx.revert()
  }, [onComplete])

  if (!visible) return null

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] bg-neutral-950 text-white flex items-center justify-center overflow-hidden"
    >
      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Scan line */}
      <div
        ref={scanRef}
        className="absolute left-1/2 top-0 w-px h-full bg-white/30 origin-top"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        <img
          ref={logoRef}
          src={logo}
          alt="HMH"
          className="w-full mb-4 opacity-90"
        />

        <h1
          ref={nameRef}
          className="text-3xl md:text-4xl font-medium tracking-wide"
        >
          Hafiz Mudassir Husain
        </h1>

        <p className="mt-1 text-sm text-neutral-400">
          Full Stack Engineer
        </p>

        {/* Progress */}
        <div className="mt-6 w-56">
          <div className="h-px bg-white/20 overflow-hidden">
            <div
              ref={barRef}
              className="h-full bg-white origin-left"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
          <p className="mt-2 text-xs text-neutral-500 text-center">
            {progress}%
          </p>
        </div>
      </div>
    </div>
  )
}
