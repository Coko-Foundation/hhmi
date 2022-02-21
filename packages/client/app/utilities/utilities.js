import { isEmpty } from 'lodash'
import flatMetadataValues from '../ui/_helpers/flatMetadataValues'

const apDictionary = [
  'unit',
  'frameworkTopic',
  'learningObjective',
  'essentialKnowledge',
]

const visionAndChangeDictionary = ['coreConcept', 'subDiscipline', 'statement']

const objectCleaner = obj =>
  Object.entries(obj)
    .map(([k, v]) => [k, v && typeof v === 'object' ? objectCleaner(v) : v])
    /* eslint-disable-next-line no-param-reassign */
    .reduce((a, [k, v]) => (v == null ? a : ((a[k] = v), a)), {})

const questionDataTransformer = ({
  framework,
  topic,
  subTopic,
  keywords,
  affectiveLevel,
  biointeractiveResources,
  cognitiveLevel,
  psychomotorLevel,
  readingLevel,
  supplementaryFields,
  ...rest
}) => {
  const result = {
    framework,
    topic,
    subTopic,
    affectiveLevel,
    biointeractiveResources,
    cognitiveLevel,
    psychomotorLevel,
    readingLevel,
    supplementaryFields: [],
    frameworkMetadata: {},
  }

  if (supplementaryFields?.length > 0) {
    const transformedSupplementaryFields = []
    supplementaryFields.forEach((item, index) => {
      const temp = {
        topic: item.topic || null,
        subTopic: item?.subTopic || null,
      }

      if (framework && framework === 'visionAndChange') {
        temp.frameworkMetadata = {}
        visionAndChangeDictionary.forEach(key => {
          temp.frameworkMetadata[`${key}`] = item[key] || null
        })
      }

      if (
        framework &&
        (framework === 'apBiology' || framework === 'apEnvironmentalScience')
      ) {
        temp.frameworkMetadata = {}
        apDictionary.forEach(key => {
          temp.frameworkMetadata[`${key}`] = item[key] || null
        })
      }

      transformedSupplementaryFields.push(temp)
    })

    if (transformedSupplementaryFields.length > 0) {
      result.supplementaryFields = transformedSupplementaryFields
    }
  }

  if (framework && framework === 'visionAndChange') {
    visionAndChangeDictionary.forEach(value => {
      if (rest[`${framework}.${value}`]) {
        result.frameworkMetadata[value] = rest[`${framework}.${value}`]
      }
    })
  }

  if (
    framework &&
    (framework === 'apBiology' || framework === 'apEnvironmentalScience')
  ) {
    apDictionary.forEach(value => {
      if (rest[`${framework}.${value}`]) {
        result.frameworkMetadata[value] = rest[`${framework}.${value}`]
      }
    })
  }

  if (isEmpty(result.frameworkMetadata)) {
    delete result.frameworkMetadata
  }

  result.keywords = keywords

  return result
}

const questionDataMapper = ({
  framework,
  keywords,
  affectiveLevel,
  biointeractiveResources,
  cognitiveLevel,
  psychomotorLevel,
  readingLevel,
  topic,
  subTopic,
  frameworkMetadata,
  supplementaryFields,
}) => {
  const result = {
    framework,
    topic,
    subTopic,
    keywords,
    affectiveLevel,
    biointeractiveResources,
    cognitiveLevel,
    psychomotorLevel,
    readingLevel,
  }

  if (supplementaryFields.length > 0) {
    const transformedSupplementaryFields = []
    supplementaryFields.forEach((item, index) => {
      const temp = { topic: item.topic, subTopic: item.subTopic }

      if (
        framework &&
        framework === 'visionAndChange' &&
        item.frameworkMetadata
      ) {
        visionAndChangeDictionary.forEach(key => {
          temp[`${key}`] = item.frameworkMetadata[key]
        })
      }

      if (
        framework &&
        item.frameworkMetadata &&
        (framework === 'apBiology' || framework === 'apEnvironmentalScience')
      ) {
        apDictionary.forEach(key => {
          temp[`${key}`] = item.frameworkMetadata[key]
        })
      }

      transformedSupplementaryFields.push(temp)
    })
    result.supplementaryFields = transformedSupplementaryFields
  }

  if (framework && framework === 'visionAndChange' && frameworkMetadata) {
    visionAndChangeDictionary.forEach(value => {
      result[`${framework}.${value}`] = frameworkMetadata[value]
    })
  }

  if (
    framework &&
    frameworkMetadata &&
    (framework === 'apBiology' || framework === 'apEnvironmentalScience')
  ) {
    apDictionary.forEach(value => {
      result[`${framework}.${value}`] = frameworkMetadata[value]
    })
  }

  return result
}

const displayNameExtractor = (label, value) => {
  switch (label) {
    case 'topic': {
      const found = flatMetadataValues.topics.find(t => t.value === value)

      if (!found) {
        return undefined
      }

      return found.label
    }

    case 'subTopic': {
      const found = flatMetadataValues.subTopics.find(s => s.value === value)

      if (!found) {
        return undefined
      }

      return found.label
    }

    case 'cognitiveLevel': {
      const found = flatMetadataValues.blooms.cognitive.find(
        t => t.value === value,
      )

      if (!found) {
        return undefined
      }

      return found.label
    }

    case 'affectiveLevel': {
      const found = flatMetadataValues.blooms.affective.find(
        t => t.value === value,
      )

      if (!found) {
        return undefined
      }

      return found.label
    }

    case 'psychomotorLevel': {
      const found = flatMetadataValues.blooms.psychomotor.find(
        t => t.value === value,
      )

      if (!found) {
        return undefined
      }

      return found.label
    }

    default: {
      return undefined
    }
  }
}

const dashboardDataMapper = data => {
  return data.map(item => {
    return {
      title: 'Title placeholder',
      id: item.id,
      content: item.versions[0].content,
      metadata: [
        {
          label: 'topic',
          value: displayNameExtractor('topic', item.versions[0].topic),
        },
        {
          label: 'subTopic',
          value: displayNameExtractor('subTopic', item.versions[0].subTopic),
        },
        {
          label: 'cognitiveLevel',
          value: displayNameExtractor(
            'cognitiveLevel',
            item.versions[0].cognitiveLevel,
          ),
        },
        {
          label: 'affectiveLevel',
          value: displayNameExtractor(
            'affectiveLevel',
            item.versions[0].affectiveLevel,
          ),
        },
        {
          label: 'psychomotorLevel',
          value: displayNameExtractor(
            'psychomotorLevel',
            item.versions[0].psychomotorLevel,
          ),
        },
      ],
    }
  })
}

export {
  objectCleaner,
  questionDataTransformer,
  questionDataMapper,
  dashboardDataMapper,
}
