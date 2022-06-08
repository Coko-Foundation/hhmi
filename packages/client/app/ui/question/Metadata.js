import React, { useState, useImperativeHandle, useEffect } from 'react'
import { dropRight } from 'lodash'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { grid, uuid } from '@coko/client'
import { Tooltip } from 'antd'

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

  const supplementaryTopicsKey = 'supplementaryTopics'
  const supplementaryFieldsKey = 'supplementaryFields'
  const supplementaryCurriculaKey = 'supplementaryCurricula'

  let sIndexes = []

  if (initialValues[supplementaryTopicsKey]) {
    sIndexes = initialValues[supplementaryTopicsKey]?.map((_, index) => index)
  }

  const [supplementaryTopicsIndexes, setSupplementaryTopicsIndexes] =
    useState(sIndexes)

  // reset to use for calculating existing supplementary curricula
  sIndexes = []

  if (initialValues[supplementaryFieldsKey]) {
    sIndexes = initialValues[supplementaryFieldsKey]?.map((_, index) => index)
  }

  const [supplementaryFieldsIndexes, setSupplementaryFieldsIndexes] =
    useState(sIndexes)

  // reset to use for calculating existing supplementary curricula
  sIndexes = []

  if (initialValues[supplementaryCurriculaKey]) {
    sIndexes = initialValues[supplementaryCurriculaKey]?.map(
      (_, index) => index,
    )
  }

  const [supplementaryCurriculaIndexes, setSupplementaryCurriculaIndexes] =
    useState(sIndexes)

  const renderFrameworkFields = (getFieldValue, index = -1, key = '') => {
    const selectedCourse =
      key === supplementaryCurriculaKey
        ? getFieldValue([key, index, 'framework'])
        : getFieldValue('framework')

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

    if (key === supplementaryTopicsKey) {
      setSupplementaryTopicsIndexes(addFunction)
    } else if (key === supplementaryFieldsKey) {
      setSupplementaryFieldsIndexes(addFunction)
    } else if (key === supplementaryCurriculaKey) {
      setSupplementaryCurriculaIndexes(addFunction)
    }

    add()
  }

  const handleSupplementaryRemove = (remove, key) => {
    if (key === supplementaryTopicsKey) {
      const last = supplementaryTopicsIndexes.length - 1
      remove(last)
      setSupplementaryTopicsIndexes(dropRight([...supplementaryTopicsIndexes]))
    } else if (key === supplementaryFieldsKey) {
      const last = supplementaryFieldsIndexes.length - 1
      remove(last)
      setSupplementaryFieldsIndexes(dropRight([...supplementaryFieldsIndexes]))
    } else if (key === supplementaryCurriculaKey) {
      const last = supplementaryCurriculaIndexes.length - 1
      remove(last)
      setSupplementaryCurriculaIndexes(
        dropRight([...supplementaryCurriculaIndexes]),
      )
    }
  }

  const getSelectedTopics = topics => topics.filter(t => !!t)

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues)
    }
  }, [initialValues])

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
        <TopicAndSubtopic
          getFieldValue={form.getFieldValue}
          isRequired
          readOnly={readOnly}
          setFieldsValue={form.setFieldsValue}
          subtopicKey="subtopic"
          topicKey="topic"
          topicsMetadata={metadata.topics}
        />
        <Form.List name={supplementaryTopicsKey} noStyle>
          {(_, { add, remove }) => (
            <StyledSupplementaryFieldsContainer key={uuid()}>
              {supplementaryTopicsIndexes.map(index => (
                <div key={`supplementaryTopic-${index}`}>
                  <TopicAndSubtopic
                    getFieldValue={form.getFieldValue}
                    index={index}
                    isRequired
                    readOnly={readOnly}
                    setFieldsValue={form.setFieldsValue}
                    supplementaryKey={supplementaryTopicsKey}
                    topicsMetadata={metadata.topics}
                  />
                </div>
              ))}
              {!readOnly && (
                <>
                  {supplementaryTopicsIndexes.length < 1 && (
                    <Button
                      disabled={readOnly}
                      onClick={() => {
                        handleSupplementaryAdd(add, supplementaryTopicsKey)
                      }}
                      type="primary"
                    >
                      Add a second topic
                    </Button>
                  )}
                  {supplementaryTopicsIndexes.length > 0 && (
                    <Button
                      disabled={readOnly}
                      onClick={() => {
                        handleSupplementaryRemove(
                          remove,
                          supplementaryTopicsKey,
                        )
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
        <Form.Item
          label="Course"
          name="framework"
          rules={[{ required: true, message: 'Course is required' }]}
        >
          <Select
            allowClear
            disabled={readOnly}
            options={metadata.frameworks.map(i => ({
              label: i.label,
              value: i.value,
            }))}
          />
        </Form.Item>
        <Form.Item dependencies={['framework']} noStyle>
          {({ getFieldValue }) => renderFrameworkFields(getFieldValue)}
        </Form.Item>
        <Form.List name={supplementaryFieldsKey} noStyle>
          {(_, { add, remove }) => (
            <StyledSupplementaryFieldsContainer key={uuid()}>
              {supplementaryFieldsIndexes.length ? (
                <p>Supplementary metadata</p>
              ) : (
                <span />
              )}
              {supplementaryFieldsIndexes.map(index => (
                <div key={`supplementaryFields-${index}`}>
                  <Form.Item dependencies={['framework']} noStyle>
                    {({ getFieldValue }) =>
                      renderFrameworkFields(
                        getFieldValue,
                        index,
                        supplementaryFieldsKey,
                      )
                    }
                  </Form.Item>
                </div>
              ))}
              {!readOnly && (
                <>
                  {supplementaryFieldsIndexes.length < 1 &&
                    form.getFieldValue('framework') && (
                      <Button
                        disabled={readOnly}
                        onClick={() => {
                          handleSupplementaryAdd(add, supplementaryFieldsKey)
                        }}
                        type="primary"
                      >
                        Add a second curricula reference
                      </Button>
                    )}
                  {supplementaryFieldsIndexes.length > 0 && (
                    <Button
                      disabled={readOnly}
                      onClick={() => {
                        handleSupplementaryRemove(
                          remove,
                          supplementaryFieldsKey,
                        )
                      }}
                      type="danger"
                    >
                      Remove second curricula reference
                    </Button>
                  )}
                </>
              )}
            </StyledSupplementaryFieldsContainer>
          )}
        </Form.List>

        {editorView && (
          <Form.List name={supplementaryCurriculaKey} noStyle>
            {(_, { add, remove }) => (
              <StyledSupplementaryFieldsContainer key={uuid()}>
                <p>Related courses</p>
                {supplementaryCurriculaIndexes.length === 0 && (
                  <p>No related courses</p>
                )}
                {supplementaryCurriculaIndexes.map(index => (
                  <div key={`supplementaryCurricula-${index}`}>
                    <Form.Item
                      label="Course"
                      name={[index, 'framework']}
                      rules={[
                        { required: true, message: 'Course is required' },
                      ]}
                    >
                      <Select
                        allowClear
                        disabled={readOnly}
                        options={metadata.frameworks.map(i => ({
                          label: i.label,
                          value: i.value,
                        }))}
                      />
                    </Form.Item>

                    <Form.Item
                      dependencies={[
                        [supplementaryCurriculaKey, index, 'framework'],
                      ]}
                      noStyle
                    >
                      {({ getFieldValue }) =>
                        renderFrameworkFields(
                          getFieldValue,
                          index,
                          supplementaryCurriculaKey,
                        )
                      }
                    </Form.Item>
                  </div>
                ))}
                {!readOnly && (
                  <>
                    <Tooltip
                      title="Link this question to another course"
                      trigger={['hover', 'focus']}
                    >
                      <Button
                        disabled={readOnly}
                        onClick={() => {
                          handleSupplementaryAdd(add, supplementaryCurriculaKey)
                        }}
                        type="primary"
                      >
                        Add course
                      </Button>
                    </Tooltip>
                    {supplementaryCurriculaIndexes.length > 0 && (
                      <Button
                        disabled={readOnly}
                        onClick={() => {
                          handleSupplementaryRemove(
                            remove,
                            supplementaryCurriculaKey,
                          )
                        }}
                        type="danger"
                      >
                        Remove last course
                      </Button>
                    )}
                  </>
                )}
              </StyledSupplementaryFieldsContainer>
            )}
          </Form.List>
        )}
        {/* )} */}

        <Form.Item label="Keywords" name="keywords">
          <Select disabled={readOnly} mode="tags" open={false} />
        </Form.Item>
        <Form.Item
          dependencies={['topic', [supplementaryTopicsKey, 0, 'topic']]}
          noStyle
        >
          {({ getFieldValue }) => (
            <Resources
              readOnly={readOnly}
              resources={resources}
              selectedTopics={getSelectedTopics([
                getFieldValue('topic'),
                getFieldValue([supplementaryTopicsKey, 0, 'topic']),
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

        <Form.Item label="Reading level" name="readingLevel">
          <Select disabled={readOnly} options={[]} />
        </Form.Item>
      </Form>
    </Wrapper>
  )
})

Metadata.propTypes = {
  onAutoSave: PropTypes.func,
  onFormFinish: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
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
  // TO DO - provide valid shape
  /* eslint-disable-next-line react/forbid-prop-types */
  initialValues: PropTypes.object,
}

Metadata.defaultProps = {
  editorView: false,
  onAutoSave: null,
  initialValues: {},
  resources: [],
}

export default Metadata
