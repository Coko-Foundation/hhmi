const { logger, Team: TeamModel } = require('@coko/server')
const config = require('config')
const { applyListQueryOptions } = require('../helpers')

const User = require('../user/user.model')
const TeamMember = require('../teamMember/teamMember.model')

const AUTHOR_TEAM = config.teams.nonGlobal.find(t => t.role === 'author')

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
        .where('users.profile_submitted', true)
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

      let affecetedRows

      if (team) {
        const teamMember = await TeamMember.findOne({ teamId: team.id })

        // if existing team member
        if (teamMember) {
          // patch team_members.user_id
          affecetedRows = await TeamMember.query(options.trx)
            .patch({ userId })
            .where({ teamId: team.id })
        } else {
          // create new team member
          affecetedRows = await Team.addMember(team.id, userId, {
            trx: options.trx,
          })
        }
      } else {
        const newTeam = await Team.insert(
          {
            objectId,
            objectType: 'question',
            role: AUTHOR_TEAM.role,
            displayName: AUTHOR_TEAM.displayName,
          },
          { trx: options.trx },
        )

        affecetedRows = await Team.addMember(newTeam.id, userId, {
          trx: options.trx,
        })
      }

      return !!affecetedRows
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
