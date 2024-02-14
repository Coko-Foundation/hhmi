/* eslint-disable jest/expect-expect */
import { mobile, laptop } from '../support/viewport'
import {
  editor as editorRole,
  user1,
  user2,
  handlingEditor1,
} from '../support/credentials'
import {
  listItemWrapper,
  navToggle,
  buttonAntModalBody,
  createQuestionButton,
  submitQuestionButton,
  exportToWordButton,
  moreActionsToggle,
  anchorTags,
  antTabs,
  ProseMirror,
} from '../support/selectors'
import { discover as discoverPage, graphqlEndpoint } from '../support/routes'

const disableScripts = false
describe('Testing apps responsiveness', () => {
  before(() => {
    cy.resetDB(disableScripts)
    cy.seedUser(disableScripts, { ...user2 })
    cy.seedUser(disableScripts, { ...editorRole })
    cy.seedQuestion(
      disableScripts,
      user2.username,
      -2,
      'population',
      'submitted',
    )
  })

  describe('mobile view', () => {
    beforeEach(() => {
      cy.viewport(mobile.preset)
      cy.intercept('POST', graphqlEndpoint).as('GQLReq')
    })

    it('navigation bar', () => {
      cy.login(editorRole)
      cy.wait('@GQLReq')
      cy.get(anchorTags.discover).should('not.be.visible')
      cy.get(anchorTags.dashboard).should('not.be.visible')
      cy.get(anchorTags.about).should('not.be.visible')
      cy.get(anchorTags.learning).should('not.be.visible')
      cy.get(navToggle).click()
      cy.get(anchorTags.discover).should('be.visible')
      cy.get(anchorTags.dashboard).should('be.visible')
      cy.get(anchorTags.about).should('be.visible')
      cy.get(anchorTags.learning).should('be.visible')
      cy.get(navToggle).click()
    })

    it('question page', () => {
      cy.login(editorRole)
      cy.wait('@GQLReq')
      cy.get(createQuestionButton).click({ force: true })
      cy.get('[data-testid="editor-collapse"]').should('exist')
      cy.get('[data-testid="metadata-collapse"]').should('exist')

      // [segment]: making sure upload icon button is displayed instead of normal button
      cy.log(
        'making sure upload icon button is displayed instead of normal button...',
      )

      cy.contains('[aria-label="Submit"]', 'Submit').should('be.visible')
      cy.get('[id="exportToWord"]').should('be.visible')
      cy.get(submitQuestionButton).should('not.exist')
      cy.get(navToggle).click()
      cy.get(anchorTags.dashboard).click()
      cy.contains('Editor Items').click()
      cy.wait('@GQLReq')

      cy.get(listItemWrapper).eq(1).contains(ProseMirror, 'By 2040').click()

      cy.wait('@GQLReq')
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000)
      cy.get(moreActionsToggle).click()

      // [segment]: checking popup content in submission stage
      cy.log('checking popup content in submission stage...')

      cy.contains(exportToWordButton, 'Export to Word').should('be.visible')

      cy.contains(
        '[data-testid="editor-actions-popup"] [id="doNotAccept"]',
        'Do not accept',
      ).should('be.visible')

      cy.contains(
        '[data-testid="editor-actions-popup"] [id="moveToReview"]',
        'Move to review',
      ).click()
      cy.contains(buttonAntModalBody, 'Move to review').click()

      cy.contains(buttonAntModalBody, 'Ok').click()
      cy.wait('@GQLReq')

      // [segment]: checking popup content in review stage
      cy.log('checking popup content in review stage...')

      cy.get(moreActionsToggle, { timeout: 8000 }).click()
      cy.contains(exportToWordButton, 'Export to Word')
      cy.contains(
        '[data-testid="editor-actions-popup"] [id="doNotAccept"]',
        'Do not accept',
      )
      cy.contains(
        '[data-testid="editor-actions-popup"] [id="moveToProduction"]',
        'Move to production',
      ).click()
      cy.contains(buttonAntModalBody, 'Move to production').click()
      cy.contains(buttonAntModalBody, 'Ok').click()
      cy.wait('@GQLReq')

      // [segment]: checking popup content in production stage
      cy.log('checking popup content in production stage...')

      cy.get(moreActionsToggle, { timeout: 8000 }).click()
      cy.contains(
        '[data-testid="editor-actions-popup"] [type="button"]',
        'Export to Word',
      )
      cy.contains(
        '[data-testid="editor-actions-popup"] [type="button"]',
        'Publish',
      ).click({ force: true })
      cy.contains(buttonAntModalBody, 'Yes, publish').click()
      cy.contains(buttonAntModalBody, 'Ok').click()
    })

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

    it('navigation bar', () => {
      cy.login(editorRole)
      cy.wait('@GQLReq')
      cy.get(navToggle).should('not.be.visible')
      cy.get('[data-testid="nav-wrapper"]')
        .invoke('css', 'overflow', 'visible') // Change 'overflow' property to 'visible'
        .then(() => {
          cy.get(anchorTags.discover).should('be.visible')
          cy.get(anchorTags.dashboard).should('be.visible')
          cy.get(anchorTags.about).should('be.visible')
          cy.get(anchorTags.learning).should('be.visible')
        })
    })

    it('question page', () => {
      cy.login(editorRole)
      cy.wait('@GQLReq')
      cy.get(createQuestionButton).click({ force: true })
      cy.get('[data-testid="editor-collapse"]').should('not.exist')
      cy.get('[data-testid="metadata-collapse"]').should('not.exist')
    })

    it('discover page', () => {
      cy.visit(discoverPage)
      cy.wait('@GQLReq')
      cy.get('[data-testid="filter-collapse"]').should('not.exist')
    })
  })
})

describe('Search filter', () => {
  const { contact: user1Creds } = user1
  before(() => {
    cy.resetDB(disableScripts)
    cy.seedUser(disableScripts, { ...user1Creds })
    cy.seedUser(disableScripts, { ...user2 })
    cy.seedUser(disableScripts, { ...editorRole })
    cy.seedUser(disableScripts, { ...handlingEditor1 })
    cy.seedQuestion(disableScripts, user2.username, -3, 'anatomy', 'submitted')
    cy.seedQuestion(
      disableScripts,
      user1Creds.username,
      -2,
      'population',
      'submitted',
    )
  })

  beforeEach(() => {
    cy.intercept('POST', graphqlEndpoint).as('GQLReq')
    cy.viewport(laptop.preset)
  })

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('filter by author', () => {
    cy.login(editorRole)
    cy.contains(antTabs, 'Editor Items').click()
    cy.get('[data-testid="search-filtered"]')
      .last()
      .click()
      .then($search => {
        cy.get('ul[id="filterList"] li[id="Author"]').last().click()
        cy.get($search).last().type(`${user2.username}`)
        cy.get('[id="%"]').click({ force: true })
        cy.get($search).type('{enter}')
      })

    cy.get(listItemWrapper)
      .eq(0)
      .should('be.visible')
      .contains(
        ProseMirror,
        'What substance from Bacillus thuringiensis was most likely inserted into rice plants',
      )
  })

  it('filter by status', () => {
    cy.login(editorRole)
    cy.contains(antTabs, 'Editor Items').click()

    cy.get(listItemWrapper)
      .eq(1)
      .contains(ProseMirror, 'What substance from Bacillus')
      .click()

    cy.url().then(url => {
      const qId = url.split('/')[4]
      cy.updateQuestionStatus(disableScripts, qId, 'underReview')
      cy.get(anchorTags.dashboard).click({ force: true })
      cy.get('[data-testid="search-filtered"]')
        .last()
        .click()
        .then($search => {
          cy.get('ul[id="filterList"] li[id="Status"]').last().click()
          cy.get('ul[id="filterList"] li[id="Under Review"]').last().click()
          cy.get($search).type(`{enter}`)
        })

      cy.get(listItemWrapper)
        .eq(0)
        .contains(
          ProseMirror,
          'What substance from Bacillus thuringiensis was most likely inserted into rice plants',
        )
      cy.updateQuestionStatus(disableScripts, qId, 'published')
      cy.reload()
      cy.get('[data-testid="search-filtered"]')
        .last()
        .click()
        .then($search => {
          cy.get('ul[id="filterList"] li[id="Status"]').last().click()
          cy.get('ul[id="filterList"] li[id="Published"]').last().click()
          cy.get($search).type(`{enter}`)
        })
    })
  })

  it('filter by question that editors are assigned to', () => {
    cy.login(editorRole)
    cy.contains(antTabs, 'Editor Items').click()
    cy.seedQuestion(
      disableScripts,
      user2.username,
      -4,
      'biochemistry',
      'submitted',
      handlingEditor1.username,
    )
    cy.reload()
    cy.get('[data-testid="search-filtered"]')
      .last()
      .click()
      .then($search => {
        cy.get('ul[id="filterList"] li[id="Assigned to HE"]').last().click()
        cy.get('ul[id="filterList"] li[id="nuaduslaine"]').last().click()
        cy.get($search).type(`{enter}`)
      })
    cy.get(listItemWrapper)
      .eq(0)
      .contains(
        ProseMirror,
        'Energy: carbohydrates :: structural materials: water nucleotides lipids proteins',
      )
  })
})
