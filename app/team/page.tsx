import AnimatedSection from '@/components/AnimatedSection'
import TeamCard from '@/components/TeamCard'

const team = [
  {
    name: 'Priya Mehta',
    role: 'Club President',
    bio: 'Final-year Computer Science student. AWS Solutions Architect Professional certified. Previously interned at Atlassian on their infrastructure team.',
    certifications: ['SAP', 'CCP'],
    initials: 'PM',
    hue: 'rgba(107,63,212,',
  },
  {
    name: 'Marcus Chen',
    role: 'Vice President',
    bio: 'Software Engineering student specialising in distributed systems. AWS Developer Associate certified. Building developer tooling at a Melbourne startup.',
    certifications: ['DVA', 'CCP'],
    initials: 'MC',
    hue: 'rgba(59,130,246,',
  },
  {
    name: 'Aisha Rahman',
    role: 'Technical Lead',
    bio: 'Specialises in ML infrastructure and data pipelines on AWS. AWS Machine Learning Specialty certified. Research assistant at the Melbourne ML Lab.',
    certifications: ['MLS', 'SAA', 'CCP'],
    initials: 'AR',
    hue: 'rgba(16,185,129,',
  },
  {
    name: 'Lucas Fernandez',
    role: 'Events Director',
    bio: 'Information Systems student who makes sure every event runs without a glitch. Coordinates workshops, speaker nights, and club socials across the year.',
    certifications: ['CCP'],
    initials: 'LF',
    hue: 'rgba(139,92,246,',
  },
  {
    name: 'Nina Okafor',
    role: 'Cloud Architect Lead',
    bio: "Masters student in IT. Focuses on multi-account AWS architectures and Well-Architected Framework reviews. Previously at a Big 4 consulting firm.",
    certifications: ['SAA', 'ANS', 'SCS'],
    initials: 'NO',
    hue: 'rgba(239,68,68,',
  },
  {
    name: 'Jayden Wu',
    role: 'DevOps Lead',
    bio: 'Passionate about CI/CD pipelines, Infrastructure-as-Code, and AWS CDK. AWS DevOps Engineer Professional certified. Open-source contributor.',
    certifications: ['DOP', 'SAA', 'DVA'],
    initials: 'JW',
    hue: 'rgba(245,158,11,',
  },
  {
    name: 'Sophie Nakamura',
    role: 'Community Manager',
    bio: 'Builds connections across the Melbourne tech scene. Manages partnerships with other student societies, graduate programmes, and industry groups.',
    certifications: ['CCP'],
    initials: 'SN',
    hue: 'rgba(236,72,153,',
  },
  {
    name: 'Ravi Sharma',
    role: 'Partnerships Lead',
    bio: 'Connects the club with companies actively hiring cloud engineers. Negotiates AWS credit allocations and organises workshop sponsorships.',
    certifications: ['SAA', 'SCS'],
    initials: 'RS',
    hue: 'rgba(20,184,166,',
  },
]

export default function TeamPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-40 pb-20 grid-bg overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 80% 40%, rgba(107,63,212,0.08), transparent 65%), var(--color-bg-primary)',
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to top, var(--color-bg-primary), transparent)' }} />
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: '#8B5CF6' }}>The team</p>
          </AnimatedSection>
          <AnimatedSection delay={0.06}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.02] max-w-3xl mb-6" style={{ color: '#F0ECFF' }}>
              The people
              <br /><span style={{ color: '#5C5275' }}>behind the club.</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.12}>
            <p className="text-base leading-relaxed max-w-[52ch]" style={{ color: '#A99CC0' }}>
              A committee of eight students dedicated to building Melbourne&apos;s
              strongest AWS learning community from the ground up.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Team grid — uses client TeamCard for per-card color hover */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {team.map((member, i) => (
            <AnimatedSection key={member.name} delay={i * 0.07}>
              <TeamCard {...member} />
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Join the team */}
      <section className="py-24" style={{ borderTop: '1px solid var(--color-border)', background: 'rgba(18,16,30,0.3)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <AnimatedSection direction="left" className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#8B5CF6' }}>
                Committee applications
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight mb-4" style={{ color: '#F0ECFF' }}>
                Want to help lead the club?
              </h2>
              <p className="text-base leading-relaxed max-w-[50ch]" style={{ color: '#A99CC0' }}>
                Committee applications open at the start of each semester. We look for initiative, a genuine
                interest in cloud technology, and the drive to build something meaningful for the community.
              </p>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.1} className="lg:col-span-5">
              <div className="space-y-3">
                {[
                  'Open to all UniMelb students',
                  'No prior experience required',
                  'Committee training provided',
                  'Direct industry exposure',
                ].map(point => (
                  <div key={point} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#8B5CF6' }} />
                    <span className="text-sm" style={{ color: '#A99CC0' }}>{point}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  )
}
