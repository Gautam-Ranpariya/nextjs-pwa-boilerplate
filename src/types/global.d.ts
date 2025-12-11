import { AxiosResponse } from 'axios'

type RootLayoutProps = {
  children: React.ReactNode
  params: Promise<Params>
}

type Params = {
  locale: string
}

type Locale =
  | 'en' // English
  | 'zh' // Chinese (Simplified)
  | 'ar' // Arabic
  | 'fr' // French
  | 'hi' // Hindi
// | "es"   // Spanish
// | "pt"   // Portuguese (Brazil)
// | "ru"   // Russian
// | "ja"   // Japanese
// | "de"   // German

type LocalProviderProps = {
  children: React.ReactNode
  locale: Locale
  messages: Record<string, string>
  timeZone: string | undefined
}

type NextImageProps = {
  src: string
  alt: string
  width?: number
  height?: number
}

type AxiosValidationError = {
  [key: string]: string
}

interface IRequestHandlerConfig<T> {
  apiCall: () => Promise<AxiosResponse<T>>
  handlers?: {
    onBefore?: () => void
    onSuccess: (data: T) => void | Promise<void>
    onError: (errors: AxiosValidationError) => void | Promise<void>
    onFail: (message: string) => void | Promise<void>
    onAfter?: () => void
  }
}
