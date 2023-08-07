/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */

import React, { useState } from 'react'
import { Metadata, Checkbox } from 'ui'

import metadata from '../../app/utilities/question/metadataValues'
import resources from '../../app/utilities/question/resourcesData'
import {
  metadataTransformer,
  metadataApiToUi,
} from '../../app/utilities/question/metadataTransformations'
import { initialMetadataValues } from '../../app/utilities/question/initialValues'

export const Author = () => {
  return (
    <Metadata
      metadata={metadataTransformer(metadata)}
      onFormFinish={() => console.log('on form finish')}
      resources={resources}
    />
  )
}

export const Editor = args => {
  const [editable, setEditable] = useState(false)

  return (
    <>
      <Checkbox onChange={() => setEditable(!editable)}>Editable</Checkbox>
      <Metadata
        {...args}
        editorView
        initialValues={metadataApiToUi(initialMetadataValues)}
        metadata={metadataTransformer(metadata)}
        onFormFinish={() => console.log('on form finish')}
        readOnly={!editable}
        resources={resources}
      />
    </>
  )
}

export default {
  component: Metadata,
  title: 'Question/Metadata',
}
