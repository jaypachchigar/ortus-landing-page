'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex items-center gap-1 md:gap-2">
      <ul className="hidden md:flex items-center gap-6 mr-4">
        {navItems.map(({ link }, i) => (
          <li key={i}>
            <CMSLink
              {...link}
              appearance="link"
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            />
          </li>
        ))}
      </ul>
      <Link
        href="/search"
        className="hidden sm:inline-flex items-center justify-center rounded-full p-2 text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
      >
        <span className="sr-only">Search</span>
        <SearchIcon className="w-4 h-4" />
      </Link>
      <Link
        href="/contact"
        className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand"
      >
        Enquire
      </Link>
    </nav>
  )
}
