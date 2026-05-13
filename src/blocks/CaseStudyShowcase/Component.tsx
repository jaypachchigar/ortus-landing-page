import React from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type { CaseStudyShowcaseBlock as Props, CaseStudy } from '@/payload-types'

export const CaseStudyShowcaseBlock: React.FC<Props> = async (props) => {
  const { eyebrow, heading, subheading, source, manualItems, limit } = props
  const payload = await getPayload({ config: configPromise })

  let items: CaseStudy[] = []

  if (source === 'manual' && manualItems?.length) {
    items = manualItems.filter(
      (i): i is CaseStudy => typeof i === 'object' && i !== null,
    )
  } else {
    const where: Record<string, unknown> = {}
    if (source === 'featured') where.featured = { equals: true }
    const result = await payload.find({
      collection: 'caseStudies',
      where,
      limit: limit || 3,
      sort: '-completedAt',
      depth: 1,
    })
    items = result.docs
  }

  if (!items.length) return null

  return (
    <section className="bg-secondary/30 py-20 md:py-28">
      <div className="container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
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
          <Link
            href="/publications/case-studies"
            className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-brand"
          >
            View all case studies
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 md:mt-16 md:grid-cols-3">
          {items.map((cs) => (
            <Link
              key={cs.id}
              href={`/case-studies/${cs.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-card transition-all hover:-translate-y-1"
            >
              <div className="flex flex-1 flex-col p-7 md:p-8">
                <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground">
                  {cs.propertyType && <span>{cs.propertyType}</span>}
                  {cs.propertyType && cs.location && <span aria-hidden>·</span>}
                  {cs.location && <span>{cs.location}</span>}
                </div>
                <h3 className="font-display mt-4 text-2xl leading-snug text-foreground md:text-3xl">
                  {cs.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {cs.summary}
                </p>
                {cs.loanAmount && (
                  <div className="mt-6 flex items-end justify-between border-t border-border pt-5">
                    <div>
                      <p className="text-xs text-muted-foreground">Loan amount</p>
                      <p className="font-display mt-1 text-2xl text-foreground">{cs.loanAmount}</p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
