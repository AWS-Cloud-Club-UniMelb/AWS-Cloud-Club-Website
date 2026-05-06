"use client";

import { LinkedinLogo, GithubLogo } from "@phosphor-icons/react";

interface TeamCardProps {
  name: string;
  role: string;
  bio: string;
  certifications: string[];
  initials: string;
  hue: string;
  image?: string;
  focalPoint?: string;
  objectScale?: number;
  portrait?: boolean;
}

const certLabels: Record<string, string> = {
  CCP: "Cloud Practitioner",
  SAA: "Solutions Architect Assoc.",
  SAP: "Solutions Architect Pro",
  DVA: "Developer Associate",
  DOP: "DevOps Engineer Pro",
  MLS: "ML Specialty",
  ANS: "Advanced Networking",
  SCS: "Security Specialty",
};

export default function TeamCard({
  name,
  role,
  bio,
  certifications,
  initials,
  hue,
  image,
  focalPoint = "center",
  objectScale = 1,
  portrait = false,
}: TeamCardProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300 flex flex-row h-full"
      style={{
        background: "var(--color-card)",
        border: "1px solid var(--color-border)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${hue}0.4)`;
        el.style.boxShadow = `0 0 30px ${hue}0.1)`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--color-border)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Image — fixed width, full height */}
      <div
        className="w-36 shrink-0 overflow-hidden"
        style={{ background: `${hue}0.08)` }}
      >
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full"
            style={{
              objectFit: portrait ? "contain" : "cover",
              objectPosition: focalPoint,
              transform: `scale(${objectScale})`,
              transformOrigin: "center top",
            }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-3xl font-bold"
            style={{
              background: `${hue}0.12)`,
              color: `${hue}1)`,
            }}
          >
            {initials}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1 min-w-0">
        {/* Name, role, socials */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3
              className="font-semibold tracking-tight"
              style={{ color: "#F0ECFF" }}
            >
              {name}
            </h3>
            <p
              className="text-xs font-medium mt-0.5"
              style={{ color: "#8B5CF6" }}
            >
              {role}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button aria-label={`${name} LinkedIn`} className="icon-link">
              <LinkedinLogo size={16} weight="fill" />
            </button>
            <button aria-label={`${name} GitHub`} className="icon-link">
              <GithubLogo size={16} weight="fill" />
            </button>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm leading-relaxed" style={{ color: "#5C5275" }}>
          {bio}
        </p>

        {/* Cert badges */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {certifications.map((cert) => (
            <span
              key={cert}
              title={certLabels[cert]}
              className="cert-badge px-2 py-0.5 rounded-md text-[10px] font-mono cursor-default"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
