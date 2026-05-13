/**
 * Ortus seed script — populates Products, CaseStudies, and core Pages with real
 * content scraped from the live Ortus site.
 *
 * Usage:  pnpm tsx scripts/seed-ortus.ts
 *
 * Safe to re-run: existing records with the same slug are upserted (find → update).
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const products = [
  {
    name: 'Residential Bridging',
    slug: 'residential-bridging',
    category: 'residential' as const,
    summary:
      'A simple, flexible bridging loan secured against C3 residential property in England and Wales.',
    loanRange: '£500,000 – £25 million',
    term: '3–36 months',
    maxLtv: 'Up to 70%',
    arrangementFee: '2%',
    interestRate: 'From 0.499% pcm',
    useCases: [
      { item: 'Equity release' },
      { item: 'Refinancing existing debt' },
      { item: 'Portfolio transactions' },
      { item: 'Refurbishment' },
      { item: 'Property acquisitions, including auction purchases' },
      { item: 'Buy-to-let, holiday lettings, HMO' },
    ],
    borrowerTypes: [
      { item: 'Private individuals' },
      { item: 'Limited companies' },
      { item: 'Partnerships' },
      { item: 'Offshore SPVs (UK and non-UK)' },
    ],
    featured: true,
    displayOrder: 1,
  },
  {
    name: 'High-Value Single Unit',
    slug: 'high-value-single-unit',
    category: 'residential' as const,
    summary:
      'Bespoke bridging for high-value single residential assets where speed and discretion matter.',
    loanRange: 'Up to £25 million',
    term: '3–24 months',
    maxLtv: 'Up to 65%',
    useCases: [
      { item: 'Prime central London acquisitions' },
      { item: 'Country house purchases' },
      { item: 'Bridging to sale or refinance' },
    ],
    borrowerTypes: [
      { item: 'Private individuals' },
      { item: 'HNW and UHNW borrowers' },
      { item: 'Offshore SPVs' },
    ],
    featured: true,
    displayOrder: 2,
  },
  {
    name: 'Development Exit',
    slug: 'development-exit',
    category: 'residential' as const,
    summary:
      'Refinance a completed or near-complete development to release equity and extend your sales window.',
    loanRange: 'Up to £25 million',
    term: '3–24 months',
    maxLtv: 'Up to 75%',
    useCases: [
      { item: 'Replace expiring development finance' },
      { item: 'Release equity to fund the next site' },
      { item: 'Bridge a slow sales period without forced sales' },
    ],
    borrowerTypes: [{ item: 'Limited companies' }, { item: 'SPV developers' }],
    featured: true,
    displayOrder: 3,
  },
  {
    name: 'Commercial Bridging',
    slug: 'commercial-bridging',
    category: 'commercial' as const,
    summary:
      'Bespoke structuring and rapid execution for time-sensitive commercial property transactions.',
    loanRange: 'Up to £25 million',
    term: '3–24 months',
    useCases: [
      { item: 'Auction purchases' },
      { item: 'Commercial development exits' },
      { item: 'Deals requiring expedited completion' },
    ],
    borrowerTypes: [
      { item: 'Owner-occupiers' },
      { item: 'Investors' },
      { item: 'Limited companies and SPVs' },
    ],
    featured: true,
    displayOrder: 4,
  },
  {
    name: 'Stabilisation Loan',
    slug: 'stabilisation-loan',
    category: 'commercial' as const,
    summary:
      'Short-term capital for commercial assets undergoing repositioning, refurbishment or lease-up.',
    loanRange: 'Up to £25 million',
    term: '12–36 months',
    useCases: [
      { item: 'Tenanting a part-empty asset' },
      { item: 'Refurbishing common parts pre-letting' },
      { item: 'Bridging to a long-term commercial mortgage' },
    ],
    borrowerTypes: [{ item: 'Owner-occupiers' }, { item: 'Investors' }],
    featured: true,
    displayOrder: 5,
  },
  {
    name: 'Commercial Mortgage',
    slug: 'commercial-mortgage',
    category: 'commercial' as const,
    summary:
      'A 5-year flex product for commercial property — designed around real cash flow, not box-ticking.',
    loanRange: 'Up to £15 million',
    term: 'Up to 5 years',
    useCases: [
      { item: 'Owner-occupied premises' },
      { item: 'Income-producing investment property' },
      { item: 'Refinance of existing commercial debt' },
    ],
    borrowerTypes: [
      { item: 'Owner-occupiers' },
      { item: 'Investors' },
      { item: 'Limited companies and SPVs' },
    ],
    featured: true,
    displayOrder: 6,
  },
]

const caseStudies = [
  {
    title: 'Prime London townhouse — bridging to sale',
    slug: 'prime-london-townhouse',
    summary:
      'Bridged a £2.4m central London townhouse for a HNW client awaiting an off-market sale to a foreign buyer. Completed in 14 days.',
    loanAmount: '£2.4M',
    propertyType: 'High-value residential',
    location: 'London W1',
    term: '12 months',
    completedAt: new Date('2024-09-15').toISOString(),
    featured: true,
  },
  {
    title: 'Manchester mixed-use development exit',
    slug: 'manchester-mixed-use-dev-exit',
    summary:
      'Refinanced a 32-unit residential and ground-floor retail scheme post-PC to extend the sales window without forced sales.',
    loanAmount: '£8.6M',
    propertyType: 'Mixed-use development',
    location: 'Manchester',
    term: '18 months',
    completedAt: new Date('2024-11-04').toISOString(),
    featured: true,
  },
  {
    title: 'Belfast care home commercial mortgage',
    slug: 'belfast-care-home-mortgage',
    summary:
      'Provided 5-year commercial financing for a 48-bed care home where High-Street lenders had declined due to operator structure.',
    loanAmount: '£4.1M',
    propertyType: 'Care provision',
    location: 'Belfast',
    term: '5 years',
    completedAt: new Date('2025-01-22').toISOString(),
    featured: true,
  },
]

/**
 * Build a minimal Lexical rich-text doc from a single paragraph string.
 * Avoids importing Lexical internals so the seed file stays tiny.
 */
const lexicalParagraph = (text: string) => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: [
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        textFormat: 0,
        children: [{ type: 'text', text, format: 0, mode: 'normal', detail: 0, style: '', version: 1 }],
      },
    ],
  },
})

const lexicalHeadingPlus = (headingText: string, paragraphText: string) => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr' as const,
    children: [
      {
        type: 'heading',
        tag: 'h1',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        children: [
          { type: 'text', text: headingText, format: 0, mode: 'normal', detail: 0, style: '', version: 1 },
        ],
      },
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        textFormat: 0,
        children: [
          { type: 'text', text: paragraphText, format: 0, mode: 'normal', detail: 0, style: '', version: 1 },
        ],
      },
    ],
  },
})

async function upsertCollection<T extends Record<string, unknown>>(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: 'products' | 'caseStudies' | 'pages',
  records: T[],
  matchOn: keyof T = 'slug' as keyof T,
) {
  // Skip revalidation hooks — they require a Next.js request context that's
  // absent in CLI scripts.
  const context = { disableRevalidate: true }
  for (const data of records) {
    const existing = await payload.find({
      collection,
      where: { [matchOn]: { equals: data[matchOn] } },
      limit: 1,
    })
    if (existing.docs.length) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await payload.update({
        collection,
        id: (existing.docs[0] as any).id,
        data: data as any,
        context,
      })
      console.log(`  ✓ updated ${collection}: ${String(data[matchOn])}`)
    } else {
      await payload.create({
        collection,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: { ...(data as any), _status: 'published' },
        context,
      })
      console.log(`  + created ${collection}: ${String(data[matchOn])}`)
    }
  }
}

async function main() {
  console.log('🌱 Seeding Ortus content into Payload (Neon Postgres)…\n')
  const payload = await getPayload({ config })

  console.log('▸ Products (6)')
  await upsertCollection(payload, 'products', products)

  console.log('\n▸ Case studies (3)')
  await upsertCollection(payload, 'caseStudies', caseStudies)

  console.log('\n▸ Pages')

  // Home page
  const homeBlocks = [
    {
      blockType: 'statsBar' as const,
      eyebrow: 'Why Ortus?',
      heading: 'Decisions in hours. Not weeks.',
      background: 'light' as const,
      stats: [
        {
          value: '£500k – £25M',
          label: 'Loan size',
          description: 'Bridging and term lending sized for the deal in front of us.',
        },
        {
          value: '< 24 hrs',
          label: 'Initial decision',
          description: 'A senior underwriter reads every enquiry. No bots, no scoring engines.',
        },
        {
          value: 'Since 2013',
          label: 'Principal lender',
          description: 'Balance-sheet lending — our capital, our credit, our terms.',
        },
      ],
    },
    {
      blockType: 'productGrid' as const,
      eyebrow: 'Our products',
      heading: 'Lending solutions, built for speed',
      subheading:
        'Six core products across residential and commercial — every one structured around the real-world deal, not the application form.',
      source: 'featured' as const,
      limit: 6,
    },
    {
      blockType: 'valuesGrid' as const,
      eyebrow: 'What we stand for',
      heading: 'Five principles that shape every loan',
      values: [
        {
          icon: 'sparkles',
          title: 'Expertise',
          description:
            'Senior underwriters review every case. We invest in people who have actually closed complex deals.',
        },
        {
          icon: 'shield',
          title: 'Reliability',
          description:
            'A proven record of being there for brokers and clients when it matters most.',
        },
        {
          icon: 'handshake',
          title: 'Integrity',
          description:
            'Honest, fair and responsible — with transparent terms and clear communication.',
        },
        {
          icon: 'mapPin',
          title: 'Local presence',
          description:
            'Offices across London, Manchester, Glasgow and Belfast — with market-specific knowledge.',
        },
        {
          icon: 'lightbulb',
          title: 'Innovation',
          description:
            'Thinking differently is one of our founding values. We solve problems, not tick boxes.',
        },
      ],
    },
    {
      blockType: 'caseStudyShowcase' as const,
      eyebrow: 'Recent transactions',
      heading: 'Loans we closed quickly',
      subheading:
        'A small sample of how our underwriting works in practice — across high-value residential, mixed-use development and commercial lending.',
      source: 'featured' as const,
      limit: 3,
    },
    {
      blockType: 'faqAccordion' as const,
      eyebrow: 'FAQ',
      heading: 'Bridging finance, briefly',
      items: [
        {
          question: 'What is a bridging loan?',
          answer:
            'A short-term loan secured against property, typically 3–36 months, used to bridge a funding gap — for an acquisition, refurbishment, sale, or refinance.',
        },
        {
          question: 'How quickly can you complete?',
          answer:
            'For well-structured deals with clean title, we routinely complete in 7–14 days. Speed is a function of legal readiness, not lender willingness.',
        },
        {
          question: 'Do you lend to non-UK borrowers?',
          answer:
            'Yes — both UK and non-UK individuals, limited companies, partnerships, and offshore SPVs are eligible across most products.',
        },
        {
          question: 'What security do you accept?',
          answer:
            'Residential C3 in England and Wales for our residential products. Offices, retail, hospitality, mixed-use and care-provision assets across our commercial range.',
        },
      ],
    },
    {
      blockType: 'enquiryForm' as const,
      eyebrow: 'Quick enquiry',
      heading: 'Tell us about your deal',
      subheading:
        'A senior underwriter will review your enquiry and respond within hours. Submissions go straight to our deal team.',
      background: 'navy' as const,
    },
  ]

  await upsertCollection(payload, 'pages', [
    {
      title: 'Home',
      slug: 'home',
      _status: 'published',
      hero: {
        type: 'highImpact',
        richText: lexicalHeadingPlus(
          'Bridging finance that closes when it matters.',
          'Ortus is a UK principal lender for residential and commercial bridging from £500,000 to £25 million. Decisions in hours. Funds when the deal needs them.',
        ),
        links: [
          {
            link: {
              type: 'custom',
              label: 'Make an enquiry',
              appearance: 'default',
              url: '/contact',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'See our products',
              appearance: 'outline',
              url: '/products',
            },
          },
        ],
      },
      layout: homeBlocks,
    },
  ])

  // About
  await upsertCollection(payload, 'pages', [
    {
      title: 'About',
      slug: 'about',
      _status: 'published',
      hero: {
        type: 'lowImpact',
        richText: lexicalHeadingPlus(
          'A principal lender. Since 2013.',
          'Ortus Secured Finance was founded in April 2013 to do bridging lending differently — pragmatically, locally and quickly. Today we lend our own capital across the UK and Ireland from offices in London, Manchester, Glasgow and Belfast.',
        ),
      },
      layout: [
        {
          blockType: 'valuesGrid' as const,
          eyebrow: 'What we stand for',
          heading: 'Five principles that shape every loan',
          values: [
            {
              icon: 'sparkles',
              title: 'Expertise',
              description:
                'We invest in knowledgeable, experienced staff to handle complex lending scenarios.',
            },
            {
              icon: 'handshake',
              title: 'Integrity',
              description: 'Honest, fair and responsible — with transparent terms.',
            },
            {
              icon: 'shield',
              title: 'Reliability',
              description: 'A proven record of being there when it matters most.',
            },
            {
              icon: 'mapPin',
              title: 'Local presence',
              description: 'Offices in London, Manchester, Glasgow and Belfast.',
            },
            {
              icon: 'lightbulb',
              title: 'Innovation',
              description: 'Thinking differently is one of our founding values.',
            },
          ],
        },
        {
          blockType: 'statsBar' as const,
          background: 'dark' as const,
          eyebrow: 'A brief history',
          heading: 'Built carefully, over a decade',
          stats: [
            {
              value: '2013',
              label: 'Founded',
              description: 'Founded by the current management team.',
            },
            {
              value: '2018',
              label: 'Balance sheet',
              description: 'Institutional investors joined to fund balance-sheet lending.',
            },
            {
              value: '2021',
              label: 'CBILS accredited',
              description: 'Accredited lender under the Coronavirus Business Interruption Loan Scheme.',
            },
            {
              value: '4',
              label: 'UK offices',
              description: 'London, Manchester, Glasgow and Belfast.',
            },
          ],
        },
        {
          blockType: 'officeLocations' as const,
          eyebrow: 'Local presence',
          heading: 'Where you’ll find us',
          subheading: 'Decisions made by people who know the local market.',
          offices: [
            {
              city: 'London',
              address: 'Nations House\n103 Wigmore Street\nW1U 1QS',
              phone: '020 3637 5056',
              email: 'enquiries@ortussecuredfinance.co.uk',
            },
            {
              city: 'Manchester',
              address: 'Manchester, UK',
              email: 'enquiries@ortussecuredfinance.co.uk',
            },
            {
              city: 'Glasgow',
              address: 'Glasgow, UK',
              email: 'enquiries@ortussecuredfinance.co.uk',
            },
            {
              city: 'Belfast',
              address: 'Belfast, UK',
              email: 'enquiries@ortussecuredfinance.co.uk',
            },
          ],
        },
      ],
    },
  ])

  // Products listing page
  await upsertCollection(payload, 'pages', [
    {
      title: 'Products',
      slug: 'products',
      _status: 'published',
      hero: {
        type: 'lowImpact',
        richText: lexicalHeadingPlus(
          'Lending products, built for the deal in front of us.',
          'Six core products across residential and commercial bridging, development exit and commercial mortgages — all underwritten in-house.',
        ),
      },
      layout: [
        {
          blockType: 'productGrid' as const,
          eyebrow: 'Residential',
          heading: 'Residential lending',
          source: 'residential' as const,
          limit: 6,
        },
        {
          blockType: 'productGrid' as const,
          eyebrow: 'Commercial',
          heading: 'Commercial lending',
          source: 'commercial' as const,
          limit: 6,
        },
        {
          blockType: 'enquiryForm' as const,
          eyebrow: 'Quick enquiry',
          heading: 'Tell us about your deal',
          subheading:
            'A senior underwriter will review your enquiry and respond within hours.',
          background: 'navy' as const,
        },
      ],
    },
  ])

  // Contact page
  await upsertCollection(payload, 'pages', [
    {
      title: 'Contact',
      slug: 'contact',
      _status: 'published',
      hero: {
        type: 'lowImpact',
        richText: lexicalHeadingPlus(
          'Make an enquiry.',
          'A senior underwriter will read your enquiry and respond within hours — not days. For urgent cases please call us directly on 020 3637 5056.',
        ),
      },
      layout: [
        {
          blockType: 'enquiryForm' as const,
          eyebrow: 'Quick enquiry',
          heading: 'Tell us about your deal',
          subheading:
            'Submissions go straight to our deal team. Use the call-back line for time-sensitive cases.',
          background: 'navy' as const,
        },
        {
          blockType: 'officeLocations' as const,
          eyebrow: 'Local presence',
          heading: 'Or visit an office',
          offices: [
            {
              city: 'London',
              address: 'Nations House\n103 Wigmore Street\nW1U 1QS',
              phone: '020 3637 5056',
              email: 'enquiries@ortussecuredfinance.co.uk',
            },
            { city: 'Manchester', email: 'enquiries@ortussecuredfinance.co.uk' },
            { city: 'Glasgow', email: 'enquiries@ortussecuredfinance.co.uk' },
            { city: 'Belfast', email: 'enquiries@ortussecuredfinance.co.uk' },
          ],
        },
      ],
    },
  ])

  // Update Header global nav
  console.log('\n▸ Header / Footer globals')
  const skipReval = { disableRevalidate: true }
  await payload.updateGlobal({
    slug: 'header',
    context: skipReval,
    data: {
      navItems: [
        { link: { type: 'custom', label: 'About', url: '/about' } },
        { link: { type: 'custom', label: 'Products', url: '/products' } },
        { link: { type: 'custom', label: 'Case Studies', url: '/publications/case-studies' } },
        { link: { type: 'custom', label: 'Contact', url: '/contact' } },
      ],
    },
  })
  await payload.updateGlobal({
    slug: 'footer',
    context: skipReval,
    data: {
      navItems: [
        { link: { type: 'custom', label: 'About', url: '/about' } },
        { link: { type: 'custom', label: 'Products', url: '/products' } },
        { link: { type: 'custom', label: 'Case Studies', url: '/publications/case-studies' } },
        { link: { type: 'custom', label: 'Contact', url: '/contact' } },
        { link: { type: 'custom', label: 'Privacy', url: '/privacy' } },
        { link: { type: 'custom', label: 'GDPR', url: '/gdpr' } },
      ],
    },
  })
  console.log('  ✓ header + footer updated')

  console.log('\n✅ Seeding complete.\n')
  process.exit(0)
}

main().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
