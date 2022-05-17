import React, { useState, useImperativeHandle } from 'react'
import { dropRight } from 'lodash'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { grid, uuid } from '@coko/client'

import { Input, Select, Form, Button } from '../common'
import metadataOptions from './metadataValues'

const Wrapper = styled.div`
  border-left: 1px solid #f0f0f0;
  height: 100%;
  overflow-y: auto;
  padding: ${grid(4)};
`

const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const StyledFormItem = styled(Form.Item)`
  .ant-col.ant-form-item-label label {
    width: 100%;
  }
`

const Metadata = React.forwardRef((props, ref) => {
  const {
    className,
    onAutoSave,
    initialValues,
    onFormFinish,
    readOnly,

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

  const handleTopicSelectChange = val => {
    form.setFieldsValue({
      topic: val || null,
      subTopic: null,
    })
  }

  const handleSupplementaryTopicSelectChange = (index, value) => {
    const cloned = { ...form.getFieldsValue() }

    if (supplementaryFieldsIndexes.length > 0) {
      cloned.supplementaryFields[index].topic = value || null
      cloned.supplementaryFields[index].subTopic = null
    }

    form.setFieldsValue(cloned)
  }

  const handleFrameworkChange = val => {
    const cloned = { ...form.getFieldsValue() }
    Object.keys(form.getFieldsValue()).forEach(key => {
      /* eslint no-bitwise: ["error", { "allow": ["~"] }] */
      if (
        ~key.indexOf('apBiology') ||
        ~key.indexOf('apEnvironmentalScience') ||
        ~key.indexOf('visionAndChange')
      ) {
        delete cloned[key]
      }
    })

    cloned.framework = val || null

    if (val === 'apBiology') {
      cloned['apBiology.unit'] = null
      cloned['apBiology.frameworkTopic'] = null
      cloned['apBiology.learningObjective'] = null
      cloned['apBiology.essentialKnowledge'] = null
    }

    if (val !== 'apEnvironmentalScience') {
      cloned['apEnvironmentalScience.unit'] = null
      cloned['apEnvironmentalScience.frameworkTopic'] = null
      cloned['apEnvironmentalScience.learningObjective'] = null
      cloned['apEnvironmentalScience.essentialKnowledge'] = null
    }

    if (val !== 'visionAndChange') {
      cloned['visionAndChange.coreConcept'] = null
      cloned['visionAndChange.subDiscipline'] = null
      cloned['visionAndChange.statement'] = null
    }

    //  SUPPLEMENTARY FIELDS SECTION
    if (supplementaryFieldsIndexes.length > 0) {
      const suppTemp = []
      supplementaryFieldsIndexes.forEach(index => {
        suppTemp.push({
          topic: form.getFieldValue(['supplementaryFields', index, 'topic']),
          subTopic: form.getFieldValue([
            'supplementaryFields',
            index,
            'subTopic',
          ]),
        })
      })
      cloned.supplementaryFields = suppTemp
    }
    // END

    form.setFieldsValue(cloned)
  }

  const handleFrameworkUnitChange = val => {
    const framework = form.getFieldValue('framework')

    if (framework === 'apBiology' || framework === 'apEnvironmentalScience') {
      form.setFieldsValue({
        [`${framework}.unit`]: val || null,
        [`${framework}.frameworkTopic`]: null,
        [`${framework}.learningObjective`]: null,
        [`${framework}.essentialKnowledge`]: null,
      })
    }
  }

  const handleSupplementaryFrameworkUnitChange = (val, index) => {
    const cloned = { ...form.getFieldsValue() }
    const { framework } = cloned

    if (framework === 'apBiology' || framework === 'apEnvironmentalScience') {
      if (supplementaryFieldsIndexes.length > 0) {
        cloned.supplementaryFields[index] = {
          topic: form.getFieldValue(['supplementaryFields', index, 'topic']),
          subTopic: form.getFieldValue([
            'supplementaryFields',
            index,
            'subTopic',
          ]),
          unit: val || null,
          frameworkTopic: null,
          learningObjective: null,
          essentialKnowledge: null,
        }
        form.setFieldsValue(cloned)
      }
    }
  }

  const handleFrameworkTopicChange = val => {
    const framework = form.getFieldValue('framework')

    if (framework === 'apBiology' || framework === 'apEnvironmentalScience') {
      form.setFieldsValue({
        [`${framework}.frameworkTopic`]: val || null,
        [`${framework}.learningObjective`]: null,
        [`${framework}.essentialKnowledge`]: null,
      })
    }
  }

  const handleSupplementaryFrameworkTopicChange = (val, index) => {
    const cloned = { ...form.getFieldsValue() }
    const { framework } = cloned

    if (framework === 'apBiology' || framework === 'apEnvironmentalScience') {
      if (supplementaryFieldsIndexes.length > 0) {
        cloned.supplementaryFields[index] = {
          topic: form.getFieldValue(['supplementaryFields', index, 'topic']),
          subTopic: form.getFieldValue([
            'supplementaryFields',
            index,
            'subTopic',
          ]),
          unit: form.getFieldValue(['supplementaryFields', index, 'unit']),
          frameworkTopic: val || null,
          learningObjective: null,
          essentialKnowledge: null,
        }
        form.setFieldsValue(cloned)
      }
    }
  }

  const handleFrameworkLearningObjectiveChange = val => {
    const framework = form.getFieldValue('framework')

    if (framework === 'apBiology' || framework === 'apEnvironmentalScience') {
      form.setFieldsValue({
        [`${framework}.learningObjective`]: val || null,
        [`${framework}.essentialKnowledge`]: null,
      })
    }
  }

  const handleSupplementaryFrameworkLearningObjectiveChange = (val, index) => {
    const cloned = { ...form.getFieldsValue() }
    const { framework } = cloned

    if (framework === 'apBiology' || framework === 'apEnvironmentalScience') {
      if (supplementaryFieldsIndexes.length > 0) {
        cloned.supplementaryFields[index] = {
          topic: form.getFieldValue(['supplementaryFields', index, 'topic']),
          subTopic: form.getFieldValue([
            'supplementaryFields',
            index,
            'subTopic',
          ]),
          unit: form.getFieldValue(['supplementaryFields', index, 'unit']),
          frameworkTopic: form.getFieldValue([
            'supplementaryFields',
            index,
            'frameworkTopic',
          ]),
          learningObjective: val || null,
          essentialKnowledge: null,
        }
        form.setFieldsValue(cloned)
      }
    }
  }

  const handleCoreConceptChange = val => {
    const framework = form.getFieldValue('framework')
    form.setFieldsValue({
      [`${framework}.coreConcept`]: val || null,
      [`${framework}.subDiscipline`]: null,
      [`${framework}.statement`]: null,
    })
  }

  const handleSupplementaryCoreConceptChange = (val, index) => {
    const cloned = { ...form.getFieldsValue() }

    if (supplementaryFieldsIndexes.length > 0) {
      cloned.supplementaryFields[index] = {
        topic: form.getFieldValue(['supplementaryFields', index, 'topic']),
        subTopic: form.getFieldValue([
          'supplementaryFields',
          index,
          'subTopic',
        ]),
        coreConcept: val || null,
        subDiscipline: null,
        statement: null,
      }
      form.setFieldsValue(cloned)
    }
  }

  const handleSubDisciplineChange = val => {
    const framework = form.getFieldValue('framework')
    form.setFieldsValue({
      [`${framework}.subDiscipline`]: val || null,
      [`${framework}.statement`]: null,
    })
  }

  const handleSupplementarySubDisciplineChange = (val, index) => {
    const cloned = { ...form.getFieldsValue() }

    if (supplementaryFieldsIndexes.length > 0) {
      cloned.supplementaryFields[index] = {
        topic: form.getFieldValue(['supplementaryFields', index, 'topic']),
        subTopic: form.getFieldValue([
          'supplementaryFields',
          index,
          'subTopic',
        ]),
        coreConcept: form.getFieldValue([
          'supplementaryFields',
          index,
          'coreConcept',
        ]),
        subDiscipline: val || null,
        statement: null,
      }
      form.setFieldsValue(cloned)
    }
  }

  const renderAPFrameworkFields = getFieldValue => (
    <>
      <Form.Item
        dependencies={['framework']}
        label="Framework Unit"
        name={`${getFieldValue('framework')}.unit`}
      >
        <Select
          disabled={readOnly || !getFieldValue('framework')}
          onChange={handleFrameworkUnitChange}
          options={
            getFieldValue('framework')
              ? metadataOptions.frameworks
                  .find(i => i.value === getFieldValue('framework'))
                  .units.map(u => ({
                    label: u.label,
                    value: u.value,
                  }))
              : []
          }
        />
      </Form.Item>

      <Form.Item
        dependencies={['framework', `${getFieldValue('framework')}.unit`]}
        label="Framework Topic"
        name={`${getFieldValue('framework')}.frameworkTopic`}
      >
        <Select
          disabled={
            readOnly || !getFieldValue(`${getFieldValue('framework')}.unit`)
          }
          onChange={handleFrameworkTopicChange}
          options={
            getFieldValue(`${getFieldValue('framework')}.unit`) &&
            metadataOptions.frameworks
              .find(i => i.value === getFieldValue('framework'))
              .units.find(
                u =>
                  u.value ===
                  getFieldValue(`${getFieldValue('framework')}.unit`),
              )
              .topics.map(t => ({
                label: t.label,
                value: t.value,
              }))
          }
        />
      </Form.Item>

      <Form.Item
        dependencies={[
          'framework',
          `${getFieldValue('framework')}.unit`,
          `${getFieldValue('framework')}.frameworkTopic`,
        ]}
        label="Framework Learning Objective"
        name={`${getFieldValue('framework')}.learningObjective`}
      >
        <Select
          disabled={
            readOnly ||
            !getFieldValue(`${getFieldValue('framework')}.unit`) ||
            !getFieldValue(`${getFieldValue('framework')}.frameworkTopic`)
          }
          onChange={handleFrameworkLearningObjectiveChange}
          options={
            getFieldValue(`${getFieldValue('framework')}.unit`) &&
            getFieldValue(`${getFieldValue('framework')}.frameworkTopic`) &&
            metadataOptions.frameworks
              .find(i => i.value === getFieldValue('framework'))
              .units.find(
                u =>
                  u.value ===
                  getFieldValue(`${getFieldValue('framework')}.unit`),
              )
              .topics.find(
                t =>
                  t.value ===
                  getFieldValue(`${getFieldValue('framework')}.frameworkTopic`),
              )
              .learningObjectives.map(l => ({
                label: l.label,
                value: l.value,
              }))
          }
        />
      </Form.Item>

      <Form.Item
        dependencies={[
          'framework',
          `${getFieldValue('framework')}.unit`,
          `${getFieldValue('framework')}.frameworkTopic`,
          `${getFieldValue('framework')}.learningObjective`,
        ]}
        label="Framework Essential Knowledge"
        name={`${getFieldValue('framework')}.essentialKnowledge`}
      >
        <Select
          disabled={
            readOnly ||
            !getFieldValue(`${getFieldValue('framework')}.unit`) ||
            !getFieldValue(`${getFieldValue('framework')}.frameworkTopic`) ||
            !getFieldValue(`${getFieldValue('framework')}.learningObjective`)
          }
          options={
            getFieldValue(`${getFieldValue('framework')}.unit`) &&
            getFieldValue(`${getFieldValue('framework')}.frameworkTopic`) &&
            getFieldValue(`${getFieldValue('framework')}.learningObjective`) &&
            metadataOptions.frameworks
              .find(i => i.value === getFieldValue('framework'))
              .units.find(
                u =>
                  u.value ===
                  getFieldValue(`${getFieldValue('framework')}.unit`),
              )
              .topics.find(
                t =>
                  t.value ===
                  getFieldValue(`${getFieldValue('framework')}.frameworkTopic`),
              )
              .learningObjectives.find(
                l =>
                  l.value ===
                  getFieldValue(
                    `${getFieldValue('framework')}.learningObjective`,
                  ),
              )
              .essentialKnowledge.map(e => ({
                label: e.label,
                value: e.value,
              }))
          }
        />
      </Form.Item>
    </>
  )

  const renderVisionFrameworkFields = getFieldValue => (
    <>
      <Form.Item
        dependencies={['framework']}
        label="Core concept"
        name={`${getFieldValue('framework')}.coreConcept`}
      >
        <Select
          disabled={readOnly || !getFieldValue('framework')}
          onChange={handleCoreConceptChange}
          options={
            getFieldValue('framework')
              ? metadataOptions.frameworks
                  .find(i => i.value === getFieldValue('framework'))
                  .coreConcepts.map(u => ({
                    label: u.label,
                    value: u.value,
                  }))
              : []
          }
        />
      </Form.Item>
      {getFieldValue(`${getFieldValue('framework')}.coreConcept`) && (
        <div>
          <h4>Overarching Principles</h4>
          <ul>
            {metadataOptions.frameworks
              .find(f => f.value === getFieldValue('framework'))
              .coreConcepts.find(
                c =>
                  c.value ===
                  getFieldValue(`${getFieldValue('framework')}.coreConcept`),
              )
              .explanatoryItems.map((item, i) => (
                <li key={uuid()}>{item}</li>
              ))}
          </ul>
        </div>
      )}
      <Form.Item
        dependencies={[
          'framework',
          `${getFieldValue('framework')}.coreConcept`,
        ]}
        label="Subdiscipline"
        name={`${getFieldValue('framework')}.subDiscipline`}
      >
        <Select
          disabled={
            readOnly ||
            !getFieldValue(`${getFieldValue('framework')}.coreConcept`)
          }
          onChange={handleSubDisciplineChange}
          options={
            getFieldValue(`${getFieldValue('framework')}.coreConcept`) &&
            metadataOptions.frameworks
              .find(f => f.value === getFieldValue('framework'))
              .coreConcepts.find(
                c =>
                  c.value ===
                  getFieldValue(`${getFieldValue('framework')}.coreConcept`),
              )
              .subDisciplines.map(p => ({
                label: p.label,
                value: p.value,
              }))
          }
        />
      </Form.Item>
      <Form.Item
        dependencies={[
          'framework',
          `${getFieldValue('framework')}.coreConcept`,
          `${getFieldValue('framework')}.subDiscipline`,
        ]}
        label="Statement"
        name={`${getFieldValue('framework')}.statement`}
      >
        <Select
          disabled={
            readOnly ||
            !getFieldValue(`${getFieldValue('framework')}.coreConcept`) ||
            !getFieldValue(`${getFieldValue('framework')}.subDiscipline`)
          }
          options={
            getFieldValue(`${getFieldValue('framework')}.coreConcept`) &&
            getFieldValue(`${getFieldValue('framework')}.subDiscipline`) &&
            metadataOptions.frameworks
              .find(f => f.value === getFieldValue('framework'))
              .coreConcepts.find(
                c =>
                  c.value ===
                  getFieldValue(`${getFieldValue('framework')}.coreConcept`),
              )
              .subDisciplines.find(
                p =>
                  p.value ===
                  getFieldValue(`${getFieldValue('framework')}.subDiscipline`),
              )
              .statements.map(s => ({
                label: s.label,
                value: s.value,
              }))
          }
        />
      </Form.Item>
    </>
  )

  const renderFrameworkFields = getFieldValue => {
    if (
      getFieldValue('framework') === 'apBiology' ||
      getFieldValue('framework') === 'apEnvironmentalScience'
    ) {
      return renderAPFrameworkFields(getFieldValue)
    }

    if (getFieldValue('framework') === 'visionAndChange') {
      return renderVisionFrameworkFields(getFieldValue)
    }

    return null
  }

  const renderSupplementaryAPFrameworkFields = (getFieldValue, index) => (
    <>
      <Form.Item
        dependencies={['framework']}
        fieldKey={[index, 'unit']}
        label="Framework Unit"
        name={[index, 'unit']}
      >
        <Select
          disabled={readOnly || !getFieldValue('framework')}
          onChange={value =>
            handleSupplementaryFrameworkUnitChange(value, index)
          }
          options={
            getFieldValue('framework')
              ? metadataOptions.frameworks
                  .find(i => i.value === getFieldValue('framework'))
                  .units.map(u => ({
                    label: u.label,
                    value: u.value,
                  }))
              : []
          }
        />
      </Form.Item>

      <Form.Item
        dependencies={['framework', ['supplementaryFields', index, 'unit']]}
        fieldKey={[index, 'frameworkTopic']}
        label="Framework Topic"
        name={[index, 'frameworkTopic']}
      >
        <Select
          disabled={
            readOnly || !getFieldValue(['supplementaryFields', index, 'unit'])
          }
          onChange={value =>
            handleSupplementaryFrameworkTopicChange(value, index)
          }
          options={
            getFieldValue(['supplementaryFields', index, 'unit']) &&
            metadataOptions.frameworks
              .find(i => i.value === getFieldValue('framework'))
              .units.find(
                u =>
                  u.value ===
                  getFieldValue(['supplementaryFields', index, 'unit']),
              )
              .topics.map(t => ({
                label: t.label,
                value: t.value,
              }))
          }
        />
      </Form.Item>

      <Form.Item
        dependencies={[
          'framework',
          ['supplementaryFields', index, 'unit'],
          ['supplementaryFields', index, 'frameworkTopic'],
        ]}
        fieldKey={[index, 'learningObjective']}
        label="Framework Learning Objective"
        name={[index, 'learningObjective']}
      >
        <Select
          disabled={
            readOnly ||
            !getFieldValue(['supplementaryFields', index, 'unit']) ||
            !getFieldValue(['supplementaryFields', index, 'frameworkTopic'])
          }
          onChange={value =>
            handleSupplementaryFrameworkLearningObjectiveChange(value, index)
          }
          options={
            getFieldValue(['supplementaryFields', index, 'unit']) &&
            getFieldValue(['supplementaryFields', index, 'frameworkTopic']) &&
            metadataOptions.frameworks
              .find(i => i.value === getFieldValue('framework'))
              .units.find(
                u =>
                  u.value ===
                  getFieldValue(['supplementaryFields', index, 'unit']),
              )
              .topics.find(
                t =>
                  t.value ===
                  getFieldValue([
                    'supplementaryFields',
                    index,
                    'frameworkTopic',
                  ]),
              )
              .learningObjectives.map(l => ({
                label: l.label,
                value: l.value,
              }))
          }
        />
      </Form.Item>

      <Form.Item
        dependencies={[
          'framework',
          ['supplementaryFields', index, 'unit'],
          ['supplementaryFields', index, 'frameworkTopic'],
          ['supplementaryFields', index, 'learningObjective'],
        ]}
        fieldKey={[index, 'essentialKnowledge']}
        label="Framework Essential Knowledge"
        name={[index, 'essentialKnowledge']}
      >
        <Select
          disabled={
            readOnly ||
            !getFieldValue(['supplementaryFields', index, 'unit']) ||
            !getFieldValue(['supplementaryFields', index, 'frameworkTopic']) ||
            !getFieldValue(['supplementaryFields', index, 'learningObjective'])
          }
          options={
            getFieldValue(['supplementaryFields', index, 'unit']) &&
            getFieldValue(['supplementaryFields', index, 'frameworkTopic']) &&
            getFieldValue([
              'supplementaryFields',
              index,
              'learningObjective',
            ]) &&
            metadataOptions.frameworks
              .find(i => i.value === getFieldValue('framework'))
              .units.find(
                u =>
                  u.value ===
                  getFieldValue(['supplementaryFields', index, 'unit']),
              )
              .topics.find(
                t =>
                  t.value ===
                  getFieldValue([
                    'supplementaryFields',
                    index,
                    'frameworkTopic',
                  ]),
              )
              .learningObjectives.find(
                l =>
                  l.value ===
                  getFieldValue([
                    'supplementaryFields',
                    index,
                    'learningObjective',
                  ]),
              )
              .essentialKnowledge.map(e => ({
                label: e.label,
                value: e.value,
              }))
          }
        />
      </Form.Item>
    </>
  )

  const renderSupplementaryVisionFrameworkFields = (getFieldValue, index) => (
    <>
      <Form.Item
        dependencies={['framework']}
        fieldKey={[index, 'coreConcept']}
        label="Core concept"
        name={[index, 'coreConcept']}
      >
        <Select
          disabled={readOnly || !getFieldValue('framework')}
          onChange={value => handleSupplementaryCoreConceptChange(value, index)}
          options={
            getFieldValue('framework')
              ? metadataOptions.frameworks
                  .find(i => i.value === getFieldValue('framework'))
                  .coreConcepts.map(u => ({
                    label: u.label,
                    value: u.value,
                  }))
              : []
          }
        />
      </Form.Item>
      {getFieldValue(['supplementaryFields', index, 'coreConcept']) && (
        <div>
          <h4>Overarching Principles</h4>
          <ul>
            {metadataOptions.frameworks
              .find(f => f.value === getFieldValue('framework'))
              .coreConcepts.find(
                c =>
                  c.value ===
                  getFieldValue(['supplementaryFields', index, 'coreConcept']),
              )
              .explanatoryItems.map((item, i) => (
                <li key={uuid()}>{item}</li>
              ))}
          </ul>
        </div>
      )}
      <Form.Item
        dependencies={[
          'framework',
          ['supplementaryFields', index, 'coreConcept'],
        ]}
        fieldKey={[index, 'subDiscipline']}
        label="Subdiscipline"
        name={[index, 'subDiscipline']}
      >
        <Select
          disabled={
            readOnly ||
            !getFieldValue(['supplementaryFields', index, 'coreConcept'])
          }
          onChange={value =>
            handleSupplementarySubDisciplineChange(value, index)
          }
          options={
            getFieldValue(['supplementaryFields', index, 'coreConcept']) &&
            metadataOptions.frameworks
              .find(f => f.value === getFieldValue('framework'))
              .coreConcepts.find(
                c =>
                  c.value ===
                  getFieldValue(['supplementaryFields', index, 'coreConcept']),
              )
              .subDisciplines.map(p => ({
                label: p.label,
                value: p.value,
              }))
          }
        />
      </Form.Item>
      <Form.Item
        dependencies={[
          'framework',
          ['supplementaryFields', index, 'coreConcept'],
          ['supplementaryFields', index, 'subDiscipline'],
        ]}
        fieldKey={[index, 'statement']}
        label="Statement"
        name={[index, 'statement']}
      >
        <Select
          disabled={
            readOnly ||
            !getFieldValue(['supplementaryFields', index, 'coreConcept']) ||
            !getFieldValue(['supplementaryFields', index, 'subDiscipline'])
          }
          options={
            getFieldValue(['supplementaryFields', index, 'coreConcept']) &&
            getFieldValue(['supplementaryFields', index, 'subDiscipline']) &&
            metadataOptions.frameworks
              .find(f => f.value === getFieldValue('framework'))
              .coreConcepts.find(
                c =>
                  c.value ===
                  getFieldValue(['supplementaryFields', index, 'coreConcept']),
              )
              .subDisciplines.find(
                p =>
                  p.value ===
                  getFieldValue([
                    'supplementaryFields',
                    index,
                    'subDiscipline',
                  ]),
              )
              .statements.map(s => ({
                label: s.label,
                value: s.value,
              }))
          }
        />
      </Form.Item>
    </>
  )

  const renderSupplementaryFrameworkFields = (getFieldValue, index) => {
    if (
      getFieldValue('framework') === 'apBiology' ||
      getFieldValue('framework') === 'apEnvironmentalScience'
    ) {
      return renderSupplementaryAPFrameworkFields(getFieldValue, index)
    }

    if (getFieldValue('framework') === 'visionAndChange') {
      return renderSupplementaryVisionFrameworkFields(getFieldValue, index)
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
          label="Topic"
          name="topic"
          rules={[{ required: true, message: 'Topic is required' }]}
        >
          <Select
            allowClear
            disabled={readOnly}
            onChange={handleTopicSelectChange}
            options={metadataOptions.topics.map(t => ({
              label: t.label,
              value: t.value,
            }))}
          />
        </Form.Item>

        <Form.Item dependencies={['topic']} noStyle>
          {({ getFieldValue }) => {
            return (
              <Form.Item
                label="Subtopic"
                name="subTopic"
                rules={[{ required: true, message: 'Subtopic is required' }]}
              >
                <Select
                  disabled={readOnly || !getFieldValue('topic')}
                  options={
                    getFieldValue('topic') &&
                    metadataOptions.topics.find(
                      t => t.value === getFieldValue('topic'),
                    ).subTopics
                  }
                />
              </Form.Item>
            )
          }}
        </Form.Item>
        <Form.Item
          label="Framework"
          name="framework"
          rules={[{ required: true, message: 'Framework is required' }]}
        >
          <Select
            allowClear
            disabled={readOnly}
            onChange={handleFrameworkChange}
            options={metadataOptions.frameworks.map(i => ({
              label: i.label,
              value: i.value,
            }))}
          />
        </Form.Item>
        <Form.Item dependencies={['framework']} noStyle shouldUpdate>
          {({ getFieldValue }) => renderFrameworkFields(getFieldValue)}
        </Form.Item>
        <Form.List
          dependencies={['framework']}
          name="supplementaryFields"
          noStyle
        >
          {(_, { add, remove }) => (
            <React.Fragment key={uuid()}>
              {supplementaryFieldsIndexes.map(index => (
                <React.Fragment key={`supplementaryField-${index}`}>
                  <Form.Item
                    fieldKey={[index, 'topic']}
                    label="Topic"
                    name={[index, 'topic']}
                  >
                    <Select
                      allowClear
                      disabled={readOnly}
                      onChange={value =>
                        handleSupplementaryTopicSelectChange(index, value)
                      }
                      options={metadataOptions.topics.map(t => ({
                        label: t.label,
                        value: t.value,
                      }))}
                    />
                  </Form.Item>
                  <Form.Item
                    dependencies={[['supplementaryFields', index, 'topic']]}
                    noStyle
                  >
                    {({ getFieldValue }) => {
                      return (
                        <Form.Item
                          fieldKey={[index, 'subTopic']}
                          label="Subtopic"
                          name={[index, 'subTopic']}
                        >
                          <Select
                            disabled={
                              readOnly ||
                              !getFieldValue([
                                'supplementaryFields',
                                index,
                                'topic',
                              ])
                            }
                            options={
                              getFieldValue([
                                'supplementaryFields',
                                index,
                                'topic',
                              ]) &&
                              metadataOptions.topics.find(
                                t =>
                                  t.value ===
                                  getFieldValue([
                                    'supplementaryFields',
                                    index,
                                    'topic',
                                  ]),
                              ).subTopics
                            }
                          />
                        </Form.Item>
                      )
                    }}
                  </Form.Item>
                  <Form.Item dependencies={['framework']} noStyle>
                    {({ getFieldValue }) =>
                      renderSupplementaryFrameworkFields(getFieldValue, index)
                    }
                  </Form.Item>
                </React.Fragment>
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
            </React.Fragment>
          )}
        </Form.List>
        <Form.Item label="Keywords" name="keywords">
          <Select disabled={readOnly} mode="tags" open={false} />
        </Form.Item>

        <StyledFormItem
          label={
            <LabelWrapper>
              <span>Biointeractive resources</span>
              <a
                href="https://www.biointeractive.org/classroom-resources"
                rel="noreferrer"
                target="_blank"
              >
                View resources
              </a>
            </LabelWrapper>
          }
          name="biointeractiveResources"
        >
          <Input disabled={readOnly} />
        </StyledFormItem>

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
          <Select
            disabled={readOnly}
            options={metadataOptions.blooms.cognitive}
          />
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
          <Select
            disabled={readOnly}
            options={metadataOptions.blooms.affective}
          />
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
          <Select
            disabled={readOnly}
            options={metadataOptions.blooms.psychomotor}
          />
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

  // TO DO - provide valid shape
  /* eslint-disable-next-line react/forbid-prop-types */
  initialValues: PropTypes.object,
}

Metadata.defaultProps = {
  onAutoSave: null,
  initialValues: null,
}

export default Metadata
