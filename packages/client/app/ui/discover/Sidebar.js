import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { grid } from '@coko/client'

import {
  Button,
  Select,
  Form,
  TopicAndSubtopic,
  APCourseMetadata,
  IBCourseMetadata,
  VisionAndChangeMetadata,
  AAMCFuturePhysiciansMetadata,
} from '../common'

const Wrapper = styled.aside`
  background-color: ${props => props.theme.colorBackground};
  height: 100%;
  overflow: hidden;
  padding: ${grid(2)};

  > div {
    height: 100%;
  }
`

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`

const FormFieldsContainer = styled.div`
  flex-grow: 1;
  overflow: auto;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: ${grid(4)};
`

const questionTypes = [
  {
    value: 'multipleChoice',
    label: 'Multiple choice',
  },
  {
    value: 'multipleChoiceSingleCorrect',
    label: 'Multiple choice (single correct)',
  },
  {
    value: 'trueFalse',
    label: 'True / False',
  },
  {
    value: 'trueFalseSingleCorrect',
    label: 'True / False (single correct)',
  },
]

const Sidebar = props => {
  const { className, text, setFilters, metadata } = props

  const [form] = Form.useForm()

  const applyFilters = () => {
    setFilters(form.getFieldsValue())
  }

  const clearFilters = () => {
    form.resetFields()
  }

  const renderCourseFields = getFieldValue => {
    const selectedCourse = getFieldValue('course')

    if (
      selectedCourse === 'apBiology' ||
      selectedCourse === 'apEnvironmentalScience'
    ) {
      return (
        <APCourseMetadata
          courseData={metadata.frameworks.find(f => f.value === selectedCourse)}
          filterMode
          getFieldValue={getFieldValue}
          setFieldsValue={form.setFieldsValue}
        />
      )
    }

    if (
      selectedCourse === 'biBiology' ||
      selectedCourse === 'biEnvironmentalScience'
    ) {
      return (
        <IBCourseMetadata
          courseData={metadata.frameworks.find(f => f.value === selectedCourse)}
          filterMode
          getFieldValue={getFieldValue}
          setFieldsValue={form.setFieldsValue}
        />
      )
    }

    if (
      selectedCourse === 'introductoryBiologyForNonMajors' ||
      selectedCourse === 'introductoryBiologyForMajors'
    ) {
      // return 2 mystery fields, vision and change and AAMC future physicians if `introductoryBiologyForMajors`
      return (
        <>
          {/** mistery fields go here */}
          <VisionAndChangeMetadata
            conceptsAndCompetencies={metadata.introToBioMeta.find(
              f => f.value === 'visionAndChange',
            )}
            filterMode
            getFieldValue={getFieldValue}
            setFieldsValue={form.setFieldsValue}
          />
          {selectedCourse === 'introductoryBiologyForMajors' && (
            <AAMCFuturePhysiciansMetadata
              aamcMetadata={metadata.introToBioMeta.find(
                f => f.value === 'aamcFuturePhysicians',
              )}
              filterMode
              getFieldValue={getFieldValue}
              setFieldsValue={form.setFieldsValue}
            />
          )}
        </>
      )
    }

    return null
  }

  return (
    <Wrapper className={className}>
      <StyledForm form={form} layout="vertical">
        <FormFieldsContainer>
          <p>{text}</p>
          <TopicAndSubtopic
            filterMode
            getFieldValue={form.getFieldValue}
            setFieldsValue={form.setFieldsValue}
            topicsMetadata={metadata.topics}
          />
          <Form.Item label="Course" name="course">
            <Select
              allowClear
              optionFilterProp="label"
              options={metadata.frameworks.map(i => {
                return {
                  label: i.label,
                  value: i.value,
                }
              })}
              showSearch
            />
          </Form.Item>
          <Form.Item dependencies={['course']} noStyle>
            {({ getFieldValue }) =>
              !!getFieldValue('course') && renderCourseFields(getFieldValue)
            }
          </Form.Item>
          <Form.Item dependencies={['course']} noStyle>
            {({ getFieldValue }) =>
              !!getFieldValue('course') && (
                <>
                  <Form.Item label="Question type" name="questionType">
                    <Select
                      mode="multiple"
                      optionFilterProp="label"
                      options={questionTypes}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Bloom's cognitive level"
                    name="cognitiveLevel"
                  >
                    <Select
                      mode="multiple"
                      optionFilterProp="label"
                      options={metadata.blooms.cognitive}
                    />
                  </Form.Item>
                </>
              )
            }
          </Form.Item>
        </FormFieldsContainer>
        <Footer>
          <Button onClick={clearFilters}>Clear filters</Button>
          <Button onClick={applyFilters} type="primary">
            Update
          </Button>
        </Footer>
      </StyledForm>
    </Wrapper>
  )
}

Sidebar.propTypes = {
  /** dispatch method to update filters */
  setFilters: PropTypes.func.isRequired,
  /** text that goes to the top of the sidebar */
  text: PropTypes.string,
  metadata: PropTypes.shape().isRequired,
}

Sidebar.defaultProps = {
  text: '',
}

export default Sidebar
