const TeamMemberModel = require('@coko/server/src/models/teamMember/teamMember.model')
const { REVIEWER_STATUSES } = require('../../controllers/constants')

class TeamMember extends TeamMemberModel {
  hasActiveInvitation() {
    return (
      this.status === REVIEWER_STATUSES.invited ||
      this.status === REVIEWER_STATUSES.accepted
    )
  }

  canInvite() {
    return !this.status || this.status === REVIEWER_STATUSES.added
  }
}

module.exports = TeamMember
