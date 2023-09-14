const { logger } = require('@coko/server')
const TeamModel = require('@coko/server/src/models/team/team.model')
const TeamMember = require('@coko/server/src/models/teamMember/teamMember.model')
const { applyListQueryOptions } = require('../helpers')

const User = require('../user/user.model')

class Team extends TeamModel {
  static async searchForNonTeamMemberUsers(teamId, query, options = {}) {
    try {
      if (!query) return []

      return User.query(options.trx)
        .whereNotIn('id', builder => {
          return builder
            .select('users.id')
            .from('users')
            .leftJoin('team_members', 'team_members.user_id', 'users.id')
            .leftJoin('teams', 'team_members.team_id', 'teams.id')
            .where({ teamId })
        })
        .where(builder => {
          return builder
            .where('users.givenNames', 'ilike', `%${query}%`)
            .orWhere('users.surname', 'ilike', `%${query}%`)
            .orWhere('users.displayName', 'ilike', `%${query}%`)
        })
    } catch (e) {
      throw new Error(e)
    }
  }

  static async assignQuestionAuthor(objectId, userId, options = {}) {
    try {
      const team = await Team.findOne({
        objectId,
        objectType: 'question',
        role: 'author',
      })

      // patch team_members.user_id
      const affecetedRows = await TeamMember.query(options.trx)
        .patch({ userId })
        .where({ teamId: team.id })

      return affecetedRows === 1
    } catch (e) {
      throw new Error(e)
    }
  }

  static async filterGlobalTeamMembers(role, query = '', options = {}) {
    try {
      const parentQuery = User.query(options.trx)
        .whereIn('id', builder => {
          return builder
            .select('users.id')
            .from('users')
            .leftJoin('team_members', 'team_members.user_id', 'users.id')
            .leftJoin('teams', 'team_members.team_id', 'teams.id')
            .where({
              'teams.role': role,
              'teams.global': true,
              'users.isActive': true,
            })
        })
        .where('users.displayName', 'ilike', `%${query}%`)

      return applyListQueryOptions(parentQuery, options)
    } catch (error) {
      logger.error('Team model: filterGlobalTeamMembers failed', error)
      throw new Error(error)
    }
  }

  static async removeNonGlobalTeam(objectId, userId, options = {}) {
    try {
      const teamMember = await TeamMember.query(options.trx)
        .leftJoin('teams', 'teams.id', 'team_members.team_id')
        .select('team_members.id')
        .findOne({
          'teams.object_id': objectId,
          'team_members.userId': userId,
          'teams.role': 'handlingEditor',
        })

      await TeamMember.deleteById(teamMember.id)

      return true
    } catch (e) {
      logger.error(
        'Team model: removeNonGlobalTeam: Transaction failed! Rolling back...',
      )
      throw new Error(e)
    }
  }
}

module.exports = Team
