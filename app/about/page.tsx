import Link from 'next/link'
import { ArrowRight, Wrench, Graph, Seal, Heart } from '@phosphor-icons/react/dist/ssr'
import AnimatedSection from '@/components/AnimatedSection'

const timeline = [
  {
    year: '2022',
    title: 'Founded',
    description:
      'Twelve students started informal AWS study sessions in the Engineering Building basement. The club was formally registered with the University of Melbourne Student Union.',
  },
  {
    year: '2023',
    title: 'AWS Partner Status',
    description:
      'Accepted into the AWS Cloud Club Partner Programme, granting members access to AWS credits, official training materials, and direct support from AWS education teams.',
  },
  {
    year: '2024',
    title: 'Scale',
    description:
      'Membership surpassed 200 students. Launched structured certification programmes and partnered with eight Melbourne-based tech companies for speaker events and hiring pipelines.',
  },
  {
    year: '2025',
    title: 'Today',
    description:
      '340+ active members across four faculties. Running workshops every fortnight, bi-annual hackathons, and a mentorship programme pairing students with certified cloud engineers.',
  },
]

const values = [
  {
    icon: Wrench,
    label: 'Build',
    description: 'We believe in learning by doing. Every workshop ends with something deployed in a real AWS environment.',
  },
  {
    icon: Graph,
    label: 'Connect',
    description: "Melbourne's tech industry is closer than it looks. We open the door to engineers, CTOs, and recruiters actively hiring cloud talent.",
  },
  {
    icon: Seal,
    label: 'Certify',
    description: "AWS certifications change careers. We provide the structure, resources, and community to get you there — at any pace.",
  },
  {
    icon: Heart,
    label: 'Include',
    description: 'You do not need prior cloud experience to join. We welcome students from all disciplines, skill levels, and backgrounds.',
  },
]

const activities = [
  {
    title: 'Fortnightly Workshops',
    description: 'Hands-on sessions covering Lambda, EC2, IAM, CDK, and beyond. Technical depth for intermediate builders alongside beginner tracks run in parallel.',
  },
  {
    title: 'Certification Sprints',
    description: 'Focused multi-week programmes aligned to AWS exams. Practice tests, group study, and one-on-one support from exam-certified members.',
  },
  {
    title: 'Industry Speaker Nights',
    description: 'Engineers from Atlassian, Canva, REA Group, Seek, and others share how cloud infrastructure runs at production scale.',
  },
  {
    title: 'Hackathons',
    description: '48-hour challenges to architect and ship real solutions on AWS. Cash prizes, AWS credits, and judging by industry professionals.',
  },
  {
    title: 'Mentorship Programme',
    description: 'Paired one-on-one with a certified AWS professional for a full semester. Career advice, technical guidance, and direct industry exposure.',
  },
  {
    title: 'Social Events',
    description: 'Regular casual meetups, trivia nights, and end-of-semester celebrations. Cloud is serious work — but it does not have to be serious all the time.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-[60dvh] grid-bg flex items-end overflow-hidden pt-32 pb-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 30% 60%, rgba(61,31,163,0.15), transparent 65%), var(--color-bg-primary)',
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to top, var(--color-bg-primary), transparent)' }} />
        <div className="max-w-7xl mx-auto px-6 w-full pb-20">
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: '#8B5CF6' }}>About</p>
          </AnimatedSection>
          <AnimatedSection delay={0.06}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.02] max-w-4xl" style={{ color: '#F0ECFF' }}>
              We build real things
              <br /><span style={{ color: '#5C5275' }}>on the cloud.</span>
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <AnimatedSection direction="left" className="lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: '#8B5CF6' }}>Our mission</p>
            <h2 className="text-3xl font-bold tracking-tighter leading-tight" style={{ color: '#F0ECFF' }}>
              Bridge the gap between academic theory and real cloud practice.
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.1} className="lg:col-span-7">
            <div className="space-y-5 text-base leading-relaxed" style={{ color: '#A99CC0' }}>
              <p>
                University curricula teach you to think like an engineer. The AWS Cloud Club teaches you to build like one.
                Our programmes are designed around the tools, architectures, and workflows running production systems in Melbourne right now.
              </p>
              <p>
                Whether you are preparing for your first certification, designing distributed systems, or trying to land
                your first cloud role — this community exists to accelerate that journey.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24" style={{ background: 'rgba(18,16,30,0.4)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-widest mb-12" style={{ color: '#8B5CF6' }}>Our history</p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((item, i) => (
              <AnimatedSection key={item.year} delay={i * 0.08}>
                <div className="p-6 rounded-2xl h-full" style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
                  <p className="font-mono text-sm font-bold mb-3" style={{ color: '#8B5CF6' }}>{item.year}</p>
                  <h3 className="font-semibold text-base mb-3 tracking-tight" style={{ color: '#F0ECFF' }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#5C5275' }}>{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="mb-14">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#8B5CF6' }}>Our values</p>
            <h2 className="text-4xl font-bold tracking-tighter" style={{ color: '#F0ECFF' }}>What we stand for.</h2>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {values.map((value, i) => {
            const Icon = value.icon
            return (
              <AnimatedSection key={value.label} delay={i * 0.07}>
                <div className="card-interactive flex gap-5 p-7 rounded-2xl" style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: 'rgba(107,63,212,0.12)', border: '1px solid rgba(139,92,246,0.2)' }}>
                    <Icon size={18} weight="duotone" style={{ color: '#8B5CF6' }} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2 tracking-tight" style={{ color: '#F0ECFF' }}>{value.label}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#5C5275' }}>{value.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </section>

      {/* Programmes */}
      <section className="py-24" style={{ borderTop: '1px solid var(--color-border)', background: 'rgba(18,16,30,0.3)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="mb-14">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#8B5CF6' }}>Our programmes</p>
              <h2 className="text-4xl font-bold tracking-tighter" style={{ color: '#F0ECFF' }}>How we run the club.</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden"
            style={{ background: 'var(--color-border)' }}>
            {activities.map((a, i) => (
              <AnimatedSection key={a.title} delay={i * 0.06}>
                <div className="card-hover-bg h-full p-8 transition-colors duration-300" style={{ background: 'var(--color-bg-primary)' }}>
                  <h3 className="font-semibold mb-3 tracking-tight" style={{ color: '#F0ECFF' }}>{a.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#5C5275' }}>{a.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 rounded-2xl" style={{ border: '1px solid var(--color-border)' }}>
            <div>
              <h3 className="text-xl font-semibold tracking-tight mb-1" style={{ color: '#F0ECFF' }}>Interested in joining?</h3>
              <p className="text-sm" style={{ color: '#5C5275' }}>Applications are open to all University of Melbourne students.</p>
            </div>
            <Link href="/join" className="btn-accent flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm active:scale-[0.98] shrink-0">
              Apply Now <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </>
  )
}
