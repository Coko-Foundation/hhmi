// eslint-disable-next-line import/no-extraneous-dependencies
const { db } = require('@coko/server')
const { logger, cron } = require('@coko/server')
const { ChatMessage } = require('@coko/server/src/models')
const { Question, User } = require('../models')
const CokoNotifier = require('./notify')

const productionChatActivityNotification = async () => {
  logger.info(
    'sending daily email notifications about activity in producion chat',
  )

  try {
    const questionsInProduction = await Question.findAny({
      status: 'in_production',
    })

    // const managingEditors = await Team.filterGlobalTeamMembers(role, query, options)

    const managingEditorsAndProductionTeam = await User.query().whereIn(
      'id',
      builder => {
        return builder
          .select('users.id')
          .from('users')
          .leftJoin('team_members', 'team_members.user_id', 'users.id')
          .leftJoin('teams', 'team_members.team_id', 'teams.id')
          .where({
            'teams.role': 'editor',
            'teams.global': true,
            'users.isActive': true,
          })
          .orWhere({
            'teams.role': 'production',
            'teams.global': true,
            'users.isActive': true,
          })
      },
    )

    questionsInProduction.result.forEach(async question => {
      const productionChatId = await Question.getChatThread(
        question.id,
        'productionChat',
      )

      // old questions stuck in production may not have a productionChatId, so ignore those to avoid errors
      if (productionChatId) {
        // check if there are any new messages the last 24 hours
        const newChatMessages = await ChatMessage.query()
          .select('*')
          .where('chat_thread_id', productionChatId)
          .where(
            'created',
            '>=',
            db.raw(`now() - (?*'1 HOUR'::INTERVAL)`, [24]),
          )

        if (newChatMessages.length) {
          // if there are new messages notify relevant users
          const handlingEditors = await Question.getHandlingEditors(question.id)
          const author = await Question.getAuthor(question.id)

          const usersToNotify = [
            ...managingEditorsAndProductionTeam,
            ...handlingEditors,
          ].filter(user => user.id !== author?.id)

          const notifier = new CokoNotifier()

          usersToNotify.forEach(user => {
            // send email
            notifier.notify('hhmi.productionChatActivityDigest', {
              questionId: question.id,
              userId: user.id,
            })
          })
        }
      } else {
        logger.info(`${question.id} does not have a production chat!`)
      }
    })
  } catch (e) {
    logger.error('daily email notification failed')
    throw new Error(e)
  }
}

// run every day on 08:00 EST
cron.schedule('0 8 * * *', productionChatActivityNotification, {
  scheduled: true,
  timezone: 'America/New_York',
})
