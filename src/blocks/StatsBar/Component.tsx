import React from 'react'
import type { StatsBarBlock as Props } from '@/payload-types'

export const StatsBarBlock: React.FC<Props> = ({ eyebrow, heading, stats, background }) => {
  if (!stats?.length) return null
  const isDark = background === 'dark'

  return (
    <section
      className={`py-24 md:py-32 ${isDark ? 'bg-navy text-navy-foreground' : 'bg-secondary'}`}
      data-theme={isDark ? 'dark' : undefined}
    >
      <div className="container">
        {(eyebrow || heading) && (
          <div className="mb-16 max-w-2xl md:mb-20">
            {eyebrow && (
              <p className="editorial-eyebrow">{eyebrow}</p>
            )}
            {heading && (
              <h2
                className={`font-display mt-6 text-balance text-4xl font-light leading-[1.05] md:text-5xl ${
                  isDark ? 'text-white' : 'text-foreground'
                }`}
              >
                {heading}
              </h2>
            )}
            <div aria-hidden className="mt-8 h-px w-12 bg-brand" />
          </div>
        )}

        <dl className={`grid ${stats.length <= 3 ? `md:grid-cols-${stats.length}` : 'md:grid-cols-4'}`}>
          {stats.map((s, i) => (
            <div
              key={i}
              className={`border-t pt-8 pb-2 md:pr-10 ${
                isDark ? 'border-white/15' : 'border-border'
              } ${i > 0 ? 'mt-6 md:mt-0 md:border-l md:pl-10' : ''} ${
                i > 0 && isDark ? 'md:border-l-white/15' : ''
              }`}
            >
              <dt
                className={`text-[11px] font-medium uppercase tracking-[0.2em] ${
                  isDark ? 'text-white/55' : 'text-muted-foreground'
                }`}
              >
                {s.label}
              </dt>
              <dd
                className={`font-display mt-4 text-5xl font-light leading-none md:text-6xl ${
                  isDark ? 'text-white' : 'text-foreground'
                }`}
              >
                {s.value}
              </dd>
              {s.description && (
                <p
                  className={`mt-5 max-w-[28ch] text-sm leading-[1.7] ${
                    isDark ? 'text-white/55' : 'text-muted-foreground'
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
