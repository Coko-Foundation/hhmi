import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { grid, th } from '@coko/client'

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
  padding: ${grid(2)} 0;

  > div {
    height: 100%;
  }
`

const StyledHeading = styled.h2`
  font-size: ${th('fontSizeBase')};
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
  padding: 0 ${grid(4)};
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  /* padding-top: ${grid(4)}; */
  padding: ${grid(4)} ${grid(2)} 0 ${grid(4)};
`

const Sidebar = props => {
  const { className, text, setFilters, metadata, form } = props

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
          <StyledHeading>{text}</StyledHeading>
          {metadata && (
            <>
              <TopicAndSubtopic
                filterMode
                getFieldValue={form.getFieldValue}
                setFieldsValue={form.setFieldsValue}
                topicsMetadata={metadata.topics}
              />
              <Form.Item label="Course" name="course">
                <Select
                  // allowClear
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
              <Form.Item label="Question type" name="questionType">
                <Select
                  mode="multiple"
                  optionFilterProp="label"
                  options={metadata.questionTypes}
                />
              </Form.Item>
              <Form.Item label="Bloom's cognitive level" name="cognitiveLevel">
                <Select
                  mode="multiple"
                  optionFilterProp="label"
                  options={metadata.blooms.cognitive}
                />
              </Form.Item>
            </>
          )}
        </FormFieldsContainer>
        <Footer>
          <Button onClick={clearFilters}>Clear filters</Button>
          <Button htmlType="submit" onClick={applyFilters} type="primary">
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
  metadata: PropTypes.shape({
    topics: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
        subtopics: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
          }),
        ),
      }),
    ),
    blooms: PropTypes.shape({
      cognitive: PropTypes.arrayOf(
        PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
      ),
      affective: PropTypes.arrayOf(
        PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
      ),
      psychomotor: PropTypes.arrayOf(
        PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
      ),
    }),
    frameworks: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
          units: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
            }),
          ),
          topics: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              unit: PropTypes.string,
            }),
          ),
          learningObjectives: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              unit: PropTypes.string,
              topic: PropTypes.string,
            }),
          ),
          essentialKnowledge: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              unit: PropTypes.string,
              topic: PropTypes.string,
              learningObjective: PropTypes.string,
            }),
          ),
        }),
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
          units: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
            }),
          ),
          topics: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              unit: PropTypes.string,
            }),
          ),
          applications: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              unit: PropTypes.string,
              topic: PropTypes.string,
            }),
          ),
          skills: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              unit: PropTypes.string,
              topic: PropTypes.string,
            }),
          ),
          understandings: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              unit: PropTypes.string,
              topic: PropTypes.string,
            }),
          ),
        }),
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
        }),
      ]),
    ),
    introToBioMeta: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
          coreConcepts: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              explanatoryItems: PropTypes.arrayOf(PropTypes.string),
            }),
          ),
          subdisciplines: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
            }),
          ),
          subdisciplineStatements: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              coreConcept: PropTypes.string,
              subdiscipline: PropTypes.string,
            }),
          ),
          coreCompetencies: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
            }),
          ),
          subcompetencies: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              coreCompetence: PropTypes.string,
              explanation: PropTypes.string,
            }),
          ),
          subcompetenceStatements: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              coreCompetence: PropTypes.string,
              subcompetence: PropTypes.string,
            }),
          ),
        }),
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
          concepts: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
            }),
          ),
          categories: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              concept: PropTypes.string,
              explanation: PropTypes.string,
            }),
          ),
        }),
      ]),
    ),
    questionTypes: PropTypes.arrayOf(
      PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
    ),
  }),
  /** form instance for the filters' <Form> */
  form: PropTypes.shape(),
}

Sidebar.defaultProps = {
  text: '',
  metadata: null,
  form: {},
}

export default Sidebar
