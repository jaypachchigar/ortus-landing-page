import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto bg-navy text-navy-foreground" data-theme="dark">
      <div className="container py-24 md:py-28">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link className="flex items-center" href="/" aria-label="Ortus Secured Finance — Home">
              <Logo variant="light" />
            </Link>
            <p className="mt-8 max-w-sm text-sm leading-[1.7] text-white/65">
              A principal lender providing residential and commercial bridging loans from £500,000
              to £25 million across the United Kingdom.
            </p>
            <div className="mt-10 space-y-1 text-sm">
              <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">
                Head Office
              </p>
              <p className="pt-3 text-white/85">Nations House, 103 Wigmore Street</p>
              <p className="text-white/85">London, W1U 1QS</p>
            </div>
            <div className="mt-6 space-y-1.5 text-sm">
              <a
                className="block font-mono text-white/85 hover:text-brand transition-colors"
                href="tel:02036375056"
              >
                020 3637 5056
              </a>
              <a
                className="block text-white/65 hover:text-brand transition-colors"
                href="mailto:enquiries@ortussecuredfinance.co.uk"
              >
                enquiries@ortussecuredfinance.co.uk
              </a>
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-8">
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/45">Navigate</p>
            <nav className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3">
              {navItems.map(({ link }, i) => (
                <CMSLink
                  key={i}
                  className="text-sm text-white/75 hover:text-brand transition-colors hover:no-underline"
                  {...link}
                />
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Ortus Secured Finance Limited. All rights reserved.</p>
          <p className="text-white/40">
            Authorised and regulated as a principal lender in the United Kingdom.
          </p>
        </div>
      </div>
    </footer>
  )
}
