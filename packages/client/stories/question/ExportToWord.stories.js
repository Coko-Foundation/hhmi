/* eslint-disable no-console */

import React from 'react'

import ExportToWordButton from '../../app/ui/question/ExportToWordButton'

export const Base = args => (
  <ExportToWordButton onExport={options => console.log(options)} {...args} />
)

Base.args = {
  showMetadataOption: true,
  loading: false,
}

export default {
  component: ExportToWordButton,
  title: 'Question/ExportToWordButton',
}
