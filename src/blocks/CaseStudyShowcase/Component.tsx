import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type { CaseStudyShowcaseBlock as Props, CaseStudy, Media } from '@/payload-types'

export const CaseStudyShowcaseBlock: React.FC<Props> = async (props) => {
  const { eyebrow, heading, subheading, source, manualItems, limit } = props
  const payload = await getPayload({ config: configPromise })

  let items: CaseStudy[] = []

  if (source === 'manual' && manualItems?.length) {
    items = manualItems.filter((i): i is CaseStudy => typeof i === 'object' && i !== null)
  } else {
    const result = await payload.find({
      collection: 'caseStudies',
      where: source === 'featured' ? { featured: { equals: true } } : {},
      limit: limit || 3,
      sort: '-completedAt',
      depth: 2,
    })
    items = result.docs
  }


  if (!items.length) return null

  return (
    <section className="bg-secondary py-24 md:py-32">
      <div className="container">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
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
          <Link
            href="/case-studies"
            className="hidden md:inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-foreground hover:text-brand transition-colors"
          >
            View all
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-16 grid gap-x-8 gap-y-14 md:mt-20 md:grid-cols-3">
          {items.map((cs) => {
            const img = cs.image as Media | undefined
            const imgUrl = img && typeof img === 'object' ? img.url : null
            return (
              <Link key={cs.id} href={`/case-studies/${cs.slug}`} className="group flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden bg-card">
                  {imgUrl ? (
                    <Image
                      src={imgUrl}
                      alt={img?.alt || cs.title}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-b from-navy to-navy/70" />
                  )}
                </div>

                <div className="mt-6 flex flex-1 flex-col">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {cs.propertyType && <span>{cs.propertyType}</span>}
                    {cs.propertyType && cs.location && <span aria-hidden>·</span>}
                    {cs.location && <span>{cs.location}</span>}
                  </div>
                  <h3 className="font-display mt-4 text-2xl font-light leading-snug text-foreground md:text-[26px]">
                    {cs.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-[1.7] text-muted-foreground">
                    {cs.summary}
                  </p>
                  {cs.loanAmount && (
                    <div className="mt-6 flex items-end justify-between border-t border-border pt-5">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                          Loan
                        </p>
                        <p className="font-mono mt-1.5 text-xl text-foreground">{cs.loanAmount}</p>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
