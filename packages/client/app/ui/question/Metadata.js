import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { grid } from '@coko/client'

import { Button, Form, Input, Select } from '../common'
import metadataOptions from './metadata'

const Wrapper = styled.div``

const InputWithButtonWrapper = styled.div`
  display: flex;

  > div {
    flex-grow: 1;
    margin-right: ${grid(1)};
  }
`

const Metadata = props => {
  const { className, onAutoSave } = props

  const [form] = Form.useForm()

  /**
   * STATE MANAGEMENT
   */

  const [topic, setTopic] = useState(null)
  const [framework, setFramework] = useState(null)
  const [frameworkUnit, setFrameworkUnit] = useState(null)
  const [frameworkTopic, setFrameworkTopic] = useState(null)

  const [frameworkLearningObjective, setFrameworkLearningObjective] = useState(
    null,
  )

  const [coreConcept, setCoreConcept] = useState(null)
  const [principle, setPrinciple] = useState(null)

  const handleTopicSelectChange = val => {
    setTopic(val)
    form.setFieldsValue({
      subTopic: null,
    })
  }

  const handleFrameworkChange = val => {
    setFramework(val)

    setFrameworkUnit(null)
    setFrameworkTopic(null)
    setFrameworkLearningObjective(null)

    setCoreConcept(null)
    setPrinciple(null)

    if (val !== 'apBiology') {
      form.setFieldsValue({
        'apBiology.unit': null,
        'apBiology.topic': null,
        'apBiology.learningObjective': null,
        'apBiology.essentialKnowledge': null,
      })
    }

    if (val !== 'apEnvironmentalScience') {
      form.setFieldsValue({
        'apEnvironmentalScience.unit': null,
        'apEnvironmentalScience.topic': null,
        'apEnvironmentalScience.learningObjective': null,
        'apBiology.essentialKnowledge': null,
      })
    }

    if (val !== 'visionAndChange') {
      form.setFieldsValue({
        'visionAndChange.coreConcept': null,
        'visionAndChange.principle': null,
        'visionAndChange.subDiscipline': null,
      })
    }
  }

  const handleFrameworkUnitChange = val => {
    setFrameworkUnit(val)

    setFrameworkTopic(null)
    setFrameworkLearningObjective(null)

    if (framework === 'apBiology') {
      form.setFieldsValue({
        'apBiology.topic': null,
        'apBiology.learningObjective': null,
        'apBiology.essentialKnowledge': null,
      })
    }

    if (framework === 'apEnvironmentalScience') {
      form.setFieldsValue({
        'apEnvironmentalScience.topic': null,
        'apEnvironmentalScience.learningObjective': null,
        'apEnvironmentalScience.essentialKnowledge': null,
      })
    }
  }

  const handleFrameworkTopicChange = val => {
    setFrameworkTopic(val)

    setFrameworkLearningObjective(null)

    if (framework === 'apBiology') {
      form.setFieldsValue({
        'apBiology.learningObjective': null,
        'apBiology.essentialKnowledge': null,
      })
    }

    if (framework === 'apEnvironmentalScience') {
      form.setFieldsValue({
        'apEnvironmentalScience.learningObjective': null,
        'apEnvironmentalScience.essentialKnowledge': null,
      })
    }
  }

  const handleFrameworkLearningObjectiveChange = val => {
    setFrameworkLearningObjective(val)

    if (framework === 'apBiology') {
      form.setFieldsValue({
        'apBiology.essentialKnowledge': null,
      })
    }

    if (framework === 'apEnvironmentalScience') {
      form.setFieldsValue({
        'apEnvironmentalScience.essentialKnowledge': null,
      })
    }
  }

  const handleCoreConceptChange = val => {
    setCoreConcept(val)

    setPrinciple(null)

    form.setFieldsValue({
      'visionAndChange.principle': null,
      'visionAndChange.subDiscipline': null,
    })
  }

  const handlePrincipleChange = val => {
    setPrinciple(val)

    form.setFieldsValue({
      'visionAndChange.subDiscipline': null,
    })
  }

  /**
   * RENDER
   */

  return (
    <Wrapper className={className}>
      <Form autoSave form={form} layout="vertical" onAutoSave={onAutoSave}>
        {/* TOPIC */}

        <Form.Item
          label="Topic"
          name="topic"
          rules={[{ required: true, message: 'Topic is required' }]}
        >
          <Select
            allowClear
            onChange={handleTopicSelectChange}
            options={metadataOptions.topics.map(t => ({
              label: t.label,
              value: t.value,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Subtopic"
          name="subTopic"
          rules={[{ required: true, message: 'Subtopic is required' }]}
        >
          <Select
            disabled={!topic}
            options={
              topic &&
              metadataOptions.topics.find(t => t.value === topic).subTopics
            }
          />
        </Form.Item>

        <Form.Item label="Keywords" name="keywords">
          <Select mode="tags" open={false} />
        </Form.Item>

        <Form.Item
          label="Biointeractive resources"
          name="biointeractiveResources"
        >
          <InputWithButtonWrapper>
            <Input />
            <Button type="primary">Add link</Button>
          </InputWithButtonWrapper>
        </Form.Item>

        {/* BLOOMS */}

        <Form.Item
          label="Bloom's cognitive level"
          name="cognitiveLevel"
          rules={[
            { required: true, message: "Bloom's cognitive level is required" },
          ]}
        >
          <Select options={metadataOptions.blooms.cognitive} />
        </Form.Item>

        <Form.Item
          label="Bloom's affective level"
          name="affectiveLevel"
          rules={[
            { required: true, message: "Bloom's affective level is required" },
          ]}
        >
          <Select options={metadataOptions.blooms.affective} />
        </Form.Item>

        <Form.Item
          label="Bloom's psychomotor level"
          name="psychomotorLevel"
          rules={[
            {
              required: true,
              message: "Bloom's psychomotor level is required",
            },
          ]}
        >
          <Select options={metadataOptions.blooms.psychomotor} />
        </Form.Item>

        <Form.Item label="Reading level" name="readingLevel">
          <Select options={[]} />
        </Form.Item>

        {/* FRAMEWORKS */}

        <Form.Item label="Framework" name="framework">
          <Select
            onChange={handleFrameworkChange}
            options={metadataOptions.frameworks.map(i => ({
              label: i.label,
              value: i.value,
            }))}
          />
        </Form.Item>

        {(framework === 'apBiology' ||
          framework === 'apEnvironmentalScience') && (
          <>
            <Form.Item label="Framework Unit" name={`${framework}.unit`}>
              <Select
                onChange={handleFrameworkUnitChange}
                options={metadataOptions.frameworks
                  .find(i => i.value === framework)
                  .units.map(u => ({
                    label: u.label,
                    value: u.value,
                  }))}
              />
            </Form.Item>

            <Form.Item label="Framework Topic" name={`${framework}.topic`}>
              <Select
                disabled={!frameworkUnit}
                onChange={handleFrameworkTopicChange}
                options={
                  frameworkUnit &&
                  metadataOptions.frameworks
                    .find(i => i.value === framework)
                    .units.find(u => u.value === frameworkUnit)
                    .topics.map(t => ({
                      label: t.label,
                      value: t.value,
                    }))
                }
              />
            </Form.Item>

            <Form.Item
              label="Framework Learning Objective"
              name={`${framework}.learningObjective`}
            >
              <Select
                disabled={!frameworkUnit || !frameworkTopic}
                onChange={handleFrameworkLearningObjectiveChange}
                options={
                  frameworkUnit &&
                  frameworkTopic &&
                  metadataOptions.frameworks
                    .find(i => i.value === framework)
                    .units.find(u => u.value === frameworkUnit)
                    .topics.find(t => t.value === frameworkTopic)
                    .learningObjectives.map(l => ({
                      label: l.label,
                      value: l.value,
                    }))
                }
              />
            </Form.Item>

            <Form.Item
              label="Framework Essential Knowledge"
              name={`${framework}.essentialKnowledge`}
            >
              <Select
                disabled={
                  !frameworkUnit ||
                  !frameworkTopic ||
                  !frameworkLearningObjective
                }
                options={
                  frameworkUnit &&
                  frameworkTopic &&
                  frameworkLearningObjective &&
                  metadataOptions.frameworks
                    .find(i => i.value === framework)
                    .units.find(u => u.value === frameworkUnit)
                    .topics.find(t => t.value === frameworkTopic)
                    .learningObjectives.find(
                      l => l.value === frameworkLearningObjective,
                    )
                    .essentialKnowledge.map(e => ({
                      label: e.label,
                      value: e.value,
                    }))
                }
              />
            </Form.Item>
          </>
        )}

        {framework === 'visionAndChange' && (
          <>
            <Form.Item label="Core concept" name="visionAndChange.coreConcept">
              <Select
                onChange={handleCoreConceptChange}
                options={metadataOptions.frameworks
                  .find(f => f.value === 'visionAndChange')
                  .coreConcepts.map(c => ({
                    label: c.label,
                    value: c.value,
                  }))}
              />
            </Form.Item>

            <Form.Item label="Principles" name="visionAndChange.principle">
              <Select
                disabled={!coreConcept}
                onChange={handlePrincipleChange}
                options={
                  coreConcept &&
                  metadataOptions.frameworks
                    .find(f => f.value === 'visionAndChange')
                    .coreConcepts.find(c => c.value === coreConcept)
                    .principles.map(p => ({
                      label: p.label,
                      value: p.value,
                    }))
                }
              />
            </Form.Item>

            <Form.Item
              label="Subdiscipline"
              name="visionAndChange.subDiscipline"
            >
              <Select
                disabled={!coreConcept || !principle}
                options={
                  coreConcept &&
                  principle &&
                  metadataOptions.frameworks
                    .find(f => f.value === 'visionAndChange')
                    .coreConcepts.find(c => c.value === coreConcept)
                    .principles.find(p => p.value === principle)
                    .subDisciplines.map(s => ({
                      label: s.label,
                      value: s.value,
                    }))
                }
              />
            </Form.Item>

            {/* TO DO -- core competencies */}
          </>
        )}
      </Form>
    </Wrapper>
  )
}

Metadata.propTypes = {
  onAutoSave: PropTypes.func,
}

Metadata.defaultProps = {
  onAutoSave: null,
}

export default Metadata
