import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { grid, th } from '@coko/client'
import { mapMetadataToSelectOptions } from '../../utilities'
import { Button, Select, Form } from '../common'
import {
  TopicAndSubtopic,
  APCourseMetadata,
  IBCourseMetadata,
  IntroToBioCourseMetadata,
  NGSSCourseMetadata,
} from '../metadataFields'

const Wrapper = styled.aside`
  background-color: ${th('colorBackground')};
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
  padding: ${grid(4)} ${grid(2)} 0 ${grid(4)};
`

const apCourses = ['apBiology', 'apEnvironmentalScience']
const ibCourses = ['biBiology', 'biEnvironmentalScience']
const introBioCourses = ['introBioForNonMajors', 'introBioForMajors']
const ngss = 'ngss'

const Sidebar = props => {
  const {
    className,
    text,
    setFilters,
    metadata,
    form,
    complexItemSetOptions,
    biointeractiveResources,
    presetFilters,
  } = props

  const metadataMapper = data => mapMetadataToSelectOptions(data)

  useEffect(() => {
    if (presetFilters) {
      setTimeout(() => {
        form.setFieldsValue(presetFilters)
      }, 500)
    }
  }, [])

  const applyFilters = () => {
    setFilters(form.getFieldsValue())
  }

  const clearFilters = () => {
    form.resetFields()
  }

  const renderCourseFields = getFieldValue => {
    const selectedCourse = getFieldValue('course')

    const courseMetadata = metadata.frameworks.find(
      f => f.value === selectedCourse,
    )

    if (apCourses.includes(courseMetadata.textValue)) {
      return (
        <APCourseMetadata
          courseData={courseMetadata}
          filterMode
          getFieldValue={getFieldValue}
          setFieldsValue={form.setFieldsValue}
        />
      )
    }

    if (ibCourses.includes(courseMetadata.textValue)) {
      return (
        <IBCourseMetadata
          courseData={courseMetadata}
          filterMode
          getFieldValue={getFieldValue}
          setFieldsValue={form.setFieldsValue}
        />
      )
    }

    if (introBioCourses.includes(courseMetadata.textValue)) {
      return (
        <IntroToBioCourseMetadata
          courseData={courseMetadata}
          filterMode
          getFieldValue={getFieldValue}
          introToBioMeta={metadata.introToBioMeta}
          setFieldsValue={form.setFieldsValue}
        />
      )
    }

    if (courseMetadata?.textValue === ngss) {
      return (
        <NGSSCourseMetadata
          courseData={courseMetadata}
          filterMode
          setFieldsValue={form.setFieldsValue}
        />
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
                  data-testid="course-select"
                  optionFilterProp="label"
                  options={metadataMapper(metadata.frameworks)}
                  showSearch
                />
              </Form.Item>
              <Form.Item dependencies={['course']} noStyle>
                {({ getFieldValue }) =>
                  !!getFieldValue('course') && renderCourseFields(getFieldValue)
                }
              </Form.Item>
              <Form.Item label="Item type" name="questionType">
                <Select
                  data-testid="question-type-select"
                  mode="multiple"
                  optionFilterProp="label"
                  options={metadata.questionTypes}
                />
              </Form.Item>
              <Form.Item label="Bloom's Cognitive Level" name="cognitiveLevel">
                <Select
                  data-testid="cognitive-level-select"
                  mode="multiple"
                  optionFilterProp="label"
                  options={metadata.blooms.cognitive}
                />
              </Form.Item>
              <Form.Item
                label="Context-Dependent Item Set"
                name="complexItemSet"
              >
                <Select
                  data-testid="complex-item-set-select"
                  mode="multiple"
                  optionFilterProp="label"
                  options={complexItemSetOptions}
                  showSearch
                />
              </Form.Item>
              <Form.Item
                label="Biointeractive Resource"
                name="biointeractiveResources"
              >
                <Select
                  data-testid="complex-item-set-select"
                  mode="multiple"
                  optionFilterProp="label"
                  options={biointeractiveResources}
                  showSearch
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
  complexItemSetOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
    }),
  ),
  biointeractiveResources: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
    }),
  ),
  presetFilters: PropTypes.shape(),
}

Sidebar.defaultProps = {
  text: '',
  metadata: null,
  form: {},
  complexItemSetOptions: [],
  biointeractiveResources: [],
  presetFilters: null,
}

export default Sidebar
