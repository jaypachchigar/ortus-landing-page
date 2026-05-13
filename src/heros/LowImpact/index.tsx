import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <section className="border-b border-border bg-background">
      <div className="container py-16 md:py-20">
        <div className="max-w-4xl">
          {children ||
            (richText && (
              <RichText
                className="font-display text-4xl leading-[1.05] text-foreground md:text-5xl lg:text-6xl [&>*]:!font-display [&_h1]:!font-display [&_h1]:!text-4xl md:[&_h1]:!text-5xl lg:[&_h1]:!text-6xl [&_h1]:!leading-[1.05] [&_p]:!text-lg [&_p]:!leading-relaxed [&_p]:!text-muted-foreground [&_p]:!mt-5"
                data={richText}
                enableGutter={false}
              />
            ))}
        </div>
      </div>
    </section>
  )
}
