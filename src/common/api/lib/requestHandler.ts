import { AxiosError } from 'axios'
import { AxiosValidationError, IRequestHandlerConfig } from 'types/global'

export const requestHandler = async <T>({
  apiCall,
  handlers = {
    onBefore: () => {},
    onSuccess: () => {},
    onError: () => {},
    onFail: () => {},
    onAfter: () => {},
  },
}: IRequestHandlerConfig<T>): Promise<T | void> => {
  const { onBefore, onSuccess, onError, onFail, onAfter } = handlers

  try {
    // start loading
    onBefore?.()

    // ✅ Await the API call (must return a promise)
    const response = await apiCall() // AxiosResponse<T>

    // handle response
    if (response?.status === 200 && response.data !== undefined) {
      onSuccess?.(response.data)
      return response.data
    }
  } catch (err: any) {
    // handle error
    const axiosError = err as AxiosError<{ errors?: AxiosValidationError; message?: string }>
    const data = axiosError.response?.data

    if (err?.response?.status === 401) {
      await Promise.resolve(onFail?.('Please login again'))
      return
    }

    if (data?.errors) {
      // Validation errors from backend
      await onError?.(data.errors)
    } else if (data?.message) {
      // Explicit message from API response
      await onFail?.(data.message)
    } else if (axiosError.message) {
      // Axios or network-level error message
      await onFail?.(axiosError.message)
    } else {
      // Fallback
      await onFail?.('Unknown error occurred')
    }
  } finally {
    // stop loading
    onAfter?.()
  }
}
