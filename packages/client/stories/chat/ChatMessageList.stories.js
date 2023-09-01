import React, { useState } from 'react'

import { ChatMessageList } from 'ui'
import { createMessages } from '../../app/utilities/_helpers'

export const Base = args => {
  // for reverse infinity scroll, we want the x latest messages, but ordered from the oldest to the newest
  const [messages, setMessages] = useState(createMessages(10))

  const handleFetchMore = async () => {
    // eslint-disable-next-line no-promise-executor-return
    const mockDelay = time => new Promise(resolve => setTimeout(resolve, time))
    await mockDelay(1000)
    // when updating messages, append the next y older messages, themselves ordered from oldest to newest, at the start of the messages array
    setMessages(curMessages => [...createMessages(5), ...curMessages])
  }

  return (
    <div style={{ height: 400 }}>
      <ChatMessageList
        hasMore={messages.length > 0}
        messages={messages}
        onFetchMore={handleFetchMore}
        {...args}
      />
    </div>
  )
}

export const Empty = () => <ChatMessageList />

export default {
  component: ChatMessageList,
  title: 'Chat/Chat Message List',
}
