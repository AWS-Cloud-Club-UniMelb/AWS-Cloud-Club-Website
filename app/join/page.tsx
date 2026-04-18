import { CheckCircle, Certificate, Users, Cpu, Handshake, Lightning } from '@phosphor-icons/react/dist/ssr'
import AnimatedSection from '@/components/AnimatedSection'
import JoinForm from '@/components/JoinForm'

const benefits = [
  {
    icon: Certificate,
    title: 'AWS Certification Support',
    description: 'Study groups, mock exams, and peer mentoring structured around every AWS certification path.',
  },
  {
    icon: Cpu,
    title: 'AWS Credits & Lab Access',
    description: 'Free AWS environment credits for hands-on labs and personal cloud projects throughout the year.',
  },
  {
    icon: Users,
    title: 'Industry Mentorship',
    description: "Paired one-on-one with certified AWS professionals from Melbourne's tech industry each semester.",
  },
  {
    icon: Handshake,
    title: 'Hiring Pipeline',
    description: 'Direct introductions to companies actively recruiting cloud engineers, architects, and DevOps talent.',
  },
  {
    icon: Lightning,
    title: 'Priority Event Access',
    description: 'Reserved spots and early registration for all workshops, speaker nights, and hackathons.',
  },
]

const steps = [
  { step: '01', title: 'Submit your application', description: 'Fill in the form with your details and a short introduction.' },
  { step: '02', title: 'We review and respond',   description: 'Expect a response within 3 business days. We welcome all skill levels.' },
  { step: '03', title: 'Onboarding session',      description: 'Attend a short onboarding session to meet the team and get set up.' },
  { step: '04', title: 'Start building',          description: 'Access the member portal, join the Slack workspace, and register for your first event.' },
]

export default function JoinPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-40 pb-20 grid-bg overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(107,63,212,0.1), transparent 65%), var(--color-bg-primary)',
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to top, var(--color-bg-primary), transparent)' }} />
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: '#8B5CF6' }}>Membership</p>
          </AnimatedSection>
          <AnimatedSection delay={0.06}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.02] max-w-3xl mb-6" style={{ color: '#F0ECFF' }}>
              Join the club.
              <br /><span style={{ color: '#5C5275' }}>It&apos;s free.</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.12}>
            <p className="text-base leading-relaxed max-w-[52ch]" style={{ color: '#A99CC0' }}>
              Membership is open to all current University of Melbourne students at no cost.
              No prior cloud experience required.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Benefits + Form */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <AnimatedSection direction="left">
              <h2 className="text-2xl font-bold tracking-tighter mb-8" style={{ color: '#F0ECFF' }}>Member benefits</h2>
            </AnimatedSection>
            <div className="space-y-4">
              {benefits.map((b, i) => {
                const Icon = b.icon
                return (
                  <AnimatedSection key={b.title} direction="left" delay={i * 0.07}>
                    <div className="flex gap-4 p-5 rounded-xl" style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: 'rgba(107,63,212,0.12)', border: '1px solid rgba(139,92,246,0.2)' }}>
                        <Icon size={17} weight="duotone" style={{ color: '#8B5CF6' }} />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold mb-1 tracking-tight" style={{ color: '#F0ECFF' }}>{b.title}</h3>
                        <p className="text-xs leading-relaxed" style={{ color: '#5C5275' }}>{b.description}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                )
              })}
            </div>
          </div>
          <div className="lg:col-span-7">
            <AnimatedSection direction="right">
              <JoinForm />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24" style={{ borderTop: '1px solid var(--color-border)', background: 'rgba(18,16,30,0.3)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="mb-14">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#8B5CF6' }}>What happens next</p>
              <h2 className="text-4xl font-bold tracking-tighter" style={{ color: '#F0ECFF' }}>Onboarding in four steps.</h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((s, i) => (
              <AnimatedSection key={s.step} delay={i * 0.08}>
                <div className="p-7 rounded-2xl h-full" style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
                  <p className="font-mono text-xs font-bold mb-4 tracking-widest" style={{ color: 'rgba(139,92,246,0.4)' }}>{s.step}</p>
                  <h3 className="font-semibold tracking-tight mb-3" style={{ color: '#F0ECFF' }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#5C5275' }}>{s.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tighter" style={{ color: '#F0ECFF' }}>Common questions</h2>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              q: 'Do I need cloud experience to join?',
              a: 'No. Many of our most engaged members joined with zero cloud experience. We have beginner-friendly content at every event and dedicated onboarding.',
            },
            {
              q: 'Is membership really free?',
              a: 'Yes. Membership is fully free for all current UniMelb students. Some events have optional paid meals — those are clearly marked.',
            },
            {
              q: 'How active do I need to be?',
              a: 'There is no attendance requirement. Come to what you find valuable. The more you show up, the more you get out of the network.',
            },
            {
              q: 'Can postgraduate students join?',
              a: 'Absolutely. We have a strong cohort of Masters and PhD students, many of whom bring deep expertise to our technical workshops.',
            },
            {
              q: 'How do I get AWS credits?',
              a: 'Credits are allocated via the AWS Cloud Club Partner Programme. Members can request them through the member portal after onboarding.',
            },
            {
              q: 'When are applications open?',
              a: 'Applications are open year-round. We do a batch review at the start of each semester, but you can apply at any time.',
            },
          ].map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.05}>
              <div className="faq-card p-6 rounded-xl">
                <div className="flex items-start gap-3 mb-3">
                  <CheckCircle size={16} weight="fill" style={{ color: '#8B5CF6', marginTop: 2, flexShrink: 0 }} />
                  <h3 className="text-sm font-semibold" style={{ color: '#F0ECFF' }}>{item.q}</h3>
                </div>
                <p className="text-sm leading-relaxed pl-7" style={{ color: '#5C5275' }}>{item.a}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>
    </>
  )
}
