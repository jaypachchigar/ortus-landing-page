import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'
import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'

import RichText from '@/components/RichText'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const products = await payload.find({
    collection: 'products',
    draft: false,
    limit: 100,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })
  return products.docs.map(({ slug }) => ({ slug }))
}

type Args = { params: Promise<{ slug?: string }> }

export default async function ProductPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const product = await queryProductBySlug({ slug: decodeURIComponent(slug) })

  if (!product) notFound()

  return (
    <article>
      {draft && <LivePreviewListener />}

      {/* Hero */}
      <section className="border-b border-border bg-background">
        <div className="container py-16 md:py-24">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            All products
          </Link>
          <div className="mt-8 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <span className="inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand">
                {product.category}
              </span>
              <h1 className="font-display mt-6 text-5xl leading-[1.05] text-foreground md:text-6xl lg:text-7xl">
                {product.name}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {product.summary}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key facts */}
      <section className="bg-secondary/40 py-16 md:py-20">
        <div className="container">
          <dl className="grid gap-px overflow-hidden rounded-2xl bg-border md:grid-cols-2 lg:grid-cols-5">
            {[
              { label: 'Loan size', value: product.loanRange },
              { label: 'Term', value: product.term },
              { label: 'Max LTV', value: product.maxLtv },
              { label: 'Interest rate', value: product.interestRate },
              { label: 'Arrangement fee', value: product.arrangementFee },
            ]
              .filter((f) => f.value)
              .map((f) => (
                <div key={f.label} className="bg-card p-6 md:p-8">
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                    {f.label}
                  </dt>
                  <dd className="font-display mt-2 text-xl text-foreground md:text-2xl">
                    {f.value}
                  </dd>
                </div>
              ))}
          </dl>
        </div>
      </section>

      {/* Description + use cases */}
      <section className="bg-background py-20 md:py-28">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              {product.description && (
                <RichText
                  data={product.description}
                  enableGutter={false}
                  className="prose prose-lg max-w-none"
                />
              )}
            </div>
            <aside className="lg:col-span-4">
              {!!product.useCases?.length && (
                <div className="rounded-2xl bg-secondary/40 p-8">
                  <h3 className="font-display text-2xl text-foreground">Use cases</h3>
                  <ul className="mt-5 space-y-3">
                    {product.useCases.map((u, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm leading-relaxed text-foreground"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2.5} />
                        {u.item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {!!product.borrowerTypes?.length && (
                <div className="mt-6 rounded-2xl bg-secondary/40 p-8">
                  <h3 className="font-display text-2xl text-foreground">Eligible borrowers</h3>
                  <ul className="mt-5 space-y-3">
                    {product.borrowerTypes.map((u, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm leading-relaxed text-foreground"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={2.5} />
                        {u.item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-navy text-navy-foreground" data-theme="dark">
        <div className="container py-16 md:py-20">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                Ready to enquire?
              </p>
              <h2 className="font-display mt-3 text-3xl text-white md:text-4xl">
                Submit a {product.name.toLowerCase()} enquiry.
              </h2>
              <p className="mt-3 max-w-xl text-white/70">
                A senior underwriter will review your case and respond within hours.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand/90"
              >
                Quick enquiry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const product = await queryProductBySlug({ slug: decodeURIComponent(slug) })
  if (!product) return {}
  return {
    title: `${product.name} | Ortus Secured Finance`,
    description: product.summary,
  }
}

const queryProductBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'products',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: { slug: { equals: slug } },
  })
  return result.docs?.[0] || null
})
