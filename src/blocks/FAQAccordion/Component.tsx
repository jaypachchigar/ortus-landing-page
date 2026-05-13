'use client'

import React, { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import type { FAQAccordionBlock as Props } from '@/payload-types'

export const FAQAccordionBlock: React.FC<Props> = ({ eyebrow, heading, items }) => {
  const [open, setOpen] = useState<number | null>(0)

  if (!items?.length) return null

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
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
          </div>

          <div className="md:col-span-8">
            <dl className="divide-y divide-border border-t border-b border-border">
              {items.map((item, i) => {
                const isOpen = open === i
                return (
                  <div key={i}>
                    <dt>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                        aria-expanded={isOpen}
                      >
                        <span className="font-display text-xl text-foreground md:text-2xl">
                          {item.question}
                        </span>
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors group-hover:border-foreground">
                          {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                        </span>
                      </button>
                    </dt>
                    {isOpen && (
                      <dd className="pb-6 -mt-2 pr-12 text-base leading-relaxed text-muted-foreground">
                        {item.answer}
                      </dd>
                    )}
                  </div>
                )
              })}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
