// Localization Import
import createMiddleware from 'next-intl/middleware'

// Routing Import
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Match only internationalized pathnames
  // matcher: ['/', '/(zh|en|zh|ms|vi|ug|ko|th|kk|ru)/:path*'],
  matcher: ['/', '/((?!_next|api|.*\\..*).*)'],
}
