/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */

import React, { useState, useEffect } from 'react'
import { Metadata, Checkbox, metadata, resources } from 'ui'
import {
  flatAPCoursesMetadata,
  flatIBCourseMetadata,
  flatVisionAndChangeMetadata,
  flatAAMCMetadata,
  questionTypes,
} from '../../app/utilities'

const initialValues = {
  topics: [
    {
      topic: 'genetics',
      subtopic: 'patternsOfInheritance',
    },
    {
      topic: 'cellBiology',
      subtopic: 'cellStructureFunction',
    },
  ],
  courses: [
    {
      course: 'apEnvironmentalScience',
      units: [
        {
          unit: 'populations',
          courseTopic: 'generalistAndSpecialistSpecies',
          learningObjective: 'ERT-3.A',
          essentialKnowledge: 'ERT-3.A.1',
        },
        {
          unit: 'theLivingWorldEcosystems',
          courseTopic: 'terrestrialBiomes',
          learningObjective: 'ERT-1.B',
          essentialKnowledge: 'ERT-1.B.2',
        },
      ],
    },
    {
      course: 'biEnvironmentalScience',
      units: [
        {
          unit: 'ecosystemsAndEcology',
          courseTopic: 'communitiesAndEcosystems',
          application: 'IBES-A2.2.3',
          understanding: 'IBES-U2.2.4',
        },
      ],
    },
  ],
  biointeractiveResources: [
    'biochemistryAndCellSignalingPathwayOfTheMc1rGene',
    'cysticFibrosisMechanismAndTreatment',
  ],
  cognitiveLevel: 'higher-understand',
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
      questionTypes,
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
      onFormFinish={() => console.log('on form finish')}
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
      questionTypes,
      topics: metadata.topics,
      blooms: metadata.blooms,
      frameworks,
      introToBioMeta,
    })

    setReady(true)
  }, [])

  return (
    <>
      <Checkbox onChange={() => setEditable(!editable)}>Editable</Checkbox>
      {ready && (
        <Metadata
          {...args}
          editorView
          initialValues={initialValues}
          metadata={flatMetadata}
          onFormFinish={() => console.log('on form finish')}
          readOnly={!editable}
          resources={resources}
        />
      )}
    </>
  )
}

export default {
  component: Metadata,
  title: 'Question/Metadata',
}
