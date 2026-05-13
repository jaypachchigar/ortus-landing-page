import React from 'react'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ArrowUpRight } from 'lucide-react'

import type { ProductGridBlock as Props, Product } from '@/payload-types'

export const ProductGridBlock: React.FC<Props> = async (props) => {
  const { eyebrow, heading, subheading, source, manualProducts, limit } = props

  const payload = await getPayload({ config: configPromise })

  let products: Product[] = []

  if (source === 'manual' && manualProducts?.length) {
    products = manualProducts.filter(
      (p): p is Product => typeof p === 'object' && p !== null,
    )
  } else {
    const where: Record<string, unknown> = {}
    if (source === 'residential') where.category = { equals: 'residential' }
    if (source === 'commercial') where.category = { equals: 'commercial' }
    if (source === 'featured') where.featured = { equals: true }

    const result = await payload.find({
      collection: 'products',
      where,
      limit: limit || 6,
      sort: 'displayOrder',
      depth: 1,
    })
    products = result.docs
  }

  if (!products.length) return null

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container">
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

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-border md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group relative flex flex-col bg-card p-8 transition-colors hover:bg-secondary md:p-10"
            >
              <div className="mb-6 flex items-start justify-between">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                    product.category === 'commercial'
                      ? 'bg-brand/10 text-brand'
                      : 'bg-foreground/10 text-foreground'
                  }`}
                >
                  {product.category}
                </span>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </div>

              <h3 className="font-display text-2xl leading-tight text-foreground md:text-3xl">
                {product.name}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {product.summary}
              </p>

              {(product.loanRange || product.term) && (
                <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6 text-xs">
                  {product.loanRange && (
                    <div>
                      <dt className="text-muted-foreground">Loan size</dt>
                      <dd className="mt-1 font-medium text-foreground">{product.loanRange}</dd>
                    </div>
                  )}
                  {product.term && (
                    <div>
                      <dt className="text-muted-foreground">Term</dt>
                      <dd className="mt-1 font-medium text-foreground">{product.term}</dd>
                    </div>
                  )}
                </dl>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
