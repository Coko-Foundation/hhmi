import React from 'react'
import { CustomSelect } from 'ui'

export const Base = () => (
  <CustomSelect
    options={[
      { label: 'opt 1', value: 'opt1' },
      { label: 'opt 2', value: 'opt2' },
      { label: 'opt 3', value: 'opt3' },
      { label: 'opt 4', value: 'opt4' },
      { label: 'opt 5', value: 'opt5' },
    ]}
    placeholder="Select an option"
  />
)

export const PrerenderedListbox = () => (
  <CustomSelect
    options={[
      { label: 'opt 1', value: 'opt1' },
      { label: 'opt 2', value: 'opt2' },
      { label: 'opt 3', value: 'opt3' },
      { label: 'opt 4', value: 'opt4' },
      { label: 'opt 5', value: 'opt5' },
    ]}
    placeholder="Select an option"
    preRenderOptionList
  />
)

export const MultiSelect = () => (
  <CustomSelect
    mode="multiple"
    options={[
      { label: 'opt 1', value: 'opt1' },
      { label: 'opt 2', value: 'opt2' },
      { label: 'opt 3', value: 'opt3' },
      { label: 'opt 4', value: 'opt4' },
      { label: 'opt 5', value: 'opt5' },
    ]}
    placeholder="Select an option"
    preRenderOptionList
  />
)

export const Tags = () => (
  <CustomSelect mode="tags" open={false} placeholder="Enter tags" />
)

export const WrapLongOptionText = () => {
  return (
    <CustomSelect
      options={[
        {
          value: 'longText',
          label:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minimveniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex eacommodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
      ]}
      placeholder="Select option"
      wrapOptionText
    />
  )
}

export default {
  component: CustomSelect,
  title: 'common/CustomSelect',
}
