/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { MetadataContext } from './metadataContext'
import { GET_METADATA_OPTIMIZED } from '../graphql'

const MetadataProvider = props => {
  const { children } = props
  const [metadata, setMetadata] = useState(null)

  const [getMetadataOptimized] = useLazyQuery(GET_METADATA_OPTIMIZED, {
    fetchPolicy: 'network-only',
    // skip: !currentUser, ???
  })

  useEffect(() => {
    resetMetadata()
  }, [])

  const resetMetadata = () => {
    getMetadataOptimized().then(({ data }) => {
      if (data) {
        setMetadata(data.getMetadataOptimized)
      }
    })
  }

  return (
    <MetadataContext.Provider value={{ metadata, resetMetadata }}>
      {children}
    </MetadataContext.Provider>
  )
}

export default MetadataProvider
