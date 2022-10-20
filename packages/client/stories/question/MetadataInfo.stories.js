import React from 'react'
import { MetadataInfo, resources } from 'ui'
import { metadataForQuestionPage } from '../../app/utilities'

// console.log(metadata)

const metadataValues = {
  questionType: 'trueFalseSingleCorrect',
  topics: [
    { topic: 'genetics', subtopic: 'patternsOfInheritance' },
    { topic: 'cellBiology', subtopic: 'cellStructureFunction' },
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

export const Base = () => {
  return (
    <MetadataInfo
      metadata={metadataForQuestionPage}
      resources={resources}
      values={metadataValues}
    />
  )
}

export default {
  component: MetadataInfo,
  title: 'Question/MetadataInfo',
}
