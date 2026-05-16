import React from 'react'

import type { ValuesGridBlock as Props } from '@/payload-types'
import { CmsIcon } from '@/components/CmsIcon'

export const ValuesGridBlock: React.FC<Props> = ({ eyebrow, heading, subheading, values }) => {
  if (!values?.length) return null

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container">
        <div className="max-w-2xl">
          {eyebrow && <p className="editorial-eyebrow">{eyebrow}</p>}
          {heading && (
            <h2 className="font-display mt-6 text-balance text-4xl font-light leading-[1.05] text-foreground md:text-5xl">
              {heading}
            </h2>
          )}
          <div aria-hidden className="mt-8 h-px w-12 bg-brand" />
          {subheading && (
            <p className="mt-7 text-base leading-[1.7] text-muted-foreground md:text-lg">
              {subheading}
            </p>
          )}
        </div>

        <div className="mt-16 grid gap-x-12 gap-y-14 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <div key={i} className="border-t border-border pt-8">
              <div className="text-brand">
                <CmsIcon name={v.icon} customIcon={v.customIcon} className="h-10 w-10" strokeWidth={1.25} />
              </div>
              <h3 className="font-display mt-7 text-2xl font-light text-foreground md:text-3xl">
                {v.title}
              </h3>
              <p className="mt-4 text-sm leading-[1.75] text-muted-foreground">{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
