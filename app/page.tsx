import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Certificate, Users, Cpu, Handshake } from '@phosphor-icons/react/dist/ssr'
import HeroVisual from '@/components/HeroVisual'
import AnimatedSection from '@/components/AnimatedSection'
import CountUp from '@/components/CountUp'
import CloudMascot from '@/components/CloudMascot'

const awsIcons = [
  'Lambda', 'EC2', 'Route 53', 'EventBridge', 'Fargate',
  'SageMaker Ground Truth', 'Elastic Kubernetes Service',
  'Elastic Load Balancing', 'Redshift', 'Kinesis',
  'API Gateway', 'Glue', 'CodeDeploy', 'Rekognition',
  'OpenSearch Service', 'Elastic Beanstalk',
  'Elastic Container Service', 'CodeGuru',
]

const awsIconsAlt = [
  'Aurora', 'Billing Conductor', 'Chime', 'Cost Explorer',
  'EC2 Auto Scaling', 'EC2 Image Builder', 'FSx', 'HealthLake',
  'MQ', 'Open 3D Engine', 'Outposts servers',
  'Quantum Ledger Database', 'Transit Gateway',
]

const features = [
  {
    icon: Certificate,
    title: 'Cloud Certification Tracks',
    description:
      'Structured learning paths from Cloud Practitioner through to Specialty exams. Study groups, mock exams, and peer mentoring from certified members.',
  },
  {
    icon: Cpu,
    title: 'Hands-On Labs',
    description:
      'Real AWS environments. Build serverless APIs, containerised workloads, and ML pipelines — not just theory.',
  },
  {
    icon: Users,
    title: 'Industry Connections',
    description:
      'Direct access to engineers at Atlassian, Canva, REA Group, and Seek through speaker nights and mentorship programmes.',
  },
  {
    icon: Handshake,
    title: 'Community Network',
    description:
      'A 340+ member community spanning Computer Science, Engineering, IT, and Commerce. Your future colleagues are already here.',
  },
]

const stats = [
  { value: 340, suffix: '+', label: 'Active members'       },
  { value: 47,  suffix: '',  label: 'Events hosted'        },
  { value: 126, suffix: '',  label: 'Certifications earned' },
  { value: 18,  suffix: '',  label: 'Industry partners'    },
]

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden pt-24 pb-12 animated-gradient"
      >
        {/* Soft dark vignette to keep text legible over the moving gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 0%, rgba(10,10,15,0.55) 80%), ' +
              'linear-gradient(to bottom, transparent 70%, var(--color-bg-primary) 100%)',
          }}
        />
        <AnimatedSection delay={0.1} className="flex justify-center w-full relative z-10">
          <HeroVisual />
        </AnimatedSection>

        <AnimatedSection delay={0.25} className="w-full relative z-10">
          <div className="flex flex-col items-center text-center px-6 mt-8">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05] mb-6"
              style={{ color: '#F0ECFF' }}
            >
              Welcome to AWS
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/join"
                className="btn-accent flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm active:scale-[0.98]"
              >
                Join the Club <ArrowRight size={16} weight="bold" />
              </Link>
              <Link
                href="/events"
                className="btn-ghost flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm"
              >
                View Events
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ── Icon Marquee (reverse) ─────────────────────────────────────── */}
      <section
        className="py-4 overflow-hidden"
        style={{
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
          background: 'rgba(18,16,30,0.5)',
        }}
      >
        <div className="animate-marquee-reverse whitespace-nowrap flex items-center">
          {[...awsIconsAlt, ...awsIconsAlt].map((name, i) => (
            <span key={i} className="inline-flex items-center mx-6 shrink-0">
              <Image
                src={`/aws-icons/${name}.png`}
                alt={name}
                width={56}
                height={56}
                className="rounded-xl brightness-125 saturate-150"
              />
            </span>
          ))}
        </div>
      </section>

      {/* ── Mascot Introduction ────────────────────────────────────────── */}
      <section className="py-28 px-6 md:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <AnimatedSection delay={0.1} className="flex-1">
            <div className="flex flex-col items-start text-left">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#8B5CF6' }}>
                Say hello
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight mb-4" style={{ color: '#F0ECFF' }}>
                Meet our mascot, Cloudy!
              </h2>
              <p className="text-base md:text-lg leading-relaxed max-w-[48ch]" style={{ color: '#5C5275' }}>
                Your friendly guide through the world of AWS.
              </p>
            </div>
          </AnimatedSection>
          <div className="shrink-0">
            <CloudMascot size={500} />
          </div>
        </div>
      </section>

      {/* ── Marquee ──────────────────────────────────────────────────────── */}
      <section
        className="py-4 overflow-hidden"
        style={{
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
          background: 'rgba(18,16,30,0.5)',
        }}
      >
        <div className="animate-marquee whitespace-nowrap flex items-center">
          {[...awsIcons, ...awsIcons].map((name, i) => (
            <span key={i} className="inline-flex items-center mx-6 shrink-0">
              <Image
                src={`/aws-icons/${name}.png`}
                alt={name}
                width={56}
                height={56}
                className="rounded-xl brightness-125 saturate-150"
              />
            </span>
          ))}
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section className="py-28 max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#8B5CF6' }}>
              What we do
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight" style={{ color: '#F0ECFF' }}>
              Everything you need to
              <br /><span style={{ color: '#5C5275' }}>go deep on AWS.</span>
            </h2>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feat, i) => {
            const Icon = feat.icon
            return (
              <AnimatedSection key={feat.title} delay={i * 0.08}>
                <div
                  className="card-interactive card-glow h-full p-8 rounded-2xl"
                  style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-6"
                    style={{ background: 'rgba(107,63,212,0.12)', border: '1px solid rgba(139,92,246,0.2)' }}
                  >
                    <Icon size={20} weight="duotone" style={{ color: '#8B5CF6' }} />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 tracking-tight" style={{ color: '#F0ECFF' }}>
                    {feat.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#5C5275' }}>
                    {feat.description}
                  </p>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section
        className="py-20"
        style={{
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
          background: 'rgba(18,16,30,0.4)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((s, i) => (
              <AnimatedSection key={s.label} delay={i * 0.07}>
                <div>
                  <p className="text-4xl md:text-5xl font-bold tracking-tighter tabular-nums mb-2" style={{ color: '#F0ECFF' }}>
                    <CountUp target={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-sm" style={{ color: '#5C5275' }}>{s.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div
            className="relative overflow-hidden rounded-3xl p-12 md:p-16"
            style={{
              background: 'linear-gradient(135deg, #1A1535 0%, #12101E 60%, #0A0A0F 100%)',
              border: '1px solid rgba(139,92,246,0.2)',
              boxShadow: '0 0 60px rgba(107,63,212,0.1)',
            }}
          >
            <div
              className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(107,63,212,0.12) 0%, transparent 70%)',
                transform: 'translate(30%, -30%)',
              }}
            />
            <div className="relative z-10 max-w-[56ch]">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#8B5CF6' }}>
                Get started
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-6" style={{ color: '#F0ECFF' }}>
                Ready to build on
                <br />the cloud?
              </h2>
              <p className="text-base leading-relaxed mb-10" style={{ color: '#A99CC0' }}>
                Applications are open every semester. Join 340+ students already
                building, learning, and connecting through AWS.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/join"
                  className="btn-accent flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm active:scale-[0.98]"
                >
                  Apply Now <ArrowRight size={16} weight="bold" />
                </Link>
                <Link href="/about" className="btn-ghost flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm">
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </>
  )
}
