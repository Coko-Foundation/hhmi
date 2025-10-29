const { logger, subscriptionManager } = require('@coko/server')

const {
  updateUserProfile,
  submitQuestionnaire,
  filterUsers,
  getDisplayName,
  bioInteractiveLogin,
  deleteUsersRelatedItems,
  getUserTeams,
  downloadUsersCSV,
  reviewerStats,
  deleteUsers,
  deactivateUsers,
  getUser,
} = require('../../controllers/user.controllers')

const broadcastUserUpdated = async userId => {
  try {
    const updatedUser = await getUser(userId)

    return subscriptionManager.publish('USER_UPDATED', {
      userUpdated: updatedUser,
    })
  } catch (e) {
    throw new Error(e.message)
  }
}

const updateUserProfileResolver = async (_, { input }, ctx) => {
  return updateUserProfile(ctx.userId, input)
}

const submitQuestionnaireResolver = async (_, { input }, ctx) => {
  return submitQuestionnaire(ctx.userId, input)
}

const filterUsersResolver = async (_, { params, options }, _ctx) => {
  try {
    return filterUsers(params, options)
  } catch (e) {
    logger.error(`search resolver error: ${e.message}`)
    throw new Error(e)
  }
}

const displayNameResolver = async user => {
  return getDisplayName(user)
}

const bioInteractiveLoginResolver = async (_, { authCode }, ctx) => {
  try {
    return bioInteractiveLogin(authCode)
  } catch (e) {
    logger.error(`bioInteractiveLoginResolver error: ${e.message}`)
    throw new Error(e)
  }
}

const deactivateUsersResolver = async (_, { ids }) => {
  try {
    logger.info(`[USER RESOLVER] - deactivateUsers`)
    const deactivatedUsers = await deactivateUsers(ids)

    await Promise.all(
      deactivatedUsers.map(async user => broadcastUserUpdated(user.id)),
    )

    return deactivatedUsers
  } catch (e) {
    logger.error(`[USER RESOLVER] - deactivateUsers: ${e.message}`)
    throw new Error(e)
  }
}

const deleteUsersResolver = async (_, { ids }) => {
  try {
    logger.info(`[USER RESOLVER] - deleteUsers`)
    const deltedUsers = await deleteUsers(ids)

    await Promise.all(
      ids.map(userId => {
        return subscriptionManager.publish(`USER_DELETED.${userId}`, userId)
      }),
    )

    return deltedUsers
  } catch (e) {
    logger.error(`[USER RESOLVER] - deleteUsers: ${e.message}`)
    throw new Error(e)
  }
}

const deleteUsersRelatedItemsResolver = async (_, { ids }) => {
  try {
    await deleteUsersRelatedItems(ids)

    return true
  } catch (e) {
    throw new Error(e.message)
  }
}

const teamsResolver = async user => {
  return getUserTeams(user)
}

const downloadUsersDataResolver = async (_, { userIds }) => {
  return downloadUsersCSV(userIds)
}

const reviewerStatsResolver = async user => {
  return reviewerStats(user)
}

module.exports = {
  Mutation: {
    updateUserProfile: updateUserProfileResolver,
    submitQuestionnaire: submitQuestionnaireResolver,
    bioInteractiveLogin: bioInteractiveLoginResolver,
    deleteUsersRelatedItems: deleteUsersRelatedItemsResolver,
    downloadUsersData: downloadUsersDataResolver,
    deleteUsers: deleteUsersResolver,
    deactivateUsers: deactivateUsersResolver,
  },
  Query: {
    filterUsers: filterUsersResolver,
  },
  User: {
    displayName: displayNameResolver,
    teams: teamsResolver,
    reviewerStats: reviewerStatsResolver,
  },
  Subscription: {
    userDeleted: {
      resolve: userId => userId,
      subscribe: async (_payload, _vars, ctx) => {
        return subscriptionManager.asyncIterator(`USER_DELETED.${ctx.userId}`)
      },
    },
  },
}
