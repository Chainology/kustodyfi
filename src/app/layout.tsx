import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@rainbow-me/rainbowkit/styles.css'
import { LocaleProvider } from '@/contexts/LocaleContext'
import { WalletProvider } from '@/contexts/WalletProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KustodyFi | Hedge Calendar Risk with SEAL-Grade Custody',
  description: 'Institutional-grade FX hedging on stablecoin rails with SEAL-approved custody controls. Built for Korean exporters, importers, and corporate treasuries.',
  keywords: ['FX hedging', 'calendar risk', 'Korean won', 'USD/KRW', 'stablecoin', 'custody', 'SEAL', 'exporters', 'importers'],
  authors: [{ name: 'KustodyFi' }],
  openGraph: {
    title: 'KustodyFi | Hedge Calendar Risk with SEAL-Grade Custody',
    description: 'Institutional-grade FX hedging on stablecoin rails with SEAL-approved custody controls.',
    url: 'https://kustodyfi.com',
    siteName: 'KustodyFi',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'KustodyFi - Hedge Calendar Risk',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KustodyFi | Hedge Calendar Risk with SEAL-Grade Custody',
    description: 'Institutional-grade FX hedging on stablecoin rails with SEAL-approved custody controls.',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <WalletProvider>
          <LocaleProvider>
            {children}
          </LocaleProvider>
        </WalletProvider>
      </body>
    </html>
  )
}

