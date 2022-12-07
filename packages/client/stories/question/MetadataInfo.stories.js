import React from 'react'
import { MetadataInfo } from 'ui'
import metadata from './_helpers/metadataValues'
import resources from './_helpers/resourcesData'
import { metadataTransformer } from './_helpers/metadataTransformations'
import initialValues from './_helpers/initialValues'

export const Base = () => {
  return (
    <MetadataInfo
      metadata={metadataTransformer(metadata)}
      resources={resources}
      values={initialValues}
    />
  )
}

export default {
  component: MetadataInfo,
  title: 'Question/MetadataInfo',
}
