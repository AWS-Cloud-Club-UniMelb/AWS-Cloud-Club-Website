import Link from 'next/link'
import { CloudLightning } from '@phosphor-icons/react/dist/ssr'

export default function Footer() {
  return (
    <footer className="bg-secondary border-t-default">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

          {/* Brand */}
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-2.5 mb-4 w-fit">
              <div
                className="chip w-8 h-8 rounded-lg flex items-center justify-center"
              >
                <CloudLightning size={18} weight="duotone" className="text-accent" />
              </div>
              <span className="font-semibold text-sm tracking-tight text-primary">
                AWS Cloud Club
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-[30ch] text-muted">
              The official AWS Cloud Club at the University of Melbourne.
              Building the next generation of cloud engineers.
            </p>
            <p className="mt-6 text-xs leading-relaxed text-muted">
              Affiliated with the University of Melbourne Student Union.
              <br />AWS Cloud Club Partner Program.
            </p>
          </div>

          <div className="hidden md:block md:col-span-2" />

          {/* Navigation */}
          <div className="md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-muted">
              Navigation
            </p>
            <ul className="flex flex-col gap-3">
              {[
                { href: '/',       label: 'Home'   },
                { href: '/about',  label: 'About'  },
                { href: '/team',   label: 'Team'   },
                { href: '/events', label: 'Events' },
                { href: '/join',   label: 'Join'   },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-muted">
              Resources
            </p>
            <ul className="flex flex-col gap-3">
              {[
                { href: 'https://aws.amazon.com',               label: 'AWS Console'    },
                { href: 'https://aws.amazon.com/certification',  label: 'Certifications' },
                { href: 'https://aws.amazon.com/free',           label: 'Free Tier'      },
                { href: 'https://docs.aws.amazon.com',           label: 'Documentation'  },
              ].map(link => (
                <li key={link.label}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className="footer-link text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-muted">
              Contact
            </p>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="mailto:club@awsunimelb.com" className="footer-link text-sm">
                  club@awsunimelb.com
                </a>
              </li>
              <li className="text-sm text-muted">
                Engineering Building<br />
                University of Melbourne<br />
                Parkville VIC 3010
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-top-faint">
          <p className="text-xs text-muted">
            &copy; 2025 AWS Cloud Club — University of Melbourne. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Not affiliated with Amazon Web Services, Inc.
          </p>
        </div>
      </div>
    </footer>
  )
}
