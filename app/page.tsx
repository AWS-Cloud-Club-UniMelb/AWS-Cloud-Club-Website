import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  CalendarBlank,
  Certificate,
  Clock,
  MapPin,
  Users,
  Cpu,
  Handshake,
  Lightning,
  Wrench,
  Graph,
  Seal,
} from "@phosphor-icons/react/dist/ssr";
import HeroVisual from "@/components/HeroVisual";
import AnimatedSection from "@/components/AnimatedSection";
import CountUp from "@/components/CountUp";
import CloudMascot from "@/components/CloudMascot";

const awsIcons = [
  "Lambda",
  "EC2",
  "Route 53",
  "EventBridge",
  "Fargate",
  "SageMaker Ground Truth",
  "Elastic Kubernetes Service",
  "Elastic Load Balancing",
  "Redshift",
  "Kinesis",
  "API Gateway",
  "Glue",
  "CodeDeploy",
  "Rekognition",
  "OpenSearch Service",
  "Elastic Beanstalk",
  "Elastic Container Service",
  "CodeGuru",
];

const awsIconsAlt = [
  "Aurora",
  "Billing Conductor",
  "Chime",
  "Cost Explorer",
  "EC2 Auto Scaling",
  "EC2 Image Builder",
  "FSx",
  "HealthLake",
  "MQ",
  "Open 3D Engine",
  "Outposts servers",
  "Quantum Ledger Database",
  "Transit Gateway",
];

const features = [
  {
    icon: Certificate,
    title: "Cloud Certification Tracks",
    description:
      "Structured learning paths from Cloud Practitioner through to Specialty exams. Study groups, mock exams, and peer mentoring from certified members.",
  },
  {
    icon: Cpu,
    title: "Hands-On Labs",
    description:
      "Real AWS environments. Build serverless APIs, containerised workloads, and ML pipelines — not just theory.",
  },
  {
    icon: Users,
    title: "Industry Connections",
    description:
      "Direct access to engineers at Atlassian, Canva, REA Group, and Seek through speaker nights and mentorship programmes.",
  },
  {
    icon: Handshake,
    title: "Community Network",
    description:
      "A 340+ member community spanning Computer Science, Engineering, IT, and Commerce. Your future colleagues are already here.",
  },
];

const stats = [
  { value: 340, suffix: "+", label: "Active members" },
  { value: 47, suffix: "", label: "Events hosted" },
  { value: 126, suffix: "", label: "Certifications earned" },
  { value: 18, suffix: "", label: "Industry partners" },
];

const nextEvent = {
  title: "Industry Speaker Night: Cloud at Scale",
  date: "May 7, 2025",
  time: "6:00 PM – 8:30 PM",
  location: "Alan Gilbert Building, Theatre 1",
  category: "Speaker Event",
  description:
    "Senior engineers share how they run production systems at scale. Stick around after for networking with the committee and industry guests.",
  categoryTone: "green",
};

const projects = [
  {
    icon: Lightning,
    title: "Serverless RSVP System",
    description:
      "A simple event RSVP flow: lightweight form, confirmation emails, and an organiser view to track attendance.",
    services: ["Lambda", "API Gateway", "DynamoDB", "SES"],
    outcome: "Great first project for beginners moving past “hello world”.",
  },
  {
    icon: Wrench,
    title: "CI/CD for Static Sites",
    description:
      "Deploy a front-end safely with previews, release checks, and one-click rollbacks to keep updates stress-free.",
    services: ["GitHub Actions", "S3", "CloudFront"],
    outcome: "Learn real deployment workflows used in industry.",
  },
  {
    icon: Graph,
    title: "Cloud Cost Dashboard (Demo)",
    description:
      "Turn raw cost data into a clean dashboard for tracking spend trends and identifying the biggest cost drivers.",
    services: ["Cost Explorer", "Athena", "QuickSight"],
    outcome: "Perfect for students interested in FinOps and analytics.",
  },
  {
    icon: Seal,
    title: "Security Baseline Checklist",
    description:
      "A practical starter baseline for IAM, logging, and network rules that teams can apply to new AWS accounts.",
    services: ["IAM", "CloudTrail", "GuardDuty", "VPC"],
    outcome: "Build strong security habits early.",
  },
];

function CategoryBadge({ label, tone }: { label: string; tone: string }) {
  return (
    <span className={`badge badge-tone tone-${tone}`}>
      {label}
    </span>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[80dvh] flex flex-col items-center justify-start overflow-hidden pt-2 pb-12 animated-gradient">
        {/* Soft dark vignette to keep text legible over the moving gradient */}
        <div
          className="home-hero-vignette absolute inset-0 pointer-events-none"
        />
        <AnimatedSection
          delay={0.1}
          className="flex justify-center w-full relative z-10"
        >
          <HeroVisual />
        </AnimatedSection>

        <AnimatedSection delay={0.25} className="w-full relative z-10">
          <div className="flex flex-col items-center text-center px-6 mt-8">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.05] mb-6 text-primary"
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
        className="py-4 overflow-hidden border-t-default border-b-default bg-overlay-50"
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
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4 text-accent"
              >
                Say hello
              </p>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight mb-4 text-primary"
              >
                Meet our mascot, Cloudy!
              </h2>
              <p
                className="text-base md:text-lg leading-relaxed max-w-[48ch] text-muted"
              >
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
        className="py-4 overflow-hidden border-t-default border-b-default bg-overlay-50"
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
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4 text-accent"
            >
              What we do
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight text-primary"
            >
              Everything you need to
              <br />
              <span className="text-muted">go deep on AWS.</span>
            </h2>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <AnimatedSection key={feat.title} delay={i * 0.08}>
                <div
                  className="card-interactive card-glow h-full p-8 rounded-2xl bg-card border-default"
                >
                  <div
                    className="icon-chip w-10 h-10 rounded-xl flex items-center justify-center mb-6"
                  >
                    <Icon
                      size={20}
                      weight="duotone"
                      className="text-accent"
                    />
                  </div>
                  <h3
                    className="text-lg font-semibold mb-3 tracking-tight text-primary"
                  >
                    {feat.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed text-muted"
                  >
                    {feat.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section
        className="py-20 border-t-default border-b-default bg-overlay-40"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((s, i) => (
              <AnimatedSection key={s.label} delay={i * 0.07}>
                <div>
                  <p
                    className="text-4xl md:text-5xl font-bold tracking-tighter tabular-nums mb-2 text-primary"
                  >
                    <CountUp target={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-sm text-muted">
                    {s.label}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── What’s On ───────────────────────────────────────────────────── */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="flex items-end justify-between gap-6 mb-12">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4 text-accent"
              >
                What’s on
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold tracking-tighter text-primary"
              >
                Next event.
              </h2>
              <p
                className="text-sm leading-relaxed mt-4 max-w-[64ch] text-secondary"
              >
                We run workshops and speaker nights throughout the semester.
                Here’s what’s coming up next.
              </p>
            </div>
            <Link
              href="/events"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-accent"
            >
              View all events <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div
            className="featured-card relative overflow-hidden rounded-2xl p-8 md:p-10"
          >
            <div
              className="featured-orb absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
            />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-3 mb-5">
                  <CategoryBadge
                    label={nextEvent.category}
                    tone={nextEvent.categoryTone}
                  />
                  <span className="text-xs font-mono text-muted">
                    {nextEvent.date}
                  </span>
                </div>
                <h3
                  className="text-2xl md:text-3xl font-bold tracking-tighter mb-4 text-primary"
                >
                  {nextEvent.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-6 max-w-[60ch] text-secondary"
                >
                  {nextEvent.description}
                </p>
                <div className="flex flex-wrap gap-5">
                  {[
                    { icon: Clock, text: nextEvent.time },
                    { icon: MapPin, text: nextEvent.location },
                    { icon: CalendarBlank, text: "Members-only priority access" },
                  ].map(({ icon: Icon, text }) => (
                    <div
                      key={text}
                      className="flex items-center gap-2 text-xs text-muted"
                    >
                      <Icon size={13} />
                      {text}
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-4 lg:text-right flex flex-col gap-3 items-start lg:items-end">
                <Link
                  href="/events"
                  className="btn-accent inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm active:scale-[0.98]"
                >
                  Register <ArrowRight size={14} weight="bold" />
                </Link>
                <Link
                  href="/events"
                  className="btn-ghost inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm"
                >
                  See details
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <div className="sm:hidden mt-8">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent"
            >
              View all events <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </AnimatedSection>
      </section>

      <section
        id="projects"
        className="scroll-mt-nav py-28 max-w-7xl mx-auto px-6"
      >
        <AnimatedSection>
          <div className="mb-16">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4 text-accent"
            >
              Build with us
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight text-primary"
            >
              Projects that feel real.
              <br />
              <span className="text-muted">
                Not just tutorial clones.
              </span>
            </h2>
            <p
              className="text-sm leading-relaxed mt-5 max-w-[68ch] text-secondary"
            >
              We help members ship small, high-signal projects that demonstrate
              AWS fundamentals: serverless, deployments, security, and cost
              awareness.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p, i) => {
            const Icon = p.icon;
            return (
              <AnimatedSection key={p.title} delay={i * 0.07}>
                <div
                  className="card-interactive card-glow h-full p-8 rounded-2xl bg-card border-default"
                >
                  <div
                    className="icon-chip w-10 h-10 rounded-xl flex items-center justify-center mb-6"
                  >
                    <Icon
                      size={20}
                      weight="duotone"
                      className="text-accent"
                    />
                  </div>
                  <h3
                    className="text-lg font-semibold mb-3 tracking-tight text-primary"
                  >
                    {p.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-5 text-secondary"
                  >
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {p.services.map((s) => (
                      <span
                        key={s}
                        className="tag px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-muted">
                    {p.outcome}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection delay={0.12}>
          <div
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 rounded-2xl border-default bg-overlay-25"
          >
            <div>
              <h3
                className="text-xl font-semibold tracking-tight mb-1 text-primary"
              >
                Want to ship one of these?
              </h3>
              <p className="text-sm text-muted">
                Join the club to get access to workshops, project support, and
                a community that will actually review your work.
              </p>
            </div>
            <Link
              href="/join"
              className="btn-accent flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm active:scale-[0.98] shrink-0"
            >
              Join to Build <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </AnimatedSection>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div
            className="cta-banner relative overflow-hidden rounded-3xl p-12 md:p-16"
          >
            <div
              className="cta-banner-orb absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
            />
            <div className="relative z-10 max-w-[56ch]">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4 text-accent"
              >
                Get started
              </p>
              <h2
                className="text-4xl md:text-5xl font-bold tracking-tighter leading-tight mb-6 text-primary"
              >
                Ready to build on
                <br />
                the cloud?
              </h2>
              <p
                className="text-base leading-relaxed mb-10 text-secondary"
              >
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
                <Link
                  href="/about"
                  className="btn-ghost flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
