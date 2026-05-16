import type { Metadata } from 'next/types'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, MapPin, Calendar, Banknote } from 'lucide-react'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import type { CaseStudy, Media } from '@/payload-types'

export const dynamic = 'force-static'
export const revalidate = 600

const formatDate = (iso?: string | null) => {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  })
}

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'caseStudies',
    depth: 2,
    limit: 100,
    overrideAccess: false,
    sort: '-completedAt',
  })

  const items = result.docs
  const [featured, ...rest] = items

  return (
    <div>
      {/* Hero band */}
      <section className="border-b border-border bg-background">
        <div className="container py-14 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
            Case studies
          </p>
          <h1 className="font-display mt-5 max-w-3xl text-balance text-4xl font-medium leading-[1.05] text-foreground md:text-5xl lg:text-6xl">
            Real deals. Real outcomes.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            A selection of recent lending scenarios — from prime London townhouses
            and Grade II-listed manors to hotel portfolios and warehouse-secured
            commercial loans.
          </p>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="bg-secondary/40 py-16 md:py-20">
          <div className="container">
            <FeaturedCaseStudy cs={featured} />
          </div>
        </section>
      )}

      {/* Grid */}
      {rest.length > 0 && (
        <section className="bg-background py-16 md:py-20">
          <div className="container">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-3xl text-foreground md:text-4xl">
                More from the portfolio
              </h2>
              <p className="text-sm text-muted-foreground">
                {items.length} {items.length === 1 ? 'case study' : 'case studies'}
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((cs) => (
                <CaseStudyCard key={cs.id} cs={cs} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

const FeaturedCaseStudy: React.FC<{ cs: CaseStudy }> = ({ cs }) => {
  const img = cs.image as Media | undefined
  const href = `/case-studies/${cs.slug}`
  const completed = formatDate(cs.completedAt)

  return (
    <Link
      href={href}
      className="group grid overflow-hidden rounded-2xl bg-card ring-1 ring-border transition-all hover:ring-foreground/20 hover:shadow-[0_24px_60px_-30px_rgb(15,23,42,0.35)] md:grid-cols-2"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary md:aspect-auto">
        {img?.url ? (
          <Image
            src={img.url}
            alt={img.alt || cs.title}
            fill
            priority
            sizes="(max-width:768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-navy to-brand/40" />
        )}
      </div>
      <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs uppercase tracking-[0.18em] text-brand">
          <span>Featured</span>
          {cs.propertyType && (
            <>
              <span aria-hidden className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">{cs.propertyType}</span>
            </>
          )}
          {cs.location && (
            <>
              <span aria-hidden className="text-muted-foreground">·</span>
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
                {cs.location}
              </span>
            </>
          )}
        </div>
        <h3 className="font-display mt-5 text-balance text-3xl leading-tight text-foreground md:text-4xl">
          {cs.title}
        </h3>
        {cs.summary && (
          <p className="mt-4 max-w-prose text-base leading-relaxed text-muted-foreground">
            {cs.summary}
          </p>
        )}
        <dl className="mt-8 grid grid-cols-3 gap-6 border-t border-border pt-6">
          {cs.loanAmount && (
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">Loan</dt>
              <dd className="font-display mt-1.5 text-xl text-foreground">{cs.loanAmount}</dd>
            </div>
          )}
          {cs.term && (
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">Term</dt>
              <dd className="font-display mt-1.5 text-xl text-foreground">{cs.term}</dd>
            </div>
          )}
          {completed && (
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">Completed</dt>
              <dd className="font-display mt-1.5 text-xl text-foreground">{completed}</dd>
            </div>
          )}
        </dl>
        <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors group-hover:text-brand">
          Read case study
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}

const CaseStudyCard: React.FC<{ cs: CaseStudy }> = ({ cs }) => {
  const img = cs.image as Media | undefined
  const href = `/case-studies/${cs.slug}`

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-xl bg-card ring-1 ring-border transition-all hover:-translate-y-1 hover:ring-foreground/20 hover:shadow-[0_24px_60px_-30px_rgb(15,23,42,0.35)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        {img?.url ? (
          <Image
            src={img.url}
            alt={img.alt || cs.title}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-navy to-brand/40" />
        )}
        {cs.loanAmount && (
          <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-background/95 px-3 py-1.5 text-xs font-medium text-foreground shadow-sm backdrop-blur ring-1 ring-border">
            <Banknote className="h-3.5 w-3.5 text-brand" strokeWidth={1.75} />
            {cs.loanAmount}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs uppercase tracking-wider text-muted-foreground">
          {cs.propertyType && <span>{cs.propertyType}</span>}
          {cs.propertyType && cs.location && <span aria-hidden>·</span>}
          {cs.location && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" strokeWidth={1.75} />
              {cs.location}
            </span>
          )}
        </div>
        <h3 className="font-display mt-4 text-xl leading-snug text-foreground md:text-2xl">
          {cs.title}
        </h3>
        {cs.summary && (
          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {cs.summary}
          </p>
        )}
        <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
          {cs.term ? (
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" strokeWidth={1.75} />
              {cs.term}
            </span>
          ) : (
            <span />
          )}
          <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
        </div>
      </div>
    </Link>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Case Studies | Ortus Secured Finance',
    description:
      'Real-world lending scenarios from Ortus Secured Finance — bridging, commercial mortgages and development exit loans.',
  }
}
