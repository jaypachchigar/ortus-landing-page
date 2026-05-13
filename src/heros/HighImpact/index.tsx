'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme(null)
  })

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="container relative pt-16 pb-20 md:pt-24 md:pb-32 lg:pt-32 lg:pb-40">
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {richText && (
              <RichText
                className="font-display text-5xl leading-[1.02] text-foreground md:text-6xl lg:text-7xl xl:text-[5.25rem] [&>*]:!font-display [&_h1]:!text-5xl md:[&_h1]:!text-6xl lg:[&_h1]:!text-7xl xl:[&_h1]:!text-[5.25rem] [&_h1]:!leading-[1.02] [&_p]:!text-5xl md:[&_p]:!text-6xl lg:[&_p]:!text-7xl xl:[&_p]:!text-[5.25rem] [&_p]:!leading-[1.02]"
                data={richText}
                enableGutter={false}
              />
            )}

            {Array.isArray(links) && links.length > 0 && (
              <ul className="mt-10 flex flex-wrap items-center gap-3">
                {links.map(({ link }, i) => (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                ))}
              </ul>
            )}
          </div>

          {media && typeof media === 'object' && (
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-secondary">
                <Media fill imgClassName="object-cover" priority resource={media} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
