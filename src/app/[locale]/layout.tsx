// Common Components Import
import LocaleProvider from 'common/components/LocaleProvider'

// Utility Import
import { getDirection } from 'common/utils/get-direction'

// Next.js Import
import type { Metadata, Viewport } from 'next'

// Style Import
import '../globals.css'

// Localization Import
import { getMessages, getTimeZone } from 'next-intl/server'
import { Locale, RootLayoutProps } from 'types/global'

// Metadata config
export const metadata: Metadata = {
  title: 'Gautam Ranpariya',
  description:
    'Passionate frontend developer skilled in React, Next.js, and modern web technologies, creating seamless digital experiences that drive results.',
  keywords: [
    'Frontend Developer',
    'React Developer',
    'Next.js Developer',
    'JavaScript Developer',
    'UI Developer',
    'Web Developer Portfolio',
    'Gautam Ranpariya',
  ],
  authors: [{ name: 'Gautam Ranpariya', url: 'https://gautam-portfolio-rho.vercel.app/' }],
  creator: 'Gautam Ranpariya',
  publisher: 'Gautam Ranpariya',
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://gautam-portfolio-rho.vercel.app/',
  },
  openGraph: {
    title: 'Gautam Ranpariya | Frontend Developer Portfolio',
    description:
      'Frontend Developer specializing in React, Next.js, and modern web technologies. Explore projects, skills, and contact for collaboration.',
    url: 'https://gautam-portfolio-rho.vercel.app/',
    siteName: 'Gautam Ranpariya',
    images: [
      {
        url: 'https://gautam-portfolio-rho.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gautam Ranpariya Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gautam Ranpariya | Frontend Developer Portfolio',
    description:
      'Frontend Developer skilled in React, Next.js & modern web technologies. Building seamless digital experiences.',
    creator: '@yourTwitterHandle',
    images: ['https://gautam-portfolio-rho.vercel.app/og-image.png'],
  },
  manifest:
    process.env.NEXT_PUBLIC_NODE_ENV === 'production'
      ? 'https://nextjs-pwa-boilerplate-gamma.vercel.app/manifest.json'
      : '/manifest.json',
  icons: {
    icon: '/assets/icons/web-app-manifest-192x192.png',
    apple: '/assets/icons/web-app-manifest-512x512.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const resolvedParams = await params

  // Variable
  const locale = resolvedParams.locale as Locale || 'en'
  const timeZone = await getTimeZone()

  // Get the direction of the current locale
  const direction = getDirection(locale)

  // Get the translations for the current locale
  const messages = await getMessages({ locale })

  return (
    <html lang={locale} dir={direction}>
      <head>
        {/* PWA manifest and theme */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8936FF" />
        {/* Favicons / Apple icons so install prompt shows proper icon */}
        <link rel="icon" href="/assets/icons/web-app-manifest-192x192.png" />
        <link rel="apple-touch-icon" href="/assets/icons/web-app-manifest-192x192.png" />
      </head>
      <body suppressHydrationWarning>
        <LocaleProvider locale={locale} messages={messages} timeZone={timeZone}>
          {children}
        </LocaleProvider>
      </body>
    </html>
  )
}
