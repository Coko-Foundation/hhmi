import React from 'react'
// import { lorem } from 'faker'

import { ChatInput } from 'ui'

export const Base = () => (
  <ChatInput
    onSend={incoming => {
      /* eslint-disable-next-line no-console */
      console.log('send this:', incoming)
    }}
  />
)

export default {
  component: ChatInput,
  title: 'Chat/Chat Input',
}
