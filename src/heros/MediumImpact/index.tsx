import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container">
        <div className="max-w-4xl">
          {richText && (
            <RichText
              className="font-display text-4xl leading-[1.05] text-foreground md:text-5xl lg:text-6xl [&_h1]:!font-display [&_h1]:!text-4xl md:[&_h1]:!text-5xl lg:[&_h1]:!text-6xl [&_h1]:!leading-[1.05] [&_p]:!text-lg [&_p]:!leading-relaxed [&_p]:!text-muted-foreground [&_p]:!mt-5"
              data={richText}
              enableGutter={false}
            />
          )}

          {Array.isArray(links) && links.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-3">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {media && typeof media === 'object' && (
          <div className="mt-12 overflow-hidden rounded-2xl">
            <Media imgClassName="w-full h-auto" priority resource={media} />
          </div>
        )}
      </div>
    </section>
  )
}
