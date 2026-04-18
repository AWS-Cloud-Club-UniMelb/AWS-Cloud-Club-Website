import Link from 'next/link'
import { CalendarBlank, MapPin, Users, ArrowRight, Clock } from '@phosphor-icons/react/dist/ssr'
import AnimatedSection from '@/components/AnimatedSection'

const upcoming = [
  {
    id: 'cert-sprint-apr',
    title: 'AWS Certification Sprint',
    date: 'April 22, 2025',
    time: '10:00 AM – 4:00 PM',
    location: 'Engineering Building, Room 310',
    category: 'Study Session',
    description:
      'Intensive full-day preparation for the AWS Cloud Practitioner and Solutions Architect Associate exams. Practice tests, small-group study, and one-on-one mentoring from exam-certified members.',
    spotsLeft: 12,
    categoryColor: '#3B82F6',
  },
  {
    id: 'speaker-night-may',
    title: 'Industry Speaker Night: Cloud at Scale',
    date: 'May 7, 2025',
    time: '6:00 PM – 8:30 PM',
    location: 'Alan Gilbert Building, Theatre 1',
    category: 'Speaker Event',
    description:
      'Senior engineers from Atlassian, Canva, and REA Group talk candidly about running cloud infrastructure at millions-of-requests-per-day scale. Networking and drinks to follow.',
    spotsLeft: 47,
    categoryColor: '#10B981',
  },
  {
    id: 'hackathon-jun',
    title: 'AWS Solutions Architecture Hackathon',
    date: 'June 14–15, 2025',
    time: '48-hour event',
    location: 'Melbourne Connect',
    category: 'Hackathon',
    description:
      'Architect and deploy a fully operational cloud solution on AWS over 48 hours. $2,000 in cash prizes plus $5,000 in AWS credits for the top three teams. Open to all skill levels.',
    spotsLeft: 31,
    categoryColor: '#8B5CF6',
  },
]

const past = [
  {
    id: 'reinvent-dec24',
    title: 'AWS re:Invent 2024 Watch Party',
    date: 'December 3, 2024',
    location: 'Engineering Block, Level 3',
    category: 'Community',
    attendees: 83,
    highlight: 'Full-day keynote screenings with live commentary, catering, and a lightning-round trivia session.',
    categoryColor: '#E8902A',
  },
  {
    id: 'security-feb25',
    title: 'Cloud Security Workshop',
    date: 'February 12, 2025',
    location: 'Baldwin Spencer Building, Room 238',
    category: 'Workshop',
    attendees: 41,
    highlight: 'Deep dive into AWS IAM, VPC security groups, GuardDuty, and Security Hub with live demos.',
    categoryColor: '#F59E0B',
  },
  {
    id: 'serverless-mar25',
    title: 'Serverless Architecture Deep Dive',
    date: 'March 4, 2025',
    location: 'Digital Learning Hub',
    category: 'Technical',
    attendees: 56,
    highlight: 'Built a fully serverless e-commerce backend using Lambda, API Gateway, DynamoDB, and EventBridge.',
    categoryColor: '#EC4899',
  },
]

function CategoryBadge({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider"
      style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}
    >
      {label}
    </span>
  )
}

export default function EventsPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-40 pb-20 grid-bg overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 20% 70%, rgba(61,31,163,0.14), transparent 65%), var(--color-bg-primary)',
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to top, var(--color-bg-primary), transparent)' }} />
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: '#8B5CF6' }}>Events</p>
          </AnimatedSection>
          <AnimatedSection delay={0.06}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.02] max-w-3xl mb-6" style={{ color: '#F0ECFF' }}>
              Workshops, talks,
              <br /><span style={{ color: '#5C5275' }}>and hackathons.</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.12}>
            <p className="text-base leading-relaxed max-w-[52ch]" style={{ color: '#A99CC0' }}>
              Events run every fortnight throughout semester. All are free for members unless otherwise noted.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Upcoming */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-12">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#8B5CF6' }} />
            <h2 className="text-2xl font-bold tracking-tighter" style={{ color: '#F0ECFF' }}>Upcoming</h2>
          </div>
        </AnimatedSection>

        {/* Featured first event */}
        <AnimatedSection className="mb-4">
          <div
            className="relative overflow-hidden rounded-2xl p-8 md:p-10"
            style={{
              background: 'linear-gradient(135deg, #1A1535 0%, #12101E 70%)',
              border: '1px solid rgba(139,92,246,0.25)',
              boxShadow: '0 0 40px rgba(107,63,212,0.1)',
            }}
          >
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(107,63,212,0.1) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-3 mb-5">
                  <CategoryBadge label={upcoming[0].category} color={upcoming[0].categoryColor} />
                  <span className="text-xs font-mono" style={{ color: '#5C5275' }}>{upcoming[0].date}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4" style={{ color: '#F0ECFF' }}>
                  {upcoming[0].title}
                </h3>
                <p className="text-sm leading-relaxed mb-6 max-w-[58ch]" style={{ color: '#A99CC0' }}>
                  {upcoming[0].description}
                </p>
                <div className="flex flex-wrap gap-5">
                  {[
                    { icon: Clock,  text: upcoming[0].time     },
                    { icon: MapPin, text: upcoming[0].location },
                    { icon: Users,  text: `${upcoming[0].spotsLeft} spots remaining` },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-xs" style={{ color: '#5C5275' }}>
                      <Icon size={13} />{text}
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <Link href="/join" className="btn-accent inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm active:scale-[0.98]">
                  Register <ArrowRight size={14} weight="bold" />
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Remaining */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcoming.slice(1).map((event, i) => (
            <AnimatedSection key={event.id} delay={i * 0.08}>
              <div className="card-interactive h-full p-7 rounded-2xl" style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
                <div className="mb-4">
                  <CategoryBadge label={event.category} color={event.categoryColor} />
                </div>
                <h3 className="text-lg font-semibold tracking-tight mb-3" style={{ color: '#F0ECFF' }}>{event.title}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: '#5C5275' }}>{event.description}</p>
                <div className="space-y-2 mb-6">
                  {[
                    { icon: CalendarBlank, text: event.date     },
                    { icon: Clock,         text: event.time     },
                    { icon: MapPin,        text: event.location },
                    { icon: Users,         text: `${event.spotsLeft} spots remaining` },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-2 text-xs" style={{ color: '#5C5275' }}>
                      <Icon size={12} />{text}
                    </div>
                  ))}
                </div>
                <Link href="/join" className="inline-flex items-center gap-2 text-xs font-semibold" style={{ color: '#8B5CF6' }}>
                  Register <ArrowRight size={12} weight="bold" />
                </Link>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Past events */}
      <section className="py-20" style={{ borderTop: '1px solid var(--color-border)', background: 'rgba(18,16,30,0.3)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-2xl font-bold tracking-tighter mb-12" style={{ color: '#5C5275' }}>Past Events</h2>
          </AnimatedSection>
          <div className="space-y-px rounded-2xl overflow-hidden" style={{ background: 'var(--color-border)' }}>
            {past.map((event, i) => (
              <AnimatedSection key={event.id} delay={i * 0.06}>
                <div className="card-hover-bg p-6 md:p-8 transition-colors duration-300" style={{ background: 'var(--color-bg-primary)' }}>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                    <div className="md:col-span-8">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <CategoryBadge label={event.category} color={event.categoryColor} />
                        <span className="text-xs font-mono" style={{ color: '#5C5275' }}>{event.date}</span>
                      </div>
                      <h3 className="text-base font-semibold tracking-tight mb-2" style={{ color: '#A99CC0' }}>{event.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: '#5C5275' }}>{event.highlight}</p>
                    </div>
                    <div className="md:col-span-4 md:text-right space-y-1">
                      <div className="flex items-center gap-2 text-xs md:justify-end" style={{ color: '#5C5275' }}>
                        <MapPin size={12} />{event.location}
                      </div>
                      <div className="flex items-center gap-2 text-xs md:justify-end" style={{ color: '#5C5275' }}>
                        <Users size={12} />{event.attendees} attended
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 rounded-2xl" style={{ border: '1px solid var(--color-border)' }}>
            <div>
              <h3 className="text-xl font-semibold tracking-tight mb-1" style={{ color: '#F0ECFF' }}>Never miss an event</h3>
              <p className="text-sm" style={{ color: '#5C5275' }}>
                Members get early access and reserved spots for every workshop and speaker night.
              </p>
            </div>
            <Link href="/join" className="btn-accent flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm active:scale-[0.98] shrink-0">
              Join Now <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </>
  )
}
