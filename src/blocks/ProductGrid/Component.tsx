import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { ArrowUpRight } from 'lucide-react'

import type { ProductGridBlock as Props, Product, Media } from '@/payload-types'

export const ProductGridBlock: React.FC<Props> = async (props) => {
  const { eyebrow, heading, subheading, source, manualProducts, limit } = props

  const payload = await getPayload({ config: configPromise })

  let products: Product[] = []

  if (source === 'manual' && manualProducts?.length) {
    products = manualProducts.filter((p): p is Product => typeof p === 'object' && p !== null)
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
      depth: 2,
    })
    products = result.docs
  }

  if (!products.length) return null

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="container">
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

        <div className="mt-16 grid gap-x-8 gap-y-12 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const img = product.image as Media | undefined
            const imgUrl = img && typeof img === 'object' ? img.url : null
            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group flex flex-col"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                  {imgUrl ? (
                    <Image
                      src={imgUrl}
                      alt={img?.alt || product.name}
                      fill
                      sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-b from-navy to-navy/70" />
                  )}
                  <span className="absolute left-5 top-5 inline-flex items-center bg-background/95 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground backdrop-blur">
                    {product.category}
                  </span>
                </div>

                <div className="mt-6 flex flex-1 flex-col">
                  <h3 className="font-display text-2xl font-light leading-snug text-foreground md:text-[28px]">
                    {product.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-[1.7] text-muted-foreground">
                    {product.summary}
                  </p>

                  {(product.loanRange || product.term) && (
                    <dl className="mt-6 grid grid-cols-2 gap-x-6 border-t border-border pt-5 text-xs">
                      {product.loanRange && (
                        <div>
                          <dt className="uppercase tracking-wider text-muted-foreground">Loan</dt>
                          <dd className="font-mono mt-1.5 text-foreground">{product.loanRange}</dd>
                        </div>
                      )}
                      {product.term && (
                        <div>
                          <dt className="uppercase tracking-wider text-muted-foreground">Term</dt>
                          <dd className="font-mono mt-1.5 text-foreground">{product.term}</dd>
                        </div>
                      )}
                    </dl>
                  )}

                  <span className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-foreground transition-colors group-hover:text-brand">
                    Explore
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
