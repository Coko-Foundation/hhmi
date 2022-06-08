/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */

import React, { useState, useEffect } from 'react'
import { Metadata, Checkbox, metadata, resources } from 'ui'
import {
  flatAPCoursesMetadata,
  flatIBCourseMetadata,
  flatVisionAndChangeMetadata,
  flatAAMCMetadata,
} from '../../app/utilities'

const initialValues = {
  topic: 'genetics',
  subtopic: 'patternsOfInheritance',
  framework: 'apEnvironmentalScience',
  supplementaryTopics: [
    {
      topic: 'genetics',
      subtopic: 'bioinformatics',
      unit: 'theLivingWorldEcosystems',
      courseTopic: 'thePhosphorusCycle',
      learningObjective: 'ERT-1.F',
      essentialKnowledge: 'ERT-1.F.2',
    },
  ],
  biointeractiveResources: ['hIVReverseTranscriptionAndAZT'],
  cognitiveLevel: 'higher-understand',
  unit: 'theLivingWorldBiodiversity',
  courseTopic: 'ecosystemServices',
  learningObjective: 'ERT-2.B',
  essentialKnowledge: 'ERT-2.B.1',
}

export const Author = () => {
  const [flatMetadata, setFlatMetadata] = useState(metadata)

  useEffect(() => {
    const frameworks = metadata.frameworks.map(framework => {
      const frameworkData = {
        label: framework.label,
        value: framework.value,
      }

      let additionalMetadata

      if (
        framework.value === 'apBiology' ||
        framework.value === 'apEnvironmentalScience'
      ) {
        additionalMetadata = flatAPCoursesMetadata(framework)
      }

      if (
        framework.value === 'biBiology' ||
        framework.value === 'biEnvironmentalScience'
      ) {
        additionalMetadata = flatIBCourseMetadata(framework)
      }

      return {
        ...frameworkData,
        ...additionalMetadata,
      }
    })

    const introToBioMeta = metadata.introToBioMeta.map(data => {
      const meta = {
        label: data.label,
        value: data.value,
      }

      let additionalMetadata

      if (data.value === 'visionAndChange') {
        additionalMetadata = flatVisionAndChangeMetadata(data)
      }

      if (data.value === 'aamcFuturePhysicians') {
        additionalMetadata = flatAAMCMetadata(data)
      }

      return {
        ...meta,
        ...additionalMetadata,
      }
    })

    setFlatMetadata({
      topics: metadata.topics,
      blooms: metadata.blooms,
      frameworks,
      introToBioMeta,
    })
  }, [])

  return (
    <Metadata
      metadata={flatMetadata}
      // readOnly
      onFormFinish={console.log('on form finish')}
      resources={resources}
    />
  )
}

export const Editor = args => {
  const [editable, setEditable] = useState(false)
  const [flatMetadata, setFlatMetadata] = useState(metadata)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const frameworks = metadata.frameworks.map(framework => {
      const frameworkData = {
        label: framework.label,
        value: framework.value,
      }

      let additionalMetadata

      if (
        framework.value === 'apBiology' ||
        framework.value === 'apEnvironmentalScience'
      ) {
        additionalMetadata = flatAPCoursesMetadata(framework)
      }

      if (
        framework.value === 'biBiology' ||
        framework.value === 'biEnvironmentalScience'
      ) {
        additionalMetadata = flatIBCourseMetadata(framework)
      }

      return {
        ...frameworkData,
        ...additionalMetadata,
      }
    })

    const introToBioMeta = metadata.introToBioMeta.map(data => {
      const meta = {
        label: data.label,
        value: data.value,
      }

      let additionalMetadata

      if (data.value === 'visionAndChange') {
        additionalMetadata = flatVisionAndChangeMetadata(data)
      }

      if (data.value === 'aamcFuturePhysicians') {
        additionalMetadata = flatAAMCMetadata(data)
      }

      return {
        ...meta,
        ...additionalMetadata,
      }
    })

    setFlatMetadata({
      topics: metadata.topics,
      blooms: metadata.blooms,
      frameworks,
      introToBioMeta,
    })

    setReady(true)
  }, [])

  console.log(flatMetadata)
  return (
    <>
      <Checkbox onChange={() => setEditable(!editable)}>Editable</Checkbox>
      {ready && (
        <Metadata
          {...args}
          editorView
          initialValues={initialValues}
          metadata={flatMetadata}
          onFormFinish={console.log('on form finish')}
          readOnly={!editable}
        />
      )}
    </>
  )
}

export default {
  component: Metadata,
  title: 'Question/Metadata',
}
