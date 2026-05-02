'use client'

import { LinkedinLogo, GithubLogo } from '@phosphor-icons/react'

interface TeamCardProps {
  name: string
  role: string
  bio: string
  certifications: string[]
  initials: string
  tone: 'purple' | 'blue' | 'green' | 'teal' | 'red' | 'amber' | 'pink'
}

const certLabels: Record<string, string> = {
  CCP: 'Cloud Practitioner',
  SAA: 'Solutions Architect Assoc.',
  SAP: 'Solutions Architect Pro',
  DVA: 'Developer Associate',
  DOP: 'DevOps Engineer Pro',
  MLS: 'ML Specialty',
  ANS: 'Advanced Networking',
  SCS: 'Security Specialty',
}

export default function TeamCard({ name, role, bio, certifications, initials, tone }: TeamCardProps) {
  return (
    <div
      className={`team-card tone-${tone} relative p-7 rounded-2xl overflow-hidden`}
    >
      <div className="relative z-10 flex gap-5">
        {/* Avatar */}
        <div
          className="team-avatar w-14 h-14 rounded-xl shrink-0 flex items-center justify-center font-bold text-base"
        >
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1">
            <div>
              <h3 className="font-semibold tracking-tight text-primary">
                {name}
              </h3>
              <p className="text-xs font-medium mt-0.5 text-accent">
                {role}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button aria-label={`${name} LinkedIn`} className="icon-link">
                <LinkedinLogo size={18} weight="fill" />
              </button>
              <button aria-label={`${name} GitHub`} className="icon-link">
                <GithubLogo size={18} weight="fill" />
              </button>
            </div>
          </div>

          <p className="text-sm leading-relaxed mt-3 mb-4 text-muted">
            {bio}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {certifications.map(cert => (
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
    </div>
  )
}
