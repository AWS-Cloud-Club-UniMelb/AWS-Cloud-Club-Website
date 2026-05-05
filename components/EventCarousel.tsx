'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { CalendarBlank, MapPin, Users, ArrowRight, CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr'
import type { PastEvent } from '@/app/events/data'

function CategoryBadge({ label, tone }: { label: string; tone: string }) {
  return <span className={`badge badge-tone tone-${tone}`}>{label}</span>
}

const PHOTO_GRADIENTS = [
  'event-photo-grad-a',
  'event-photo-grad-b',
  'event-photo-grad-c',
  'event-photo-grad-d',
]

function EventCard({ event }: { event: PastEvent }) {
  return (
    <div className="event-carousel-card card-interactive rounded-2xl bg-card border-default overflow-hidden shrink-0">
      {/* Photo placeholder */}
      <div className={`event-card-photo ${PHOTO_GRADIENTS[0]} tone-${event.categoryTone}`} />

      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <CategoryBadge label={event.category} tone={event.categoryTone} />
          <span className="font-mono text-xs text-muted">{event.date}</span>
        </div>
        <h3 className="text-base font-semibold tracking-tight mb-2 text-primary leading-snug">
          {event.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted mb-4 line-clamp-2">
          {event.highlight}
        </p>
        <div className="flex items-center gap-4 mb-5">
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <MapPin size={12} />
            <span className="truncate max-w-[18ch]">{event.location}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted">
            <Users size={12} />{event.attendees} attended
          </div>
        </div>
        <Link
          href={`/events/${event.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent event-card-link"
        >
          Read more <ArrowRight size={12} weight="bold" />
        </Link>
      </div>
    </div>
  )
}

export default function EventCarousel({ events }: { events: PastEvent[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const total = events.length

  function scrollTo(index: number) {
    const clamped = Math.max(0, Math.min(index, total - 1))
    setCurrent(clamped)
    const track = trackRef.current
    if (!track) return
    const card = track.children[clamped] as HTMLElement
    if (!card) return
    track.scrollTo({ left: card.offsetLeft - 24, behavior: 'smooth' })
  }

  function handleScroll() {
    const track = trackRef.current
    if (!track) return
    const scrollLeft = track.scrollLeft
    let closest = 0
    let minDist = Infinity
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement
      const dist = Math.abs(el.offsetLeft - 24 - scrollLeft)
      if (dist < minDist) { minDist = dist; closest = i }
    })
    setCurrent(closest)
  }

  return (
    <div>
      {/* Track */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="event-carousel-track"
      >
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6 px-1">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {events.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`carousel-dot ${i === current ? 'carousel-dot-active' : ''}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollTo(current - 1)}
            disabled={current === 0}
            className="carousel-arrow"
            aria-label="Previous event"
          >
            <CaretLeft size={16} weight="bold" />
          </button>
          <button
            onClick={() => scrollTo(current + 1)}
            disabled={current === total - 1}
            className="carousel-arrow"
            aria-label="Next event"
          >
            <CaretRight size={16} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  )
}
