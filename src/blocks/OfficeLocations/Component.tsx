import React from 'react'
import { MapPin } from 'lucide-react'
import type { OfficeLocationsBlock as Props } from '@/payload-types'

export const OfficeLocationsBlock: React.FC<Props> = ({
  eyebrow,
  heading,
  subheading,
  offices,
}) => {
  if (!offices?.length) return null

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="font-display mt-3 text-4xl leading-tight md:text-5xl md:leading-[1.05] text-foreground">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{subheading}</p>
          )}
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-2 lg:grid-cols-4">
          {offices.map((o, i) => (
            <div key={i} className="bg-card p-8 md:p-10">
              <MapPin className="h-5 w-5 text-brand" strokeWidth={1.5} />
              <h3 className="font-display mt-5 text-2xl text-foreground">{o.city}</h3>
              {o.address && (
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                  {o.address}
                </p>
              )}
              <div className="mt-5 space-y-1 text-sm">
                {o.phone && (
                  <a
                    href={`tel:${o.phone.replace(/\s/g, '')}`}
                    className="block text-foreground hover:text-brand"
                  >
                    {o.phone}
                  </a>
                )}
                {o.email && (
                  <a
                    href={`mailto:${o.email}`}
                    className="block text-muted-foreground hover:text-brand"
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
