import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import ArticleDetail from '../components/ArticleDetail'

// Import your actual reducers
import articleReducer from 'common/lib/redux/slices/article/slice'
import commonReducer from 'common/lib/redux/slices/common/slice'
import { AxiosValidationError } from 'types/global'

jest.mock('use-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

const rootReducer = combineReducers({
  article: articleReducer,
  common: commonReducer,
})

describe('ArticleDetail Component', () => {
  it('calls refresh button click', () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        article: {
          article: {
            id: 1,
            title: 'Test Product',
            description: 'This is a test product',
            price: 99.99,
            image: 'https://via.placeholder.com/300',
            category: 'Test Category',
            rating: { rate: 4.5, count: 100 },
          },
        },
        common: {
          validationErrors: {} as AxiosValidationError,
          isLoading: false,
          error: null,
        },
      },
    })

    render(
      <Provider store={store}>
        <ArticleDetail />
      </Provider>
    )

    const button = screen.getByTestId('refresh-button')
    fireEvent.click(button)
  })
})
