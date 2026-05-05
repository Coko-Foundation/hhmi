const {
  logger,
  modelJsonSchemaTypes: {
    arrayOfStrings,
    boolean,
    booleanNullable,
    stringNullable,
  },
  useTransaction,
  User: UserModel,
  db,
} = require('@coko/server')

const config = require('config')
const { applyListQueryOptions } = require('../helpers')

const REVIEWER_TEAM = config.teams.nonGlobal.find(t => t.role === 'reviewer')

class User extends UserModel {
  static get schema() {
    return {
      type: 'object',
      required: [],
      properties: {
        middleName: stringNullable,
        displayName: stringNullable,
        pronouns: stringNullable,

        phone: stringNullable, // need formatting rule (only + and numbers?)

        country: stringNullable,
        state: stringNullable,
        city: stringNullable,
        address: stringNullable,
        zipCode: stringNullable,

        position: stringNullable,
        organization: stringNullable,
        institutionalSetting: stringNullable,
        teachingExperience: stringNullable,
        typeOfInstitution: stringNullable,

        apIbCourses: booleanNullable,
        employmentStatus: stringNullable,
        otherLevel: stringNullable,

        coursesTeaching: arrayOfStrings,
        topicsReviewing: arrayOfStrings,

        receivedTraining: booleanNullable,
        receivedInclusiveLanguageTraining: booleanNullable,

        source: stringNullable,

        profileSubmitted: boolean,
      },
    }
  }

  static async getDisplayName(user) {
    if (user.displayName) return user.displayName

    // temporary fix: handle creation of user during SSO to avoid null display names
    const { givenNames, surname, username } = user
    if (givenNames && surname) return `${givenNames} ${surname}`
    if (username) return username

    return '[invalid display name]'

    // return user.getDisplayName()
  }

  static async filter(data = {}, options = {}) {
    try {
      const { trx, ...otherOptions } = options
      const { search = '', role, expertise, reviewerRecord, ...params } = data

      return useTransaction(
        async tr => {
          let queryBuilder = this.query(tr)
            .withGraphJoined('defaultIdentity')
            // calculate value of role as "reviewer" or "not reviewer", relevant only to this query
            .select(
              'users.*',
              db.raw(
                `
                CASE 
                  WHEN EXISTS (
                    SELECT 1 FROM team_members 
                    JOIN teams ON teams.id = team_members.team_id 
                    WHERE team_members.user_id = users.id 
                    AND teams.role = 'reviewer'
                  ) THEN true
                  ELSE false
                END as "isReviewer"
              `,
              ),
            )

          if (role) {
            queryBuilder = queryBuilder
              .leftJoin('team_members', 'team_members.user_id', 'users.id')
              .leftJoin('teams', 'teams.id', 'team_members.team_id')
              .select('teams.role', 'teams.global', 'users.*')
              .where({
                role,
                'teams.global': true,
              })
          }

          if (reviewerRecord) {
            switch (reviewerRecord) {
              case 'submitted':
                queryBuilder.whereExists(
                  db('reviews')
                    .whereRaw('reviews.reviewer_id = users.id')
                    .whereRaw("reviews.status->>'submitted' = 'true'"),
                )
                break

              case 'invited':
                queryBuilder
                  .whereExists(
                    db('team_members as tm')
                      .join('teams as t', 't.id', 'tm.team_id')
                      .whereRaw('tm.user_id = users.id')
                      .where('t.role', REVIEWER_TEAM.role)
                      .where('t.global', false)
                      .whereIn('tm.status', [
                        'invited',
                        'acceptedInvitation',
                        'rejectedInvitation',
                      ]),
                  )
                  .whereNotExists(
                    db('reviews')
                      .whereRaw('reviews.reviewer_id = users.id')
                      .whereRaw("reviews.status->>'submitted' = 'true'"),
                  )
                break

              case 'notInvited':
                queryBuilder
                  .whereNotExists(
                    db('team_members as tm')
                      .join('teams as t', 't.id', 'tm.team_id')
                      .whereRaw('tm.user_id = users.id')
                      .where('t.role', REVIEWER_TEAM.role)
                      .where('t.global', false)
                      .whereIn('tm.status', [
                        'invited',
                        'acceptedInvitation',
                        'rejectedInvitation',
                      ]),
                  )
                  .whereNotExists(
                    db('reviews')
                      .whereRaw('reviews.reviewer_id = users.id')
                      .whereRaw("reviews.status->>'submitted' = 'true'"),
                  )
                break
              default:
                break
            }
          }

          if (search) {
            queryBuilder = queryBuilder
              // .withGraphJoined('defaultIdentity')
              .where(builder =>
                builder
                  .where('defaultIdentity.email', 'ilike', `%${search}%`)
                  .orWhere('users.displayName', 'ilike', `%${search}%`)
                  .orWhere('givenNames', 'ilike', `%${search}%`)
                  .orWhere('surname', 'ilike', `%${search}%`),
              )
          }

          if (expertise) {
            queryBuilder = queryBuilder.where(builder =>
              builder
                .whereJsonSupersetOf('users.courses_teaching', [expertise])
                .orWhereJsonSupersetOf('users.topics_reviewing', [expertise]),
            )
          }

          queryBuilder = queryBuilder.where(params)

          return applyListQueryOptions(queryBuilder, otherOptions)
        },
        {
          trx,
          passedTrxOnly: true,
        },
      )
    } catch (e) {
      logger.error('Base model: find failed', e)
      throw new Error(e)
    }
  }
}

module.exports = User
