import React from 'react'
import { lorem, name } from 'faker'

import { ChatMessage } from 'ui'

const date = new Date().toISOString()

export const Base = args => (
  <ChatMessage
    {...args}
    content={lorem.sentences(2)}
    date={date}
    user={name.findName()}
  />
)

export const Own = args => (
  <ChatMessage content={lorem.sentences(2)} date={date} own />
)

export const Short = args => (
  <ChatMessage content={lorem.words(1)} date={date} user={name.findName()} />
)

export const ShortOwn = args => (
  <ChatMessage content={lorem.words(1)} date={date} own />
)

export default {
  component: ChatMessage,
  title: 'Chat/Chat Message',
}
