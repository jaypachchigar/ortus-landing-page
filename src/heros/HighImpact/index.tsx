'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const HighImpactHero: React.FC<Page['hero']> = ({
  links,
  media,
  eyebrow,
  headline,
  subheadline,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme(null)
  })

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container relative pt-20 pb-24 md:pt-28 md:pb-32 lg:pt-36 lg:pb-40">
        <div className="grid items-end gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-7">
            {eyebrow && (
              <p className="editorial-eyebrow">{eyebrow}</p>
            )}
            {headline && (
              <h1 className="font-display mt-7 text-balance text-5xl font-light leading-[1.02] text-foreground md:text-6xl lg:text-7xl xl:text-[5.25rem]">
                {headline}
              </h1>
            )}
            <div aria-hidden className="mt-10 h-px w-16 bg-brand" />
            {subheadline && (
              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg md:leading-[1.7]">
                {subheadline}
              </p>
            )}

            {Array.isArray(links) && links.length > 0 && (
              <ul className="mt-10 flex flex-wrap items-center gap-4">
                {links.map(({ link }, i) => (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                ))}
              </ul>
            )}
          </div>

          {media && typeof media === 'object' ? (
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                <Media fill imgClassName="object-cover" priority resource={media} />
              </div>
            </div>
          ) : (
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-navy to-navy/80" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
