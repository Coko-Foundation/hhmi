/* eslint-disable no-console */
import { uuid } from '@coko/client'
import React from 'react'
// import { lorem } from 'faker'

import { ChatInput } from 'ui'

const participants = [
  {
    display: 'grigor',
    id: uuid(),
  },
  {
    id: uuid(),
    display: 'natasha',
  },
]

export const Base = () => {
  const handleSend = (content, mentions) => {
    // eslint-disable-next-line no-console
    console.log('message::', content)
    console.log('mentions::', mentions)
  }

  return <ChatInput onSend={handleSend} participants={participants} />
}

export default {
  component: ChatInput,
  title: 'Chat/Chat Input',
}
