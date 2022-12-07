/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */

import React, { useState } from 'react'
import { Metadata, Checkbox } from 'ui'

import metadata from './_helpers/metadataValues'
import resources from './_helpers/resourcesData'
import {
  metadataTransformer,
  metadataApiToUi,
} from './_helpers/metadataTransformations'
import initialValues from './_helpers/initialValues'

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
        initialValues={metadataApiToUi(initialValues)}
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
