import React, { useState, useImperativeHandle, useEffect } from 'react'
import { dropRight } from 'lodash'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { grid } from '@coko/client'

import {
  Select,
  Form,
  Button,
  VisuallyHiddenElement,
  Checkbox,
  Modal,
} from '../common'
import {
  TopicAndSubtopic,
  APCourseMetadata,
  IBCourseMetadata,
  IntroToBioCourseMetadata,
} from '../metadataFields'
import Resources from './Resources'
import MetadataInfo from './MetadataInfo'

const Wrapper = styled.section`
  padding: ${grid(4)};
`

const StyledSupplementaryFieldsContainer = styled.div`
  margin-bottom: ${grid(6)};
`

const apCourses = ['apBiology', 'apEnvironmentalScience']
const ibCourses = ['biBiology', 'biEnvironmentalScience']
const introBioCourses = ['introBioForNonMajors', 'introBioForMajors']

const ModalContext = React.createContext(null)
const { footer: ModalFooter, header: ModalHeader } = Modal

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
    presentationMode,
    complexItemSetOptions,
    /* eslint-disable-next-line react/prop-types */
    innerRef,
    selectedQuestionType,
    showTopicAndSubtopicFields,
  } = props

  const [formValues] = useState(initialValues)

  if (presentationMode) {
    return (
      <MetadataInfo
        complexItemSetOptions={complexItemSetOptions}
        metadata={metadata}
        resources={resources}
        values={initialValues}
      />
    )
  }

  const [form] = Form.useForm()
  const [modal, contextHolder] = Modal.useModal()
  const { confirm } = modal

  useImperativeHandle(innerRef, () => ({
    getFormValues: () => form.getFieldsValue(),
    submit: () => form.submit(),
    isFieldsTouched: val => form.isFieldsTouched(val),
    getFieldsError: () => form.getFieldsError(),
    validateFields: () => form.validateFields(),
  }))

  const topicsKey = 'topics'
  const coursesKey = 'courses'

  const [topicsIndexes, setTopicsIndexes] = useState([])
  const [coursesIndexes, setCoursesIndexes] = useState([])

  const renderFrameworkFields = (getFieldValue, index = -1, key = '') => {
    const selectedCourse = getFieldValue([key, index, 'course'])

    const courseMetadata = metadata.frameworks.find(
      f => f.value === selectedCourse,
    )

    if (apCourses.includes(selectedCourse)) {
      return (
        <APCourseMetadata
          courseData={courseMetadata}
          getFieldValue={getFieldValue}
          index={index}
          isRequired
          readOnly={readOnly}
          setFieldsValue={form.setFieldsValue}
          supplementaryKey={key}
        />
      )
    }

    if (ibCourses.includes(selectedCourse)) {
      return (
        <IBCourseMetadata
          courseData={courseMetadata}
          getFieldValue={getFieldValue}
          index={index}
          isRequired
          readOnly={readOnly}
          setFieldsValue={form.setFieldsValue}
          supplementaryKey={key}
        />
      )
    }

    if (introBioCourses.includes(selectedCourse)) {
      return (
        <IntroToBioCourseMetadata
          courseData={courseMetadata}
          getFieldValue={getFieldValue}
          index={index}
          introToBioMeta={metadata.introToBioMeta}
          isRequired
          readOnly={readOnly}
          setFieldsValue={form.setFieldsValue}
          supplementaryKey={key}
        />
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

  const handleAutoSave = formData => {
    if (
      selectedQuestionType &&
      selectedQuestionType !== formData.questionType
    ) {
      const confirmUpdateQuestionType = confirm()

      const cancelUpdate = () => {
        confirmUpdateQuestionType.destroy()
        form.setFieldsValue({ questionType: selectedQuestionType })
      }

      const continueUpdate = () => {
        confirmUpdateQuestionType.destroy()
        onAutoSave(formData)
      }

      confirmUpdateQuestionType.update({
        title: <ModalHeader>Are you sure?</ModalHeader>,
        content: <p>All content will be replaced by the new item type.</p>,
        footer: [
          <ModalFooter key="footer">
            <Button onClick={cancelUpdate}>Cancel</Button>
            <Button autoFocus onClick={continueUpdate} type="primary">
              Yes, update
            </Button>
          </ModalFooter>,
        ],
      })
    } else {
      onAutoSave(formData)
    }
  }

  useEffect(() => {
    let sIndexes = [0]
    const formValuesClone = structuredClone(formValues)

    if (formValuesClone[topicsKey]?.length) {
      sIndexes = formValuesClone[topicsKey]?.map((_, index) => index)
    }

    setTopicsIndexes(sIndexes)

    // reset to use for calculating existing supplementary curricula
    sIndexes = [0]

    if (formValuesClone[coursesKey]?.length) {
      sIndexes = formValuesClone[coursesKey]?.map((c, index) => {
        return metadata.frameworks.find(f => f.value === c.course) !== undefined
          ? index
          : -1
      })
    }

    // filter out non-existent resources
    formValuesClone.biointeractiveResources =
      formValuesClone.biointeractiveResources
        .map(resource => resources.find(r => r.value === resource)?.value)
        .filter(r => !!r)

    setCoursesIndexes(sIndexes)

    form.setFieldsValue(formValuesClone)
  }, [formValues])

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

  useEffect(() => {
    // only fire when new question type comes from editor content
    if (
      selectedQuestionType !== form.getFieldValue('questionType') &&
      !readOnly
    ) {
      form.setFieldsValue({ questionType: selectedQuestionType })
      onAutoSave(form.getFieldsValue())
    }
  }, [selectedQuestionType])

  /**
   * RENDER
   */

  return (
    <ModalContext.Provider value={null}>
      <Wrapper aria-label="Question Metadata" className={className}>
        <VisuallyHiddenElement as="h2">Metadata Form</VisuallyHiddenElement>
        <Form
          autoSave
          form={form}
          initialValues={formValues}
          layout="vertical"
          onAutoSave={handleAutoSave}
          onFinish={onFormFinish}
        >
          <Form.Item name="belongsToComplexItemSet" valuePropName="checked">
            <Checkbox data-testid="belongs-to-set-checkbox" disabled={readOnly}>
              This item belongs to a Context-Dependent Item Set{' '}
            </Checkbox>
          </Form.Item>

          <Form.Item dependencies={['belongsToComplexItemSet']} noStyle>
            {({ getFieldValue }) => {
              if (getFieldValue('belongsToComplexItemSet')) {
                return (
                  <Form.Item
                    label="Select Context-Dependent Item Set"
                    name="complexItemSetId"
                    rules={[
                      {
                        required: true,
                        message: 'Context-dependent item set is required',
                      },
                    ]}
                  >
                    <Select
                      data-testid="complexItemSet-select"
                      disabled={readOnly}
                      optionFilterProp="label"
                      options={complexItemSetOptions}
                      showSearch
                    />
                  </Form.Item>
                )
              }

              return null
            }}
          </Form.Item>

          <Form.Item
            label="Item Type"
            name="questionType"
            rules={[{ required: true, message: 'Item type is required' }]}
          >
            <Select
              // allowClear
              data-testid="questionType-select"
              disabled={readOnly}
              options={metadata.questionTypes}
            />
          </Form.Item>

          {/* BLOOMS */}
          <Form.Item
            label="Bloom's Cognitive Level"
            name="cognitiveLevel"
            rules={[
              {
                required: true,
                message: "Bloom's Cognitive Level is required",
              },
            ]}
          >
            <Select
              data-testid="cognitive-select"
              disabled={readOnly}
              options={metadata.blooms.cognitive}
            />
          </Form.Item>

          <Form.List name={coursesKey} noStyle>
            {(_, { add, remove }) => (
              <StyledSupplementaryFieldsContainer>
                {coursesIndexes.map(index =>
                  index !== -1 ? (
                    <div key={`supplementaryFields-${index}`}>
                      {index === 1 && !editorView && <p>Second reference</p>}
                      <Form.Item
                        hidden={index === 1 && !editorView}
                        {...initialValueSecondCourse(index)}
                        label="Course"
                        name={[index, 'course']}
                        rules={[
                          { required: true, message: 'Course is required' },
                        ]}
                      >
                        <Select
                          data-testid="course-select"
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

                      <Form.Item
                        dependencies={[[coursesKey, 0, 'course']]}
                        noStyle
                      >
                        {({ getFieldValue }) =>
                          renderFrameworkFields(
                            getFieldValue,
                            index,
                            coursesKey,
                          )
                        }
                      </Form.Item>
                    </div>
                  ) : (
                    <p key={`supplementaryFields-${index}`}>
                      Corrupted course value, please contact the administrator
                    </p>
                  ),
                )}

                {!readOnly && coursesIndexes.indexOf(-1) === -1 && (
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
                        status="danger"
                        type="primary"
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
            <Select
              data-testid="keywords-select"
              disabled={readOnly}
              mode="tags"
              open={false}
            />
          </Form.Item>

          {showTopicAndSubtopicFields ? (
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
                          data-testid="remove-second-topic"
                          disabled={readOnly}
                          onClick={() => {
                            handleSupplementaryRemove(remove, topicsKey)
                          }}
                          status="danger"
                          type="primary"
                        >
                          Remove second topic
                        </Button>
                      )}
                    </>
                  )}
                </StyledSupplementaryFieldsContainer>
              )}
            </Form.List>
          ) : null}

          <Form.Item noStyle>
            <Resources
              getFieldValue={form.getFieldValue}
              readOnly={readOnly}
              resources={resources}
            />
          </Form.Item>
        </Form>
      </Wrapper>
      {contextHolder}
    </ModalContext.Provider>
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
        PropTypes.shape({
          label: PropTypes.string,
          options: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
            }),
          ),
        }),
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
    questionType: PropTypes.string,
    topics: PropTypes.arrayOf(
      PropTypes.shape({
        topic: PropTypes.string,
        subtopic: PropTypes.string,
      }),
    ),
    courses: PropTypes.oneOfType([
      // format for metadata form
      PropTypes.arrayOf(
        PropTypes.shape({
          course: PropTypes.string,
          unit: PropTypes.string,
          courseTopic: PropTypes.string,
          learningObjective: PropTypes.string,
          essentialKnowledge: PropTypes.string,
          application: PropTypes.string,
          skill: PropTypes.string,
          understanding: PropTypes.string,
        }),
      ),
      // format for MetadataInfo
      PropTypes.arrayOf(
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
    ]),
    keywords: PropTypes.arrayOf(PropTypes.string),
    biointeractiveResources: PropTypes.arrayOf(PropTypes.string),
    cognitiveLevel: PropTypes.string,
    affectiveLevel: PropTypes.string,
    psychomotorLevel: PropTypes.string,
    readingLevel: PropTypes.string,
  }),
  presentationMode: PropTypes.bool,
  complexItemSetOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
    }),
  ),
  selectedQuestionType: PropTypes.string,
  showTopicAndSubtopicFields: PropTypes.bool,
}

Metadata.defaultProps = {
  editorView: false,
  onAutoSave: null,
  initialValues: {},
  readOnly: false,
  resources: [],
  presentationMode: false,
  complexItemSetOptions: [],
  selectedQuestionType: null,
  showTopicAndSubtopicFields: false,
}

export default Metadata
