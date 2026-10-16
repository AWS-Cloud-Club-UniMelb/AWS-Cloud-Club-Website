import Link from "next/link";
import { UMSU_JOIN_URL } from "@/lib/links";
import Image from "next/image";
import {
  ArrowRight,
  Certificate,
  Users,
  Cpu,
  Handshake,
} from "@phosphor-icons/react/dist/ssr";
import HeroVisual from "@/components/HeroVisual";
import AnimatedSection from "@/components/AnimatedSection";
import CountUp from "@/components/CountUp";
import CloudMascot from "@/components/CloudMascot";
import HomeVideoCarousel from "@/components/HomeVideoCarousel";

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
      "A 50+ member community spanning Computer Science, Engineering, IT, and Commerce. Your future colleagues are already here.",
  },
];

const stats = [
  { value: 50, suffix: "+", label: "Active members" },
  { value: 30, suffix: "+", label: "Events & workshops hosted" },
  { value: 10, suffix: "+", label: "Certifications earned" },
  { value: 3, suffix: "", label: "Industry partners" },
];

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
                href={UMSU_JOIN_URL} target="_blank" rel="noopener noreferrer"
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

      {/* ── Event Video Carousel ───────────────────────────────────────── */}
      <section id="in-action" className="py-24 scroll-mt-nav border-t-default bg-overlay-30">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex items-end justify-between gap-4 mb-12">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-accent">
                  On the ground
                </p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-primary">
                  See us in action
                </h2>
              </div>
              <Link
                href="/events#past"
                className="btn-ghost hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm"
              >
                All events <ArrowRight size={14} weight="bold" />
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.08}>
            <HomeVideoCarousel />
          </AnimatedSection>
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
                Applications are open every semester. Join 50+ students already
                building, learning, and connecting through AWS.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={UMSU_JOIN_URL} target="_blank" rel="noopener noreferrer"
                  className="btn-accent flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm active:scale-[0.98]"
                >
                  Apply Now <ArrowRight size={16} weight="bold" />
                </Link>
                <Link
                  href="/events"
                  className="btn-ghost flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm"
                >
                  View events
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
