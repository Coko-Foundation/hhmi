const { logger } = require('@coko/server')

const config = require('config')
// eslint-disable-next-line import/no-extraneous-dependencies
const mailer = require('@pubsweet/component-send-email')

const clientUrl = config.has('clientUrl') && config.get('clientUrl')

const { ChatThread } = require('@coko/server/src/models')
const { Question, Identity, User } = require('../../../models')

const sendEmail = data => {
  const { content, subject, text, to } = data

  const emailData = {
    from: config.get('mailer.from'),
    html: `<div>${content}</div>`,
    subject: `${subject}`,
    text: text || content,
    to,
  }

  mailer.send(emailData)
  logger.info(`Email sent to ${to} with subject "${subject}"`)
}

const chatMention = async context => {
  try {
    const { mention, userId, chatThreadId } = context

    const mentionedUserIdentity = await Identity.findOne({ userId: mention })
    const sender = await User.findById(userId)
    const senderDisplayName = await User.getDisplayName(sender)
    const chatThread = await ChatThread.findById(chatThreadId)
    const link = `${clientUrl}/question/${chatThread?.relatedObjectId}#${chatThread?.chatType}`

    // console.log(mentionedUserIdentity)
    // console.log(sender)
    // console.log(chatThread.relatedObjectId)

    const content = `
        <p>User ${senderDisplayName} mentioned you in a conversation.</p>
        <p>
           Visit the chat by <a href="${link}">clicking this link</a>. 
           If you cannot click the link, copy and paste the following link into your browser.
          <br/>
          ${link}
        </p>
        `

    const text = `
    User ${sender.getDisplayName()} mentioned you in a conversation.
    \nCopy and paste the following link into your browser to visit the chat.
    \n${link} 
    `

    return {
      content,
      text,
      subject: 'You have a new mention',
      to: mentionedUserIdentity.email,
    }
  } catch (e) {
    logger.error('Failed to create email for mention')
    throw new Error(e)
  }
}

const questionRejected = async context => {
  try {
    const { questionId } = context
    const link = `${clientUrl}/question/${questionId}`

    // notify author
    const author = await Question.getAuthor(questionId)

    const authorIdentity = await Identity.findOne({ userId: author.id })

    const content = `
    <p>  
    Thank you for your submission to the HHMI BioInteractive Assessment Builder. 
    This item has not been accepted by the Editorial Board. 
    You may view the reasons why an item may not be accepted <a href="https://docs.google.com/document/d/11ouizynaBlamTANf-crPdlKL91eXhDioHdiy6rL2ArA/edit">at this page</a>.
    </p>
    <p>
       Click on <a href="${link}">this link</a> to view the unaccepted item. 
       If you cannot see the link, copy and paste the following link into your browser.
      <br/>
      ${link}
    </p>
  `

    const text = `Item not accepted for inclusion in the HHMI BioInteractive Assessment Builder.
          \nCopy and paste the following link into your browser to view the unaccepted item.
          \n${link}`

    return {
      content,
      text,
      subject: 'HHMI BioInteractive Assessment Builder: Item not accepted',
      to: authorIdentity.email,
    }
  } catch (e) {
    logger.error('Failed to create email for question rejected')
    throw new Error(e)
  }
}

const questionUnpublished = async context => {
  try {
    const { questionId } = context
    const link = `${clientUrl}/question/${questionId}`

    // notify author
    const author = await Question.getAuthor(questionId)

    const authorIdentity = await Identity.findOne({ userId: author.id })

    const content = `
    <p>  
      An item that you authored and was previously published has been unpublished by the Editorial Board.
    </p>
    <p>
       Click on <a href="${link}">this link</a> to view the unpublished item. 
       If you cannot see the link, copy and paste the following link into your browser.
      <br/>
      ${link}
    </p>
  `

    const text = `HHMI BioInteractive Assessment Builder: Your item has been unpublished.
          \nCopy and paste the following link into your browser to view the unpublished item.
          \n${link}`

    return {
      content,
      text,
      subject:
        'An item you authored has been unpublished - HHMI BioInteractive Assessment Builder',
      to: authorIdentity.email,
    }
  } catch (e) {
    logger.error('Failed to create email for question rejected')
    throw new Error(e)
  }
}

const productionChatActivityDigest = async context => {
  const { questionId, userId } = context

  const userIdentity = await Identity.findOne({ userId })

  const link = `${clientUrl}/question/${questionId}#productionChat`

  const content = `
    <p>The Production team have been discussing this item. 
      Click on <a href="${link}">this link</a> to view the discussion. 
      If you cannot see the link, copy and paste the following link into your browser.
      <br/>
      ${link}
    </p>
  `

  const text = `The Production team have been discussing this item..
        \nCopy and paste the following link into your browser to view the discussion.
        \n${link}`

  return {
    content,
    text,
    subject: 'HHMI BioInteractive Assessment Builder: Production chat activity',
    to: userIdentity.email,
  }
}

module.exports = {
  sendEmail,
  handlers: {
    'hhmi.chatMention': chatMention,
    'hhmi.questionRejected': questionRejected,
    'hhmi.questionUnpublished': questionUnpublished,
    'hhmi.productionChatActivityDigest': productionChatActivityDigest,
  },
}
