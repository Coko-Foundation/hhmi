const UserModel = require('@coko/server/src/models/user/user.model')

const { modelTypes } = require('@coko/server')

const { boolean, booleanNullable, integerPositive, stringNullable } = modelTypes

// : {
//   id,
//   arrayOfStrings,
//   boolean,
//   objectNullable,
//   stringNullable,
//   arrayOfObjectsNullable,
// }

// - identity groups
// - institution name
// - type of school
// - type of institution (high school type / higher ed type) (this is very confusing)
// - number of students enrolled at your school/institution
// - are you interested in being a reviewer?
// - what courses do you teach?
// - topics to review (list)

/**
 * what is required here
 * are we overriding anything with display name?
 * how does the answer to give all the reviewers with topic x work like if the topics are just a field here?
 *
 * is pronoun a preselected list or free text?
 * what are the identity group options?
 * is state required, but only if country is us?
 * state and country select lists or free text?
 * school or institution? we seem to use those two interchangably
 * type of school & type of institution / high school type / higher ed type -> confused | figma only
 */

class User extends UserModel {
  static get schema() {
    return {
      type: 'object',
      required: [],
      properties: {
        middleName: stringNullable,
        displayName: stringNullable,
        // phone -- need formatting rule (only + and numbers?)
        city: stringNullable,
        // state
        // country
        address: stringNullable,
        position: stringNullable,
        teachingExperienceYears: integerPositive,
        receivedTraining: booleanNullable,
        receivedInclusiveLanguageTraining: booleanNullable,
        source: stringNullable,

        profileSubmitted: boolean,
      },
    }
  }
}

module.exports = User
