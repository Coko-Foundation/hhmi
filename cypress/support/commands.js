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
  cy.get('[type="submit"]').click()
  cy.contains('[role="alert"]', 'Email is required')
  cy.contains('[role="alert"]', 'Password is required')
  cy.contains('a[href="/request-password-reset"]', 'Forgot your password?')
  cy.contains('a[href="/signup"]', 'Do you want to signup instead?')
  cy.get('[id="email"]').type(email)
  cy.get('[id="password"]').type(password)
  cy.intercept({ method: 'POST', url: graphqlEndpoint }).as('waitForLogin')
  cy.get('[type="submit"]').click()
  cy.wait('@waitForLogin')
})

Cypress.Commands.add('signup', ({ firstName, lastName, email, password }) => {
  cy.visit(signup)
  cy.get('[type="submit"]').click()
  cy.contains('[role="alert"]', 'First name is required')
  cy.contains('[role="alert"]', 'Last name is required')
  cy.contains('[role="alert"]', 'Email is required')
  cy.contains('[role="alert"]', 'Password is required')
  cy.contains('[role="alert"]', 'Please confirm your password!')

  cy.get('[id="firstName"]').type(firstName)
  cy.get('[id="lastName"]').type(lastName)
  cy.get('[id="email"]').type(email)
  cy.get('[id="password"]').type(password)
  cy.get('[id="confirmPassword"]').type(password)
  cy.get('[id="agreedTc"]').click()
  cy.intercept({ method: 'POST', url: graphqlEndpoint }).as('waitForSignup')
  cy.get('[type="submit"]').click()
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
    cy.get(questionType.selector).click()
    cy.contains(questionType.value).click()
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
    selectDataWithoutParent(affectiveLevel)
    selectDataWithoutParent(psychomotorLevel)
    selectDataWithoutParent(cognitiveLevel)

    cy.get('.ProseMirror').first().type('Question 1', { force: true })
  },
)

Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="usermenu-btn"]').click()
  cy.get('[data-testid="logout-btn"]').click()
})
