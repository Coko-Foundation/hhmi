import React from 'react'
import { MetadataInfo } from 'ui'
import metadata from '../../app/utilities/question/metadataValues'
import resources from '../../app/utilities/question/resourcesData'
import { metadataTransformer } from '../../app/utilities/question/metadataTransformations'
import { initialMetadataValues } from '../../app/utilities/question/initialValues'

export const Base = () => {
  return (
    <MetadataInfo
      metadata={metadataTransformer(metadata)}
      resources={resources}
      values={initialMetadataValues}
    />
  )
}

export default {
  component: MetadataInfo,
  title: 'Question/MetadataInfo',
}
