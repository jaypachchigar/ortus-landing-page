import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Inter, Instrument_Serif } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-serif',
  display: 'swap',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(inter.variable, instrumentSerif.variable)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: {
    default: 'Ortus Secured Finance — UK Bridging & Commercial Lending',
    template: '%s | Ortus Secured Finance',
  },
  description:
    'Principal lender offering residential and commercial bridging loans from £500,000 to £25 million across the UK. Fast, flexible, and reliable.',
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
}
