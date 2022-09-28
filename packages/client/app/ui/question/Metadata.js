import React, { useState, useImperativeHandle, useEffect } from 'react'
import { dropRight } from 'lodash'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { grid } from '@coko/client'

import {
  Select,
  Form,
  Button,
  TopicAndSubtopic,
  APCourseMetadata,
  IBCourseMetadata,
  VisionAndChangeMetadata,
  AAMCFuturePhysiciansMetadata,
} from '../common'
import Resources from './Resources'

const Wrapper = styled.div`
  border-left: 1px solid #f0f0f0;
  height: 100%;
  overflow-y: auto;
  padding: ${grid(4)};
`

const StyledSupplementaryFieldsContainer = styled.div`
  margin-bottom: ${grid(6)};
`

const Metadata = React.forwardRef((props, ref) => {
  const {
    className,
    onAutoSave,
    initialValues,
    onFormFinish,
    readOnly,
    metadata,
    editorView,
    resources,

    /* eslint-disable-next-line react/prop-types */
    innerRef,
  } = props

  const [form] = Form.useForm()

  useImperativeHandle(innerRef, () => ({
    getFormValues: () => form.getFieldsValue(),
    submit: () => form.submit(),
    isFieldsTouched: val => form.isFieldsTouched(val),
    getFieldsError: () => form.getFieldsError(),
  }))

  const topicsKey = 'topics'
  const coursesKey = 'courses'

  const [topicsIndexes, setTopicsIndexes] = useState([])
  const [coursesIndexes, setCoursesIndexes] = useState([])

  const renderFrameworkFields = (getFieldValue, index = -1, key = '') => {
    const selectedCourse = getFieldValue([key, index, 'course'])

    if (
      selectedCourse === 'apBiology' ||
      selectedCourse === 'apEnvironmentalScience'
    ) {
      return (
        <APCourseMetadata
          courseData={metadata.frameworks.find(f => f.value === selectedCourse)}
          getFieldValue={getFieldValue}
          index={index}
          isRequired
          readOnly={readOnly}
          setFieldsValue={form.setFieldsValue}
          supplementaryKey={key}
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
          getFieldValue={getFieldValue}
          index={index}
          isRequired
          readOnly={readOnly}
          setFieldsValue={form.setFieldsValue}
          supplementaryKey={key}
        />
      )
    }

    if (
      selectedCourse === 'introductoryBiologyForNonMajors' ||
      selectedCourse === 'introductoryBiologyForMajors'
    ) {
      return (
        <>
          <VisionAndChangeMetadata
            conceptsAndCompetencies={metadata.introToBioMeta.find(
              f => f.value === 'visionAndChange',
            )}
            getFieldValue={getFieldValue}
            index={index}
            isRequired
            readOnly={readOnly}
            setFieldsValue={form.setFieldsValue}
            supplementaryKey={key}
          />
          {selectedCourse === 'introductoryBiologyForMajors' && (
            <AAMCFuturePhysiciansMetadata
              aamcMetadata={metadata.introToBioMeta.find(
                f => f.value === 'aamcFuturePhysicians',
              )}
              getFieldValue={getFieldValue}
              index={index}
              isRequired
              readOnly={readOnly}
              setFieldsValue={form.setFieldsValue}
              supplementaryKey={key}
            />
          )}
        </>
      )
    }

    return null
  }

  const handleSupplementaryAdd = (add, key) => {
    const addFunction = supIndexes => {
      const clone = [...supIndexes]

      if (clone.length === 0) {
        clone.push(0)
        return clone
      }

      clone.push(clone.length)
      return clone
    }

    if (key === topicsKey) {
      setTopicsIndexes(addFunction)
    } else if (key === coursesKey) {
      setCoursesIndexes(addFunction)
    }

    add()
  }

  const handleSupplementaryRemove = (remove, key) => {
    if (key === topicsKey) {
      const last = topicsIndexes.length - 1
      remove(last)
      setTopicsIndexes(dropRight([...topicsIndexes]))
    } else if (key === coursesKey) {
      const last = coursesIndexes.length - 1
      remove(last)
      setCoursesIndexes(dropRight([...coursesIndexes]))
    }
  }

  const getSelectedTopics = topics => topics.filter(t => !!t)

  // need to reset fields when course choice changes, because it enter a recursive loop when done inside metadata components
  const resetCourseFields = (value, index, key, remove) => {
    const cloned = [...form.getFieldValue(key)]
    cloned[index] = {
      course: value,
    }

    form.setFieldsValue({
      [key]: cloned,
    })

    // remove 2nd set of fields if author
    if (!editorView && coursesIndexes.length > 1) {
      handleSupplementaryRemove(remove, key)
    }
  }

  useEffect(() => {
    let sIndexes = [0]

    if (initialValues[topicsKey]?.length) {
      sIndexes = initialValues[topicsKey]?.map((_, index) => index)
    }

    setTopicsIndexes(sIndexes)

    // reset to use for calculating existing supplementary curricula
    sIndexes = [0]

    if (initialValues[coursesKey]?.length) {
      sIndexes = initialValues[coursesKey]?.map((_, index) => index)
    }

    setCoursesIndexes(sIndexes)

    form.setFieldsValue(initialValues)
  }, [initialValues])

  // TODO: find a better solution (assigning the initialValue directly confilcts with form.setFieldsValues)
  // initialValue for 2nd course metadata for author
  const initialValueSecondCourse = index => {
    if (index === 1 && !editorView) {
      return {
        initialValue: form.getFieldValue([coursesKey, 0, 'course']),
      }
    }

    return null
  }

  /**
   * RENDER
   */

  return (
    <Wrapper className={className}>
      <Form
        autoSave
        form={form}
        initialValues={initialValues}
        layout="vertical"
        onAutoSave={onAutoSave}
        onFinish={onFormFinish}
      >
        <Form.Item
          label="Question Type"
          name="questionType"
          rules={[{ required: true, message: 'Question type is required' }]}
        >
          <Select
            // allowClear
            disabled={readOnly}
            options={metadata.questionTypes}
          />
        </Form.Item>
        <Form.List name={topicsKey} noStyle>
          {(_, { add, remove }) => (
            <StyledSupplementaryFieldsContainer>
              {topicsIndexes.map(index => (
                <div key={`supplementaryTopic-${index}`}>
                  <TopicAndSubtopic
                    getFieldValue={form.getFieldValue}
                    index={index}
                    isRequired
                    readOnly={readOnly}
                    setFieldsValue={form.setFieldsValue}
                    supplementaryKey={topicsKey}
                    topicsMetadata={metadata.topics}
                  />
                </div>
              ))}
              {!readOnly && (
                <>
                  {topicsIndexes.length < 2 && (
                    <Button
                      disabled={readOnly}
                      onClick={() => {
                        handleSupplementaryAdd(add, topicsKey)
                      }}
                      type="primary"
                    >
                      Add a second topic
                    </Button>
                  )}
                  {topicsIndexes.length > 1 && (
                    <Button
                      disabled={readOnly}
                      onClick={() => {
                        handleSupplementaryRemove(remove, topicsKey)
                      }}
                      type="danger"
                    >
                      Remove second topic
                    </Button>
                  )}
                </>
              )}
            </StyledSupplementaryFieldsContainer>
          )}
        </Form.List>

        <Form.List name={coursesKey} noStyle>
          {(_, { add, remove }) => (
            <StyledSupplementaryFieldsContainer>
              {coursesIndexes.map(index => (
                <div key={`supplementaryFields-${index}`}>
                  {index === 1 && !editorView && <p>Second reference</p>}
                  <Form.Item
                    hidden={index === 1 && !editorView}
                    {...initialValueSecondCourse(index)}
                    label="Course"
                    name={[index, 'course']}
                    rules={[{ required: true, message: 'Course is required' }]}
                  >
                    <Select
                      allowClear
                      disabled={readOnly}
                      onChange={value =>
                        resetCourseFields(value, index, coursesKey, remove)
                      }
                      options={metadata.frameworks.map(i => ({
                        label: i.label,
                        value: i.value,
                      }))}
                    />
                  </Form.Item>

                  <Form.Item dependencies={[[coursesKey, 0, 'course']]} noStyle>
                    {({ getFieldValue }) =>
                      renderFrameworkFields(getFieldValue, index, coursesKey)
                    }
                  </Form.Item>
                </div>
              ))}

              {!readOnly && (
                <>
                  {(coursesIndexes.length < 2 || editorView) && (
                    <Button
                      disabled={readOnly}
                      onClick={() => {
                        handleSupplementaryAdd(add, coursesKey)
                      }}
                      type="primary"
                    >
                      {editorView
                        ? 'Add related course'
                        : 'Add a second curricula reference'}
                    </Button>
                  )}
                  {((coursesIndexes.length > 1 && !editorView) ||
                    (editorView && coursesIndexes.length > 1)) && ( // transformedInitialValues.courses.length
                    <Button
                      disabled={readOnly}
                      onClick={() => {
                        handleSupplementaryRemove(remove, coursesKey)
                      }}
                      type="danger"
                    >
                      {editorView
                        ? 'Remove last course'
                        : 'Remove second curricula reference'}
                    </Button>
                  )}
                </>
              )}
            </StyledSupplementaryFieldsContainer>
          )}
        </Form.List>

        <Form.Item label="Keywords" name="keywords">
          <Select disabled={readOnly} mode="tags" open={false} />
        </Form.Item>
        <Form.Item
          dependencies={[
            [topicsKey, 0, 'topic'],
            [topicsKey, 1, 'topic'],
          ]}
          noStyle
        >
          {({ getFieldValue }) => (
            <Resources
              getFieldValue={form.getFieldValue}
              readOnly={readOnly}
              resources={resources}
              selectedTopics={getSelectedTopics([
                getFieldValue([topicsKey, 0, 'topic']),
                getFieldValue([topicsKey, 1, 'topic']),
              ])}
            />
          )}
        </Form.Item>

        {/* BLOOMS */}

        <Form.Item
          label="Bloom's cognitive level"
          name="cognitiveLevel"
          rules={[
            {
              required: true,
              message: "Bloom's cognitive level is required",
            },
          ]}
        >
          <Select disabled={readOnly} options={metadata.blooms.cognitive} />
        </Form.Item>

        <Form.Item
          label="Bloom's affective level"
          name="affectiveLevel"
          rules={[
            {
              message: "Bloom's affective level is required",
            },
          ]}
        >
          <Select disabled={readOnly} options={metadata.blooms.affective} />
        </Form.Item>

        <Form.Item
          label="Bloom's psychomotor level"
          name="psychomotorLevel"
          rules={[
            {
              message: "Bloom's psychomotor level is required",
            },
          ]}
        >
          <Select disabled={readOnly} options={metadata.blooms.psychomotor} />
        </Form.Item>

        {/* <Form.Item label="Reading level" name="readingLevel">
          <Select disabled={readOnly} options={[]} />
        </Form.Item> */}
      </Form>
    </Wrapper>
  )
})

Metadata.propTypes = {
  onAutoSave: PropTypes.func,
  onFormFinish: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  metadata: PropTypes.shape({
    questionTypes: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
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
  }).isRequired,
  resources: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      url: PropTypes.string,
      topics: PropTypes.arrayOf(PropTypes.string),
      subtopics: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
  editorView: PropTypes.bool,
  initialValues: PropTypes.shape({
    topics: PropTypes.arrayOf(
      PropTypes.shape({
        topic: PropTypes.string,
        subtopic: PropTypes.string,
      }),
    ),
    courses: PropTypes.arrayOf(
      PropTypes.shape({
        course: PropTypes.string,
        units: PropTypes.arrayOf(
          PropTypes.shape({
            unit: PropTypes.string,
            courseTopic: PropTypes.string,
            learningObjective: PropTypes.string,
            essentialKnowledge: PropTypes.string,
            application: PropTypes.string,
            skill: PropTypes.string,
            understanding: PropTypes.string,
          }),
        ),
      }),
    ),
    keywords: PropTypes.arrayOf(PropTypes.string),
    biointeractiveResources: PropTypes.arrayOf(PropTypes.string),
    cognitiveLevel: PropTypes.string,
    affectiveLevel: PropTypes.string,
    psychomotorLevel: PropTypes.string,
    readingLevel: PropTypes.string,
  }),
}

Metadata.defaultProps = {
  editorView: false,
  onAutoSave: null,
  initialValues: {},
  readOnly: false,
  resources: [],
}

export default Metadata
