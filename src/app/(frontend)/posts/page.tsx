import type { Metadata } from 'next/types'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, Calendar } from 'lucide-react'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { Pagination } from '@/components/Pagination'
import PageClient from './page.client'
import type { Media } from '@/payload-types'

export const dynamic = 'force-static'
export const revalidate = 600

const PAGE_SIZE = 9

const formatDate = (iso?: string | null) => {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: PAGE_SIZE,
    overrideAccess: false,
    sort: '-publishedAt',
  })

  const [featured, ...rest] = posts.docs

  return (
    <div>
      <PageClient />

      {/* Hero band */}
      <section className="border-b border-border bg-background">
        <div className="container py-14 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">
            Insight & news
          </p>
          <h1 className="font-display mt-5 max-w-3xl text-balance text-4xl font-medium leading-[1.05] text-foreground md:text-5xl lg:text-6xl">
            Market commentary from the Ortus desk.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Underwriting notes, lending appetite, and how we look at risk — written
            by the people structuring our loans.
          </p>
        </div>
      </section>

      {/* Featured article */}
      {featured && (
        <section className="bg-secondary/40 py-16 md:py-20">
          <div className="container">
            <FeaturedPostCard post={featured} />
          </div>
        </section>
      )}

      {/* Rest of the grid */}
      {rest.length > 0 && (
        <section className="bg-background py-16 md:py-20">
          <div className="container">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-3xl text-foreground md:text-4xl">More from the desk</h2>
              <p className="text-sm text-muted-foreground">
                {posts.totalDocs} {posts.totalDocs === 1 ? 'article' : 'articles'}
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {posts.totalPages > 1 && posts.page && (
              <div className="mt-16">
                <Pagination page={posts.page} totalPages={posts.totalPages} />
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  )
}

const pickImage = (post: { heroImage?: unknown; meta?: { image?: unknown } }) => {
  const hero = post.heroImage
  if (hero && typeof hero === 'object') return hero as Media
  const meta = post.meta?.image
  if (meta && typeof meta === 'object') return meta as Media
  return null
}

const FeaturedPostCard: React.FC<{ post: any }> = ({ post }) => {
  const img = pickImage(post)
  const date = formatDate(post.publishedAt)
  const href = `/posts/${post.slug}`

  return (
    <Link
      href={href}
      className="group grid overflow-hidden rounded-2xl bg-card ring-1 ring-border transition-all hover:ring-foreground/20 hover:shadow-[0_24px_60px_-30px_rgb(15,23,42,0.35)] md:grid-cols-2"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary md:aspect-auto">
        {img?.url ? (
          <Image
            src={img.url}
            alt={img.alt || post.title}
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
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-brand">
          <span>Featured</span>
          {date && (
            <>
              <span aria-hidden className="text-muted-foreground">·</span>
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" strokeWidth={1.75} />
                {date}
              </span>
            </>
          )}
        </div>
        <h3 className="font-display mt-5 text-balance text-3xl leading-tight text-foreground md:text-4xl">
          {post.title}
        </h3>
        {post.meta?.description && (
          <p className="mt-4 max-w-prose text-base leading-relaxed text-muted-foreground">
            {post.meta.description}
          </p>
        )}
        <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors group-hover:text-brand">
          Read article
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}

const PostCard: React.FC<{ post: any }> = ({ post }) => {
  const img = pickImage(post)
  const date = formatDate(post.publishedAt)
  const href = `/posts/${post.slug}`
  const categories = Array.isArray(post.categories) ? post.categories : []

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-xl bg-card ring-1 ring-border transition-all hover:-translate-y-1 hover:ring-foreground/20 hover:shadow-[0_24px_60px_-30px_rgb(15,23,42,0.35)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        {img?.url ? (
          <Image
            src={img.url}
            alt={img.alt || post.title}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-navy to-brand/40" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground">
          {categories.length > 0 && typeof categories[0] === 'object' && (
            <>
              <span className="text-brand">{categories[0].title}</span>
              {date && <span aria-hidden>·</span>}
            </>
          )}
          {date && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" strokeWidth={1.75} />
              {date}
            </span>
          )}
        </div>
        <h3 className="font-display mt-4 text-xl leading-snug text-foreground md:text-2xl">
          {post.title}
        </h3>
        {post.meta?.description && (
          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {post.meta.description}
          </p>
        )}
        <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors group-hover:text-brand">
          Read article
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'News & Insight | Ortus Secured Finance',
    description:
      'Underwriting notes, market commentary and lending appetite from the Ortus team.',
  }
}
