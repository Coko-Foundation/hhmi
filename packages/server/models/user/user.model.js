const { logger, modelTypes, useTransaction } = require('@coko/server')
const UserModel = require('@coko/server/src/models/user/user.model')

const { applyListQueryOptions } = require('../helpers')

const { arrayOfStrings, boolean, booleanNullable, stringNullable } = modelTypes

class User extends UserModel {
  static get schema() {
    return {
      type: 'object',
      required: [],
      default: {
        coursesTeaching: [],
        topicsReviewing: [],
      },
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
      const { search = '', ...params } = data

      return useTransaction(
        async tr => {
          let queryBuilder = this.query(tr)

          if (search) {
            queryBuilder = queryBuilder
              .withGraphJoined('defaultIdentity')
              .where(builder =>
                builder
                  .where('defaultIdentity.email', 'ilike', `%${search}%`)
                  .orWhere('displayName', 'ilike', `%${search}%`),
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
