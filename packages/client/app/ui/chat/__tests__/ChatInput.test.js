import React from 'react'
import ChatInput from '../ChatInput'
import {
  axe,
  fireEvent,
  render,
  renderer,
  screen,
  userEvent,
} from '../../../testUtils'

const MockChatInput = props => {
  return <ChatInput onSend={jest.fn()} placeholder="send message" {...props} />
}

describe('ChatInput', () => {
  it('matches snapshot', () => {
    const ChatInputComponent = renderer.create(<MockChatInput />).toJSON()
    expect(ChatInputComponent).toMatchSnapshot()
  })

  it("calls onSubmit on clicking send and doesn't allow empty message", async () => {
    const onSend = jest.fn()
    render(<MockChatInput onSend={onSend} />)
    const sendBtn = screen.getByTestId('send-btn')
    const input = screen.getByPlaceholderText('send message')
    fireEvent.click(sendBtn)
    expect(onSend).toBeCalledTimes(0)
    await fireEvent.change(input, { target: { value: 'hi' } })
    fireEvent.click(sendBtn)
    expect(onSend).toBeCalled()
  })

  it('calls onSubmit on clicking enter', async () => {
    const onSend = jest.fn()
    render(<MockChatInput onSend={onSend} />)
    const input = screen.getByPlaceholderText('send message')
    await userEvent.type(input, 'hi{enter}')
    expect(onSend).toBeCalled()
  })

  it('clears input value after sending', async () => {
    const onSend = jest.fn()
    render(<MockChatInput onSend={onSend} />)
    const sendBtn = screen.getByTestId('send-btn')
    const input = screen.getByPlaceholderText('send message')
    await fireEvent.change(input, { target: { value: 'hi' } })
    fireEvent.click(sendBtn)
    expect(input.value).toBe('')
  })

  it('renders without any accessibility error', async () => {
    const { container } = render(<MockChatInput />)
    const result = await axe(container)
    expect(result).toHaveNoViolations()
  })
})
