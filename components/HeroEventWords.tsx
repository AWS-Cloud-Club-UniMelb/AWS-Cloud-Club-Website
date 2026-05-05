'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const words = ['Workshops', 'Speaker Nights', 'Hackathons', 'Study Sprints', 'Community Nights']

export default function HeroEventWords() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % words.length)
    }, 2400)
    return () => clearInterval(id)
  }, [])

  return (
    <span className="inline-flex flex-col overflow-hidden" style={{ height: '1.1em', verticalAlign: 'bottom' }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          className="text-accent block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
