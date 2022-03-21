import React, { useState } from 'react'
import { lorem, name } from 'faker'
import { range } from 'lodash'

import { AutoComplete } from 'ui'

const makeOptions = n =>
  range(n).map(() => ({
    value: name.findName(),
  }))

const originalOptions = makeOptions(100)

export const Base = () => {
  const [options, setOptions] = useState(originalOptions)

  const onSearch = searchValue => {
    const regex = new RegExp(searchValue, 'i')

    const newOptions = originalOptions.filter(o => o.value.match(regex))

    setOptions(newOptions)
  }

  return (
    <AutoComplete
      onSearch={onSearch}
      options={options}
      placeholder={lorem.words(4)}
    />
  )
}

export default {
  component: AutoComplete,
  title: 'Common/AutoComplete',
}
