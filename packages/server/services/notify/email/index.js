const { logger } = require('@coko/server')
const moment = require('moment')

const config = require('config')
// eslint-disable-next-line import/no-extraneous-dependencies
const mailer = require('@pubsweet/component-send-email')

const clientUrl = config.has('clientUrl') && config.get('clientUrl')

const { ChatThread } = require('@coko/server/src/models')
const { Question, Identity, User, QuestionVersion } = require('../../../models')
const flatten = require('../../../controllers/flattenMetadataValues')

const sendEmail = data => {
  const { attachments, content, subject, text, to } = data

  const emailData = {
    from: config.get('mailer.from'),
    html: `<div>${content}</div>`,
    subject: `${subject}`,
    text: text || content,
    to,
    attachments: attachments || [],
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

const addExternalReviewer = async context => {
  try {
    const { to, questionId } = context

    const link = `${clientUrl}/question/${questionId}`

    const content = `
	<p>
	  You have been invited to review an item in the Assessment Builder.
	</p>
	<p>
	  Click on <a href="${link}">this link</a> to view the item and accept or reject this invitation.
	  If you cannot see the link, copy and paste the following link into your browser.
      <br/>
      ${link}
	</p>
	`

    const text = `You have been invited to review an item in the Assessment Builder.
		\nCopy and paste the following link into your browser to view the unaccepted item.
		\n${link}
	`

    const subject =
      'HHMI BioInteractive Assessment Builder: Invitation to review'

    return { content, text, subject, to }
  } catch (e) {
    logger.error('Failed to create email for add external reviewer')
    throw new Error(e)
  }
}

const inviteReviewer = async context => {
  try {
    const { reviewerId, questionVersionId } = context

    const questionVersion = await QuestionVersion.findById(questionVersionId)
    const link = `${clientUrl}/question/${questionVersion.questionId}`
    const reviewerIdentity = await Identity.findOne({ userId: reviewerId })

    const content = `
	<p>
	  You have been invited to review an item in the Assessment Builder.
	</p>
	<p>
	  Click on <a href="${link}">this link</a> to view the item and accept or reject this invitation.
	  If you cannot see the link, copy and paste the following link into your browser.
      <br/>
      ${link}
	</p>
	`

    const text = `You have been invited to review an item in the Assessment Builder.
		\nCopy and paste the following link into your browser to view the unaccepted item.
		\n${link}
	`

    const subject =
      'HHMI BioInteractive Assessment Builder: Invitation to review'

    return { content, text, subject, to: reviewerIdentity.email }
  } catch (e) {
    logger.error('Failed to create email for invite reviewer')
    throw new Error(e)
  }
}

// const revokeInvitation = async context => {
//   const { questionId, reviewerId } = context

//   const reviewerIdentity = await Identity.findOne({ userId: reviewerId })

//   const content = `
// 	<p>Another reviewer has been invited.
//   `

//   const text = ``

//   const subject = ``

//   return { content, text, subject, to: reviewerIdentity.email }
// }

const rejectInvitation = async context => {
  try {
    const { email, questionId, reviewerId } = context

    const reviewer = await User.findById(reviewerId)
    const link = `${clientUrl}/question/${questionId}`

    const content = `
			  <p>
				${reviewer.displayName} has rejected an invitation to review an item in the Assessment Builder.
			  </p>
			  <p>
				Click on <a href="${link}">this link</a> to view the rejected invitation on the Reviewer Invites page.
				If you cannot see the link, copy and paste the following link into your browser.
				<br/>
				  ${link}
			  </p>
		  `

    const text = `${reviewer.displayName} has rejected an invitation to review an item in the Assessment Builder.
			  \nCopy and paste the following link into your browser to view the rejected item.
			  \n${link}
		  `

    const subject =
      'HHMI BioInteractive Assessment Builder: Invitation to review rejected'

    return { content, text, subject, to: email }
  } catch (e) {
    logger.error('Failed to create email for reject invitation')
    throw new Error(e)
  }
}

const acceptInvitation = async context => {
  try {
    const { email, questionId, reviewerId } = context

    const reviewer = await User.findById(reviewerId)
    const link = `${clientUrl}/question/${questionId}`

    const content = `
			  <p>
				${reviewer.displayName} has accepted an invitation to review an item in the Assessment Builder.
			  </p>
			  <p>
				Click on <a href="${link}">this link</a> to view the accepted invitation on the Reviewer Invites page.
				If you cannot see the link, copy and paste the following link into your browser.
				<br/>
				  ${link}
			  </p>
		  `

    const text = `${reviewer.displayName} has accepted an invitation to review an item in the Assessment Builder.
			  \nCopy and paste the following link into your browser to view the accepted item.
			  \n${link}
		  `

    const subject =
      'HHMI BioInteractive Assessment Builder: Invitation to review accepted'

    return { content, text, subject, to: email }
  } catch (e) {
    logger.error('Failed to create email for reject invitation')
    throw new Error(e)
  }
}

const moveQuestionVersionToReview = async context => {
  try {
    const { questionVersion } = context

    const to = `assessmentbuilder@hhmi.org`
    const author = await Question.getAuthor(questionVersion.questionId)
    const identity = await Identity.findOne({ userId: author.id })
    const link = `${clientUrl}/question/${questionVersion.questionId}`
    const bloomsLevel = flatten()[questionVersion.cognitiveLevel]

    const subject =
      'HHMI BioInteractive Assessment Builder: Item passed Editorial Review'

    const content = `
	  <p>This item has passed Editorial Review and payment to the Author should proceed.</p>
	  <p>Item details:</p>
	  <ul>
	    <li>Author name: ${author.displayName}</li>
	    <li>Author email: ${identity.email}</li>
	    <li>Item ID: ${questionVersion.questionId}</li>
	    <li>Bloom's level of the item: ${bloomsLevel}</li>
	  </ul>
	  <p>
	    Click on <a href="${link}">this link</a> to view the item.
	    If you cannot see the link, copy and paste the following link into your browser.
	    <br/>
	  	${link}
	  </p>
	`

    const text = `Item ${questionVersion.questionId} has passed Editorial Review and payment to the Author should proceed.
	\nCopy and paste the following link into your browser to view the item.
	\n${link}
`

    return { content, text, subject, to }
  } catch (e) {
    logger.error(
      `Failed to create email for move question version to review: ${e}`,
    )
    throw new Error(e)
  }
}

const submitReview = async ({ attachments, review, to }) => {
  try {
    const { questionVersionId, content: reviewContent, reviewerId } = review

    const questionVersion = await QuestionVersion.findById(questionVersionId)
    const reviewer = await User.findById(reviewerId)

    const link = `${clientUrl}/question/${questionVersion.questionId}`
    const subject = 'HHMI BioInteractive Assessment Builder: Review submitted'

    const content = `
	<p>
		${
      reviewer.displayName
    } has completed the review of an item in the Assessment Builder.
	</p>
	<p>
		Click on <a href="${link}">this link</a> to view the item.
		If you cannot see the link, copy and paste the following link into your browser.
		<br/>
		${link}
	</p>
	<h2>
		Review by ${reviewer.displayName} submitted at ${moment(review.updated).format(
      'MMMM DD, YYYY, h:mm:ss a',
    )}
	</h2>
	<pre>${reviewContent}</pre>
	`

    const text = `${reviewer.displayName} has completed the review of an item in the Assessment Builder.
	\nCopy and paste the following link into your browser to view the item.
	\n${link}
	`

    return { attachments, content, subject, text, to }
  } catch (e) {
    logger.error('Failed to create email for submit review')
    throw new Error(e)
  }
}

module.exports = {
  sendEmail,
  handlers: {
    'hhmi.chatMention': chatMention,
    'hhmi.questionRejected': questionRejected,
    'hhmi.questionUnpublished': questionUnpublished,
    'hhmi.productionChatActivityDigest': productionChatActivityDigest,
    'hhmi.addExternalReviewer': addExternalReviewer,
    'hhmi.reviewerInvited': inviteReviewer,
    // 'hhmi.revokeInvitation': revokeInvitation,
    'hhmi.rejectInvitation': rejectInvitation,
    'hhmi.acceptInvitation': acceptInvitation,
    'hhmi.moveQuestionVersionToReview': moveQuestionVersionToReview,
    'hhmi.submitReview': submitReview,
  },
}
