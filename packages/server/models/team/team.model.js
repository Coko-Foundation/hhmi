const TeamModel = require('@coko/server/src/models/team/team.model')

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
        .where('users.givenNames', 'ilike', `%${query}%`)
        .orWhere('users.surname', 'ilike', `%${query}%`)
        .orWhere('users.displayName', 'ilike', `%${query}%`)
    } catch (e) {
      throw new Error(e)
    }
  }
}

module.exports = Team
