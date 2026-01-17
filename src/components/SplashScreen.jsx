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
      className="fixed inset-0 z-[9999] bg-neutral-950 text-white flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-8"
    >
      {/* Grid - Responsive size */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:20px_20px] sm:bg-[size:30px_30px] md:bg-[size:40px_40px] lg:bg-[size:50px_50px]" />

      {/* Scan line */}
      <div
        ref={scanRef}
        className="absolute left-1/2 top-0 w-px h-full bg-white/30 origin-top"
      />

      {/* Content - Responsive container */}
      <div className="relative z-10 flex flex-col items-center max-w-full w-full sm:w-auto">
        {/* Logo - Responsive sizing */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 mb-4 sm:mb-6 md:mb-8 flex items-center justify-center">
          <img
            ref={logoRef}
            src={logo}
            alt="HMH"
            className="w-full h-full object-contain opacity-90"
          />
        </div>

        {/* Name - Responsive text */}
        <h1
          ref={nameRef}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium tracking-wide text-center px-4"
        >
          Hafiz Mudassir Husain
        </h1>

        {/* Subtitle - Responsive text */}
        <p className="mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base lg:text-lg text-neutral-400 text-center">
          Full Stack Engineer
        </p>

        {/* Progress - Responsive width */}
        <div className="mt-4 sm:mt-5 md:mt-6 lg:mt-8 w-48 sm:w-56 md:w-64 lg:w-72 max-w-full">
          <div className="h-0.5 sm:h-px bg-white/20 overflow-hidden rounded-full">
            <div
              ref={barRef}
              className="h-full bg-white origin-left rounded-full"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-neutral-500 text-center">
            {progress}%
          </p>
        </div>
      </div>
    </div>
  )
}
