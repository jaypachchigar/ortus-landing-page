import React from 'react'
import { Mail, Phone, User } from 'lucide-react'
import type { TeamGridBlock as Props } from '@/payload-types'

export const TeamGridBlock: React.FC<Props> = ({ eyebrow, heading, subheading, members }) => {
  if (!members?.length) return null

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

        <ul className="mt-14 grid gap-x-6 gap-y-10 md:mt-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {members.map((m, i) => (
            <li key={i} className="group">
              <div className="aspect-square overflow-hidden rounded-2xl bg-secondary/40 flex items-center justify-center">
                <User className="h-10 w-10 text-muted-foreground/40" strokeWidth={1.25} />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-2">
                <h3 className="font-display text-xl text-foreground">{m.name}</h3>
                {m.inMemoriam && (
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    In memoriam
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">{m.role}</p>
              {!m.inMemoriam && (m.email || m.phone) && (
                <div className="mt-3 space-y-1.5 text-xs">
                  {m.email && (
                    <a
                      href={`mailto:${m.email}`}
                      className="flex items-center gap-2 text-foreground/70 hover:text-brand transition-colors"
                    >
                      <Mail className="h-3 w-3 shrink-0" />
                      <span className="truncate">{m.email}</span>
                    </a>
                  )}
                  {m.phone && (
                    <a
                      href={`tel:${m.phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-2 text-foreground/70 hover:text-brand transition-colors"
                    >
                      <Phone className="h-3 w-3 shrink-0" />
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
