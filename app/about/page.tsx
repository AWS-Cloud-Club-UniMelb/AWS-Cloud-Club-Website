import Link from "next/link";
import {
  ArrowRight,
  Wrench,
  Graph,
  Seal,
  Heart,
} from "@phosphor-icons/react/dist/ssr";
import AnimatedSection from "@/components/AnimatedSection";
import CloudMascot from "@/components/CloudMascot";

const timeline = [
  {
    year: "January 2025",
    title: "Founded",
    description:
      "A group of students started informal AWS study sessions and formally registered the club with the University of Melbourne Student Union.",
  },
  {
    year: "March 2025",
    title: "AWS Partner Status",
    description:
      "Accepted into the AWS Cloud Club Partner Programme, granting members access to AWS credits, official training materials, and direct support from AWS education teams.",
  },
  {
    year: "February 2026",
    title: "Growing",
    description:
      "Launched structured certification programmes and began hosting networking nights with representatives from GitHub, Microsoft, and other Melbourne-based tech companies.",
  },
  {
    year: "May 2026",
    title: "Today",
    description:
      "Running weekly workshops aligned to AWS certifications, networking nights, and building a community open to students across all faculties and skill levels.",
  },
];

const values = [
  {
    icon: Wrench,
    label: "Build",
    description:
      "We believe in learning by doing. Every workshop ends with something deployed in a real AWS environment.",
  },
  {
    icon: Graph,
    label: "Connect",
    description:
      "Melbourne's tech industry is closer than it looks. We open the door to engineers, CTOs, and recruiters actively hiring cloud talent.",
  },
  {
    icon: Seal,
    label: "Certify",
    description:
      "AWS certifications change careers. We provide the structure, resources, and community to get you there — at any pace.",
  },
  {
    icon: Heart,
    label: "Include",
    description:
      "You do not need prior cloud experience to join. We welcome students from all disciplines, skill levels, and backgrounds.",
  },
];

const activities = [
  {
    title: "Weekly Workshops",
    description:
      "Hands-on sessions built around the AWS certification path. Beginner-friendly tracks run alongside more technical content for those further along.",
  },
  {
    title: "Certification Sprints",
    description:
      "Focused multi-week programmes aligned to AWS exams. Practice tests, group study, and support from exam-certified members.",
  },
  {
    title: "Networking Nights",
    description:
      "Representatives from GitHub, Microsoft, and other Melbourne-based tech companies join us to share their experience and connect with students.",
  },
  {
    title: "Hackathons",
    description:
      "48-hour challenges to architect and ship real solutions on AWS, judged by industry professionals with hands-on prizes and credits.",
  },
  {
    title: "Mentorship Programme",
    description:
      "Paired one-on-one with a certified AWS professional for a full semester. Career advice, technical guidance, and direct industry exposure.",
  },
  {
    title: "Social Events",
    description:
      "Regular casual meetups and end-of-semester celebrations. Cloud is serious work but it does not have to be serious all the time.",
  },
];

const partners = [
  {
    name: "Atlassian",
    support: "Speaker nights, mentorship, and real-world cloud stories from teams running at scale.",
    focus: "Cloud engineering",
  },
  {
    name: "Canva",
    support: "Technical talks and career pathways for students interested in platform and infrastructure roles.",
    focus: "Platform engineering",
  },
  {
    name: "REA Group",
    support: "Guest sessions on modern architecture patterns and operating reliable systems in production.",
    focus: "Reliability",
  },
  {
    name: "SEEK",
    support: "Networking nights and advice on internships, graduate roles, and building a cloud portfolio.",
    focus: "Career growth",
  },
  {
    name: "GitHub",
    support: "Workshops on developer workflows, CI/CD, and shipping projects end-to-end.",
    focus: "DevEx",
  },
  {
    name: "Microsoft",
    support: "Industry panels and practical guidance on building scalable systems and teams.",
    focus: "Industry insights",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="hero-about-bg relative min-h-[60dvh] grid-bg flex items-center pt-32 pb-0"
      >
        <div className="max-w-7xl mx-auto px-6 w-full pb-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <AnimatedSection>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-5 text-accent"
                >
                  About
                </p>
              </AnimatedSection>
              <AnimatedSection delay={0.06}>
                <h1
                  className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.02] max-w-4xl text-primary"
                >
                  We build real things
                  <br />
                  <span className="text-muted">on the cloud.</span>
                </h1>
              </AnimatedSection>
            </div>
            <div className="shrink-0">
              <CloudMascot size={300} />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <AnimatedSection direction="left" className="lg:col-span-5">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-6 text-accent"
            >
              Our mission
            </p>
            <h2
              className="text-3xl font-bold tracking-tighter leading-tight text-primary"
            >
              Bridge the gap between academic theory and real cloud practice.
            </h2>
          </AnimatedSection>
          <AnimatedSection
            direction="right"
            delay={0.1}
            className="lg:col-span-7"
          >
            <div
              className="space-y-5 text-base leading-relaxed text-secondary"
            >
              <p>
                University curricula teaches you to think like an engineer. The
                AWS Cloud Club teaches you to build like one. Our programmes are
                designed around the tools, architectures, and workflows running
                production systems in Melbourne right now.
              </p>
              <p>
                Whether you are preparing for your first certification, getting
                started with cloud fundamentals, or looking to connect with the
                Melbourne tech industry, this community exists to support that
                journey.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Timeline */}
      <section
        className="py-24 bg-overlay-40 border-t-default border-b-default"
      >
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-12 text-accent"
            >
              Our history
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((item, i) => (
              <AnimatedSection key={item.year} delay={i * 0.08}>
                <div
                  className="p-6 rounded-2xl h-full bg-card border-default"
                >
                  <p
                    className="font-mono text-sm font-bold mb-3 text-accent"
                  >
                    {item.year}
                  </p>
                  <h3
                    className="font-semibold text-base mb-3 tracking-tight text-primary"
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed text-muted"
                  >
                    {item.description}
                  </p>
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
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4 text-accent"
            >
              Our values
            </p>
            <h2
              className="text-4xl font-bold tracking-tighter text-primary"
            >
              What we stand for.
            </h2>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <AnimatedSection key={value.label} delay={i * 0.07}>
                <div
                  className="card-interactive flex gap-5 p-7 rounded-2xl bg-card border-default"
                >
                  <div
                    className="icon-chip w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  >
                    <Icon
                      size={18}
                      weight="duotone"
                      className="text-accent"
                    />
                  </div>
                  <div>
                    <h3
                      className="font-semibold mb-2 tracking-tight text-primary"
                    >
                      {value.label}
                    </h3>
                    <p
                      className="text-sm leading-relaxed text-muted"
                    >
                      {value.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </section>

      {/* Programmes */}
      <section
        className="py-24 border-t-default bg-overlay-30"
      >
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="mb-14">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4 text-accent"
              >
                Our programmes
              </p>
              <h2
                className="text-4xl font-bold tracking-tighter text-primary"
              >
                How we run the club.
              </h2>
            </div>
          </AnimatedSection>
          <div
            className="divider-bg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px rounded-2xl overflow-hidden"
          >
            {activities.map((a, i) => (
              <AnimatedSection key={a.title} delay={i * 0.06}>
                <div
                  className="card-hover-bg h-full p-8 transition-colors duration-300 bg-primary"
                >
                  <h3
                    className="font-semibold mb-3 tracking-tight text-primary"
                  >
                    {a.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed text-muted"
                  >
                    {a.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="mb-14">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4 text-accent"
            >
              Partners
            </p>
            <h2
              className="text-4xl font-bold tracking-tighter text-primary"
            >
              Industry partners.
            </h2>
            <p className="text-sm mt-4 max-w-[64ch] text-muted">
              We collaborate with Melbourne-based companies and the broader tech community to bring speakers,
              mentorship, and practical insights into how cloud work is done in the real world.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {partners.map((p, i) => (
            <AnimatedSection key={p.name} delay={i * 0.06}>
              <div
                className="card-interactive h-full p-7 rounded-2xl bg-card border-default"
              >
                <div className="flex items-center justify-between gap-4 mb-3">
                  <h3 className="text-base font-semibold tracking-tight text-primary">
                    {p.name}
                  </h3>
                  <span className="badge badge-tone tone-purple">
                    {p.focus}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted">
                  {p.support}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.1}>
          <div
            className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 rounded-2xl border-default bg-overlay-25"
          >
            <div>
              <h3 className="text-lg font-semibold tracking-tight mb-1 text-primary">
                Want to partner with us?
              </h3>
              <p className="text-sm text-muted">
                We run speaker nights, workshops, hackathons, and mentorship programmes. Sponsorship helps keep everything free for students.
              </p>
            </div>
            <a
              href="mailto:club@awsunimelb.com?subject=AWS%20Cloud%20Club%20Partnership"
              className="btn-ghost flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm shrink-0"
            >
              Become a Partner <ArrowRight size={16} weight="bold" />
            </a>
          </div>
        </AnimatedSection>
      </section>

      {/* CTA */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 rounded-2xl border-default"
          >
            <div>
              <h3
                className="text-xl font-semibold tracking-tight mb-1 text-primary"
              >
                Interested in joining?
              </h3>
              <p className="text-sm text-muted">
                Applications are open to all University of Melbourne students.
              </p>
            </div>
            <Link
              href="/join"
              className="btn-accent flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm active:scale-[0.98] shrink-0"
            >
              Apply Now <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
