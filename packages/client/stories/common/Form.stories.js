/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react'
import { lorem } from 'faker'
import styled from 'styled-components'

import {
  Button,
  Checkbox,
  CheckboxGroup,
  Form,
  Input,
  Ribbon,
  Paragraph,
} from 'ui'

export const Base = args => (
  <Form layout="vertical" {...args}>
    <Form.Item
      hasFeedback
      label="Name"
      name="name"
      rules={[{ required: true, message: 'Cannot submit without a name' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Email"
      name="email"
      rules={[
        { required: true, message: 'Cannot submit without an email' },
        { type: 'email', message: 'This is not a valid email' },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Do it"
      name="doIt"
      rules={[
        {
          validator: (_, value) =>
            value
              ? Promise.resolve()
              : Promise.reject(new Error('This checkbox is required')),
        },
      ]}
      valuePropName="checked"
    >
      <Checkbox>Do it man</Checkbox>
    </Form.Item>

    <Form.Item
      label="Choose one"
      name="chooseOne"
      rules={[{ required: true, message: 'Must choose one' }]}
    >
      <CheckboxGroup
        options={[
          {
            label: 'Choose this',
            value: '1',
          },
          {
            label: 'Choose that',
            value: '2',
          },
          {
            label: 'Choose the other one',
            value: '3',
          },
        ]}
        vertical
      />
    </Form.Item>

    <Button htmlType="submit" type="primary">
      Submit
    </Button>
  </Form>
)

Base.args = {
  ribbonMessage: lorem.sentence(),
}

export const Failed = () => (
  <Form
    layout="vertical"
    ribbonMessage={lorem.sentence()}
    submissionStatus="error"
  >
    <Form.Item
      hasFeedback
      label="Name"
      name="name"
      rules={[{ required: true, message: 'Cannot submit without a name' }]}
    >
      <Input />
    </Form.Item>

    <Button htmlType="submit" type="primary">
      Submit
    </Button>
  </Form>
)

export const Succeeded = () => (
  <Form
    layout="vertical"
    ribbonMessage={lorem.sentence()}
    submissionStatus="success"
  >
    <Form.Item
      hasFeedback
      label="Name"
      name="name"
      rules={[{ required: true, message: 'Cannot submit without a name' }]}
    >
      <Input />
    </Form.Item>

    <Button htmlType="submit" type="primary">
      Submit
    </Button>
  </Form>
)

export const FailedRibbonAtTheBottom = () => (
  <Form
    layout="vertical"
    ribbonMessage={lorem.sentence()}
    ribbonPosition="bottom"
    submissionStatus="error"
  >
    <Form.Item
      hasFeedback
      label="Name"
      name="name"
      rules={[{ required: true, message: 'Cannot submit without a name' }]}
    >
      <Input />
    </Form.Item>

    <Button htmlType="submit" type="primary">
      Submit
    </Button>
  </Form>
)

export const Autosave = () => {
  // const [form] = Form.useForm()

  const [saved, setSaved] = useState(false)

  const handleAutoSave = vals => {
    // eslint-disable-next-line no-console
    console.log('autosaving...', vals)

    /**
     * The demo can be a little flaky if you type while the ribbon is already in
     * saved state. That's because of the demo (the timeout being completely
     * arbitrary). The Form component seems to be working fine. Comment out the
     * next two lines and check the console for a more realistic demo.
     */
    setSaved(true)
    setTimeout(() => setSaved(false), 1000)
  }

  return (
    <>
      <Ribbon status={saved ? 'success' : null}>
        {saved ? 'Autosaved!' : 'Idle'}
      </Ribbon>

      <Paragraph>Ribbon for demo purposes only</Paragraph>

      <Form
        autoSave
        // form={form}
        onAutoSave={handleAutoSave}
      >
        <Form.Item label="Field" name="field">
          <Input placeholder="Say something" />
        </Form.Item>
      </Form>
    </>
  )
}

const FormWrapper = styled.div`
  border: 1px solid gray;
  height: 200px;
  margin-bottom: 30px;
  overflow-y: scroll;
  padding: 20px;
`

export const FocusVsNoFocusOnError = () => {
  return (
    <>
      <FormWrapper>
        <Form layout="vertical">
          <p>
            Form 1: Error field will be focused when validation fails on submit
            (default behavior)
          </p>
          <Form.Item
            hasFeedback
            label="Name"
            name="name1"
            rules={[
              { required: true, message: 'Cannot submit without a name' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email1"
            rules={[
              { required: true, message: 'Cannot submit without an email' },
              { type: 'email', message: 'This is not a valid email' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Do it"
            name="doIt1"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error('This checkbox is required')),
              },
            ]}
            valuePropName="checked"
          >
            <Checkbox>Do it man</Checkbox>
          </Form.Item>

          <Form.Item
            label="Choose one"
            name="chooseOne1"
            rules={[{ required: true, message: 'Must choose one' }]}
          >
            <CheckboxGroup
              options={[
                {
                  label: 'Choose this',
                  value: '1',
                },
                {
                  label: 'Choose that',
                  value: '2',
                },
                {
                  label: 'Choose the other one',
                  value: '3',
                },
              ]}
              vertical
            />
          </Form.Item>

          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form>
      </FormWrapper>
      <FormWrapper>
        <Form layout="vertical" scrollErrorIntoView={false}>
          <p>
            Form 2: Error field will not be focused when validation fails on
            submit, because{' '}
            <strong>
              <em>scrollErrorIntoView</em>
            </strong>{' '}
            has been set to{' '}
            <strong>
              <em>false</em>
            </strong>
          </p>
          <Form.Item
            hasFeedback
            label="Name"
            name="name"
            rules={[
              { required: true, message: 'Cannot submit without a name' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Cannot submit without an email' },
              { type: 'email', message: 'This is not a valid email' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Do it"
            name="doIt"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error('This checkbox is required')),
              },
            ]}
            valuePropName="checked"
          >
            <Checkbox>Do it man</Checkbox>
          </Form.Item>

          <Form.Item
            label="Choose one"
            name="chooseOne"
            rules={[{ required: true, message: 'Must choose one' }]}
          >
            <CheckboxGroup
              options={[
                {
                  label: 'Choose this',
                  value: '1',
                },
                {
                  label: 'Choose that',
                  value: '2',
                },
                {
                  label: 'Choose the other one',
                  value: '3',
                },
              ]}
              vertical
            />
          </Form.Item>

          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form>
      </FormWrapper>
    </>
  )
}

export const RunFunctionWhenValidationFails = () => {
  const onFinishFailed = () => {
    // eslint-disable-next-line no-alert
    alert('Submission failed!')
  }

  return (
    <Form layout="vertical" onFinishFailed={onFinishFailed}>
      <Form.Item
        hasFeedback
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Cannot submit without a name' }]}
      >
        <Input />
      </Form.Item>

      <Button htmlType="submit" type="primary">
        Submit
      </Button>
    </Form>
  )
}

export default {
  component: Form,
  title: 'Common/Form',
  argTypes: {
    feedbackComponent: {
      control: {
        disable: true,
      },
    },
  },
}
