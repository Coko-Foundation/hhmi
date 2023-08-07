import React, { useState } from 'react'

import { ComplexItemSetForm } from 'ui'

export const Base = args => {
  const [loading, setLoading] = useState(false)
  const [submissionMessage, setSubmissionMessage] = useState(null)
  const [submissionStatus, setSubmissionStatus] = useState(null)

  const handleSave = data => {
    // eslint-disable-next-line no-console
    console.log(data)
    setLoading(true)
    setTimeout(() => {
      setSubmissionMessage('Saved')
      setSubmissionStatus('success')
      setLoading(false)
    }, [1000])
  }

  return (
    <ComplexItemSetForm
      loadingSave={loading}
      onSave={handleSave}
      submissionMessage={submissionMessage}
      submissionStatus={submissionStatus}
      {...args}
    />
  )
}

export default {
  component: ComplexItemSetForm,
  title: 'Question/ComplexItemSetForm',
}
