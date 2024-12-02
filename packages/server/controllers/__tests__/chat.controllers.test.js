const { uuid, ChatChannel, ChatMessage } = require('@coko/server')

const clearDb = require('../../models/__tests__/_clearDb')

const {
  createChatChannel,
  sendMessage,
  getMessage,
  getMessageAuthor,
  cancelEmailNotification,
} = require('../chat.controllers')

const { User } = require('../../models/index')

const content = 'Duis accumsan ultrices nulla. Vivamus eu ante ullamcorper'

describe('Chat controller', () => {
  beforeEach(() => clearDb())

  afterAll(async () => {
    await clearDb()
    const knex = ChatChannel.knex()
    knex.destroy()
  })
  it('createChatThread creates chat thread with given relatedObjectId and chatType', async () => {
    const id = uuid()

    const chatThread = await createChatChannel({
      relatedObjectId: id,
      chatType: 'question',
    })

    expect(chatThread.relatedObjectId).toBe(id)
    expect(chatThread.chatType).toBe('question')
  })
  it('sendMessage creates message with given data', async () => {
    const question = uuid()
    const user = await User.insert({})

    const chatThread = await ChatChannel.insert({
      relatedObjectId: question,
      chatType: 'question',
    })

    const participant1 = uuid()

    const message = await sendMessage(chatThread.id, content, user.id, [
      participant1,
    ])

    // cancel email notification for this test
    cancelEmailNotification(participant1, chatThread.id)

    expect(message.chatChannelId).toBe(chatThread.id)
    expect(message.content).toBe(content)
    expect(message.mentions.includes(participant1)).toBe(true)
  })
  it('getMessage gets the message with the given id', async () => {
    const user = await User.insert({})

    const chatThread = await ChatChannel.insert({
      relatedObjectId: uuid(),
      chatType: 'question',
    })

    const chatMessage = await ChatMessage.insert({
      chatChannelId: chatThread.id,
      content,
      userId: user.id,
    })

    const fetchedMessage = await getMessage(chatMessage.id)
    expect(fetchedMessage.id).toBe(chatMessage.id)
    expect(fetchedMessage.content).toBe(content)
  })
  it('getMessageAuthor gets the author of the message', async () => {
    const author = await User.insert({})
    const question = uuid()

    const chatThread = await ChatChannel.insert({
      relatedObjectId: question,
      chatType: 'question',
    })

    const chatMessage = await ChatMessage.insert({
      chatChannelId: chatThread.id,
      content,
      userId: author.id,
    })

    const fetchedAuthor = await getMessageAuthor(chatMessage)
    expect(fetchedAuthor.id).toBe(author.id)
  })
})
