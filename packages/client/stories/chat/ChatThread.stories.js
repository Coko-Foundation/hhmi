import React from 'react'
import { lorem, name } from 'faker'

import { ChatThread } from 'ui'
import { createData, noop, randomPick } from '../_helpers'

const createMessages = n =>
  createData(n, i => ({
    content: lorem.sentences(2),
    date: new Date().toISOString(),
    own: randomPick([true, false]),
    user: name.findName(),
  }))

const messages = createMessages(5)

export const Base = () => <ChatThread messages={messages} onSend={noop} />
export const Empty = () => <ChatThread onSend={noop} />

export default {
  component: ChatThread,
  title: 'Chat/Chat Thread',
}
