import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Form, Select } from '../common'

const IBCourseMetadata = props => {
  const {
    courseData,
    filterMode,
    getFieldValue,
    isRequired,
    readOnly,
    setFieldsValue,
    unitKey,
    topicKey,
    applicationKey,
    skillKey,
    understandingKey,
    supplementaryKey,
    index,
  } = props

  const unitName = supplementaryKey ? [index, unitKey] : unitKey

  const unitField = supplementaryKey
    ? [supplementaryKey, index, unitKey]
    : unitKey

  const topicName = supplementaryKey ? [index, topicKey] : topicKey

  const topicField = supplementaryKey
    ? [supplementaryKey, index, topicKey]
    : topicKey

  const applicationName = supplementaryKey
    ? [index, applicationKey]
    : applicationKey

  const applicationField = [supplementaryKey, index, applicationKey]

  const skillName = supplementaryKey ? [index, skillKey] : skillKey

  const skillField = [supplementaryKey, index, skillKey]

  const understandingName = supplementaryKey
    ? [index, understandingKey]
    : understandingKey

  const understandingField = [supplementaryKey, index, understandingKey]

  useEffect(() => {
    if (!supplementaryKey) {
      setFieldsValue({
        [unitKey]: null,
        [topicKey]: null,
        [applicationKey]: null,
        [skillKey]: null,
        [understandingKey]: null,
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
          [applicationKey]: null,
          [skillKey]: null,
          [understandingKey]: null,
        }

        setFieldsValue({
          [supplementaryKey]: cloned,
        })
      }
    } else {
      setFieldsValue({
        [topicKey]: null,
        [applicationKey]: null,
        [skillKey]: null,
        [understandingKey]: null,
      })
    }
  }

  const handleFrameworkTopicChange = () => {
    if (supplementaryKey) {
      if (
        getFieldValue(applicationField) ||
        getFieldValue(skillField) ||
        getFieldValue(understandingField)
      ) {
        const cloned = [...getFieldValue(supplementaryKey)]

        cloned[index] = {
          ...cloned[index],
          [applicationKey]: null,
          [skillKey]: null,
          [understandingKey]: null,
        }

        setFieldsValue({
          [supplementaryKey]: cloned,
        })
      }
    } else {
      setFieldsValue({
        [applicationKey]: null,
        [skillKey]: null,
        [understandingKey]: null,
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

    if (selectedUnit) {
      return courseData.topics
        .filter(a => a.unit === selectedUnit)
        .map(t => ({
          label: t.label,
          value: t.value,
        }))
    }

    return courseData.topics.map(t => ({
      label: t.label,
      value: t.value,
    }))
  }

  const filterApplicationOptions = () => {
    const selectedUnit = getFieldValue(unitField)
    const selectedTopic = getFieldValue(topicField)

    if (selectedTopic) {
      return courseData.applications
        .filter(a => a.topic === selectedTopic)
        .map(a => ({
          label: a.label,
          value: a.value,
        }))
    }

    if (selectedUnit) {
      return courseData.applications
        .filter(a => a.unit === selectedUnit)
        .map(a => ({
          label: a.label,
          value: a.value,
        }))
    }

    return courseData.applications.map(a => ({
      label: a.label,
      value: a.value,
    }))
  }

  const filterUnderstandingOptions = () => {
    const selectedUnit = getFieldValue(unitField)
    const selectedTopic = getFieldValue(topicField)

    if (selectedTopic) {
      return courseData.understandings
        .filter(a => a.topic === selectedTopic)
        .map(u => ({
          label: u.label,
          value: u.value,
        }))
    }

    if (selectedUnit) {
      return courseData.understandings
        .filter(a => a.unit === selectedUnit)
        .map(u => ({
          label: u.label,
          value: u.value,
        }))
    }

    return courseData.understandings.map(u => ({
      label: u.label,
      value: u.value,
    }))
  }

  const filterSkillOptions = () => {
    const selectedUnit = getFieldValue(unitField)
    const selectedTopic = getFieldValue(topicField)

    if (selectedTopic) {
      return courseData.skills
        .filter(a => a.topic === selectedTopic)
        .map(s => ({
          label: s.label,
          value: s.value,
        }))
    }

    if (selectedUnit) {
      return courseData.skills
        .filter(a => a.unit === selectedUnit)
        .map(s => ({
          label: s.label,
          value: s.value,
        }))
    }

    return courseData.skills.map(s => ({
      label: s.label,
      value: s.value,
    }))
  }

  return (
    <>
      <p>{courseData.label}: College Board Curriculum</p>
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
        {() =>
          !filterApplicationOptions()?.length &&
          (filterMode || !!getFieldValue(topicField)) ? null : (
            <Form.Item
              label={
                courseData.value === 'biEnvironmentalScience'
                  ? 'Application & Skill'
                  : 'Application'
              }
              name={applicationName}
              rules={[
                isRequired
                  ? { required: true, message: 'Application is required' }
                  : {},
              ]}
            >
              <Select
                allowClear={filterMode}
                disabled={
                  readOnly || (!filterMode && !getFieldValue(topicField))
                }
                optionFilterProp="label"
                options={filterApplicationOptions()}
                showSearch
                wrapOptionText
              />
            </Form.Item>
          )
        }
      </Form.Item>
      <Form.Item dependencies={[unitField, topicField]} noStyle>
        {() =>
          courseData.value === 'biEnvironmentalScience' ||
          (!filterSkillOptions()?.length &&
            (filterMode || !!getFieldValue(topicField))) ? null : (
            <Form.Item
              label="Skill"
              name={skillName}
              rules={[
                isRequired
                  ? { required: true, message: 'Skill is required' }
                  : {},
              ]}
            >
              <Select
                allowClear={filterMode}
                disabled={
                  readOnly || (!filterMode && !getFieldValue(topicField))
                }
                optionFilterProp="label"
                options={filterSkillOptions()}
                showSearch
                wrapOptionText
              />
            </Form.Item>
          )
        }
      </Form.Item>
      <Form.Item dependencies={[unitField, topicField]} noStyle>
        {() => (
          <Form.Item
            label="Understanding"
            name={understandingName}
            rules={[
              isRequired
                ? { required: true, message: 'Understanding is required' }
                : {},
            ]}
          >
            <Select
              allowClear={filterMode}
              disabled={readOnly || (!filterMode && !getFieldValue(topicField))}
              optionFilterProp="label"
              options={filterUnderstandingOptions()}
              showSearch
              wrapOptionText
            />
          </Form.Item>
        )}
      </Form.Item>
    </>
  )
}

IBCourseMetadata.propTypes = {
  filterMode: PropTypes.bool,
  getFieldValue: PropTypes.func.isRequired,
  isRequired: PropTypes.bool,
  setFieldsValue: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  courseData: PropTypes.shape().isRequired,
  unitKey: PropTypes.string,
  topicKey: PropTypes.string,
  applicationKey: PropTypes.string,
  skillKey: PropTypes.string,
  understandingKey: PropTypes.string,
  supplementaryKey: PropTypes.string,
  index: PropTypes.number,
}

IBCourseMetadata.defaultProps = {
  filterMode: false,
  isRequired: false,
  unitKey: 'unit',
  topicKey: 'courseTopic',
  applicationKey: 'application',
  skillKey: 'skill',
  understandingKey: 'understanding',
  readOnly: false,
  supplementaryKey: '',
  index: 0,
}

export default IBCourseMetadata
