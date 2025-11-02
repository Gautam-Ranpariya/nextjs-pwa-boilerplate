import { requestHandler } from 'common/api/lib/requestHandler'
import { getArticleApi } from 'common/api/services/articleApi'
import { AxiosValidationError } from 'types/global'
import { AppDispatch } from '../../store'
import { setError, setIsLoading, setValidationErrors } from '../common/slice'
import { setArticle } from './slice'

// get article image
export const getArticleThunk = () => async (dispatch: AppDispatch) => {
  await requestHandler<Array<Article.IProduct>>({
    apiCall: getArticleApi,
    handlers: {
      onBefore: () => {
        dispatch(setIsLoading(true))
      },
      onSuccess: (resposeData: Array<Article.IProduct>) => {
        const data = resposeData || []
        const randomIndex = Math.floor(Math.random() * data.length)
        const item = data[randomIndex] ?? ({} as Article.IProduct)
        dispatch(setArticle(item))
      },
      onError: (error: AxiosValidationError) => {
        dispatch(setValidationErrors(error))
      },
      onFail: (error: string) => {
        dispatch(setError(error))
      },
      onAfter: () => {
        dispatch(setIsLoading(false))
      },
    },
  })
}
