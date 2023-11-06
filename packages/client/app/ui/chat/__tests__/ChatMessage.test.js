import React from 'react'
import ChatMessage from '../ChatMessage'
import { axe, render, renderer, waitFor } from '../../../testUtils'

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

const MockChatMessage = props => {
  return (
    <ChatMessage
      content="Reprehenderit quia praesentium non itaque ea et quia ut ab. Molestias et rem distinctio vel voluptatibus ratione ut."
      date={new Date().toISOString()}
      {...props}
    />
  )
}

describe('ChatMessage', () => {
  it('matches snaphot', () => {
    const ChatMessageComponent = renderer.create(<MockChatMessage />).toJSON()
    expect(ChatMessageComponent).toMatchSnapshot()
  })

  it('displays content and  date in correct format', () => {
    const today = new Date()

    const threeDaysAgo = new Date(
      today.setDate(today.getDate() - 3),
    ).toISOString()

    const { getByText } = render(
      <MockChatMessage content="hey there!" date={threeDaysAgo} />,
    )

    const date = getByText('3 days ago')
    const content = getByText('hey there!')
    expect(date).toBeInTheDocument()
    expect(content).toBeInTheDocument()
  })

  it('messages are pulled to the right directions', async () => {
    const { getByTestId, rerender } = render(
      <MockChatMessage data-testid="msg-container" />,
    )

    const msg = getByTestId('msg-container')

    const authorMsgStyle = getComputedStyle(msg)
    expect(authorMsgStyle['margin-left']).toBe('')
    await waitFor(() => rerender(<MockChatMessage own />))
    const ownMsgStyle = getComputedStyle(msg)
    expect(ownMsgStyle['margin-left']).toBe('auto')
  })

  it('displays attachments of the message', () => {
    const { queryAllByTestId } = render(
      <MockChatMessage attachments={attachments} />,
    )

    const attachmentsItems = queryAllByTestId('message-attachment')
    attachmentsItems.forEach((item, i) => {
      expect(item.textContent).toBe(attachments[i].name)
      expect(item.href).toBe(attachments[i].url)
    })
  })

  it('renders without accessibility errors', async () => {
    const { container } = render(<MockChatMessage />)
    const result = await axe(container)
    expect(result).toHaveNoViolations()
  })

  it('renders without accessibility error with files', async () => {
    const { container } = render(<MockChatMessage attachments={attachments} />)
    const result = await axe(container)
    expect(result).toHaveNoViolations()
  })
})
