import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { mapMetadataToSelectOptions } from '../../utilities'
import { Form, Select } from '../common'

const NGSSCourseMetadata = props => {
  const {
    courseData,
    filterMode,
    isRequired,
    readOnly,
    setFieldsValue,
    practiceKey,
    conceptKey,
    ideaKey,
    supplementaryKey,
    index,
  } = props

  const metadataMapper = data => mapMetadataToSelectOptions(data, readOnly)

  const practiceName = supplementaryKey ? [index, practiceKey] : practiceKey

  const conceptName = supplementaryKey ? [index, conceptKey] : conceptKey

  const ideaName = supplementaryKey ? [index, ideaKey] : ideaKey

  useEffect(() => {
    if (!supplementaryKey) {
      setFieldsValue({
        [practiceKey]: null,
        [conceptKey]: null,
        [ideaKey]: null,
      })
    }
  }, [courseData])

  const filterCoursePracticeOptions = () => {
    return metadataMapper(courseData.practices)
  }

  const filterCourseConceptOptions = () => {
    return metadataMapper(courseData.crosscuttingConcepts)
  }

  const filterCourseIdeaOptions = () => {
    return metadataMapper(courseData.disciplinaryCoreIdeas)
  }

  return (
    <>
      <Form.Item
        label="By Practice"
        name={practiceName}
        rules={[
          isRequired ? { required: true, message: 'Practice is required' } : {},
        ]}
      >
        <Select
          allowClear={filterMode}
          disabled={readOnly}
          optionFilterProp="label"
          options={filterCoursePracticeOptions()}
          showSearch
          wrapOptionText
        />
      </Form.Item>
      <Form.Item
        label="Crosscutting Concept"
        name={conceptName}
        rules={[
          isRequired
            ? { required: true, message: 'Crosscutting Concept is required' }
            : {},
        ]}
      >
        <Select
          allowClear={filterMode}
          disabled={readOnly}
          optionFilterProp="label"
          options={filterCourseConceptOptions()}
          showSearch
          wrapOptionText
        />
      </Form.Item>
      <Form.Item
        label="Disciplinary Core Idea"
        name={ideaName}
        rules={[
          isRequired
            ? { required: true, message: 'Disciplinary Core Idea is required' }
            : {},
        ]}
      >
        <Select
          allowClear={filterMode}
          disabled={readOnly}
          optionFilterProp="label"
          options={filterCourseIdeaOptions()}
          showSearch
          wrapOptionText
        />
      </Form.Item>
    </>
  )
}

NGSSCourseMetadata.propTypes = {
  filterMode: PropTypes.bool,
  isRequired: PropTypes.bool,
  setFieldsValue: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  courseData: PropTypes.shape().isRequired,
  practiceKey: PropTypes.string,
  conceptKey: PropTypes.string,
  ideaKey: PropTypes.string,
  supplementaryKey: PropTypes.string,
  index: PropTypes.number,
}

NGSSCourseMetadata.defaultProps = {
  filterMode: false,
  isRequired: false,
  practiceKey: 'practice',
  conceptKey: 'crosscuttingConcept',
  ideaKey: 'coreIdea',
  readOnly: false,
  supplementaryKey: '',
  index: 0,
}

export default NGSSCourseMetadata
