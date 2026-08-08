import Image from 'next/image'
import Link from 'next/link'
import { MapPinIcon, UsersIcon, ArrowRightIcon, ClockIcon } from '@phosphor-icons/react/dist/ssr'
import AnimatedSection from '@/components/AnimatedSection'
import HeroEventWords from '@/components/HeroEventWords'
import EventCarousel from '@/components/EventCarousel'
import EventCloudMascot from '@/components/EventCloudMascot'
import { pastEvents, getUpcomingEvents } from './data'

function CategoryBadge({ label, tone }: { label: string; tone: string }) {
  return <span className={`badge badge-tone tone-${tone}`}>{label}</span>
}

const stats = [
  { value: '5+',  label: 'Events run' },
  { value: '300+', label: 'Members engaged' },
  { value: '5+',  label: 'Industry partners' },
  { value: '48h', label: 'Longest hackathon' },
]

export default async function EventsPage() {
  const upcomingEvents = await getUpcomingEvents()
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="hero-events-bg relative pt-40 pb-28 grid-bg overflow-hidden">
        <div className="bottom-fade absolute bottom-0 left-0 right-0 h-32 pointer-events-none" />

        {/* Ambient orbs */}
        <div className="events-hero-orb-left absolute pointer-events-none" />
        <div className="events-hero-orb-right absolute pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          {/*
           * Two-column layout matching about/page.tsx:
           * left  → heading + CTA + stats (takes remaining space)
           * right → mascot (shrink-0 so it never compresses)
           * On mobile they stack vertically, mascot moves below the copy.
           */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

            {/* ── Left column ─────────────────────────────────────────────── */}
            <div className="flex-1 min-w-0">
              <AnimatedSection>
                <p className="text-xs font-semibold uppercase tracking-widest mb-6 text-accent">
                  Events
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.06}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.05] max-w-4xl mb-6 text-primary">
                  We run&nbsp;
                  <HeroEventWords />
                  <br />
                  <span className="text-muted">that move careers.</span>
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={0.12}>
                <p className="text-base leading-relaxed max-w-[52ch] text-secondary mb-10">
                  Events run every fortnight throughout semester. All are free
                  for members unless otherwise noted.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.18}>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="#upcoming"
                    className="btn-accent inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm active:scale-[0.98]"
                  >
                    Upcoming events <ArrowRightIcon size={15} weight="bold" />
                  </Link>
                  <Link
                    href="#past"
                    className="btn-ghost inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm"
                  >
                    Past events
                  </Link>
                </div>
              </AnimatedSection>

              {/* Stats strip */}
              <AnimatedSection delay={0.26}>
                <div className="mt-16 flex flex-wrap gap-x-10 gap-y-4">
                  {stats.map(s => (
                    <div key={s.label}>
                      <p className="text-2xl font-bold tracking-tighter text-primary font-mono">
                        {s.value}
                      </p>
                      <p className="text-xs text-muted mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* ── Right column — mascot ────────────────────────────────────── */}
            {/*
             * hidden on mobile (below md) to keep the hero clean on small screens.
             * Appears from lg breakpoint, matching the about page behaviour.
             * The mascot is 320 px — same as the about page CloudMascot (300 px)
             * but slightly larger because the events hero has more vertical space.
             */}
            <div className="hidden lg:flex shrink-0 items-center justify-center self-center">
              <EventCloudMascot size={320} />
            </div>

          </div>
        </div>
      </section>

      {/* ── Past Events Carousel ─────────────────────────────────────────────── */}
      <section id="past" className="py-24 scroll-mt-nav border-t-default bg-overlay-30">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex items-end justify-between gap-4 mb-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-accent">
                  Hall of fame
                </p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-primary">
                  Past Events
                </h2>
              </div>
              <p className="text-sm text-muted hidden md:block max-w-[36ch] text-right">
                Drag or use the arrows to browse. Click&nbsp;
                <span className="text-accent">Read more</span> for photos,
                slides, and recordings.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.08}>
            <EventCarousel events={pastEvents} />
          </AnimatedSection>
        </div>
      </section>

      {/* ── Upcoming Events ──────────────────────────────────────────────────── */}
      <section id="upcoming" className="py-24 scroll-mt-nav max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-12">
            <span className="bg-accent w-2 h-2 rounded-full animate-pulse" />
            <h2 className="text-2xl font-bold tracking-tighter text-primary">Upcoming</h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-4 px-2">
          {upcomingEvents.map((event, i) => (
            <AnimatedSection key={event.id} delay={i * 0.1} className="h-full">
              <div className={`upcoming-card-outer tone-${event.categoryTone}`}>
                <div className={`upcoming-event-card tone-${event.categoryTone}`}>
                  <div className="upcoming-event-card-inner">
                    {/* Poster */}
                    <div className="event-poster-slot">
                      {event.posterUrl ? (
                        <Image
                          src={event.posterUrl}
                          alt={event.title}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="event-poster-label">
                          <span className="text-xs font-mono font-semibold uppercase tracking-widest opacity-60">
                            {event.category}
                          </span>
                          <span className="text-[10px] opacity-40">Poster coming soon</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <CategoryBadge label={event.category} tone={event.categoryTone} />
                        <span className="font-mono text-xs text-muted">{event.date}</span>
                        <span className="badge badge-tone tone-green">Open</span>
                        {event.isHybrid && (
                          <span className="badge badge-tone tone-blue">Hybrid</span>
                        )}
                      </div>

                      <h3 className="text-lg font-semibold tracking-tight mb-2 text-primary leading-snug">
                        {event.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted mb-4 line-clamp-3">
                        {event.description}
                      </p>

                      <div className="space-y-1.5 mb-5">
                        {[
                          { icon: ClockIcon,  text: event.time },
                          { icon: MapPinIcon, text: event.location },
                          { icon: UsersIcon,  text: `${event.spotsLeft} spots remaining` },
                        ].map(({ icon: Icon, text }) => (
                          <div key={text} className="flex items-center gap-2 text-xs text-muted">
                            <Icon size={12} />{text}
                          </div>
                        ))}
                      </div>

                      <div className="mt-auto">
                        <Link
                          href={`/events/${event.id}/register`}
                          className="btn-accent inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm active:scale-[0.98]"
                        >
                          Register <ArrowRightIcon size={14} weight="bold" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ── Register CTA ─────────────────────────────────────────────────────── */}
      <section className="py-24 border-t-default bg-overlay-30">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="register-cta-card relative overflow-hidden rounded-2xl p-10 md:p-14">
              <div className="cta-banner-orb absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none" />
              <div className="relative z-10 max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-accent">
                  Membership
                </p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-primary">
                  Register with us —&nbsp;<br />
                  <span className="text-muted">get early access to everything.</span>
                </h2>
                <p className="text-sm leading-relaxed text-secondary mb-8 max-w-[52ch]">
                  Members get reserved spots, early registrations, exclusive
                  workshop materials, and access to our mentorship programme.
                  Registration is free for all University of Melbourne students.
                </p>
                <div className="flex flex-wrap gap-3 items-center">
                  <Link
                    href="/join"
                    className="btn-accent inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm active:scale-[0.98]"
                  >
                    Join Now <ArrowRightIcon size={15} weight="bold" />
                  </Link>
                  <span className="text-xs text-muted">Free for all UniMelb students</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Never miss an event ──────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 rounded-2xl border-default">
            <div>
              <h3 className="text-xl font-semibold tracking-tight mb-1 text-primary">
                Never miss an event
              </h3>
              <p className="text-sm text-muted">
                Members get early access and reserved spots for every workshop
                and speaker night.
              </p>
            </div>
            <Link
              href="/join"
              className="btn-accent flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm active:scale-[0.98] shrink-0"
            >
              Join Now <ArrowRightIcon size={16} weight="bold" />
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </>
  )
}