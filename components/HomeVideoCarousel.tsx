'use client'
import { useEffect, useRef, useState } from 'react'
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react/dist/ssr'

type Clip = { src: string; event: string; caption: string }

// Short muted loops in /public/home-reel (480×640, ~8s each)
const clips: Clip[] = [
  { src: 'cloud-to-career-stage',      event: 'Cloud to Career',     caption: 'Opening the night' },
  { src: 'cloud-to-career-panel',      event: 'Cloud to Career',     caption: 'Industry panel' },
  { src: 'cloud-to-career-case-comp',  event: 'Cloud to Career',     caption: 'Live case competition' },
  { src: 'cloud-to-career-poster',     event: 'Cloud to Career',     caption: 'Behind the scenes' },
  { src: 'builders-summit-team',       event: 'AWS Builders Summit', caption: 'The team' },
  { src: 'builders-summit-showcase',   event: 'AWS Builders Summit', caption: 'Builder showcase' },
  { src: 'builders-summit-room',       event: 'AWS Builders Summit', caption: 'A full room' },
  { src: 'builders-summit-networking', event: 'AWS Builders Summit', caption: 'Networking' },
]

export default function HomeVideoCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)
  const total = clips.length

  // Only play clips that are on screen; respect reduced-motion
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const video = entry.target as HTMLVideoElement
          if (entry.isIntersecting) video.play().catch(() => {})
          else video.pause()
        })
      },
      { threshold: 0.4 },
    )
    track.querySelectorAll('video').forEach(v => observer.observe(v))
    return () => observer.disconnect()
  }, [])

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
      <div ref={trackRef} onScroll={handleScroll} className="event-carousel-track">
        {clips.map(clip => (
          <figure key={clip.src} className="video-carousel-card">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={`/home-reel/${clip.src}.mp4`}
              poster={`/home-reel/${clip.src}.jpg`}
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={`${clip.event}: ${clip.caption}`}
            />
            <figcaption className="video-carousel-caption">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                {clip.event}
              </span>
              <span className="text-sm font-semibold text-primary">{clip.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-end mt-6 px-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollTo(current - 1)}
            disabled={current === 0}
            className="carousel-arrow"
            aria-label="Previous video"
          >
            <CaretLeftIcon size={16} weight="bold" />
          </button>
          <button
            onClick={() => scrollTo(current + 1)}
            disabled={current === total - 1}
            className="carousel-arrow"
            aria-label="Next video"
          >
            <CaretRightIcon size={16} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  )
}
