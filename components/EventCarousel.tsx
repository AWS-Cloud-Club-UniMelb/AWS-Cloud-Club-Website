'use client'
import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CalendarBlankIcon, MapPinIcon, UsersIcon, ArrowRightIcon, CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react/dist/ssr'
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

function EventCard({ event, index }: { event: PastEvent; index: number }) {
  return (
    <div className={`upcoming-card-outer carousel-card tone-${event.categoryTone}`}>
      <div className={`upcoming-event-card tone-${event.categoryTone}`}>
        <div className="upcoming-event-card-inner">
          {/* Photo slot */}
          {(() => {
            const photo = event.photos?.find(p => p)
            return (
              <div className={`event-card-photo ${PHOTO_GRADIENTS[index % PHOTO_GRADIENTS.length]} tone-${event.categoryTone}`}>
                {photo && (
                  <Image src={photo} alt={event.title} fill className="object-cover" sizes="360px" />
                )}
              </div>
            )
          })()}

          {/* Content */}
          <div className="p-6 flex flex-col flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <CategoryBadge label={event.category} tone={event.categoryTone} />
              <span className="font-mono text-xs text-muted">{event.date}</span>
            </div>

            <h3 className="text-lg font-semibold tracking-tight mb-2 text-primary leading-snug">
              {event.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted mb-4 line-clamp-3">
              {event.highlight}
            </p>

            <div className="space-y-1.5 mb-5">
              {[
                { icon: CalendarBlankIcon, text: event.date },
                { icon: MapPinIcon,        text: event.location },
                { icon: UsersIcon,         text: `${event.attendees} attended` },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs text-muted">
                  <Icon size={12} />{text}
                </div>
              ))}
            </div>

            <div className="mt-auto">
              <Link
                href={`/events/${event.id}`}
                className="btn-ghost inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm"
              >
                View recap <ArrowRightIcon size={14} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
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
        {events.map((event, i) => (
          <EventCard key={event.id} event={event} index={i} />
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
            <CaretLeftIcon size={16} weight="bold" />
          </button>
          <button
            onClick={() => scrollTo(current + 1)}
            disabled={current === total - 1}
            className="carousel-arrow"
            aria-label="Next event"
          >
            <CaretRightIcon size={16} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  )
}
