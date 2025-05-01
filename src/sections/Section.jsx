// Section.jsx with GSAP
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import useMotionPreferences from './MotionPreferences' // ✅ make sure this import is correct

export default function Section({ id, children, direction, isActive }) {
  const sectionRef = useRef(null)

  // ✅ Call your custom hook here — inside the component body
  const reduceMotion = useMotionPreferences()

  // Animation effect based on motion preferences
  useEffect(() => {
    if (!sectionRef.current) return

    if (reduceMotion) {
      sectionRef.current.style.opacity = isActive ? 1 : 0
    } else {
      gsap.to(sectionRef.current, {
        opacity: isActive ? 1 : 0,
        x: isActive ? 0 : (direction === 'right' ? 100 : -100),
        duration: 0.8
      })
    }
  }, [isActive, direction, reduceMotion])

  // Entrance animation effect
  useEffect(() => {
    if (!sectionRef.current) return

    if (isActive) {
      sectionRef.current.focus()
      gsap.fromTo(
        sectionRef.current,
        {
          opacity: 0,
          x: direction === 'right' ? 100 : -100,
          scale: 0.95
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out"
        }
      )
    } else {
      gsap.to(sectionRef.current, {
        opacity: 0,
        x: direction === 'right' ? -100 : 100,
        scale: 0.95,
        duration: 0.5
      })
    }
  }, [isActive, direction])

  return (
    <div
      ref={sectionRef}
      id={id}
      className="absolute inset-0 flex items-center justify-center text-4xl font-bold"
      tabIndex={-1}
      aria-hidden={!isActive}
    >
      {children}
    </div>
  )
}
