import React from 'react'
import {
  Sparkles,
  ShieldCheck,
  Handshake,
  MapPin,
  Lightbulb,
  Zap,
  TrendingUp,
  Award,
} from 'lucide-react'

import type { ValuesGridBlock as Props } from '@/payload-types'

const iconMap = {
  sparkles: Sparkles,
  shield: ShieldCheck,
  handshake: Handshake,
  mapPin: MapPin,
  lightbulb: Lightbulb,
  zap: Zap,
  trending: TrendingUp,
  award: Award,
} as const

export const ValuesGridBlock: React.FC<Props> = ({ eyebrow, heading, subheading, values }) => {
  if (!values?.length) return null

  return (
    <section className="bg-secondary/40 py-20 md:py-28">
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

        <div className="mt-14 grid gap-x-10 gap-y-12 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => {
            const Icon = iconMap[(v.icon as keyof typeof iconMap) || 'sparkles'] ?? Sparkles
            return (
              <div key={i}>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-brand">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="font-display mt-5 text-2xl text-foreground">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {v.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
