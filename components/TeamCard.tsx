"use client";

import { LinkedinLogo, GithubLogo } from "@phosphor-icons/react";
import { useState } from "react";

const HOVER_BORDER_OPACITY = 0.4;
const HOVER_SHADOW_OPACITY = 0.1;
const HOVER_SHADOW_BLUR = 30;
const IMAGE_BG_OPACITY = 0.08;
const AVATAR_BG_OPACITY = 0.12;

function rgba(rgb: string, opacity: number) {
  return `rgba(${rgb},${opacity})`;
}

interface TeamCardProps {
  name: string;
  role?: string;
  bio?: string;
  certifications: string[];
  initials: string;
  rgb: string;
  image?: string;
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
  rgb,
  image,
}: TeamCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-300 flex flex-row h-full"
      style={{
        background: "var(--color-card)",
        border: `1px solid ${hovered ? rgba(rgb, HOVER_BORDER_OPACITY) : "var(--color-border)"}`,
        boxShadow: hovered
          ? `0 0 ${HOVER_SHADOW_BLUR}px ${rgba(rgb, HOVER_SHADOW_OPACITY)}`
          : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image — fixed width, full height */}
      <div
        className="w-36 shrink-0 overflow-hidden"
        style={{ background: rgba(rgb, IMAGE_BG_OPACITY) }}
      >
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-3xl font-bold"
            style={{
              background: rgba(rgb, AVATAR_BG_OPACITY),
              color: rgba(rgb, 1),
            }}
          >
            {initials}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1 min-w-0">
        {/* Name and role */}
        <div>
          <h3
            className="font-semibold tracking-tight"
            style={{ color: "#F0ECFF" }}
          >
            {name}
          </h3>
          {role && (
            <p
              className="text-xs font-medium mt-0.5"
              style={{ color: "#8B5CF6" }}
            >
              {role}
            </p>
          )}
        </div>

        {/* Bio */}
        {bio && (
          <p className="text-sm leading-relaxed" style={{ color: "#5C5275" }}>
            {bio}
          </p>
        )}

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
