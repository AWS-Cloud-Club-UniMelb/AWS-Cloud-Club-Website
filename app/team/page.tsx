import AnimatedSection from "@/components/AnimatedSection";
import TeamCard from "@/components/TeamCard";

const team = [
  {
    name: "Agam",
    role: "Club President",
    bio: "Final-year Computer Science student. AWS Solutions Architect Professional certified. Previously interned at Atlassian on their infrastructure team.",
    certifications: ["SAP", "CCP"],
    initials: "PM",
    hue: "rgba(107,63,212,",
  },
  {
    name: "Kaavya",
    role: "Vice President",
    bio: "Software Engineering student specialising in distributed systems. AWS Developer Associate certified. Building developer tooling at a Melbourne startup.",
    certifications: ["DVA", "CCP"],
    initials: "MC",
    hue: "rgba(59,130,246,",
  },
  {
    name: "Manu",
    role: "Chief Tech Officer",
    bio: "Specialises in ML infrastructure and data pipelines on AWS. AWS Machine Learning Specialty certified. Research assistant at the Melbourne ML Lab.",
    certifications: ["MLS", "SAA", "CCP"],
    initials: "AR",
    hue: "rgba(16,185,129,",
  },
  {
    name: "Bhavin",
    role: "Treasurer",
    bio: "Connects the club with companies actively hiring cloud engineers. Negotiates AWS credit allocations and organises workshop sponsorships.",
    certifications: ["SAA", "SCS"],
    initials: "RS",
    hue: "rgba(20,184,166,",
  },
  {
    name: "Shevy",
    role: "Marketing Director",
    bio: "Information Systems student who makes sure every event runs without a glitch. Coordinates workshops, speaker nights, and club socials across the year.",
    certifications: ["CCP"],
    initials: "LF",
    hue: "rgba(139,92,246,",
  },
  {
    name: "Hasith",
    role: "Tech Director",
    bio: "Masters student in IT. Focuses on multi-account AWS architectures and Well-Architected Framework reviews. Previously at a Big 4 consulting firm.",
    certifications: ["SAA", "ANS", "SCS"],
    initials: "NO",
    hue: "rgba(239,68,68,",
  },
  {
    name: "Soham",
    role: "Tech Director",
    bio: "Passionate about CI/CD pipelines, Infrastructure-as-Code, and AWS CDK. AWS DevOps Engineer Professional certified. Open-source contributor.",
    certifications: ["DOP", "SAA", "DVA"],
    initials: "JW",
    hue: "rgba(245,158,11,",
  },
  {
    name: "Gabriel",
    role: "Events Director",
    bio: "Builds connections across the Melbourne tech scene. Manages partnerships with other student societies, graduate programmes, and industry groups.",
    certifications: ["CCP"],
    initials: "SN",
    hue: "rgba(236,72,153,",
  },
];

const subcomTeams = [
  {
    team: "Marketing",
    description:
      "Manage the club's brand, social media, and communications across all channels.",
    members: [
      {
        name: "Placeholder",
        role: "Marketing Subcom",
        bio: "Supports social media strategy and content creation for the club.",
        certifications: ["CCP"],
        initials: "PS",
        hue: "rgba(236,72,153,",
      },
      {
        name: "Placeholder",
        role: "Marketing Subcom",
        bio: "Assists with graphic design and visual identity across club materials.",
        certifications: ["CCP"],
        initials: "PS",
        hue: "rgba(236,72,153,",
      },
      {
        name: "Placeholder",
        role: "Marketing Subcom",
        bio: "Helps manage the club's online presence and engagement.",
        certifications: ["CCP"],
        initials: "PS",
        hue: "rgba(236,72,153,",
      },
      {
        name: "Placeholder",
        role: "Marketing Subcom",
        bio: "Supports copywriting and communications for events and announcements.",
        certifications: ["CCP"],
        initials: "PS",
        hue: "rgba(236,72,153,",
      },
    ],
  },
  {
    team: "Events",
    description:
      "Plan and deliver workshops, networking nights, hackathons, and social events.",
    members: [
      {
        name: "Placeholder",
        role: "Events Subcom",
        bio: "Assists with logistics and coordination for club workshops and events.",
        certifications: ["CCP"],
        initials: "PS",
        hue: "rgba(245,158,11,",
      },
      {
        name: "Placeholder",
        role: "Events Subcom",
        bio: "Helps manage venue bookings and event setup across the semester.",
        certifications: ["CCP"],
        initials: "PS",
        hue: "rgba(245,158,11,",
      },
      {
        name: "Placeholder",
        role: "Events Subcom",
        bio: "Supports speaker night coordination and industry guest liaison.",
        certifications: ["CCP"],
        initials: "PS",
        hue: "rgba(245,158,11,",
      },
      {
        name: "Placeholder",
        role: "Events Subcom",
        bio: "Assists with hackathon planning and participant experience.",
        certifications: ["CCP"],
        initials: "PS",
        hue: "rgba(245,158,11,",
      },
    ],
  },
  {
    team: "Tech",
    description:
      "Build and maintain the club's technical infrastructure, tools, and workshop content.",
    members: [
      {
        name: "Raghav",
        role: "Web Developer",
        bio: "Full-stack developer.",
        certifications: ["CCP"],
        initials: "PS",
        hue: "rgba(59,130,246,",
      },
      {
        name: "Claire",
        role: "Web Developer",
        bio: "Full-stack developer.",
        certifications: ["CCP"],
        initials: "PS",
        hue: "rgba(59,130,246,",
      },
      {
        name: "Placeholder",
        role: "Tech Subcom",
        bio: "Supports cloud infrastructure setup for club projects and events.",
        certifications: ["CCP"],
        initials: "PS",
        hue: "rgba(59,130,246,",
      },
      {
        name: "Placeholder",
        role: "Tech Subcom",
        bio: "Contributes to certification study resources and member tooling.",
        certifications: ["CCP"],
        initials: "PS",
        hue: "rgba(59,130,246,",
      },
    ],
  },
  {
    team: "Admin",
    description:
      "Keep the club running smoothly through finance, operations, and member management.",
    members: [
      {
        name: "Placeholder",
        role: "Admin Subcom",
        bio: "Assists with membership records and club administration tasks.",
        certifications: ["CCP"],
        initials: "PS",
        hue: "rgba(16,185,129,",
      },
      {
        name: "Placeholder",
        role: "Admin Subcom",
        bio: "Supports budgeting and financial tracking across club activities.",
        certifications: ["CCP"],
        initials: "PS",
        hue: "rgba(16,185,129,",
      },
      {
        name: "Placeholder",
        role: "Admin Subcom",
        bio: "Helps coordinate internal communications and committee operations.",
        certifications: ["CCP"],
        initials: "PS",
        hue: "rgba(16,185,129,",
      },
      {
        name: "Placeholder",
        role: "Admin Subcom",
        bio: "Assists with sponsorship documentation and partner onboarding.",
        certifications: ["CCP"],
        initials: "PS",
        hue: "rgba(16,185,129,",
      },
    ],
  },
];

export default function TeamPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-40 pb-20 grid-bg overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 80% 40%, rgba(107,63,212,0.08), transparent 65%), var(--color-bg-primary)",
        }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, var(--color-bg-primary), transparent)",
          }}
        />
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-5"
              style={{ color: "#8B5CF6" }}
            >
              The team
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.06}>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[1.02] max-w-3xl mb-6"
              style={{ color: "#F0ECFF" }}
            >
              The people
              <br />
              <span style={{ color: "#5C5275" }}>behind the club.</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.12}>
            <p
              className="text-base leading-relaxed max-w-[52ch]"
              style={{ color: "#A99CC0" }}
            >
              A committee of eight students dedicated to building
              Melbourne&apos;s strongest AWS learning community from the ground
              up.
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

      {/* Subcom Teams */}
      {subcomTeams.map((group, gi) => (
        <section
          key={group.team}
          className="py-20 max-w-7xl mx-auto px-6"
          style={gi !== 0 ? { borderTop: "1px solid var(--color-border)" } : {}}
        >
          <AnimatedSection>
            <div className="mb-14">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "#8B5CF6" }}
              >
                Subcommittee
              </p>
              <h2
                className="text-4xl font-bold tracking-tighter mb-3"
                style={{ color: "#F0ECFF" }}
              >
                {group.team} Team
              </h2>
              <p
                className="text-base leading-relaxed max-w-[52ch]"
                style={{ color: "#A99CC0" }}
              >
                {group.description}
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {group.members.map((member, i) => (
              <AnimatedSection key={group.team + i} delay={i * 0.07}>
                <TeamCard {...member} />
              </AnimatedSection>
            ))}
          </div>
        </section>
      ))}

      {/* Join the team */}
      <section
        className="py-24"
        style={{
          borderTop: "1px solid var(--color-border)",
          background: "rgba(18,16,30,0.3)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <AnimatedSection direction="left" className="lg:col-span-7">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "#8B5CF6" }}
              >
                Committee applications
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight mb-4"
                style={{ color: "#F0ECFF" }}
              >
                Want to help lead the club?
              </h2>
              <p
                className="text-base leading-relaxed max-w-[50ch]"
                style={{ color: "#A99CC0" }}
              >
                Committee applications open at the start of each semester. We
                look for initiative, a genuine interest in cloud technology, and
                the drive to build something meaningful for the community.
              </p>
            </AnimatedSection>
            <AnimatedSection
              direction="right"
              delay={0.1}
              className="lg:col-span-5"
            >
              <div className="space-y-3">
                {[
                  "Open to all UniMelb students",
                  "No prior experience required",
                  "Committee training provided",
                  "Direct industry exposure",
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: "#8B5CF6" }}
                    />
                    <span className="text-sm" style={{ color: "#A99CC0" }}>
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
