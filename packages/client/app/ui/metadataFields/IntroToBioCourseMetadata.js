import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { uniqBy } from 'lodash'
import { Form, Select } from '../common'
import VisionAndChangeMetadata from './VisionAndChangeMetadata'
import AAMCFuturePhysiciansMetadata from './AAMCFuturePhysiciansMetadata'

const IntroToBioCourseMetadata = props => {
  const {
    courseData,
    introToBioMeta,
    getFieldValue,
    filterMode,
    isRequired,
    index,
    readOnly,
    unitKey,
    topicKey,
    learningObjectiveKey,
    supplementaryKey,
    setFieldsValue,
  } = props

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

  useEffect(() => {
    if (!supplementaryKey) {
      setFieldsValue({
        [unitKey]: null,
        [topicKey]: null,
        [learningObjectiveKey]: null,
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
        }

        setFieldsValue({
          [supplementaryKey]: cloned,
        })
      }
    } else {
      setFieldsValue({
        [topicKey]: null,
        [learningObjectiveKey]: null,
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
        }
        setFieldsValue({
          [supplementaryKey]: cloned,
        })
      }
    } else {
      setFieldsValue({
        [learningObjectiveKey]: null,
      })
    }
  }

  const filterCourseUnitOptions = () => {
    return courseData.units.map(u => ({
      label: u.label,
      value: u.value,
    }))
  }

  const filterCourseTopicOptions = () => {
    const selectedUnit = getFieldValue(unitField)
    return selectedUnit
      ? courseData.topics
          .filter(t => t.unit === selectedUnit)
          .map(t => ({
            label: t.label,
            value: t.value,
          }))
      : courseData.topics.map(t => ({
          label: t.label,
          value: t.value,
        }))
  }

  const filterLearningObjectiveOptions = () => {
    const selectedUnit = getFieldValue(unitField)
    const selectedTopic = getFieldValue(topicField)

    if (selectedTopic) {
      return uniqBy(
        courseData.learningObjectives
          .filter(l => l.topic === selectedTopic)
          .map(l => ({
            label: l.label,
            value: l.value,
          })),
        'value',
      )
    }

    if (selectedUnit) {
      return uniqBy(
        courseData.learningObjectives
          .filter(l => l.unit === selectedUnit)
          .map(l => ({
            label: l.label,
            value: l.value,
          })),
        'value',
      )
    }

    return uniqBy(
      courseData.learningObjectives.map(l => ({
        label: l.label,
        value: l.value,
      })),
      'value',
    )
  }

  return (
    <>
      {!filterMode && <p>{courseData.label}</p>}
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
              //   onChange={handleFrameworkLearningObjectiveChange}
              optionFilterProp="label"
              options={filterLearningObjectiveOptions()}
              showSearch
              wrapOptionText
            />
          </Form.Item>
        )}
      </Form.Item>
      <VisionAndChangeMetadata
        conceptsAndCompetencies={introToBioMeta.find(
          f => f.value === 'visionAndChange',
        )}
        filterMode={filterMode}
        getFieldValue={getFieldValue}
        index={index}
        isRequired={isRequired}
        readOnly={readOnly}
        setFieldsValue={setFieldsValue}
        supplementaryKey={supplementaryKey}
      />
      {courseData.value === 'introBioForMajors' && (
        <AAMCFuturePhysiciansMetadata
          aamcMetadata={introToBioMeta.find(
            f => f.value === 'aamcFuturePhysicians',
          )}
          filterMode={filterMode}
          getFieldValue={getFieldValue}
          index={index}
          isRequired={isRequired}
          readOnly={readOnly}
          setFieldsValue={setFieldsValue}
          supplementaryKey={supplementaryKey}
        />
      )}
    </>
  )
}

IntroToBioCourseMetadata.propTypes = {
  filterMode: PropTypes.bool,
  getFieldValue: PropTypes.func.isRequired,
  index: PropTypes.number,
  isRequired: PropTypes.bool,
  setFieldsValue: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  courseData: PropTypes.shape().isRequired,
  introToBioMeta: PropTypes.shape().isRequired,
  unitKey: PropTypes.string,
  topicKey: PropTypes.string,
  learningObjectiveKey: PropTypes.string,
  supplementaryKey: PropTypes.string,
}

IntroToBioCourseMetadata.defaultProps = {
  filterMode: false,
  index: 0,
  isRequired: false,
  readOnly: false,
  unitKey: 'unit',
  topicKey: 'courseTopic',
  learningObjectiveKey: 'learningObjective',
  supplementaryKey: '',
}

export default IntroToBioCourseMetadata
