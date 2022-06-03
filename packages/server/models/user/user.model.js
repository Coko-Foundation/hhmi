const UserModel = require('@coko/server/src/models/user/user.model')

const { modelTypes } = require('@coko/server')

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

        coursesTeaching: arrayOfStrings,
        topicsReviewing: arrayOfStrings,

        receivedTraining: booleanNullable,
        receivedInclusiveLanguageTraining: booleanNullable,

        source: stringNullable,

        profileSubmitted: boolean,
      },
    }
  }

  async getDisplayName() {
    if (this.displayName) return this.displayName
    return super.getDisplayName()
  }
}

module.exports = User
