import React, { useState } from 'react'
import { lorem } from 'faker'

import { Checkbox, Form } from 'ui'

const label = lorem.words(4)

export const Base = () => {
  const [checked, setChecked] = useState(false)
  const handleChange = () => setChecked(!checked)

  return (
    <Checkbox checked={checked} onChange={handleChange}>
      {label}
    </Checkbox>
  )
}

export const SingleCheckboxValidationInsideForm = () => {
  return (
    // eslint-disable-next-line no-alert
    <Form onFinish={() => alert('Checkbox validation passed')}>
      <Form.Item
        name="requiredCheckbox"
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
        <Checkbox aria-label="You have to check this checkbox">
          Check the checkbox
        </Checkbox>
      </Form.Item>

      <button type="submit">Submit</button>
    </Form>
  )
}

export default {
  component: Checkbox,
  title: 'Common/Checkbox',
}
