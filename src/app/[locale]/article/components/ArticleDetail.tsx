'use client'

// Redux Imports
import { getArticleThunk } from 'common/lib/redux/slices/article/thunk'
import { AppDispatch, RootState } from 'common/lib/redux/store'

// React Imports
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Third Party Imports
import Skeleton from 'react-loading-skeleton'

// Style Imports
import 'react-loading-skeleton/dist/skeleton.css'
import { useTranslations } from 'use-intl'

const ArticleDetail = () => {
  // Hooks
  const dispatch = useDispatch<AppDispatch>()
  const t = useTranslations()
  const { article } = useSelector((state: RootState) => state.article)
  const { isLoading } = useSelector((state: RootState) => state.common)

  useEffect(() => {
    dispatch(getArticleThunk())

    const interval = setInterval(() => {
      dispatch(getArticleThunk())
    }, 25000)
    return () => clearInterval(interval)
  }, [dispatch])

  // handle reload button click
  const handleReloadButtonClick = () => {
    dispatch(getArticleThunk())
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-gray-100 p-6"
      data-testid="article-container"
    >
      <div
        className="w-full max-w-md overflow-x-hidden rounded-2xl bg-white shadow-lg"
        data-testid="article-card"
      >
        {/* Header */}
        <div className="bg-purple-600 py-4 text-center" data-testid="article-header">
          <h2
            className="text-xl font-bold text-white md:text-2xl"
            data-testid="article-title-header"
          >
            {t('cmn_title_welcome')}
          </h2>
        </div>

        {/* Dynamic Image with skeleton */}
        <div className="relative max-h-80 w-full p-4" data-testid="article-image-wrapper">
          {isLoading ? (
            <Skeleton height={300} data-testid="skeleton-loader" />
          ) : (
            <>
              {article && article?.image && (
                <img
                  src={article?.image || ''}
                  alt="Random"
                  width={400}
                  height={300}
                  className={`h-60 w-full object-contain transition-opacity duration-500`}
                  data-testid="article-image"
                />
              )}
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-4" data-testid="article-content">
          {isLoading ? (
            <>
              <Skeleton height={24} className="mb-4 max-w-3/4" data-testid="skeleton-title" />
              <Skeleton count={3} data-testid="skeleton-description" />
              <Skeleton count={1} className="max-w-24" data-testid="skeleton-price" />
            </>
          ) : (
            <>
              <h3
                className="mt-2 text-lg font-semibold text-gray-800 capitalize"
                data-testid="article-title"
              >
                {article?.title}
              </h3>
              <p
                className="mt-3 text-sm leading-relaxed text-gray-600"
                data-testid="article-description"
              >
                {article?.description}
              </p>
              <p className="text-sm" data-testid="article-price">
                {t('cmn_lbl_price') + ':' + ''}{' '}
                <span className="font-semibold">${article?.price}</span>
              </p>
            </>
          )}

          {/* Refresh Button */}
          <button
            onClick={handleReloadButtonClick}
            className="mt-4 flex w-full items-center justify-center rounded-lg bg-blue-500 px-4 py-2 text-center font-semibold text-white hover:bg-blue-600"
            disabled={isLoading}
            data-testid="refresh-button"
          >
            {isLoading ? (
              <>
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="mr-2 animate-spin"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                  data-testid="loading-spinner"
                >
                  <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z" />
                </svg>
                {t('cmn_lbl_loading')}
              </>
            ) : (
              t('cmn_btn_lbl_refresh')
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ArticleDetail
