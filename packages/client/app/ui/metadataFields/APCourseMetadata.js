import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { uniqBy } from 'lodash'
import { mapMetadataToSelectOptions } from '../../utilities'
import { Form, Select } from '../common'

const APCourseMetadata = props => {
  const {
    courseData,
    getFieldValue,
    filterMode,
    isRequired,
    index,
    readOnly,
    unitKey,
    topicKey,
    learningObjectiveKey,
    essentialKnowledgeKey,
    supplementaryKey,
    setFieldsValue,
  } = props

  const metadataMapper = data => mapMetadataToSelectOptions(data, readOnly)

  const unitName = supplementaryKey ? [index, unitKey] : unitKey

  const unitField = supplementaryKey
    ? [supplementaryKey, index, unitKey]
    : unitKey

  const topicName = supplementaryKey ? [index, topicKey] : topicKey

  const topicField = supplementaryKey
    ? [supplementaryKey, index, topicKey]
    : topicKey

  const learningObjectiveName = supplementaryKey
    ? [index, learningObjectiveKey]
    : learningObjectiveKey

  const learningObjectiveField = supplementaryKey
    ? [supplementaryKey, index, learningObjectiveKey]
    : learningObjectiveKey

  const essentialKnowledgeName = supplementaryKey
    ? [index, essentialKnowledgeKey]
    : essentialKnowledgeKey

  const essentialKnowledgeField = supplementaryKey
    ? [supplementaryKey, index, essentialKnowledgeKey]
    : essentialKnowledgeKey

  useEffect(() => {
    if (!supplementaryKey) {
      setFieldsValue({
        [unitKey]: null,
        [topicKey]: null,
        [learningObjectiveKey]: null,
        [essentialKnowledgeKey]: null,
      })
    }
  }, [courseData])

  const handleFrameworkUnitChange = () => {
    if (supplementaryKey) {
      if (getFieldValue(topicField)) {
        const cloned = [...getFieldValue(supplementaryKey)]
        cloned[index] = {
          ...cloned[index],
          [topicKey]: null,
          [learningObjectiveKey]: null,
          [essentialKnowledgeKey]: null,
        }

        setFieldsValue({
          [supplementaryKey]: cloned,
        })
      }
    } else {
      setFieldsValue({
        [topicKey]: null,
        [learningObjectiveKey]: null,
        [essentialKnowledgeKey]: null,
      })
    }
  }

  const handleFrameworkTopicChange = () => {
    if (supplementaryKey) {
      if (getFieldValue(learningObjectiveField)) {
        const cloned = [...getFieldValue(supplementaryKey)]
        cloned[index] = {
          ...cloned[index],
          [learningObjectiveKey]: null,
          [essentialKnowledgeKey]: null,
        }
        setFieldsValue({
          [supplementaryKey]: cloned,
        })
      }
    } else {
      setFieldsValue({
        [learningObjectiveKey]: null,
        [essentialKnowledgeKey]: null,
      })
    }
  }

  const handleFrameworkLearningObjectiveChange = () => {
    if (supplementaryKey) {
      if (getFieldValue(essentialKnowledgeField)) {
        const cloned = [...getFieldValue(supplementaryKey)]

        cloned[index] = {
          ...cloned[index],
          [essentialKnowledgeKey]: null,
        }

        setFieldsValue({
          [supplementaryKey]: cloned,
        })
      }
    } else {
      setFieldsValue({
        [essentialKnowledgeKey]: null,
      })
    }
  }

  const filterCourseUnitOptions = () => {
    return metadataMapper(courseData.units)
  }

  const filterCourseTopicOptions = () => {
    const selectedUnit = getFieldValue(unitField)
    return selectedUnit
      ? metadataMapper(courseData.topics.filter(t => t.unit === selectedUnit))
      : metadataMapper(courseData.topics)
  }

  const filterLearningObjectiveOptions = () => {
    const selectedUnit = getFieldValue(unitField)
    const selectedTopic = getFieldValue(topicField)

    if (selectedTopic) {
      return metadataMapper(
        uniqBy(
          courseData.learningObjectives.filter(l => l.topic === selectedTopic),
          'value',
        ),
      )
    }

    if (selectedUnit) {
      return metadataMapper(
        uniqBy(
          courseData.learningObjectives.filter(l => l.unit === selectedUnit),
          'value',
        ),
      )
    }

    return metadataMapper(uniqBy(courseData.learningObjectives, 'value'))
  }

  const filterEssentialKnowledgeOptions = () => {
    const selectedUnit = getFieldValue(unitField)
    const selectedTopic = getFieldValue(topicField)
    const selectedLearningObjective = getFieldValue(learningObjectiveField)

    if (selectedLearningObjective) {
      return metadataMapper(
        courseData.essentialKnowledge.filter(
          l => l.learningObjective === selectedLearningObjective,
        ),
      )
    }

    if (selectedTopic) {
      return metadataMapper(
        courseData.essentialKnowledge.filter(l => l.topic === selectedTopic),
      )
    }

    if (selectedUnit) {
      return metadataMapper(
        courseData.essentialKnowledge.filter(l => l.unit === selectedUnit),
      )
    }

    return metadataMapper(courseData.essentialKnowledge)
  }

  return (
    <>
      {!filterMode && <p>{courseData.label}: College Board Framework</p>}
      <Form.Item
        label="Course Unit"
        name={unitName}
        rules={[
          isRequired
            ? { required: true, message: 'Course Unit is required' }
            : {},
        ]}
      >
        <Select
          allowClear={filterMode}
          data-testid="course-unit-select"
          disabled={readOnly}
          onChange={handleFrameworkUnitChange}
          optionFilterProp="label"
          options={filterCourseUnitOptions()}
          showSearch
          wrapOptionText
        />
      </Form.Item>
      <Form.Item dependencies={[unitField]} noStyle>
        {() => (
          <Form.Item
            label="Course Topic"
            name={topicName}
            rules={[
              isRequired
                ? { required: true, message: 'Course Topic is required' }
                : {},
            ]}
          >
            <Select
              allowClear={filterMode}
              data-testid="course-topic-select"
              disabled={readOnly || (!filterMode && !getFieldValue(unitField))}
              onChange={handleFrameworkTopicChange}
              optionFilterProp="label"
              options={filterCourseTopicOptions()}
              showSearch
              wrapOptionText
            />
          </Form.Item>
        )}
      </Form.Item>

      <Form.Item dependencies={[unitField, topicField]} noStyle>
        {() => (
          <Form.Item
            label="Learning Objective"
            name={learningObjectiveName}
            rules={[
              isRequired
                ? { required: true, message: 'Learning objective is required' }
                : {},
            ]}
          >
            <Select
              allowClear={filterMode}
              data-testid="learning-objective-select"
              disabled={readOnly || (!filterMode && !getFieldValue(topicField))}
              onChange={handleFrameworkLearningObjectiveChange}
              optionFilterProp="label"
              options={filterLearningObjectiveOptions()}
              showSearch
              wrapOptionText
            />
          </Form.Item>
        )}
      </Form.Item>

      <Form.Item
        dependencies={[unitField, topicField, learningObjectiveField]}
        noStyle
      >
        {() => (
          <Form.Item
            label="Essential Knowledge"
            name={essentialKnowledgeName}
            rules={[
              isRequired
                ? { required: true, message: 'Essential Knowledge is required' }
                : {},
            ]}
          >
            <Select
              allowClear={filterMode}
              data-testid="essential-knowledge-select"
              disabled={
                readOnly ||
                (!filterMode && !getFieldValue(learningObjectiveField))
              }
              optionFilterProp="label"
              options={filterEssentialKnowledgeOptions()}
              showSearch
              wrapOptionText
            />
          </Form.Item>
        )}
      </Form.Item>
    </>
  )
}

APCourseMetadata.propTypes = {
  filterMode: PropTypes.bool,
  getFieldValue: PropTypes.func.isRequired,
  index: PropTypes.number,
  isRequired: PropTypes.bool,
  setFieldsValue: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  courseData: PropTypes.shape().isRequired,
  unitKey: PropTypes.string,
  topicKey: PropTypes.string,
  learningObjectiveKey: PropTypes.string,
  essentialKnowledgeKey: PropTypes.string,
  supplementaryKey: PropTypes.string,
}

APCourseMetadata.defaultProps = {
  filterMode: false,
  index: 0,
  isRequired: false,
  readOnly: false,
  unitKey: 'unit',
  topicKey: 'courseTopic',
  learningObjectiveKey: 'learningObjective',
  essentialKnowledgeKey: 'essentialKnowledge',
  supplementaryKey: '',
}
export default APCourseMetadata
