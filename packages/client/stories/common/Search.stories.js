import React, { useState } from 'react'
import { lorem } from 'faker'

import { Search } from 'ui'

export const Base = () => {
  const [loading, setLoading] = useState(false)

  const handleChange = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <Search
      loading={loading}
      onSearch={handleChange}
      placeholder={lorem.words(4)}
    />
  )
}

export const Plain = () => <Search />
export const Loading = () => <Search loading />

export default {
  component: Search,
  title: 'Common/Search',
}
