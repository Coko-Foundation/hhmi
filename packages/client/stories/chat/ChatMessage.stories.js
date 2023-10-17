import React from 'react'
import { lorem, name } from 'faker'

import { ChatMessage } from 'ui'

const date = new Date().toISOString()

const attachments = [
  {
    name: 'hhmi',
    url: 'https://coko.foundation/images/uploads/HHMI.png',
  },
  {
    name: 'wax',
    url: 'https://coko.foundation/images/uploads/Wax.png',
  },
  {
    name: 'coko',
    url: 'https://gitlab.coko.foundation/uploads/-/system/appearance/header_logo/1/dandelion.png',
  },
  {
    name: 'Coko docs',
    url: 'https://coko.foundation/images/press/cokodocs.png',
  },
]

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

export const Attachments = args => (
  <ChatMessage attachments={attachments} content={lorem.sentences(2)} own />
)

export const AttachmentsOwn = args => (
  <ChatMessage attachments={attachments} content={lorem.sentences(2)} />
)

export default {
  component: ChatMessage,
  title: 'Chat/Chat Message',
}
