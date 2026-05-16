'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex items-center gap-2 md:gap-6">
      <ul className="hidden md:flex items-center gap-8">
        {navItems.map(({ link }, i) => (
          <li key={i}>
            <CMSLink
              {...link}
              appearance="link"
              className="text-[13px] font-medium tracking-wide text-foreground/80 transition-colors hover:text-foreground hover:no-underline"
            />
          </li>
        ))}
      </ul>
      <Link
        href="/contact"
        className="inline-flex h-10 items-center justify-center border border-navy bg-transparent px-5 text-[12px] font-medium uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-navy hover:text-navy-foreground"
      >
        Enquire
      </Link>
    </nav>
  )
}
