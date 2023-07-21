/* eslint-disable jest/no-commented-out-tests */
/* eslint-disable jest/expect-expect */
import { mobile, laptop } from '../support/viewport'
import { editor as editorRole, user2 } from '../support/credentials'
// import {
//   navToggle,
//   buttonAntModalBody,
//   createQuestionButton,
//   submitQuestionButton,
//   exportToWordButton,
//   moreActionsToggle,
//   anchorTags,
// } from '../support/selectors'
import { discover as discoverPage, graphqlEndpoint } from '../support/routes'

describe('Testing apps responsiveness', () => {
  before(() => {
    cy.resetDB()
    cy.seedUser({ ...user2 })
    cy.seedUser({ ...editorRole })
    cy.seedQuestion(user2.username, -2, 'population', 'submitted')
  })

  describe('mobile view', () => {
    beforeEach(() => {
      cy.viewport(mobile.preset)
      cy.intercept('POST', graphqlEndpoint).as('GQLReq')
    })

    // it('navigation bar', () => {
    //   cy.login(editorRole)
    //   cy.wait('@GQLReq')
    //   cy.get(anchorTags.discover).should('not.be.visible')
    //   cy.get(anchorTags.dashboard).should('not.be.visible')
    //   cy.get(anchorTags.about).should('not.be.visible')
    //   cy.get(anchorTags.learning).should('not.be.visible')
    //   cy.get(navToggle).click()
    //   cy.get(anchorTags.discover).should('be.visible')
    //   cy.get(anchorTags.dashboard).should('be.visible')
    //   cy.get(anchorTags.about).should('be.visible')
    //   cy.get(anchorTags.learning).should('be.visible')
    //   cy.get(navToggle).click()
    // })

    // it('question page', () => {
    //   cy.login(editorRole)
    //   cy.wait('@GQLReq')
    //   cy.get(createQuestionButton).click({ force: true })
    //   cy.get('[data-testid="editor-collapse"]').should('exist')
    //   cy.get('[data-testid="metadata-collapse"]').should('exist')

    //   // [segment]: making sure upload icon button is displayed instead of normal button
    //   cy.log(
    //     'making sure upload icon button is displayed instead of normal button...',
    //   )

    //   cy.get('[aria-label="upload"]').should('be.visible')
    //   cy.get(submitQuestionButton).should('not.exist')
    //   cy.get(navToggle).click()
    //   cy.get(anchorTags.dashboard).click()
    //   cy.contains('Editor Questions').click()
    //   cy.wait('@GQLReq')

    //   cy.contains(
    //     'By 2040, the world s population is expected to rise to approximately 20 billion 10 billion 7 billion 9 billion',
    //   ).click()

    //   cy.wait('@GQLReq')
    //   // eslint-disable-next-line cypress/no-unnecessary-waiting
    //   cy.wait(4000)
    //   cy.get(moreActionsToggle).click()

    //   // [segment]: checking popup content in submission stage
    //   cy.log('checking popup content in submission stage...')

    //   cy.contains(exportToWordButton, 'Export to Word').should('be.visible')

    //   cy.contains(
    //     '[data-testid="editor-actions-popup"] [id="doNotAccept"]',
    //     'Do not accept',
    //   ).should('be.visible')

    //   cy.contains(
    //     '[data-testid="editor-actions-popup"] [id="moveToReview"]',
    //     'Move to review',
    //   ).click()
    //   cy.contains(buttonAntModalBody, 'Move to review').click()

    //   cy.contains(buttonAntModalBody, 'Ok').click()
    //   cy.wait('@GQLReq')

    //   // [segment]: checking popup content in review stage
    //   cy.log('checking popup content in review stage...')

    //   cy.get(moreActionsToggle, { timeout: 8000 }).click()
    //   cy.contains(exportToWordButton, 'Export to Word')
    //   cy.contains(
    //     '[data-testid="editor-actions-popup"] [id="doNotAccept"]',
    //     'Do not accept',
    //   )
    //   cy.contains(
    //     '[data-testid="editor-actions-popup"] [id="moveToProduction"]',
    //     'Move to production',
    //   ).click()
    //   cy.contains(buttonAntModalBody, 'Move to production').click()
    //   cy.contains(buttonAntModalBody, 'Ok').click()
    //   cy.wait('@GQLReq')

    //   // [segment]: checking popup content in production stage
    //   cy.log('checking popup content in production stage...')

    //   cy.get(moreActionsToggle, { timeout: 8000 }).click()
    //   cy.contains(
    //     '[data-testid="editor-actions-popup"] [type="button"]',
    //     'Export to Word',
    //   )
    //   cy.contains(
    //     '[data-testid="editor-actions-popup"] [type="button"]',
    //     'Publish',
    //   ).click({ force: true })
    //   cy.contains(buttonAntModalBody, 'Yes, publish').click()
    //   cy.contains(buttonAntModalBody, 'Ok').click()
    // })

    it('discover page', () => {
      cy.visit(discoverPage)
      cy.wait('@GQLReq')
      cy.get('[data-testid="filter-collapse"]').should('exist')
    })
  })

  describe('desktop view', () => {
    beforeEach(() => {
      cy.viewport(laptop.preset)
      cy.intercept('POST', graphqlEndpoint).as('GQLReq')
    })

    // it('navigation bar', () => {
    //   cy.login(editorRole)
    //   cy.wait('@GQLReq')
    //   cy.get(navToggle).should('not.be.visible')
    //   cy.get(anchorTags.discover).should('be.visible')
    //   cy.get(anchorTags.dashboard).should('be.visible')
    //   cy.get(anchorTags.about).should('be.visible')
    //   cy.get(anchorTags.learning).should('be.visible')
    // })

    // it('question page', () => {
    //   cy.login(editorRole)
    //   cy.wait('@GQLReq')
    //   cy.get(createQuestionButton).click({ force: true })
    //   cy.get('[data-testid="editor-collapse"]').should('not.exist')
    //   cy.get('[data-testid="metadata-collapse"]').should('not.exist')
    // })

    it('discover page', () => {
      cy.visit(discoverPage)
      cy.wait('@GQLReq')
      cy.get('[data-testid="filter-collapse"]').should('not.exist')
    })
  })
})
