// Section.jsx - Simplified version using Framer Motion instead of GSAP
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// Simple hook to check for reduced motion preference
const useMotionPreferences = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function Section({ id, children, direction, isActive }) {
  const sectionRef = useRef(null)
  const reduceMotion = useMotionPreferences()

  // Focus management for accessibility
  useEffect(() => {
    if (isActive && sectionRef.current) {
      sectionRef.current.focus()
    }
  }, [isActive])

  const animationProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: direction === 'right' ? 100 : -100, scale: 0.95 },
        animate: isActive
          ? { opacity: 1, x: 0, scale: 1 }
          : { opacity: 0, x: direction === 'right' ? -100 : 100, scale: 0.95 },
        transition: { duration: 0.8, ease: "easeOut" }
      }

  return (
    <motion.div
      ref={sectionRef}
      id={id}
      className="absolute inset-0 flex items-center justify-center text-4xl font-bold"
      tabIndex={-1}
      aria-hidden={!isActive}
      {...animationProps}
    >
      {children}
    </motion.div>
  )
}
