import React from 'react'

import type { Page } from '@/payload-types'

type LowImpactHeroType =
  | { children?: React.ReactNode; eyebrow?: never; headline?: never; subheadline?: never }
  | (Page['hero'] & { children?: never })

export const LowImpactHero: React.FC<LowImpactHeroType> = (props) => {
  const { children } = props as { children?: React.ReactNode }
  const { eyebrow, headline, subheadline } = props as Page['hero']

  return (
    <section className="border-b border-border bg-background">
      <div className="container pt-20 pb-14 md:pt-28 md:pb-20">
        <div className="max-w-4xl">
          {children ?? (
            <>
              {eyebrow && <p className="editorial-eyebrow">{eyebrow}</p>}
              {headline && (
                <h1 className="font-display mt-7 text-balance text-4xl font-light leading-[1.05] text-foreground md:text-5xl lg:text-6xl">
                  {headline}
                </h1>
              )}
              <div aria-hidden className="mt-10 h-px w-16 bg-brand" />
              {subheadline && (
                <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg md:leading-[1.7]">
                  {subheadline}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
