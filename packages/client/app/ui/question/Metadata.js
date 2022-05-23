import React, { useState, useImperativeHandle, useEffect } from 'react'
import { dropRight, uniqBy } from 'lodash'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { grid, uuid } from '@coko/client'

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

const Metadata = React.forwardRef((props, ref) => {
  const {
    className,
    onAutoSave,
    initialValues,
    onFormFinish,
    readOnly,
    metadata,

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

  const { supplementaryFields } = initialValues
  let sIndexes

  if (supplementaryFields) {
    sIndexes = initialValues.supplementaryFields?.map((_, index) => index)
  }

  const [supplementaryFieldsIndexes, setSupplementaryFieldsIndexes] = useState(
    sIndexes || [],
  )

  const renderFrameworkFields = (getFieldValue, index = -1) => {
    const selectedCourse =
      index > -1
        ? getFieldValue(['supplementaryFields', index, 'framework'])
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
          supplementaryKey={index > -1 ? 'supplementaryFields' : ''}
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
          supplementaryKey={index > -1 ? 'supplementaryFields' : ''}
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
            supplementaryKey={index > -1 ? 'supplementaryFields' : ''}
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
              supplementaryKey={index > -1 ? 'supplementaryFields' : ''}
            />
          )}
        </>
      )
    }

    return null
  }

  const handleSupplementaryAdd = add => {
    setSupplementaryFieldsIndexes(supIndexes => {
      const clone = [...supIndexes]

      if (clone.length === 0) {
        clone.push(0)
        return clone
      }

      clone.push(clone.length)
      return clone
    })
    add()
  }

  const handleSupplementaryRemove = remove => {
    const last = supplementaryFieldsIndexes.length - 1
    remove(last)
    setSupplementaryFieldsIndexes(dropRight([...supplementaryFieldsIndexes]))
  }

  const getResources = () => {
    const selectedTopic = form.getFieldValue('topic')

    if (selectedTopic) {
      const topicResources = []

      metadata.topics
        .find(t => t.value === selectedTopic)
        .subTopics.forEach(s => {
          const { resources } = s

          if (resources) {
            topicResources.push(...resources)
          }
        })

      return uniqBy(topicResources, 'value')
    }

    const allResources = metadata.topics
      .map(t =>
        t.subTopics
          .map(s => s.resources)
          .filter(r => r !== undefined)
          .flat(),
      )
      .flat()

    return uniqBy(allResources, 'value')
  }

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

        <Form.List
          // dependencies={['framework']}
          name="supplementaryFields"
          noStyle
        >
          {(_, { add, remove }) => (
            <div key={uuid()}>
              {supplementaryFieldsIndexes.length ? (
                <p>Supplementary metadata</p>
              ) : (
                <span />
              )}
              {supplementaryFieldsIndexes.map(index => (
                <div key={`supplementaryField-${index}`}>
                  <TopicAndSubtopic
                    getFieldValue={form.getFieldValue}
                    index={index}
                    isRequired
                    readOnly={readOnly}
                    setFieldsValue={form.setFieldsValue}
                    supplementaryKey="supplementaryFields"
                    topicsMetadata={metadata.topics}
                  />

                  <Form.Item
                    label="Course"
                    name={[index, 'framework']}
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

                  <Form.Item
                    dependencies={[['supplementaryFields', index, 'framework']]}
                    noStyle
                  >
                    {({ getFieldValue }) =>
                      renderFrameworkFields(getFieldValue, index)
                    }
                  </Form.Item>
                </div>
              ))}
              {!readOnly && (
                <Form.Item>
                  <Button
                    disabled={readOnly}
                    onClick={() => {
                      handleSupplementaryAdd(add)
                    }}
                    type="primary"
                  >
                    Add topic
                  </Button>
                  {supplementaryFieldsIndexes.length > 0 && (
                    <Button
                      disabled={readOnly}
                      onClick={() => {
                        handleSupplementaryRemove(remove)
                      }}
                      type="danger"
                    >
                      Remove topic
                    </Button>
                  )}
                </Form.Item>
              )}
            </div>
          )}
        </Form.List>

        <Form.Item label="Keywords" name="keywords">
          <Select disabled={readOnly} mode="tags" open={false} />
        </Form.Item>
        <Form.Item dependencies={['topic']} noStyle>
          {({ getFieldValue }) => (
            <Resources readOnly={readOnly} resources={getResources()} />
          )}
        </Form.Item>

        {/* BLOOMS */}

        <Form.Item
          label="Bloom's cognitive level"
          name="cognitiveLevel"
          rules={[
            {
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
      {/* eslint-disable-next-line no-console */}
      <button onClick={() => console.log(form.getFieldsValue())} type="button">
        Submit
      </button>
    </Wrapper>
  )
})

Metadata.propTypes = {
  onAutoSave: PropTypes.func,
  onFormFinish: PropTypes.func.isRequired,
  readOnly: PropTypes.bool.isRequired,
  metadata: PropTypes.shape().isRequired,

  // TO DO - provide valid shape
  /* eslint-disable-next-line react/forbid-prop-types */
  initialValues: PropTypes.object,
}

Metadata.defaultProps = {
  onAutoSave: null,
  initialValues: {},
}

export default Metadata
