// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { login, signup, graphqlEndpoint } from './routes'
import { submitButton } from './selectors'

const selectData = section => {
  Object.values(section).forEach(data => {
    cy.get(data.selector, { force: true })
      .scrollIntoView()
      .should('be.visible', { timeout: 8000 })
      .click()
    cy.contains(data.value).click({ force: true })
  })
}

const selectDataWithoutParent = section => {
  cy.get(section.selector).should('be.visible').click()
  cy.contains(section.value).should('be.visible').click()
}

Cypress.Commands.add('login', ({ email, password, visitUrl }) => {
  cy.visit(visitUrl || login)
  cy.contains('button[type="button"]', 'Log in with Email').click()
  cy.get('input[id="email"]').type(email)
  cy.get('input[id="password"]').type(password)
  cy.intercept({ method: 'POST', url: graphqlEndpoint }).as('waitForLogin')
  cy.contains(submitButton, 'Log in').click()
  cy.wait('@waitForLogin')
})

Cypress.Commands.add('signup', ({ firstName, lastName, email, password }) => {
  cy.visit(signup)

  cy.get('input[id="firstName"]').type(firstName)
  cy.get('input[id="lastName"]').type(lastName)
  cy.get('input[id="email"]').type(email)
  cy.get('input[id="password"]').type(password)
  cy.get('input[id="confirmPassword"]').type(password)
  cy.get('input[id="agreedTc"]').click()
  cy.intercept({ method: 'POST', url: graphqlEndpoint }).as('waitForSignup')
  cy.contains(submitButton, 'Sign up').click()
  cy.wait('@waitForSignup')

  cy.contains('div', 'Sign up successful!', { timeout: 8000 })
  cy.contains(
    'div',
    "We've sent you a verification email. Click on the link in the email to activate your account.",
  )
})

Cypress.Commands.add(
  'fillQuestion',
  ({
    questionType,
    mainTopic,
    course,
    keywords,
    biointeractiveResources,
    cognitiveLevel,
    affectiveLevel,
    psychomotorLevel,
  }) => {
    cy.intercept('POST', graphqlEndpoint).as('GQLReq')
    selectData(mainTopic)
    selectData(course)
    keywords.value.forEach(keyword =>
      cy.get(keywords.selector).type(`${keyword}{enter}`),
    )
    cy.get(biointeractiveResources.selector).click()
    biointeractiveResources.values.forEach(key => {
      cy.get(biointeractiveResources.selector).type(key.slice(0, 10))
      cy.contains(key, { timeout: 50000 }).click({ force: true })
    })
    cy.get(biointeractiveResources.selector).click()

    // temporarily disabled affective level and psychomotorLevel from metadata form
    // selectDataWithoutParent(affectiveLevel)
    // selectDataWithoutParent(psychomotorLevel)
    selectDataWithoutParent(cognitiveLevel)

    // [info]: selecting multiple choice at last to avoid focus miss issue
    cy.get(questionType.selector)
      .scrollIntoView()
      .type(`${questionType.value}{enter}`)

    cy.get('.ProseMirror').first().type('Question 1', { force: true })
  },
)

Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="usermenu-btn"]').click()
  cy.get('[data-testid="logout-btn"]').click()
})

Cypress.Commands.add('resetDB', () => {
  cy.exec('docker exec hhmi_server_1 node ./scripts/truncateDB.js')
    .its('stdout')
    .should('contain', 'database cleared')
  cy.exec('docker exec hhmi_server_1 node ./scripts/seedGlobalTeams.js')
    .its('stdout')
    .should('contain', `Added global team "admin"`)
    .should('contain', `Added global team "reviewer"`)
    .should('contain', `Added global team "editor"`)
})

Cypress.Commands.add('seedUser', ({ email, role, profileSubmitted = true }) => {
  cy.exec(
    `docker exec hhmi_server_1 node ./scripts/seedUser.js create ${email} ${
      profileSubmitted ? 'profileSubmitted' : '_'
    } ${role || ''}`,
  )
    .its('stdout')
    .should('contain', `user created with email - ${email}.`)
    .should(`${role ? '' : 'not.'}contain`, `user given ${role} role`)
})

Cypress.Commands.add('seedQuestion', (username, date, metadata, status) => {
  cy.log(
    `docker exec hhmi_server_1 node ./scripts/seedQuestions.js create ${username} ${date} ${metadata} ${status}`,
  )
  cy.exec(
    `docker exec hhmi_server_1 node ./scripts/seedQuestions.js create ${username} ${date} ${metadata} ${status}`,
  )
    .its('stdout')
    .should(
      'contain',
      `question created under the author ${username} and is ${status}`,
    )
})

Cypress.Commands.add('deleteAllQuestions', () => {
  cy.exec('docker exec hhmi_server_1 node ./scripts/seedQuestions.js deleteAll')
    .its('stdout')
    .should('contain', 'Emptied questions and question_versions')
})

Cypress.Commands.add('seedList', (listName, username) => {
  cy.exec(
    `docker exec hhmi_server_1 node ./scripts/seedList.js create ${listName} ${username}`,
  )
    .its('stdout')
    .should('contain', `created ${listName} with author as ${username}`)
})

Cypress.Commands.add('addQuestionToList', (listName, questionId) => {
  cy.exec(
    `docker exec hhmi_server_1 node ./scripts/seedList addToList ${listName} ${questionId}`,
  )
    .its('stdout')
    .should(
      'contain',
      `added question with id - ${questionId} to list ${listName}`,
    )
})
