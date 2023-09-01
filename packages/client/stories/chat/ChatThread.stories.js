import React from 'react'
import { name } from 'faker'

import { ChatThread } from 'ui'
import { createMessages, noop } from '../../app/utilities/_helpers'

export const Base = args => {
  const [messages, setMessages] = React.useState(createMessages(20))
  const [announcementText, setAnnouncementText] = React.useState('')

  const handleSend = content => {
    const msg = {
      content,
      date: new Date().toISOString(),
      own: true,
      user: name.findName(),
    }

    setMessages(curMessages => [...curMessages, msg])
    setAnnouncementText(`you said ${content}`)
  }

  const handleFetchMoreMessage = async () => {
    setAnnouncementText(null)

    // eslint-disable-next-line no-promise-executor-return
    const mockDelay = time => new Promise(resolve => setTimeout(resolve, time))
    await mockDelay(1000)
    const prevMessages = createMessages(10)
    setMessages(curMessages => [...prevMessages, ...curMessages])
    setAnnouncementText(`Loaded ${prevMessages.length}  previous messages`)
  }

  return (
    <div style={{ height: '70vh' }}>
      <ChatThread
        announcementText={announcementText}
        hasMore={messages.length < 50}
        infiniteScroll={false}
        messages={messages}
        onFetchMore={handleFetchMoreMessage}
        onSendMessage={handleSend}
        {...args}
      />
    </div>
  )
}

export const Empty = () => <ChatThread onSendMessage={noop} />

export default {
  component: ChatThread,
  title: 'Chat/Chat Thread',
}
