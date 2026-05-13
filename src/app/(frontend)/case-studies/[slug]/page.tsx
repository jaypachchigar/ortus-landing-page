import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import RichText from '@/components/RichText'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const items = await payload.find({
    collection: 'caseStudies',
    draft: false,
    limit: 200,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })
  return items.docs.map(({ slug }) => ({ slug }))
}

type Args = { params: Promise<{ slug?: string }> }

export default async function CaseStudyPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const cs = await queryCaseStudyBySlug({ slug: decodeURIComponent(slug) })

  if (!cs) notFound()

  return (
    <article>
      {draft && <LivePreviewListener />}

      <section className="border-b border-border bg-background">
        <div className="container py-16 md:py-24">
          <Link
            href="/publications/case-studies"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            All case studies
          </Link>
          <div className="mt-8 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground">
              {cs.propertyType && <span>{cs.propertyType}</span>}
              {cs.propertyType && cs.location && <span aria-hidden>·</span>}
              {cs.location && <span>{cs.location}</span>}
            </div>
            <h1 className="font-display mt-5 text-5xl leading-[1.05] text-foreground md:text-6xl">
              {cs.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {cs.summary}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-12">
        <div className="container">
          <dl className="grid gap-6 md:grid-cols-3">
            {cs.loanAmount && (
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  Loan amount
                </dt>
                <dd className="font-display mt-2 text-3xl text-foreground">{cs.loanAmount}</dd>
              </div>
            )}
            {cs.term && (
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">Term</dt>
                <dd className="font-display mt-2 text-3xl text-foreground">{cs.term}</dd>
              </div>
            )}
            {cs.completedAt && (
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  Completed
                </dt>
                <dd className="font-display mt-2 text-3xl text-foreground">
                  {new Date(cs.completedAt).toLocaleDateString('en-GB', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      {cs.body && (
        <section className="bg-background py-20 md:py-28">
          <div className="container">
            <RichText
              data={cs.body}
              enableGutter={false}
              className="prose prose-lg mx-auto max-w-3xl"
            />
          </div>
        </section>
      )}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const cs = await queryCaseStudyBySlug({ slug: decodeURIComponent(slug) })
  if (!cs) return {}
  return {
    title: `${cs.title} | Case Study | Ortus Secured Finance`,
    description: cs.summary,
  }
}

const queryCaseStudyBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'caseStudies',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: { slug: { equals: slug } },
  })
  return result.docs?.[0] || null
})
