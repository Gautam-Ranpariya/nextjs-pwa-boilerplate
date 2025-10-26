// Localization Import
import { getRequestConfig } from 'next-intl/server'

// Routing Import
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = (await requestLocale) as
    | typeof routing.defaultLocale
    | (typeof routing.locales)[number]
    | undefined

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale
  }

  // Get the translations for the current locale
  const messages = (await import(`../common/locale/${locale}.json`)).default

  // Get the time zone from locale if needed (example purposes)
  let timeZone: string | undefined = undefined
  try {
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  } catch {
    timeZone = undefined
  }

  return {
    locale,
    messages,
    // Optionally, set the time zone if needed
    timeZone,
  }
})
