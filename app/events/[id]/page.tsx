import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CalendarBlank, MapPin, Users, ArrowLeft, ArrowRight, YoutubeLogoIcon, FileDocIcon } from '@phosphor-icons/react/dist/ssr'
import AnimatedSection from '@/components/AnimatedSection'
import { pastEvents } from '@/app/events/data'

function CategoryBadge({ label, tone }: { label: string; tone: string }) {
  return <span className={`badge badge-tone tone-${tone}`}>{label}</span>
}

const PHOTO_TONES = [
  'event-photo-grad-a',
  'event-photo-grad-b',
  'event-photo-grad-c',
  'event-photo-grad-d',
]

export function generateStaticParams() {
  return pastEvents.map(e => ({ id: e.id }))
}

export default async function EventDetailPage(props: PageProps<'/events/[id]'>) {
  const { id } = await props.params
  const event = pastEvents.find(e => e.id === id)
  if (!event) notFound()

  const photoCount = event.photos.length

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className={`hero-events-bg relative pt-40 pb-20 grid-bg overflow-hidden tone-${event.categoryTone}`}>
        <div className="bottom-fade absolute bottom-0 left-0 right-0 h-32 pointer-events-none" />
        <div className="event-detail-orb absolute top-0 right-0 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <Link
              href="/events#past"
              className="inline-flex items-center gap-2 text-xs text-muted mb-8 event-back-link"
            >
              <ArrowLeft size={13} weight="bold" /> Back to Events
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={0.04}>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <CategoryBadge label={event.category} tone={event.categoryTone} />
              <span className="font-mono text-xs text-muted">{event.date}</span>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.08}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05] max-w-4xl mb-6 text-primary">
              {event.title}
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.12}>
            <div className="flex flex-wrap gap-5 mb-8">
              <div className="flex items-center gap-2 text-sm text-muted">
                <CalendarBlank size={14} />{event.date}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <MapPin size={14} />{event.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <Users size={14} />{event.attendees} attended
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Photo Gallery ─────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <p className="text-xs font-semibold uppercase tracking-widest mb-8 text-accent">Gallery</p>
        </AnimatedSection>

        <AnimatedSection delay={0.06}>
          <div className={`event-photo-grid event-photo-grid-${Math.min(photoCount, 4)}`}>
            {event.photos.map((_, i) => (
              <div
                key={i}
                className={`event-photo-slot tone-${event.categoryTone} ${PHOTO_TONES[i % PHOTO_TONES.length]} ${i === 0 ? 'event-photo-featured' : ''}`}
              />
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ── Description ──────────────────────────────────────────────────────── */}
      <section className="py-4 pb-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <AnimatedSection direction="left" className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-widest mb-6 text-accent">About this event</p>
            <p className="text-base leading-relaxed text-secondary">
              {event.description}
            </p>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.08} className="lg:col-span-5">
            <div className="p-7 rounded-2xl bg-card border-default">
              <p className="text-xs font-semibold uppercase tracking-widest mb-5 text-accent">Key highlight</p>
              <p className="text-sm leading-relaxed text-secondary italic">
                &ldquo;{event.highlight}&rdquo;
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Resources ────────────────────────────────────────────────────────── */}
      {(event.docLinks?.length || event.youtubeUrl) && (
        <section className="py-20 border-t-default bg-overlay-30">
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedSection>
              <p className="text-xs font-semibold uppercase tracking-widest mb-10 text-accent">Resources</p>
            </AnimatedSection>

            <div className="flex flex-wrap gap-3">
              {event.youtubeUrl && (
                <AnimatedSection>
                  <a
                    href={event.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="event-resource-link event-resource-youtube"
                  >
                    <YoutubeLogoIcon size={18} weight="duotone" />
                    Watch recording
                    <ArrowRight size={13} weight="bold" className="ml-auto" />
                  </a>
                </AnimatedSection>
              )}

              {event.docLinks?.map((doc, i) => (
                <AnimatedSection key={doc.label} delay={i * 0.06}>
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="event-resource-link"
                  >
                    <FileDocIcon size={18} weight="duotone" />
                    {doc.label}
                    <ArrowRight size={13} weight="bold" className="ml-auto" />
                  </a>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Back / CTA ───────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 rounded-2xl border-default">
            <div>
              <h3 className="text-xl font-semibold tracking-tight mb-1 text-primary">See more events</h3>
              <p className="text-sm text-muted">Browse past events and upcoming sessions.</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link href="/events#past" className="btn-ghost inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm">
                <ArrowLeft size={14} weight="bold" /> All Events
              </Link>
              <Link href="/join" className="btn-accent inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm active:scale-[0.98]">
                Join the club <ArrowRight size={14} weight="bold" />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </>
  )
}
