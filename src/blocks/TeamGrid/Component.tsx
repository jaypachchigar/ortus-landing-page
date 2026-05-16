import React from 'react'
import Image from 'next/image'
import { User } from 'lucide-react'
import type { TeamGridBlock as Props, Media } from '@/payload-types'

export const TeamGridBlock: React.FC<Props> = ({ eyebrow, heading, subheading, members }) => {
  if (!members?.length) return null

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

        <ul className="mt-16 grid gap-x-8 gap-y-14 md:mt-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {members.map((m, i) => (
            <li key={i} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                {m.photo && typeof m.photo === 'object' && (m.photo as Media).url ? (
                  <Image
                    src={(m.photo as Media).url as string}
                    alt={(m.photo as Media).alt || m.name}
                    fill
                    sizes="(max-width:768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <User className="h-12 w-12 text-muted-foreground/30" strokeWidth={1} />
                  </div>
                )}
              </div>
              <div className="mt-6 flex items-baseline justify-between gap-2">
                <h3 className="font-display text-xl font-light text-foreground md:text-2xl">
                  {m.name}
                </h3>
                {m.inMemoriam && (
                  <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    In memoriam
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
              {!m.inMemoriam && (m.email || m.phone) && (
                <div className="mt-4 space-y-1 text-xs">
                  {m.email && (
                    <a
                      href={`mailto:${m.email}`}
                      className="block text-muted-foreground hover:text-brand transition-colors truncate"
                    >
                      {m.email}
                    </a>
                  )}
                  {m.phone && (
                    <a
                      href={`tel:${m.phone.replace(/\s/g, '')}`}
                      className="block font-mono text-muted-foreground hover:text-brand transition-colors"
                    >
                      {m.phone}
                    </a>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
