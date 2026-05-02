'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { List, X } from '@phosphor-icons/react'

const navLinks = [
  { href: '/about',  label: 'About'  },
  { href: '/team',   label: 'Team'   },
  { href: '/events', label: 'Events' },
]

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-header-scrolled' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div
            className="chip w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center transition-all duration-200"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/club-logo.gif"
              alt="AWS Cloud Club logo"
              width={36}
              height={36}
              className="object-cover block"
            />
          </div>
          <span className="font-semibold text-sm tracking-tight text-primary">
            AWS Cloud Club
            <span className="font-normal ml-1.5 hidden sm:inline text-xs text-muted">
              UniMelb
            </span>
          </span>
        </Link>

        {/* Desktop Nav — centred absolutely */}
        <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium nav-link ${pathname === link.href ? 'nav-link-active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center">
          <Link
            href="/join"
            className="nav-cta px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 active:scale-[0.98]"
          >
            Join the Club
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden transition-colors duration-200 text-secondary hover-text-primary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <List size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="nav-drawer md:hidden px-6 py-4 flex flex-col gap-1"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 nav-link ${pathname === link.href ? 'nav-link-active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/join"
              onClick={() => setMobileOpen(false)}
              className="nav-cta px-4 py-3 rounded-lg text-sm font-semibold text-center mt-2"
            >
              Join the Club
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
