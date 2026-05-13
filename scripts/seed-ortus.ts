/**
 * Ortus seed script — populates Products, CaseStudies, Posts (news) and core
 * Pages with content scraped from ortussecuredfinance.co.uk.
 *
 * Usage:  pnpm tsx scripts/seed-ortus.ts
 *
 * Safe to re-run: existing records with the same slug are upserted.
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

// ─────────────────────────────────────────────────────────────
//  PRODUCTS — all 6, with scraped numbers
// ─────────────────────────────────────────────────────────────
const products = [
  {
    name: 'Residential Bridging',
    slug: 'residential-bridging',
    category: 'residential' as const,
    summary:
      'A simple, flexible bridging loan secured against C3 residential property in England and Wales — combining market experience, reliability and rapid execution.',
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
      { item: 'Investment activities including buy-to-let, holiday lettings and HMO' },
    ],
    borrowerTypes: [
      { item: 'Private individuals' },
      { item: 'Limited companies' },
      { item: 'Partnerships' },
      { item: 'Offshore SPVs (UK and non-UK borrowers)' },
    ],
    featured: true,
    displayOrder: 1,
  },
  {
    name: 'High-Value Single Unit',
    slug: 'high-value-single-unit',
    category: 'residential' as const,
    summary:
      'Specialist financing for residential property valued in excess of £5 million — designed for foreign nationals and borrowers with complex financial structures.',
    loanRange: '£5M – £25 million',
    term: '3–36 months',
    maxLtv: 'Up to 70%',
    arrangementFee: '2%',
    interestRate: 'From 0.65% pcm',
    useCases: [
      { item: 'Equity release' },
      { item: 'Refinancing' },
      { item: 'Loan restructuring' },
      { item: 'High-value single property transactions' },
      { item: 'Portfolio acquisitions' },
    ],
    borrowerTypes: [
      { item: 'Foreign nationals with complex income arrangements' },
      { item: 'Complex corporate entities' },
      { item: 'Onshore / offshore structures' },
      { item: 'Borrowers with sophisticated financial arrangements' },
    ],
    featured: true,
    displayOrder: 2,
  },
  {
    name: 'Development Exit',
    slug: 'development-exit',
    category: 'residential' as const,
    summary:
      'A highly flexible refinancing option for residential developers as they complete schemes — rapid turnaround and substantial market expertise.',
    loanRange: 'Up to £25 million',
    term: '3–24 months',
    useCases: [
      { item: 'Extended sales timelines on finished units' },
      { item: 'Capital release on scheme completion' },
      { item: 'Replacing expiring development finance' },
    ],
    borrowerTypes: [
      { item: 'Private individuals' },
      { item: 'Limited companies' },
      { item: 'Partnerships' },
      { item: 'Offshore SPVs (UK and non-UK borrowers)' },
    ],
    featured: true,
    displayOrder: 3,
  },
  {
    name: 'Commercial Bridging',
    slug: 'commercial-bridging',
    category: 'commercial' as const,
    summary:
      'Finance for situations where bespoke structuring and rapid execution are paramount — for time-sensitive acquisitions or intricate borrowing needs.',
    loanRange: 'Up to £25 million',
    term: '3–24 months',
    useCases: [
      { item: 'Auction purchases' },
      { item: 'Commercial development exits' },
      { item: 'Deals requiring expedited completion' },
    ],
    borrowerTypes: [
      { item: 'Private individuals' },
      { item: 'Limited companies' },
      { item: 'Partnerships' },
      { item: 'Offshore SPVs (UK and non-UK borrowers)' },
    ],
    featured: true,
    displayOrder: 4,
  },
  {
    name: 'Stabilisation Loan',
    slug: 'stabilisation-loan',
    category: 'commercial' as const,
    summary:
      'Bridging finance for commercial investment property, owner-operators and owner-occupiers that need stabilising before traditional bank funding.',
    loanRange: 'Up to £25 million',
    term: '3–36 months · no early repayment charges',
    useCases: [
      { item: 'Vacant properties' },
      { item: 'Properties with tenants on short leases' },
      { item: 'Properties with low weighted average unexpired lease term (WAULT)' },
      { item: 'Lending based on business projections' },
    ],
    borrowerTypes: [
      { item: 'Owner-occupier businesses' },
      { item: 'Commercial investors' },
      { item: 'Start-ups with no trading history' },
    ],
    featured: true,
    displayOrder: 5,
  },
  {
    name: 'Commercial Mortgage',
    slug: 'commercial-mortgage',
    category: 'commercial' as const,
    summary:
      'A flexible 5-year commercial loan offering borrowers adaptability during market volatility — with rapid decisions and bespoke loan structures.',
    loanRange: 'Up to £25 million',
    term: '5 years',
    useCases: [
      { item: 'Flexible owner-occupied premises finance' },
      { item: 'Income-producing investment property' },
      { item: 'Refinancing existing commercial debt' },
      { item: 'Borrowers operating under tight deadlines' },
    ],
    borrowerTypes: [
      { item: 'Private individuals' },
      { item: 'Limited companies' },
      { item: 'Partnerships' },
      { item: 'Offshore SPVs (UK and non-UK borrowers)' },
    ],
    featured: true,
    displayOrder: 6,
  },
]

// ─────────────────────────────────────────────────────────────
//  CASE STUDIES — 6 real ones from the live site
// ─────────────────────────────────────────────────────────────
const caseStudies = [
  {
    title: 'Purchase and refurbishment of a Grade II-listed manor house',
    slug: 'grade-ii-listed-manor-house',
    summary:
      'We provided borrowing of nearly £3 million to support the purchase and repositioning of a large Grade II-listed manor house.',
    loanAmount: '£3M',
    propertyType: 'High-value residential',
    location: 'United Kingdom',
    featured: true,
  },
  {
    title: 'Lending on a warehouse in Greater London owned by an offshore entity',
    slug: 'greater-london-warehouse-offshore',
    summary:
      'A recently completed commercial loan secured against a warehouse asset owned by an offshore borrowing entity in Greater London.',
    propertyType: 'Commercial — warehouse',
    location: 'Greater London',
    featured: true,
  },
  {
    title: 'Funding business expansion through a warehouse-secured loan',
    slug: 'warehouse-business-expansion',
    summary:
      'A recently completed loan supporting an owner-occupier’s business expansion, secured against their existing warehouse asset.',
    propertyType: 'Commercial — warehouse',
    location: 'United Kingdom',
    featured: true,
  },
  {
    title: 'Lending on a guest house in Scotland',
    slug: 'scottish-guest-house',
    summary:
      'A recently completed loan secured against a hospitality asset in Scotland — illustrating our appetite for owner-operator commercial lending.',
    propertyType: 'Hospitality — guest house',
    location: 'Scotland',
    featured: false,
  },
  {
    title: '£7 million loan secured against three hotels',
    slug: 'seven-million-three-hotels',
    summary:
      'A £7 million facility secured against a portfolio of three hospitality assets — completed quickly to meet client deadlines.',
    loanAmount: '£7M',
    propertyType: 'Hospitality — hotel portfolio',
    location: 'United Kingdom',
    featured: false,
  },
  {
    title: '2-year, £3.1 million loan secured against four hotels',
    slug: 'two-year-3-1m-four-hotels',
    summary:
      'A two-year £3.1 million facility secured against a four-asset hotel portfolio — supporting the client through a repositioning period.',
    loanAmount: '£3.1M',
    propertyType: 'Hospitality — hotel portfolio',
    location: 'United Kingdom',
    term: '2 years',
    featured: false,
  },
]

// ─────────────────────────────────────────────────────────────
//  NEWS POSTS — 5 real ones from the live site
// ─────────────────────────────────────────────────────────────
const newsPosts = [
  {
    title: 'How we lend to offshore entities and foreign nationals',
    slug: 'lending-to-offshore-entities-and-foreign-nationals',
    publishedAt: new Date('2024-07-29').toISOString(),
  },
  {
    title: 'The scope of our lending appetite and how we structure loans',
    slug: 'scope-of-our-lending-appetite',
    publishedAt: new Date('2024-08-05').toISOString(),
  },
  {
    title: 'Beyond bridging: from last-resort lending to mainstream acceptance',
    slug: 'beyond-bridging',
    publishedAt: new Date('2024-08-12').toISOString(),
  },
  {
    title: 'Discover our highly flexible commercial lending proposition',
    slug: 'flexible-commercial-lending-proposition',
    publishedAt: new Date('2024-08-16').toISOString(),
  },
  {
    title: 'Ortus and office lending',
    slug: 'ortus-and-office-lending',
    publishedAt: new Date('2024-09-02').toISOString(),
  },
]

// ─────────────────────────────────────────────────────────────
//  TEAM — all 20 members scraped from /team/
// ─────────────────────────────────────────────────────────────
const teamMembers = [
  { name: 'Jon Salisbury', role: 'Chief Executive', email: 'jon@ortussecuredfinance.co.uk', phone: '020 3637 5056' },
  { name: 'Jamie Russell', role: 'Commercial Director', email: 'jamie@ortussecuredfinance.co.uk', phone: '07741 196 308' },
  { name: 'David Foster', role: 'Director — Head of Credit', email: 'david@ortussecuredfinance.co.uk', phone: '020 3637 5056' },
  { name: 'Colin Anderson', role: 'Director — Head of Risk', email: 'colin@ortussecuredfinance.co.uk', phone: '07776 660 376' },
  { name: 'Shane Donnelly', role: 'Director', email: 'shane@ortussecuredfinance.co.uk', phone: '07442 091 031' },
  { name: 'Orla McGerr', role: 'Head of Lending', email: 'orla.mcgerr@ortussecuredfinance.co.uk', phone: '0751 110 4076' },
  { name: 'Katherine Rooney', role: 'Head of Portfolio Management', email: 'katherine.rooney@ortussecuredfinance.co.uk', phone: '0776 716 0220' },
  { name: 'Mel Howard', role: 'Relationship Director', email: 'mel.howard@ortussecuredfinance.co.uk', phone: '+44 746 718 8508' },
  { name: 'Richard King', role: 'Relationship Director', email: 'rking@ortussecuredfinance.co.uk', phone: '07388 993 985' },
  { name: 'Matt Boggan', role: 'Relationship Director', email: 'matthew.boggan@ortussecuredfinance.co.uk', phone: '0777 509 6565' },
  { name: 'David Mckeown', role: 'Associate Director', email: 'david.mckeown@ortussecuredfinance.co.uk', phone: '07919 098 280' },
  { name: 'Andy Thomson', role: 'Senior Manager', email: 'andy.thomson@ortussecuredfinance.co.uk', phone: '07867 698 892' },
  { name: 'Marc Linden', role: 'Senior Manager', email: 'marc@ortussecuredfinance.co.uk', phone: '020 3637 5056' },
  { name: 'Conor Beatty', role: 'Senior Manager', email: 'conor.beatty@ortussecuredfinance.co.uk', phone: '0788 130 9468' },
  { name: 'James Martin', role: 'Lending Executive', email: 'james@ortussecuredfinance.co.uk', phone: '020 3637 5056' },
  { name: 'Rodger Long', role: 'Origination Associate', email: 'rodger.long@ortussecuredfinance.co.uk', phone: '0787 685 1721' },
  { name: 'Harry Bird', role: 'Origination Associate', email: 'harry.bird@ortussecuredfinance.co.uk', phone: '07394 008 096' },
  { name: 'John Matchett', role: 'Portfolio Executive', email: 'john.matchett@ortussecuredfinance.co.uk', phone: '0790 925 4995' },
  { name: 'Harrison Berger', role: 'Analyst', email: 'harrison.berger@ortussecuredfinance.co.uk', phone: '07867 266 799' },
  { name: 'Stephen Davison', role: 'In Memoriam', inMemoriam: true },
]

// ─────────────────────────────────────────────────────────────
//  Lexical rich-text helpers
// ─────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────
//  Upsert helper
// ─────────────────────────────────────────────────────────────
async function upsertCollection<T extends Record<string, unknown>>(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: 'products' | 'caseStudies' | 'pages' | 'posts',
  records: T[],
  matchOn: keyof T = 'slug' as keyof T,
) {
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

// ─────────────────────────────────────────────────────────────
//  Main
// ─────────────────────────────────────────────────────────────
async function main() {
  console.log('🌱 Seeding Ortus content into Payload (Neon Postgres)…\n')
  const payload = await getPayload({ config })

  console.log('▸ Products (6)')
  await upsertCollection(payload, 'products', products)

  console.log('\n▸ Case studies (6)')
  await upsertCollection(payload, 'caseStudies', caseStudies)

  console.log('\n▸ News / Posts (5)')
  // Posts need a `content` Lexical doc — pass minimal valid content
  await upsertCollection(
    payload,
    'posts',
    newsPosts.map((p) => ({
      ...p,
      content: lexicalParagraph(
        'Full article content can be added here. This post was seeded from the live site’s headline only.',
      ),
    })),
  )

  console.log('\n▸ Pages')

  // ── HOME ───────────────────────────────────────────────────
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
        { icon: 'sparkles', title: 'Expertise', description: 'Senior underwriters review every case. We invest in people who have actually closed complex deals.' },
        { icon: 'shield', title: 'Reliability', description: 'A proven record of being there for brokers and clients when it matters most.' },
        { icon: 'handshake', title: 'Integrity', description: 'Honest, fair and responsible — with transparent terms and clear communication.' },
        { icon: 'mapPin', title: 'Local presence', description: 'Offices across London, Manchester, Glasgow and Belfast — with market-specific knowledge.' },
        { icon: 'lightbulb', title: 'Innovation', description: 'Thinking differently is one of our founding values. We solve problems, not tick boxes.' },
      ],
    },
    {
      blockType: 'caseStudyShowcase' as const,
      eyebrow: 'Recent transactions',
      heading: 'Loans we closed quickly',
      subheading:
        'A small sample of how our underwriting works in practice — across high-value residential, commercial and hospitality lending.',
      source: 'featured' as const,
      limit: 3,
    },
    {
      blockType: 'faqAccordion' as const,
      eyebrow: 'FAQ',
      heading: 'Bridging finance, briefly',
      items: [
        { question: 'What is a bridging loan?', answer: 'A short-term loan secured against property, typically 3–36 months, used to bridge a funding gap — for an acquisition, refurbishment, sale, or refinance.' },
        { question: 'How quickly can you complete?', answer: 'For well-structured deals with clean title, we routinely complete in 7–14 days. Speed is a function of legal readiness, not lender willingness.' },
        { question: 'Do you lend to non-UK borrowers?', answer: 'Yes — both UK and non-UK individuals, limited companies, partnerships, and offshore SPVs are eligible across most products.' },
        { question: 'What security do you accept?', answer: 'Residential C3 in England and Wales for our residential products. Offices, retail, hospitality, mixed-use, warehouses and care-provision assets across our commercial range.' },
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
          { link: { type: 'custom', label: 'Make an enquiry', appearance: 'default', url: '/contact' } },
          { link: { type: 'custom', label: 'See our products', appearance: 'outline', url: '/products' } },
        ],
      },
      layout: homeBlocks,
    },
  ])

  // ── ABOUT ──────────────────────────────────────────────────
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
            { icon: 'sparkles', title: 'Expertise', description: 'We invest in knowledgeable, experienced staff to handle complex lending scenarios.' },
            { icon: 'handshake', title: 'Integrity', description: 'Honest, fair and responsible — with transparent terms.' },
            { icon: 'shield', title: 'Reliability', description: 'A proven record of being there when it matters most.' },
            { icon: 'mapPin', title: 'Local presence', description: 'Offices in London, Manchester, Glasgow and Belfast.' },
            { icon: 'lightbulb', title: 'Innovation', description: 'Thinking differently is one of our founding values.' },
          ],
        },
        {
          blockType: 'statsBar' as const,
          background: 'dark' as const,
          eyebrow: 'A brief history',
          heading: 'Built carefully, over a decade',
          stats: [
            { value: '2013', label: 'Founded', description: 'Founded by the current management team.' },
            { value: '2018', label: 'Balance sheet', description: 'Institutional investors joined to fund balance-sheet lending.' },
            { value: '2021', label: 'CBILS', description: 'Became an accredited CBILS lender.' },
            { value: '4', label: 'UK offices', description: 'London, Manchester, Glasgow and Belfast.' },
          ],
        },
        {
          blockType: 'teamGrid' as const,
          eyebrow: 'Our team',
          heading: 'The people behind every loan',
          subheading:
            'Senior underwriting talent across origination, credit, risk and portfolio management.',
          members: teamMembers,
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
            { city: 'Manchester', email: 'enquiries@ortussecuredfinance.co.uk' },
            { city: 'Glasgow', email: 'enquiries@ortussecuredfinance.co.uk' },
            { city: 'Belfast', email: 'enquiries@ortussecuredfinance.co.uk' },
          ],
        },
      ],
    },
  ])

  // ── PRODUCTS ───────────────────────────────────────────────
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
        { blockType: 'productGrid' as const, eyebrow: 'Residential', heading: 'Residential lending', source: 'residential' as const, limit: 6 },
        { blockType: 'productGrid' as const, eyebrow: 'Commercial', heading: 'Commercial lending', source: 'commercial' as const, limit: 6 },
        {
          blockType: 'enquiryForm' as const,
          eyebrow: 'Quick enquiry',
          heading: 'Tell us about your deal',
          subheading: 'A senior underwriter will review your enquiry and respond within hours.',
          background: 'navy' as const,
        },
      ],
    },
  ])

  // ── CONTACT ────────────────────────────────────────────────
  await upsertCollection(payload, 'pages', [
    {
      title: 'Contact',
      slug: 'contact',
      _status: 'published',
      hero: {
        type: 'lowImpact',
        richText: lexicalHeadingPlus(
          'Make an enquiry.',
          'A senior underwriter will read your enquiry and respond within hours — not days. For urgent cases please call 020 3637 5056.',
        ),
      },
      layout: [
        {
          blockType: 'enquiryForm' as const,
          eyebrow: 'Quick enquiry',
          heading: 'Tell us about your deal',
          subheading: 'Submissions go straight to our deal team. Use the direct line for time-sensitive cases.',
          background: 'navy' as const,
        },
        {
          blockType: 'officeLocations' as const,
          eyebrow: 'Local presence',
          heading: 'Or visit an office',
          offices: [
            { city: 'London', address: 'Nations House\n103 Wigmore Street\nW1U 1QS', phone: '020 3637 5056', email: 'enquiries@ortussecuredfinance.co.uk' },
            { city: 'Manchester', email: 'enquiries@ortussecuredfinance.co.uk' },
            { city: 'Glasgow', email: 'enquiries@ortussecuredfinance.co.uk' },
            { city: 'Belfast', email: 'enquiries@ortussecuredfinance.co.uk' },
          ],
        },
      ],
    },
  ])

  // ── Globals ────────────────────────────────────────────────
  console.log('\n▸ Header / Footer globals')
  const skipReval = { disableRevalidate: true }
  await payload.updateGlobal({
    slug: 'header',
    context: skipReval,
    data: {
      navItems: [
        { link: { type: 'custom', label: 'About', url: '/about' } },
        { link: { type: 'custom', label: 'Products', url: '/products' } },
        { link: { type: 'custom', label: 'News', url: '/posts' } },
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
        { link: { type: 'custom', label: 'News', url: '/posts' } },
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
