/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { MetadataContext } from './metadataContext'
import { GET_METADATA } from '../graphql'

const MetadataProvider = props => {
  const { children } = props
  const [metadata, setMetadata] = useState(null)

  const [getMetadata] = useLazyQuery(GET_METADATA, {
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    resetMetadata()
  }, [])

  const resetMetadata = () => {
    getMetadata().then(({ data }) => {
      if (data) {
        setMetadata(data.getMetadata)
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
