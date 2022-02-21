/* eslint-disable no-console */
import React from 'react'
// import { lorem } from 'faker'

import { Question } from 'ui'

const options = {
  topic: 'biochemistryMolecularBiology',
}

export const Base = () => (
  <Question
    initialMetadataValues={options}
    loading={false}
    onClickBackButton={() => console.log('back')}
    onEditorContentAutoSave={console.log('editor auto save')}
    onQuestionSubmit={console.log('submit question')}
    questionAgreedTc={false}
    submitting={false}
  />
)

export default {
  component: Question,
  title: 'Question/Question',
}
