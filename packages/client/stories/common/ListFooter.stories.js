import React, { useState } from 'react'

import { ListFooter, Button } from 'ui'

const BulkAction = (
  // eslint-disable-next-line no-console
  <Button onClick={() => console.log('bulk action')} type="primary">
    Bulk action
  </Button>
)

export const Base = args => {
  const { pagination } = args
  const { total, pageSize } = pagination

  const [paginationCurrent, setPaginationCurrent] = useState(1)
  const [paginationSize, setPaginationSize] = useState(pageSize)

  return (
    <div>
      <div>Current page: {paginationCurrent}</div>
      <div>Page size: {paginationSize}</div>
      <ListFooter
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...args}
        pagination={{
          current: paginationCurrent,
          pageSize: paginationSize,
          setPaginationCurrent,
          setPaginationSize,
          total,
        }}
      />
    </div>
  )
}

Base.args = {
  pagination: {
    total: 33,
    pageSize: 10,
  },
  bulkAction: BulkAction,
}

export default {
  component: ListFooter,
  title: 'Common/ListFooter',
}
