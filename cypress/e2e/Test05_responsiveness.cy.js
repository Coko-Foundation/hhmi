/* eslint-disable jest/expect-expect */
import { mobile, laptop } from '../support/viewport'
import { editor as editorRole, generalUser } from '../support/credentials'
import { graphqlEndpoint } from '../support/routes'

describe('Testing apps responsiveness', () => {
  before(() => {
    cy.exec('docker exec hhmi_server_1 node ./scripts/truncateDB.js')
      .its('stdout')
      .should('contain', 'database cleared')
    cy.exec('docker exec hhmi_server_1 node ./scripts/seedGlobalTeams.js')
      .its('stdout')
      .should('contain', `Added global team "admin"`)
      .should('contain', `Added global team "reviewer"`)
      .should('contain', `Added global team "editor"`)
    cy.exec(
      `docker exec hhmi_server_1 node ./scripts/seedUser.js create ${generalUser.email} profileSubmitted reviewer`,
    )
      .its('stdout')
      .should('contain', `user created with email - ${generalUser.email}.`)
      .should('contain', `user given reviewer role`)
    cy.exec(
      `docker exec hhmi_server_1 node ./scripts/seedUser.js create ${editorRole.email} profileSubmitted editor`,
    )
      .its('stdout')
      .should('contain', `user created with email - ${editorRole.email}.`)
      .should('contain', `user given editor role`)

    cy.exec(
      `docker exec hhmi_server_1 node ./scripts/seedQuestions.js create ${generalUser.username} -2 population submitted`,
    )
      .its('stdout')
      .should(
        'contain',
        `question created under the author ${generalUser.username}`,
      )
  })

  describe('mobile view', () => {
    beforeEach(() => {
      cy.viewport(mobile.preset)
      cy.intercept('POST', graphqlEndpoint).as('GQLReq')
    })

    it('navigation bar', () => {
      cy.login(editorRole)
      cy.get('[href="/discover"]').should('not.be.visible')
      cy.get('[href="/dashboard"]').should('not.be.visible')
      cy.get('[href="/about"]').should('not.be.visible')
      cy.get('[href="/learning"]').should('not.be.visible')
      cy.get('[data-testid="nav-toggle"]').click()
      cy.get('[href="/discover"]').should('be.visible')
      cy.get('[href="/dashboard"]').should('be.visible')
      cy.get('[href="/about"]').should('be.visible')
      cy.get('[href="/learning"]').should('be.visible')
      cy.get('[data-testid="nav-toggle"]').click()
    })

    it('question page', () => {
      cy.login(editorRole)
      cy.get('[data-testid="create-question-btn"]').click({ force: true })
      cy.get('[data-testid="editor-collapse"]').should('exist')
      cy.get('[data-testid="metadata-collapse"]').should('exist')

      // [info]: making sure upload icon button is displayed instead of normal button
      cy.log(
        'making sure upload icon button is displayed instead of normal button...',
      )

      cy.get('[aria-label="upload"]').should('be.visible')
      cy.get('[data-testid="submit-question-btn"]').should('not.exist')
      cy.get('[data-testid="nav-toggle"]').click()
      cy.get('[href="/dashboard"]').click()
      cy.contains('Editor Questions').click()
      cy.wait('@GQLReq')

      cy.contains(
        'By 2040, the world s population is expected to rise to approximately 20 billion 10 billion 7 billion 9 billion',
      ).click()
      cy.get('[aria-label="More actions"]').click()

      // [segment]: checking popup content in submission stage
      cy.log('checking popup content in submission stage...')

      cy.contains(
        '[data-testid="editor-actions-popup"] [type="button"]',
        'Export to Word',
      ).should('be.visible')

      cy.contains(
        '[data-testid="editor-actions-popup"] [type="button"]',
        'Do not accept',
      ).should('be.visible')

      cy.contains(
        '[data-testid="editor-actions-popup"] [type="button"]',
        'Move to Review',
      ).click()
      cy.contains(
        '[class="ant-modal-body"] [type="button"]',
        'Move to review',
      ).click()

      cy.contains('[class="ant-modal-content"] [type="button"]', 'Ok').click()

      // [segment]: checking popup content in review stage
      cy.log('checking popup content in review stage...')

      cy.get('[aria-label="More actions"]').click()
      cy.contains(
        '[data-testid="editor-actions-popup"] [type="button"]',
        'Export to Word',
      )
      cy.contains(
        '[data-testid="editor-actions-popup"] [type="button"]',
        'Do not accept',
      )
      cy.contains(
        '[data-testid="editor-actions-popup"] [type="button"]',
        'Move to production',
      ).click()
      cy.contains(
        '[class="ant-modal-content"] [type="button"]',
        'Move to production',
      ).click()
      cy.contains('[class="ant-modal-content"] [type="button"]', 'Ok').click()

      // [segment]: checking popup content in production stage
      cy.log('checking popup content in production stage...')

      cy.get('[aria-label="More actions"]').click()
      cy.contains(
        '[data-testid="editor-actions-popup"] [type="button"]',
        'Export to Word',
      )
      cy.contains(
        '[data-testid="editor-actions-popup"] [type="button"]',
        'Publish',
      ).click({ force: true })
      cy.contains(
        '[class="ant-modal-content"] [type="button"]',
        'Yes, publish',
      ).click()
      cy.contains('[class="ant-modal-content"] [type="button"]', 'Ok').click()
    })

    it('discover page', () => {
      cy.visit('/discover')
      cy.wait('@GQLReq')
      cy.get('[data-testid="filter-collapse"]').should('exist')
    })
  })

  describe('desktop view', () => {
    beforeEach(() => {
      cy.viewport(laptop.preset)
      cy.intercept('POST', graphqlEndpoint).as('GQLReq')
    })

    /* eslint-disable-next-line jest/no-disabled-tests */
    it('navigation bar', () => {
      cy.login(editorRole)

      cy.get('[data-testid="nav-toggle"]').should('not.be.visible')
      cy.get('[href="/discover"]').should('be.visible')
      cy.get('[href="/dashboard"]').should('be.visible')
      cy.get('[href="/about"]').should('be.visible')
      cy.get('[href="/learning"]').should('be.visible')
    })

    /* eslint-disable-next-line jest/no-disabled-tests */
    it('question page', () => {
      cy.login(editorRole)

      cy.get('[data-testid="create-question-btn"]').click({ force: true })
      cy.get('[data-testid="editor-collapse"]').should('not.exist')
      cy.get('[data-testid="metadata-collapse"]').should('not.exist')
    })

    it('discover page', () => {
      cy.visit('/discover')
      cy.wait('@GQLReq')
      cy.get('[data-testid="filter-collapse"]').should('not.exist')
    })
  })
})
