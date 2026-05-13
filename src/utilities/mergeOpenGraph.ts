import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Principal lender offering residential and commercial bridging loans from £500,000 to £25 million across the UK.',
  siteName: 'Ortus Secured Finance',
  title: 'Ortus Secured Finance — UK Bridging & Commercial Lending',
  locale: 'en_GB',
  images: [
    {
      url: `${getServerSideURL()}/og-default.png`,
    },
  ],
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
