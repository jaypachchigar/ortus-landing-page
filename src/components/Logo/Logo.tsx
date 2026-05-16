import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  variant?: 'default' | 'light'
}

export const Logo = (props: Props) => {
  const { className, variant = 'default' } = props
  const isLight = variant === 'light'

  return (
    <span
      className={clsx(
        'inline-flex items-baseline gap-3 font-display',
        isLight ? 'text-cream' : 'text-foreground',
        className,
      )}
      aria-label="Ortus Secured Finance"
    >
      <span className="text-2xl font-light tracking-[0.18em] md:text-[26px]">ORTUS</span>
      <span
        aria-hidden
        className={clsx(
          'hidden text-[10px] uppercase tracking-[0.28em] sm:inline',
          isLight ? 'text-white/55' : 'text-muted-foreground',
        )}
      >
        Secured Finance
      </span>
    </span>
  )
}
