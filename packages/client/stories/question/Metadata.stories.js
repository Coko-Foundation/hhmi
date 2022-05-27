/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */

import React, { useState, useEffect } from 'react'
import { Metadata, Checkbox, metadata } from 'ui'
import {
  flatAPCoursesMetadata,
  flatIBCourseMetadata,
  flatVisionAndChangeMetadata,
  flatAAMCMetadata,
} from '../../app/utilities'

const initialValues = {
  framework: 'biEnvironmentalScience',
  unit: 'climateChangeAndEnergyProduction',
  courseTopic: 'climateChangeCausesAndImpacts',
  application: 'IBES-A7.2.1',
  understanding: 'IBES-U7.2.7',
}

export const Base = () => {
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
      // initialValues={options}
      metadata={flatMetadata}
      // readOnly
      onFormFinish={console.log('on form finish')}
    />
  )
}

export const WithInitialData = args => {
  const [editable, setEditable] = useState(false)
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
    <>
      <Checkbox onChange={() => setEditable(!editable)}>Editable</Checkbox>
      <Metadata
        {...args}
        initialValues={initialValues}
        metadata={flatMetadata}
        onFormFinish={console.log('on form finish')}
        readOnly={!editable}
      />
    </>
  )
}

export default {
  component: Metadata,
  title: 'Question/Metadata',
}
