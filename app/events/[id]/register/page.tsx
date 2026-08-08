import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeftIcon,
  CalendarBlankIcon,
  ClockIcon,
  MapPinIcon,
  UsersIcon,
  CheckCircleIcon,
} from '@phosphor-icons/react/dist/ssr'
import AnimatedSection from '@/components/AnimatedSection'
import EventRegisterForm from '@/components/EventRegisterForm'
import { getUpcomingEvents } from '@/app/events/data'

function CategoryBadge({ label, tone }: { label: string; tone: string }) {
  return <span className={`badge badge-tone tone-${tone}`}>{label}</span>
}

export async function generateStaticParams() {
  const events = await getUpcomingEvents()
  return events.map(e => ({ id: e.id }))
}

export default async function EventRegisterPage(props: PageProps<'/events/[id]/register'>) {
  const { id } = await props.params
  const events = await getUpcomingEvents()
  const event = events.find(e => e.id === id)
  if (!event) notFound()

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className={`hero-events-bg relative pt-40 pb-20 grid-bg overflow-hidden tone-${event.categoryTone}`}>
        <div className="bottom-fade absolute bottom-0 left-0 right-0 h-32 pointer-events-none" />
        <div className="event-detail-orb absolute top-0 right-0 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <Link
              href="/events#upcoming"
              className="inline-flex items-center gap-2 text-xs text-muted mb-8 event-back-link"
            >
              <ArrowLeftIcon size={13} weight="bold" /> Back to Events
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={0.04}>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <CategoryBadge label={event.category} tone={event.categoryTone} />
              <span className="font-mono text-xs text-muted">{event.date}</span>
              <span className="badge badge-tone tone-green">Open</span>
              {event.isHybrid && (
                <span className="badge badge-tone tone-blue">Hybrid</span>
              )}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.08}>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter leading-[1.05] max-w-4xl mb-6 text-primary">
              {event.title}
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={0.12}>
            <div className="flex flex-wrap gap-5">
              <div className="flex items-center gap-2 text-sm text-muted">
                <CalendarBlankIcon size={14} />{event.date}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <ClockIcon size={14} />{event.time}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <MapPinIcon size={14} />{event.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted">
                <UsersIcon size={14} />{event.spotsLeft} spots remaining
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Form + Sidebar ───────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Registration form */}
          <AnimatedSection direction="left" className="lg:col-span-7">
            <EventRegisterForm
              event={{
                id: event.id,
                title: event.title,
                date: event.date,
                time: event.time,
                location: event.location,
                spotsLeft: event.spotsLeft,
                category: event.category,
                categoryTone: event.categoryTone,
                isHybrid: event.isHybrid,
              }}
            />
          </AnimatedSection>

          {/* Sidebar */}
          <div className="lg:col-span-5">
            <AnimatedSection direction="right" delay={0.08}>
              <div className="space-y-4 sticky top-28">

                {/* Event details */}
                <div className="p-6 rounded-2xl bg-card border-default">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-5 text-accent">
                    Event details
                  </p>
                  <div className="space-y-4">
                    {[
                      { icon: CalendarBlankIcon, label: 'Date',       text: event.date },
                      { icon: ClockIcon,         label: 'Time',       text: event.time },
                      { icon: MapPinIcon,        label: 'Location',   text: event.location },
                      { icon: UsersIcon,         label: 'Spots left', text: `${event.spotsLeft} remaining` },
                    ].map(({ icon: Icon, label, text }) => (
                      <div key={label} className="flex items-start gap-3">
                        <Icon size={14} className="text-accent mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] text-muted uppercase tracking-wide">{label}</p>
                          <p className="text-sm text-secondary">{text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* About this event */}
                <div className="p-6 rounded-2xl bg-card border-default">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-accent">
                    About
                  </p>
                  <p className="text-sm leading-relaxed text-secondary line-clamp-5">
                    {event.description}
                  </p>
                </div>

                {/* Perks */}
                <div className="p-6 rounded-2xl bg-card border-default">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-accent">
                    What you get
                  </p>
                  <ul className="space-y-2.5">
                    {[
                      'Free entry — no cost for UniMelb students',
                      'Access to event slides and recordings',
                      'Network with industry professionals',
                      event.isHybrid
                        ? 'Attend in-person or join via Zoom'
                        : 'Hands-on workshop materials included',
                    ].map(perk => (
                      <li key={perk} className="flex items-start gap-2.5 text-xs text-muted">
                        <CheckCircleIcon size={13} className="text-accent mt-0.5 shrink-0" weight="fill" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </AnimatedSection>
          </div>

        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-6 border-t-default">
        <AnimatedSection>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 rounded-2xl border-default">
            <div>
              <h3 className="text-xl font-semibold tracking-tight mb-1 text-primary">
                See more upcoming events
              </h3>
              <p className="text-sm text-muted">
                Browse all sessions, workshops, and speaker nights.
              </p>
            </div>
            <Link
              href="/events#upcoming"
              className="btn-ghost inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm shrink-0"
            >
              <ArrowLeftIcon size={14} weight="bold" /> All events
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </>
  )
}
