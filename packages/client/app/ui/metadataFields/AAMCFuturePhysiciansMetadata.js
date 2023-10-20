import React from 'react'
import PropTypes from 'prop-types'
import { Form, Select } from '../common'

const AAMCFuturePhysiciansMetadata = props => {
  const {
    aamcMetadata,
    filterMode,
    getFieldValue,
    isRequired,
    readOnly,
    setFieldsValue,
    conceptKey,
    categoryKey,
    supplementaryKey,
    index,
  } = props

  const conceptName = supplementaryKey ? [index, conceptKey] : conceptKey

  const conceptField = supplementaryKey
    ? [supplementaryKey, index, conceptKey]
    : conceptKey

  const categoryName = supplementaryKey ? [index, categoryKey] : categoryKey

  const categoryField = supplementaryKey
    ? [supplementaryKey, index, categoryKey]
    : categoryKey

  const handleConceptChange = () => {
    if (supplementaryKey) {
      const cloned = [...getFieldValue(supplementaryKey)]

      cloned[index] = {
        ...cloned[index],
        [categoryKey]: null,
      }

      setFieldsValue({
        [supplementaryKey]: cloned,
      })
    } else {
      setFieldsValue({
        [categoryKey]: null,
      })
    }
  }

  const filterConceptOptions = () => {
    return aamcMetadata.concepts.map(c => ({
      label: c.label,
      value: c.value,
    }))
  }

  const filterCategoryOptions = () => {
    const selectedConcept = getFieldValue(conceptField)

    return aamcMetadata.categories
      .filter(c => (selectedConcept ? c.concept === selectedConcept : true))
      .map(c => ({
        label: c.label,
        value: c.value,
      }))
  }

  const displayCategoryExplanation = () => {
    // if (filterMode) {
    return aamcMetadata.categories.find(
      c => c.value === getFieldValue(categoryField),
    ).explanation
    // }

    // return aamcMetadata.concepts
    //   .find(c => c.value === getFieldValue(conceptField))
    //   ?.categories.find(c => c.value === getFieldValue(categoryField))
    //   ?.explanation
  }

  return (
    <>
      <p>AAMC Future Physicians Framework</p>
      <Form.Item
        label="Concept"
        name={conceptName}
        rules={[
          isRequired ? { required: true, message: 'Concept is required' } : {},
        ]}
      >
        <Select
          allowClear={filterMode}
          disabled={readOnly}
          onChange={handleConceptChange}
          optionFilterProp="label"
          options={filterConceptOptions()}
          showSearch
          wrapOptionText
        />
      </Form.Item>
      <Form.Item dependencies={[conceptField]} noStyle>
        {() => (
          <Form.Item
            label="Category"
            name={categoryName}
            rules={[
              isRequired
                ? { required: true, message: 'Category is required' }
                : {},
            ]}
          >
            <Select
              allowClear={filterMode}
              disabled={
                readOnly || (!filterMode && !getFieldValue(conceptField))
              }
              optionFilterProp="label"
              options={filterCategoryOptions()}
              showSearch
              wrapOptionText
            />
          </Form.Item>
        )}
      </Form.Item>
      <Form.Item dependencies={[conceptField, categoryField]} noStyle>
        {() => (
          <p>{getFieldValue(categoryField) && displayCategoryExplanation()}</p>
        )}
      </Form.Item>
    </>
  )
}

AAMCFuturePhysiciansMetadata.propTypes = {
  aamcMetadata: PropTypes.shape().isRequired,
  getFieldValue: PropTypes.func.isRequired,
  filterMode: PropTypes.bool,
  isRequired: PropTypes.bool,
  readOnly: PropTypes.bool,
  setFieldsValue: PropTypes.func.isRequired,
  conceptKey: PropTypes.string,
  categoryKey: PropTypes.string,
  supplementaryKey: PropTypes.string,
  index: PropTypes.number,
}

AAMCFuturePhysiciansMetadata.defaultProps = {
  filterMode: false,
  isRequired: false,
  readOnly: false,
  conceptKey: 'concept',
  categoryKey: 'category',
  supplementaryKey: '',
  index: 0,
}

export default AAMCFuturePhysiciansMetadata
