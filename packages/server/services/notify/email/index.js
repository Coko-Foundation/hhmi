const { logger, clientUrl } = require('@coko/server')
const moment = require('moment')

const config = require('config')
// eslint-disable-next-line import/no-extraneous-dependencies
// const mailer = require('@pubsweet/component-send-email')
const { sendEmail } = require('@coko/server')

const { ChatThread } = require('@coko/server/src/models')
const { Question, Identity, User, QuestionVersion } = require('../../../models')
const flatten = require('../../../controllers/flattenMetadataValues')

const send = data => {
  const { attachments, content, subject, text, to } = data

  const emailData = {
    from: config.get('mailer.from'),
    html: `<div>${content}</div>`,
    subject: `${subject}`,
    text: text || content,
    to,
    attachments: attachments || [],
  }

  sendEmail(emailData)
  logger.info(`Email sent to ${to} with subject "${subject}"`)
}

const chatMention = async context => {
  try {
    const { mention, newMessage: { userId, chatThreadId } = {} } = context

    const mentionedUserIdentity = await Identity.findOne({ userId: mention })
    const sender = await User.findById(userId)
    const senderDisplayName = await User.getDisplayName(sender)
    const chatThread = await ChatThread.findById(chatThreadId)
    const link = `${clientUrl}/question/${chatThread?.relatedObjectId}#${chatThread?.chatType}`

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
    logger.error(`Failed to create email for mention: ${e}`)
    throw new Error(e)
  }
}

const questionRejected = async context => {
  try {
    const { questionId } = context
    const link = `${clientUrl}/question/${questionId}`

    // notify author
    const author = await Question.getAuthor(questionId)

    const authorIdentity = await Identity.findOne({ userId: author[0].id })

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
    <p>
      The Production team has been discussing this item. 
      You must be logged in to the Assessment Builder tool to see the item
      Click on <a href="${link}">this link</a> to view the discussion. 
      If you cannot see the link, copy and paste the following link into your browser.
    </p>
    <p>
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
    You must be logged in to the AB tool to see the item.
	</p>
	<p>
    Click on <a href="${link}">this link</a> to view the item and choose to accept or decline this review within the next seven days. 
  </p>
  <p>
    If you are able to review the item, after accepting it, click on <a href="https://biointeractive.jotform.com/242195353808057">this link</a> 
    to complete your review. For additional information and resources about the review process, click on <a href="https://drive.google.com/drive/u/0/folders/18ARogadE6RwDQiR9CMoaR3DCzwuyUhBK">this link</a>. 
    We ask that reviews be completed within 14 days of acceptance. 
  </p>
  <p>Thank you for sharing your expertise with the community.</p>
  <p>${link}</p>
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

const revokeInvitation = async context => {
  const { reviewerId } = context

  const reviewerIdentity = await Identity.findOne({ userId: reviewerId })

  const content = `
    <p>
    The editor has revoked your invitation to review an item in the Assessment Builder. 
    This is likely because the invitation was sent to you in error or the editor didn't receive your response to the invitation within seven days.
    </p>
  `

  const text = `Invitation to review an item has been revoked by the editor`

  const subject = `HHMI BioInteractive Assessment Builder: Invitation to review revoked`

  return { content, text, subject, to: reviewerIdentity.email }
}

const rejectInvitation = async context => {
  try {
    const { email, questionId, reviewerId, reason } = context

    const reviewer = await User.findById(reviewerId)
    const link = `${clientUrl}/question/${questionId}`

    const content = `
			  <p>
				${reviewer.displayName} has rejected an invitation to review an item in the Assessment Builder, and provided the following reason:
			  </p>
        <blockquote>
          ${reason}
        </blockquote>
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
    const identity = await Identity.findOne({ userId: author[0].id })
    const link = `${clientUrl}/question/${questionVersion.questionId}`
    const bloomsLevel = flatten()[questionVersion.cognitiveLevel]

    const subject =
      'HHMI BioInteractive Assessment Builder: Item passed Editorial Review'

    const content = `
	  <p>This item has passed Editorial Review and payment to the Author should proceed.</p>
	  <p>Item details:</p>
	  <ul>
	    <li>Author name: ${author[0].displayName}</li>
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
    logger.error(`Failed to create email for submit review: ${e}`)
    throw new Error(e)
  }
}

const sendReviewCopyToReviewer = async ({ attachments, review, to }) => {
  try {
    const { questionVersionId, content: reviewContent, reviewerId } = review

    const questionVersion = await QuestionVersion.findById(questionVersionId)
    const reviewer = await User.findById(reviewerId)

    const link = `${clientUrl}/question/${questionVersion.questionId}`
    const subject = 'HHMI BioInteractive Assessment Builder: Review submitted'

    const content = `
      <p>You have completed the review of an item in the Assessment Builder.</p>
      <p>Click on <a href="${link}">this link</a> to view the item. 
      If you cannot see the link, copy and paste the following link into your browser.
      <br/>
      ${link}
      </p>

      <p>A copy of your review feedback is provided below.</p>
      <h2>Review by ${reviewer.displayName} submitted at ${moment(
      review.updated,
    ).format('MMMM DD, YYYY, h:mm:ss a')}</h2>

      <pre>${reviewContent}</pre>
    `

    const text = `You have completed the review of an item in the Assessment Builder.
        \nCopy and paste the following link into your browser to view the item.
        \n${link}`

    return { attachments, content, subject, text, to }
  } catch (e) {
    logger.error(
      `Failed to create email for reviewer after submitting the review: ${e}`,
    )
    throw new Error(e)
  }
}

const submitReport = async ({
  reporterDisplayName,
  reporterEmail,
  reportContent,
  attachments,
  questionId,
  to,
}) => {
  try {
    const link = `${clientUrl}/question/${questionId}`

    const subject =
      'HHMI BioInteractive Assessment Builder: Reported issue with published item'

    const content = `
		<p>${reporterDisplayName} with email address <a href="mailto:${reporterEmail}">${reporterEmail}</a> has reported an issue with an item.</p>
		<pre>${reportContent}</pre>
		<p>
		Click on <a href="${link}">this link</a> to view the item.
		If you cannot see the link, copy and paste the following link into your browser.
		<br/>
		${link}
	</p>
		`

    const text = `${reporterDisplayName} (${reporterEmail}) has reported an issue with a published item.
		\nCopy and paste the following link into your browser to view the item.
		\n${link}
		`

    return { attachments, content, subject, text, to }
  } catch (e) {
    logger.error(`Failed to create email for submit report: ${e}`)
    throw new Error(e)
  }
}

module.exports = {
  sendEmail: send,
  handlers: {
    'hhmi.chatMention': chatMention,
    'hhmi.questionRejected': questionRejected,
    'hhmi.questionUnpublished': questionUnpublished,
    'hhmi.productionChatActivityDigest': productionChatActivityDigest,
    'hhmi.addExternalReviewer': addExternalReviewer,
    'hhmi.reviewerInvited': inviteReviewer,
    'hhmi.revokeInvitation': revokeInvitation,
    'hhmi.rejectInvitation': rejectInvitation,
    'hhmi.acceptInvitation': acceptInvitation,
    'hhmi.moveQuestionVersionToReview': moveQuestionVersionToReview,
    'hhmi.submitReview': submitReview,
    'hhmi.sendReviewCopyToReviewer': sendReviewCopyToReviewer,
    'hhmi.submitReport': submitReport,
  },
}
