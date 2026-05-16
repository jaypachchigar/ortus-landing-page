/**
 * Ortus seed script — products, case studies, news, pages + Unsplash imagery.
 * Re-runnable: upserts by slug; images are downloaded once and reused via filename.
 *
 * Usage:  pnpm tsx scripts/seed-ortus.ts
 */

import 'dotenv/config'
import { getPayload, type Payload } from 'payload'
import config from '../src/payload.config'

// ─────────────────────────────────────────────────────────────
//  CURATED UNSPLASH IMAGERY — financial / property / urban
// ─────────────────────────────────────────────────────────────
type ImageSpec = { key: string; url: string; alt: string }

const IMG = {
  heroLondon: {
    key: 'hero-london-skyline',
    url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&q=80',
    alt: 'London skyline at golden hour',
  },
  residentialBridging: {
    key: 'product-residential-bridging',
    url: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1400&q=80',
    alt: 'Period London residential properties',
  },
  highValueUnit: {
    key: 'product-high-value-unit',
    url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1400&q=80',
    alt: 'High-value London residential property',
  },
  developmentExit: {
    key: 'product-development-exit',
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80',
    alt: 'New residential development scheme',
  },
  commercialBridging: {
    key: 'product-commercial-bridging',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&q=80',
    alt: 'City of London commercial office building',
  },
  stabilisationLoan: {
    key: 'product-stabilisation-loan',
    url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1400&q=80',
    alt: 'Warehouse and industrial property',
  },
  commercialMortgage: {
    key: 'product-commercial-mortgage',
    url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&q=80',
    alt: 'Modern commercial office interior',
  },
  csManor: {
    key: 'cs-grade-ii-manor',
    url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1400&q=80',
    alt: 'Grade II-listed country manor house',
  },
  csWarehouseGL: {
    key: 'cs-greater-london-warehouse',
    url: 'https://images.unsplash.com/photo-1565891741441-64926e441838?w=1400&q=80',
    alt: 'Greater London warehouse',
  },
  csWarehouseExp: {
    key: 'cs-warehouse-expansion',
    url: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=1400&q=80',
    alt: 'Warehouse facility',
  },
  csGuestHouse: {
    key: 'cs-scottish-guest-house',
    url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1400&q=80',
    alt: 'Scottish guest house',
  },
  csHotels7m: {
    key: 'cs-3-hotels-7m',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1400&q=80',
    alt: 'Luxury hotel facade',
  },
  csHotels4: {
    key: 'cs-4-hotels-3-1m',
    url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1400&q=80',
    alt: 'Boutique hotel exterior',
  },
  newsOffshore: {
    key: 'news-offshore',
    url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1400&q=80',
    alt: 'Financial data and analysis',
  },
  newsScope: {
    key: 'news-scope',
    url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1400&q=80',
    alt: 'Architectural detail',
  },
  newsBeyondBridging: {
    key: 'news-beyond-bridging',
    url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1400&q=80',
    alt: 'Business discussion',
  },
  newsFlexible: {
    key: 'news-flexible',
    url: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1400&q=80',
    alt: 'Modern commercial building',
  },
  newsOffice: {
    key: 'news-office-lending',
    url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1400&q=80',
    alt: 'Modern office interior',
  },
  // Official Ortus brand icons (used as customIcon in ValuesGrid)
  iconExpertise: {
    key: 'ortus-icon-expertise',
    url: 'https://ortussecuredfinance.co.uk/wp-content/uploads/2021/08/ortusIcons-01.png',
    alt: 'Expertise',
  },
  iconReliability: {
    key: 'ortus-icon-reliability',
    url: 'https://ortussecuredfinance.co.uk/wp-content/uploads/2021/08/ortusIcons-02.png',
    alt: 'Reliability',
  },
  iconLocal: {
    key: 'ortus-icon-local',
    url: 'https://ortussecuredfinance.co.uk/wp-content/uploads/2021/08/ortusIcons-03.png',
    alt: 'Local',
  },
  iconInnovation: {
    key: 'ortus-icon-innovation',
    url: 'https://ortussecuredfinance.co.uk/wp-content/uploads/2021/08/ortusIcons-04.png',
    alt: 'Innovation',
  },
  iconIntegrity: {
    key: 'ortus-icon-integrity',
    url: 'https://ortussecuredfinance.co.uk/wp-content/uploads/2021/08/ortusIcons-05.png',
    alt: 'Integrity',
  },
} satisfies Record<string, ImageSpec>

// ─────────────────────────────────────────────────────────────
//  Media uploader — idempotent by filename
// ─────────────────────────────────────────────────────────────
async function uploadImage(payload: Payload, spec: ImageSpec): Promise<string | number | null> {
  const isPng = /\.png(\?|$)/i.test(spec.url)
  const ext = isPng ? 'png' : 'jpg'
  const mimetype = isPng ? 'image/png' : 'image/jpeg'
  const filename = `${spec.key}.${ext}`

  // Skip if already uploaded
  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
  })
  if (existing.docs.length) {
    console.log(`  · media (cached): ${filename}`)
    return existing.docs[0].id
  }

  // Download
  const res = await fetch(spec.url)
  if (!res.ok) {
    console.warn(`  ! failed to fetch ${spec.url} (${res.status})`)
    return null
  }
  const buffer = Buffer.from(await res.arrayBuffer())

  const doc = await payload.create({
    collection: 'media',
    data: { alt: spec.alt },
    file: {
      data: buffer,
      mimetype,
      name: filename,
      size: buffer.byteLength,
    },
    context: { disableRevalidate: true },
  })
  console.log(`  + media: ${filename}`)
  return doc.id
}

async function uploadAll(payload: Payload) {
  const ids: Record<keyof typeof IMG, string | number | null> = {} as never
  for (const [key, spec] of Object.entries(IMG) as [keyof typeof IMG, ImageSpec][]) {
    ids[key] = await uploadImage(payload, spec)
  }
  return ids
}

// ─────────────────────────────────────────────────────────────
//  Upsert helper
// ─────────────────────────────────────────────────────────────
async function upsert<T extends Record<string, unknown>>(
  payload: Payload,
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
      console.log(`  ✓ ${collection}: ${String(data[matchOn])}`)
    } else {
      await payload.create({
        collection,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: { ...(data as any), _status: 'published' },
        context,
      })
      console.log(`  + ${collection}: ${String(data[matchOn])}`)
    }
  }
}

// Minimal Lexical paragraph for fields that still require richText
const lexParagraph = (text: string) => ({
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
        children: [
          {
            type: 'text',
            text,
            format: 0,
            mode: 'normal',
            detail: 0,
            style: '',
            version: 1,
          },
        ],
      },
    ],
  },
})

// ─────────────────────────────────────────────────────────────
//  Main
// ─────────────────────────────────────────────────────────────
async function main() {
  console.log('🌱 Seeding Ortus — products / case studies / pages / news + Unsplash imagery\n')
  const payload = await getPayload({ config })

  // Step 1 — media library
  console.log('▸ Media uploads (Unsplash)')
  const img = await uploadAll(payload)

  // Step 2 — products with images
  console.log('\n▸ Products (6)')
  await upsert(payload, 'products', [
    {
      name: 'Residential Bridging',
      slug: 'residential-bridging',
      category: 'residential' as const,
      summary:
        'A simple, flexible bridging loan secured against C3 residential property in England and Wales — combining market experience, reliability and rapid execution.',
      loanRange: '£500,000 – £25M',
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
        { item: 'Buy-to-let, holiday lettings and HMO' },
      ],
      borrowerTypes: [
        { item: 'Private individuals' },
        { item: 'Limited companies' },
        { item: 'Partnerships' },
        { item: 'Offshore SPVs (UK and non-UK borrowers)' },
      ],
      featured: true,
      displayOrder: 1,
      image: img.residentialBridging,
    },
    {
      name: 'High-Value Single Unit',
      slug: 'high-value-single-unit',
      category: 'residential' as const,
      summary:
        'Specialist financing for residential property valued in excess of £5 million — designed for foreign nationals and borrowers with complex financial structures.',
      loanRange: '£5M – £25M',
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
        { item: 'HNW and UHNW borrowers' },
      ],
      featured: true,
      displayOrder: 2,
      image: img.highValueUnit,
    },
    {
      name: 'Development Exit',
      slug: 'development-exit',
      category: 'residential' as const,
      summary:
        'A highly flexible refinancing option for residential developers as they complete schemes — rapid turnaround and substantial market expertise.',
      loanRange: 'Up to £25M',
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
      image: img.developmentExit,
    },
    {
      name: 'Commercial Bridging',
      slug: 'commercial-bridging',
      category: 'commercial' as const,
      summary:
        'Finance for situations where bespoke structuring and rapid execution are paramount — for time-sensitive acquisitions or intricate borrowing needs.',
      loanRange: 'Up to £25M',
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
      image: img.commercialBridging,
    },
    {
      name: 'Stabilisation Loan',
      slug: 'stabilisation-loan',
      category: 'commercial' as const,
      summary:
        'Bridging finance for commercial investment property, owner-operators and owner-occupiers that need stabilising before traditional bank funding.',
      loanRange: 'Up to £25M',
      term: '3–36 months · no ERC',
      useCases: [
        { item: 'Vacant properties' },
        { item: 'Properties with tenants on short leases' },
        { item: 'Properties with low WAULT' },
        { item: 'Lending based on business projections' },
      ],
      borrowerTypes: [
        { item: 'Owner-occupier businesses' },
        { item: 'Commercial investors' },
        { item: 'Start-ups with no trading history' },
      ],
      featured: true,
      displayOrder: 5,
      image: img.stabilisationLoan,
    },
    {
      name: 'Commercial Mortgage',
      slug: 'commercial-mortgage',
      category: 'commercial' as const,
      summary:
        'A flexible 5-year commercial loan offering adaptability during market volatility — with rapid decisions and bespoke loan structures.',
      loanRange: 'Up to £25M',
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
      image: img.commercialMortgage,
    },
  ])

  // Step 3 — case studies with images
  console.log('\n▸ Case studies (6)')
  await upsert(payload, 'caseStudies', [
    {
      title: 'Purchase and refurbishment of a Grade II-listed manor house',
      slug: 'grade-ii-listed-manor-house',
      summary:
        'We provided borrowing of nearly £3 million to support the purchase and repositioning of a large Grade II-listed manor house.',
      loanAmount: '£3M',
      propertyType: 'High-value residential',
      location: 'United Kingdom',
      featured: true,
      image: img.csManor,
    },
    {
      title: 'Lending on a warehouse in Greater London owned by an offshore entity',
      slug: 'greater-london-warehouse-offshore',
      summary:
        'A recently completed commercial loan secured against a warehouse asset owned by an offshore borrowing entity in Greater London.',
      propertyType: 'Commercial — warehouse',
      location: 'Greater London',
      featured: true,
      image: img.csWarehouseGL,
    },
    {
      title: 'Funding business expansion through a warehouse-secured loan',
      slug: 'warehouse-business-expansion',
      summary:
        'A recently completed loan supporting an owner-occupier’s business expansion, secured against their existing warehouse asset.',
      propertyType: 'Commercial — warehouse',
      location: 'United Kingdom',
      featured: true,
      image: img.csWarehouseExp,
    },
    {
      title: 'Lending on a guest house in Scotland',
      slug: 'scottish-guest-house',
      summary:
        'A recently completed loan secured against a hospitality asset in Scotland — illustrating our appetite for owner-operator commercial lending.',
      propertyType: 'Hospitality — guest house',
      location: 'Scotland',
      featured: false,
      image: img.csGuestHouse,
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
      image: img.csHotels7m,
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
      image: img.csHotels4,
    },
  ])

  // Step 4 — news posts with hero images
  console.log('\n▸ News / Posts (5)')
  await upsert(payload, 'posts', [
    {
      title: 'How we lend to offshore entities and foreign nationals',
      slug: 'lending-to-offshore-entities-and-foreign-nationals',
      publishedAt: new Date('2024-07-29').toISOString(),
      heroImage: img.newsOffshore,
      content: lexParagraph('Full article content can be added here via /admin.'),
    },
    {
      title: 'The scope of our lending appetite and how we structure loans',
      slug: 'scope-of-our-lending-appetite',
      publishedAt: new Date('2024-08-05').toISOString(),
      heroImage: img.newsScope,
      content: lexParagraph('Full article content can be added here via /admin.'),
    },
    {
      title: 'Beyond bridging: from last-resort lending to mainstream acceptance',
      slug: 'beyond-bridging',
      publishedAt: new Date('2024-08-12').toISOString(),
      heroImage: img.newsBeyondBridging,
      content: lexParagraph('Full article content can be added here via /admin.'),
    },
    {
      title: 'Discover our highly flexible commercial lending proposition',
      slug: 'flexible-commercial-lending-proposition',
      publishedAt: new Date('2024-08-16').toISOString(),
      heroImage: img.newsFlexible,
      content: lexParagraph('Full article content can be added here via /admin.'),
    },
    {
      title: 'Ortus and office lending',
      slug: 'ortus-and-office-lending',
      publishedAt: new Date('2024-09-02').toISOString(),
      heroImage: img.newsOffice,
      content: lexParagraph('Full article content can be added here via /admin.'),
    },
  ])

  // ── TEAM members (used in About page TeamGrid)
  const team = [
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

  // Step 5 — Pages
  console.log('\n▸ Pages (4)')

  const homeLayout = [
    {
      blockType: 'statsBar' as const,
      eyebrow: 'Why Ortus?',
      heading: 'Decisions in hours. Not weeks.',
      background: 'light' as const,
      stats: [
        { value: '£500k–£25M', label: 'Loan size', description: 'Bridging and term lending sized for the deal in front of us.' },
        { value: '< 24 hrs', label: 'Initial decision', description: 'A senior underwriter reads every enquiry. No bots, no scoring engines.' },
        { value: 'Since 2013', label: 'Principal lender', description: 'Balance-sheet lending — our capital, our credit, our terms.' },
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

  await upsert(payload, 'pages', [
    {
      title: 'Home',
      slug: 'home',
      _status: 'published',
      hero: {
        type: 'highImpact',
        eyebrow: 'UK Principal Lender · Since 2013',
        headline: 'Bridging finance, without compromise.',
        subheadline:
          'A principal lender providing residential and commercial bridging loans from £500,000 to £25 million across the United Kingdom. Credit-backed agreement in principle within 24 hours.',
        media: img.heroLondon,
        links: [
          { link: { type: 'custom', label: 'Make an enquiry', appearance: 'default', url: '/contact' } },
          { link: { type: 'custom', label: 'See our products', appearance: 'outline', url: '/products' } },
        ],
      },
      layout: homeLayout,
    },
  ])

  await upsert(payload, 'pages', [
    {
      title: 'About',
      slug: 'about',
      _status: 'published',
      hero: {
        type: 'mediumImpact',
        eyebrow: 'About Ortus',
        headline: 'A principal lender. Since 2013.',
        subheadline:
          'Ortus Secured Finance was founded in April 2013 to do bridging lending differently — pragmatically, locally and quickly. Today we lend our own capital across the UK and Ireland from offices in London, Manchester, Glasgow and Belfast.',
        media: img.heroLondon,
      },
      layout: [
        {
          blockType: 'valuesGrid' as const,
          eyebrow: 'What we stand for',
          heading: 'Five principles that shape every loan',
          values: [
            { icon: 'sparkles', customIcon: img.iconExpertise, title: 'Expertise', description: 'A focus on quality. We invest in knowledgeable, experienced staff so we can handle complex lending scenarios in-house.' },
            { icon: 'handshake', customIcon: img.iconIntegrity, title: 'Integrity', description: 'Honest, fair and courteous in every transaction. Transparent terms, clear communication, no surprises.' },
            { icon: 'shield-check', customIcon: img.iconReliability, title: 'Reliability', description: 'Reliably supporting brokers. Always. A proven track record of being there for clients across economic cycles.' },
            { icon: 'map-pin', customIcon: img.iconLocal, title: 'Local', description: 'Physical offices in London, Manchester, Glasgow and Belfast — decisions made by people who know each regional market.' },
            { icon: 'lightbulb', customIcon: img.iconInnovation, title: 'Innovation', description: 'A solution-driven, problem-solving mentality. Where others apply rigid tick-box processes, we structure cases on their merits.' },
          ],
        },
        {
          blockType: 'timeline' as const,
          background: 'dark' as const,
          eyebrow: 'Our history',
          heading: 'Built carefully, over a decade',
          subheading:
            'From a single Charles Street office to four UK locations and an institutional balance sheet.',
          milestones: [
            { date: 'April 2013', title: 'Ortus is founded', description: 'Ortus Secured Finance is established at Charles Street, London, by the current management team.', icon: 'flag' },
            { date: 'June 2013', title: 'First Scottish loan', description: 'Our first secured loan completes in Scotland — the start of our nationwide focus.', icon: 'banknote' },
            { date: 'March 2015', title: 'First Northern Ireland loan', description: 'Lending extends across the Irish Sea with our first deal in Northern Ireland.', icon: 'map-pin' },
            { date: 'December 2015', title: 'Initial fund launched', description: 'Our first dedicated lending fund launches, broadening capital sources for principal lending.', icon: 'landmark' },
            { date: 'June 2016', title: 'New London HQ at Wimpole Street', description: 'The team grows; headquarters move to Wimpole Street in the West End.', icon: 'building-2' },
            { date: 'June 2017', title: 'Manchester office opens', description: 'Our first regional office opens in Manchester to serve the North-West.', icon: 'building-2' },
            { date: 'January 2018', title: 'Second fund launched', description: 'A second lending fund is launched as deal flow accelerates.', icon: 'landmark' },
            { date: 'August 2018', title: 'Institutional balance sheet', description: 'Institutional investors join to fund balance-sheet lending — a strategic step up in scale.', icon: 'trending-up' },
            { date: 'December 2018', title: 'Belfast office opens', description: 'A permanent Belfast office strengthens our presence across the island of Ireland.', icon: 'building-2' },
            { date: 'June 2020', title: 'Belfast expanded', description: 'The Belfast premises are expanded to accommodate a growing local team.', icon: 'trending-up' },
            { date: 'August 2020', title: 'Glasgow office established', description: 'A new Glasgow office anchors our Scottish lending operations.', icon: 'building-2' },
            { date: 'March 2021', title: 'CBILS accreditation', description: 'Ortus becomes an accredited CBILS lender during the pandemic recovery.', icon: 'award' },
            { date: 'June 2022', title: 'New HQ on Wigmore Street', description: 'Headquarters move to Nations House, 103 Wigmore Street — our current London home.', icon: 'building-2' },
          ],
        },
        {
          blockType: 'teamGrid' as const,
          eyebrow: 'Our team',
          heading: 'The people behind every loan',
          subheading: 'Senior underwriting talent across origination, credit, risk and portfolio management.',
          members: team,
        },
        {
          blockType: 'officeLocations' as const,
          eyebrow: 'Local presence',
          heading: 'Where you’ll find us',
          subheading: 'Decisions made by people who know the local market.',
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

  await upsert(payload, 'pages', [
    {
      title: 'Products',
      slug: 'products',
      _status: 'published',
      hero: {
        type: 'mediumImpact',
        eyebrow: 'Products',
        headline: 'Lending built for the deal in front of us.',
        subheadline:
          'Six core products across residential and commercial bridging, development exit and commercial mortgages — all underwritten in-house.',
        media: img.commercialBridging,
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

  await upsert(payload, 'pages', [
    {
      title: 'Contact',
      slug: 'contact',
      _status: 'published',
      hero: {
        type: 'lowImpact',
        eyebrow: 'Contact',
        headline: 'Make an enquiry.',
        subheadline:
          'A senior underwriter will read your enquiry and respond within hours — not days. For urgent cases please call 020 3637 5056.',
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

  console.log('\n▸ Header / Footer globals')
  const skipReval = { disableRevalidate: true }
  await payload.updateGlobal({
    slug: 'header',
    context: skipReval,
    data: {
      navItems: [
        { link: { type: 'custom', label: 'About', url: '/about' } },
        { link: { type: 'custom', label: 'Products', url: '/products' } },
        { link: { type: 'custom', label: 'Case studies', url: '/case-studies' } },
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
        { link: { type: 'custom', label: 'Case studies', url: '/case-studies' } },
        { link: { type: 'custom', label: 'News', url: '/posts' } },
        { link: { type: 'custom', label: 'Contact', url: '/contact' } },
        { link: { type: 'custom', label: 'Privacy', url: '/privacy' } },
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
