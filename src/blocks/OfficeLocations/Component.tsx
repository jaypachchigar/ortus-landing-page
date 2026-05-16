import React from 'react'
import type { OfficeLocationsBlock as Props } from '@/payload-types'

export const OfficeLocationsBlock: React.FC<Props> = ({
  eyebrow,
  heading,
  subheading,
  offices,
}) => {
  if (!offices?.length) return null

  return (
    <section className="bg-secondary py-24 md:py-32">
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

        <div className="mt-16 grid gap-x-8 gap-y-12 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
          {offices.map((o, i) => (
            <div key={i} className="border-t border-border pt-8">
              <p className="editorial-eyebrow">Office {String(i + 1).padStart(2, '0')}</p>
              <h3 className="font-display mt-5 text-3xl font-light text-foreground">{o.city}</h3>
              {o.address && (
                <p className="mt-5 whitespace-pre-line text-sm leading-[1.7] text-muted-foreground">
                  {o.address}
                </p>
              )}
              <div className="mt-6 space-y-2 text-sm">
                {o.phone && (
                  <a
                    href={`tel:${o.phone.replace(/\s/g, '')}`}
                    className="block font-mono text-foreground hover:text-brand transition-colors"
                  >
                    {o.phone}
                  </a>
                )}
                {o.email && (
                  <a
                    href={`mailto:${o.email}`}
                    className="block text-muted-foreground hover:text-brand transition-colors break-words"
                  >
                    {o.email}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
