import React from 'react'
import type { StatsBarBlock as Props } from '@/payload-types'

export const StatsBarBlock: React.FC<Props> = ({ eyebrow, heading, stats, background }) => {
  if (!stats?.length) return null
  const isDark = background === 'dark'

  return (
    <section
      className={`py-20 md:py-24 ${isDark ? 'bg-navy text-navy-foreground' : 'bg-background'}`}
      data-theme={isDark ? 'dark' : undefined}
    >
      <div className="container">
        {(eyebrow || heading) && (
          <div className="mb-12 max-w-2xl">
            {eyebrow && (
              <p
                className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                  isDark ? 'text-brand' : 'text-brand'
                }`}
              >
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2
                className={`font-display mt-3 text-3xl leading-tight md:text-4xl md:leading-[1.05] ${
                  isDark ? 'text-white' : 'text-foreground'
                }`}
              >
                {heading}
              </h2>
            )}
          </div>
        )}

        <dl
          className={`grid gap-px overflow-hidden rounded-2xl ${
            isDark ? 'bg-white/10' : 'bg-border'
          } md:grid-cols-${stats.length <= 3 ? stats.length : 4}`}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className={`p-8 md:p-10 ${isDark ? 'bg-navy' : 'bg-card'}`}
            >
              <dt
                className={`text-sm font-medium ${
                  isDark ? 'text-white/60' : 'text-muted-foreground'
                }`}
              >
                {s.label}
              </dt>
              <dd
                className={`font-display mt-2 text-5xl md:text-6xl ${
                  isDark ? 'text-white' : 'text-foreground'
                }`}
              >
                {s.value}
              </dd>
              {s.description && (
                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    isDark ? 'text-white/60' : 'text-muted-foreground'
                  }`}
                >
                  {s.description}
                </p>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
