import React, { useEffect } from 'react'
import { PageNotFound } from 'ui'

const PageNotFoundPage = () => {
  useEffect(() => {
    document.title = 'Page not found - HHMI Assessment Builder'
  }, [])

  return <PageNotFound />
}

PageNotFoundPage.propTypes = {}

PageNotFoundPage.defaultProps = {}

export default PageNotFoundPage
