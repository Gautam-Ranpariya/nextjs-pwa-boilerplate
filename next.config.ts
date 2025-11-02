// Next.js Import
import type { NextConfig } from 'next'

// Localization Import
import createNextIntlPlugin from 'next-intl/plugin'

// import the withPWA function
import withPWA, { PWAConfig } from 'next-pwa'

// Combine next-intl and next-pwa plugins
const withNextIntl = createNextIntlPlugin()

// Define your PWA configuration (strongly typed)
const pwaConfig: PWAConfig = {
  dest: 'public', // where the service worker will be generated
  register: true, // automatically register service worker
  skipWaiting: true, // new SW activates immediately
  disable: process.env.NEXT_PUBLIC_NODE_ENV === 'development', // disable PWA in dev mode
}

// Create the wrapper
const withPWAConfig = withPWA(pwaConfig)

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint during builds
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'bobbyhadz.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  reactStrictMode: false, // Optional: Strict mode for React
}

// Merge PWA + next-intl + next config safely
const mergedConfig = withPWAConfig(nextConfig as any)

// Fix type issue by casting to NextConfig
export default withNextIntl(mergedConfig as NextConfig)
