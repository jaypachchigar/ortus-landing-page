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
      <div className="container py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link className="flex items-center" href="/" aria-label="Ortus Secured Finance — Home">
              <Logo className="brightness-0 invert" />
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">
              Principal lender offering residential and commercial bridging loans from £500,000 to
              £25 million across the UK.
            </p>
            <div className="mt-6 space-y-1 text-sm text-white/70">
              <p>Nations House, 103 Wigmore Street</p>
              <p>London, W1U 1QS</p>
              <p className="pt-2">
                <a className="hover:text-white" href="tel:02036375056">
                  020 3637 5056
                </a>
              </p>
              <p>
                <a
                  className="hover:text-white"
                  href="mailto:enquiries@ortussecuredfinance.co.uk"
                >
                  enquiries@ortussecuredfinance.co.uk
                </a>
              </p>
            </div>
          </div>

          <div className="md:col-span-4 md:col-start-8">
            <h4 className="font-display text-lg text-white">Quick links</h4>
            <nav className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
              {navItems.map(({ link }, i) => (
                <CMSLink
                  key={i}
                  className="text-sm text-white/70 hover:text-white transition-colors"
                  {...link}
                />
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Ortus Secured Finance Limited. All rights reserved.</p>
          <p>
            Ortus Secured Finance Limited is authorised and regulated as a principal lender in the
            UK.
          </p>
        </div>
      </div>
    </footer>
  )
}
