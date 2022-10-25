import React from 'react'
import { datatype, lorem, name } from 'faker'
import { range } from 'lodash'

import { CustomSelect } from 'ui'

const makeOptions = n =>
  range(n).map(i => ({
    label: name.findName(),
    value: datatype.uuid(),
  }))

const makeLongOptions = n =>
  range(n).map(i => ({
    label: lorem.sentences(5),
    value: datatype.uuid(),
  }))

const options = makeOptions(10)

const groupedOptions = [
  {
    label: 'Winners',
    options: makeOptions(4),
  },
  {
    label: 'Losers',
    options: makeOptions(4),
  },
]

const longOptions = makeLongOptions(10)

export const Base = () => (
  <>
    <p>
      Renders the <code>[role=listbox]</code> element from the start. This can
      be turned off by passing <code>preRenderOptionList=false</code> (the
      previous behavior, as in antd Select) but why would you
    </p>
    <CustomSelect
      options={options}
      placeholder="Select an option (listbox prerendered)"
      showSearch
    />
  </>
)

export const PrerenderListbox = args => (
  <>
    <p>
      Renders the <code>[role=listbox]</code> element from the start. This can
      be turned off by passing <code>preRenderOptionList=false</code> (the
      previous behavior, as in antd Select) but why would you
    </p>
    <CustomSelect
      options={options}
      placeholder="Select an option (listbox prerendered)"
      showSearch
      {...args}
    />
  </>
)

PrerenderListbox.args = {
  preRenderOptionList: true,
}

export const WithGroups = () => (
  <CustomSelect options={groupedOptions} placeholder={lorem.words(4)} />
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
      options={longOptions}
      placeholder="Select option"
      wrapOptionText
    />
  )
}

export const MultiWithMaxCount = () => (
  <>
    <p>Select a maximum of 3 options</p>
    <CustomSelect
      maxCount={3}
      mode="multiple"
      options={options}
      placeholder={lorem.words(4)}
    />
  </>
)

export default {
  component: CustomSelect,
  title: 'common/CustomSelect',
}
