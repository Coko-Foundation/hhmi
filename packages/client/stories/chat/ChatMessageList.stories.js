import React from 'react'
import { lorem, name } from 'faker'

import { ChatMessageList } from 'ui'
import { createData, randomPick } from '../_helpers'

const createMessages = n =>
  createData(n, i => ({
    content: lorem.sentences(2),
    date: new Date().toISOString(),
    own: randomPick([true, false]),
    user: name.findName(),
  }))

const messages = createMessages(10)

export const Base = () => <ChatMessageList messages={messages} />

export const Empty = () => <ChatMessageList />

export default {
  component: ChatMessageList,
  title: 'Chat/Chat Message List',
}
