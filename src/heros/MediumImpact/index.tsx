import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const MediumImpactHero: React.FC<Page['hero']> = ({
  links,
  media,
  eyebrow,
  headline,
  subheadline,
}) => {
  return (
    <section className="bg-background pt-20 pb-16 md:pt-28 md:pb-20">
      <div className="container">
        <div className="max-w-4xl">
          {eyebrow && <p className="editorial-eyebrow">{eyebrow}</p>}
          {headline && (
            <h1 className="font-display mt-7 text-balance text-5xl font-light leading-[1.04] text-foreground md:text-6xl lg:text-7xl">
              {headline}
            </h1>
          )}
          <div aria-hidden className="mt-10 h-px w-16 bg-brand" />
          {subheadline && (
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg md:leading-[1.7]">
              {subheadline}
            </p>
          )}

          {Array.isArray(links) && links.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-4">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {media && typeof media === 'object' && (
          <div className="mt-16 overflow-hidden">
            <Media imgClassName="w-full h-auto" priority resource={media} />
          </div>
        )}
      </div>
    </section>
  )
}
