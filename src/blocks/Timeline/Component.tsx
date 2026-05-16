'use client'

import React, { useRef } from 'react'

import type { TimelineBlock as Props, Media } from '@/payload-types'
import { CmsIcon } from '@/components/CmsIcon'

const useScrollProgress = (ref: React.RefObject<HTMLElement | null>) => {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return

    let frame = 0
    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const viewport = window.innerHeight
      const start = viewport * 0.85
      const end = viewport * 0.15
      const total = rect.height + (start - end)
      const travelled = start - rect.top
      const pct = Math.min(1, Math.max(0, travelled / total))
      setProgress(pct)
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ref])

  return progress
}

const Milestone: React.FC<{
  date: string
  title: string
  description?: string | null
  icon?: string | null
  customIcon?: number | Media | null
  index: number
  isDark: boolean
}> = ({ date, title, description, icon, customIcon, index, isDark }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true)
        })
      },
      { threshold: 0.25, rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const isEven = index % 2 === 0

  return (
    <div
      ref={ref}
      className={`relative grid grid-cols-[48px_1fr] gap-6 md:grid-cols-2 md:gap-12 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } transition-all duration-700 ease-out`}
    >
      {/* LEFT column on desktop */}
      <div
        className={`hidden md:block ${
          isEven ? 'md:pr-12 md:text-right' : 'md:order-2 md:pl-12'
        }`}
      >
        {isEven && (
          <MilestoneCard
            date={date}
            title={title}
            description={description}
            isDark={isDark}
            align="right"
          />
        )}
      </div>

      {/* Center dot column (mobile) / dot in middle (desktop) */}
      <div
        className={`relative flex justify-center ${
          isEven ? '' : 'md:order-1'
        } md:absolute md:inset-y-0 md:left-1/2 md:-translate-x-1/2 md:w-px`}
      >
        <div
          className={`relative z-10 mt-1 flex h-12 w-12 shrink-0 items-center justify-center ring-8 ${
            isDark
              ? 'bg-navy text-brand ring-navy'
              : 'bg-background text-brand ring-background'
          } border ${isDark ? 'border-brand' : 'border-brand'} md:mt-8`}
        >
          <CmsIcon name={icon} customIcon={customIcon} className="h-4 w-4" strokeWidth={1.25} />
        </div>
      </div>

      {/* RIGHT column on desktop */}
      <div className={`${isEven ? 'md:pl-12' : 'md:pr-12 md:text-right md:order-0'}`}>
        {/* Mobile: always show milestone here */}
        <div className="md:hidden">
          <MilestoneCard
            date={date}
            title={title}
            description={description}
            isDark={isDark}
            align="left"
          />
        </div>
        {/* Desktop: show only if odd */}
        <div className="hidden md:block">
          {!isEven && (
            <MilestoneCard
              date={date}
              title={title}
              description={description}
              isDark={isDark}
              align="left"
            />
          )}
        </div>
      </div>
    </div>
  )
}

const MilestoneCard: React.FC<{
  date: string
  title: string
  description?: string | null
  isDark: boolean
  align: 'left' | 'right'
}> = ({ date, title, description, isDark, align }) => (
  <div
    className={`inline-block max-w-md ${align === 'right' ? 'md:ml-auto' : ''}`}
  >
    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-brand">
      {date}
    </p>
    <h3
      className={`font-display mt-3 text-2xl font-light leading-tight md:text-[28px] ${
        isDark ? 'text-white' : 'text-foreground'
      }`}
    >
      {title}
    </h3>
    {description && (
      <p
        className={`mt-4 text-sm leading-[1.7] ${
          isDark ? 'text-white/55' : 'text-muted-foreground'
        }`}
      >
        {description}
      </p>
    )}
  </div>
)

export const TimelineBlock: React.FC<Props> = ({
  eyebrow,
  heading,
  subheading,
  milestones,
  background,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const progress = useScrollProgress(containerRef)
  const isDark = background === 'dark'

  if (!milestones?.length) return null

  return (
    <section
      className={`py-24 md:py-32 ${isDark ? 'bg-navy text-navy-foreground' : 'bg-background'}`}
      data-theme={isDark ? 'dark' : undefined}
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          {eyebrow && <p className="editorial-eyebrow">{eyebrow}</p>}
          {heading && (
            <h2
              className={`font-display mt-6 text-balance text-4xl font-light leading-[1.05] md:text-5xl ${
                isDark ? 'text-white' : 'text-foreground'
              }`}
            >
              {heading}
            </h2>
          )}
          <div aria-hidden className="mx-auto mt-8 h-px w-12 bg-brand" />
          {subheading && (
            <p
              className={`mt-7 text-base leading-[1.7] md:text-lg ${
                isDark ? 'text-white/60' : 'text-muted-foreground'
              }`}
            >
              {subheading}
            </p>
          )}
        </div>

        <div
          ref={containerRef}
          className="relative mx-auto mt-16 max-w-5xl md:mt-24"
        >
          {/* Static rail */}
          <div
            aria-hidden
            className={`absolute left-[23px] top-0 bottom-0 w-px md:left-1/2 md:-translate-x-1/2 ${
              isDark ? 'bg-white/10' : 'bg-border'
            }`}
          />
          {/* Animated progress rail */}
          <div
            aria-hidden
            className="absolute left-[23px] top-0 w-px bg-brand md:left-1/2 md:-translate-x-1/2"
            style={{ height: `${progress * 100}%` }}
          />

          <div className="space-y-14 md:space-y-20">
            {milestones.map((m, i) => (
              <Milestone
                key={i}
                date={m.date}
                title={m.title}
                description={m.description ?? null}
                icon={m.icon}
                customIcon={m.customIcon}
                index={i}
                isDark={isDark}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
