/* eslint-disable jest/expect-expect */
import {
  editor,
  user2,
  handlingEditor1,
  productionMember1,
  productionMember2,
} from '../support/credentials'
import { laptop } from '../support/viewport'
import { ProseMirror, antTabs, listItemWrapper } from '../support/selectors'
import { graphqlEndpoint } from '../support/routes'

const disableScripts = false

describe('ChatThreads', () => {
  before(() => {
    cy.resetDB(disableScripts)
    cy.seedUser(disableScripts, user2)
    cy.seedUser(disableScripts, { ...editor })
    cy.seedUser(disableScripts, handlingEditor1)
  })

  describe('General Tests', () => {
    before(() => {
      cy.viewport(laptop.preset)
      cy.deleteAllQuestions()
      cy.seedQuestion(
        disableScripts,
        user2.username,
        -3,
        'population',
        'submitted',
        handlingEditor1.username,
      )
      cy.login(user2)

      cy.get(listItemWrapper)
        .eq(0)
        .contains(
          'p',
          'By 2040, the world s population is expected to rise to approximately',
        )
        .click()
      cy.url().then(url => {
        const id = url.split('/')[4]
        cy.createChat(disableScripts, id)
      })
      cy.logout()
    })

    beforeEach(() => {
      cy.intercept({ method: 'POST', url: graphqlEndpoint }).as('GQLReq')
      cy.viewport(laptop.preset)

      cy.login(user2)
      cy.get(listItemWrapper)
        .eq(0)
        .contains(
          'p',
          'By 2040, the world s population is expected to rise to approximately',
        )
        .click()
      cy.contains(antTabs, 'Author chat').click()
      cy.reload()
    })

    it('sending a message', () => {
      cy.get('[placeholder="Write a message"]').type(
        'Morbi scelerisque justo et dictum. {enter}',
      )

      cy.contains(
        '[data-testid="author-message"]',
        'Morbi scelerisque justo et dictum',
      )
      cy.logout()
    })
    it('distinguishes author & participant messages', () => {
      cy.get('[placeholder="Write a message"]').type(
        'Proin pretium lacus in metus.{enter}',
      )
      cy.logout()
      cy.login(editor)
      cy.contains(antTabs, 'Editor Items').click()
      cy.get(listItemWrapper)
        .eq(0)
        .contains(
          'p',
          'By 2040, the world s population is expected to rise to approximately',
        )
        .click()
      cy.contains(antTabs, 'Author chat').click()

      cy.contains(
        '[data-testid="participant-message"]',
        'Proin pretium lacus in metus.',
      )
      cy.contains(
        '[data-testid="participant-message"] [data-testid="time-indicator"]',
        'a few seconds ago',
      )
      cy.get('[placeholder="Write a message"]').type(
        'Morbi scelerisque justo et dictum.{enter}',
      )

      cy.contains(
        '[data-testid="author-message"]',
        'Morbi scelerisque justo et dictum.',
      )
    })
    it('displays attachments', () => {
      cy.get('[aria-label="upload-attachments"]').selectFile(
        'cypress/fixtures/images/img12.png',
        { force: true },
      )
      cy.contains(
        '[class="ant-upload-list-item-container"] [class="ant-upload-list-item-name"]',
        'img12.png',
      )
      cy.get('[placeholder="Write a message"]').type('test file{enter}')
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000)

      // remove after subscription bug is fixed
      cy.reload()
      cy.contains(
        '[data-testid="author-message"] [data-testid="message-attachment"]',
        'img12.png',
      )
    })
  })

  describe('Author chat', () => {
    before(() => {
      cy.viewport(laptop.preset)
      cy.deleteAllQuestions(disableScripts)
      cy.seedQuestion(
        disableScripts,
        user2.username,
        -3,
        'population',
        'submitted',
        handlingEditor1.username,
      )
      cy.login(user2)

      cy.get(listItemWrapper)
        .eq(0)
        .contains(
          'p',
          'By 2040, the world s population is expected to rise to approximately',
        )
        .click()
      cy.url().then(url => {
        const id = url.split('/')[4]
        cy.createChat(disableScripts, id)
      })
      cy.logout()
    })

    beforeEach(() => {
      cy.intercept({ method: 'POST', url: graphqlEndpoint }).as('GQLReq')
      cy.viewport(laptop.preset)
    })

    context('Mentions', () => {
      beforeEach(() => {
        cy.login(editor)
        cy.contains(antTabs, 'Editor Items').click()
        cy.get(listItemWrapper)
          .eq(0)
          .contains(
            'p',
            'By 2040, the world s population is expected to rise to approximately',
          )
          .click()
        cy.contains(antTabs, 'Author chat').click()
        cy.reload()
      })

      it('displays correct participants', () => {
        cy.get('[placeholder="Write a message"]').type('@')
        cy.contains('[role="listbox"]', user2.username)
        cy.contains('[role="listbox"]', editor.username)
        cy.contains('[role="listbox"]', handlingEditor1.username)
      })

      it('highlights only participant usernames', () => {
        cy.get('[placeholder="Write a message"]').type('@')
        cy.contains('[role="option"]', editor.username).click()
        cy.get('[placeholder="Write a message"]').type('@user{enter}')
        cy.contains(
          '[data-testid="author-message"] [data-testid="user-mention"]',
          `${editor.username}`,
        )
      })
    })
  })

  describe('Production chat', () => {
    before(() => {
      cy.deleteAllQuestions(disableScripts)
      cy.seedUser(disableScripts, productionMember1)
      cy.seedUser(disableScripts, productionMember2)
      cy.seedQuestion(
        disableScripts,
        user2.username,
        -3,
        'anatomy',
        'underReview',
        handlingEditor1.username,
      )
    })
    beforeEach(() => {
      cy.intercept({ method: 'POST', url: graphqlEndpoint }).as('GQLReq')
      cy.viewport(laptop.preset)
    })

    it('Displays the right participants', () => {
      cy.deleteAllQuestions(disableScripts)
      cy.seedQuestion(
        disableScripts,
        user2.username,
        -3,
        'anatomy',
        'inProduction',
        handlingEditor1.username,
      )
      cy.login(editor)

      cy.contains(antTabs, 'Editor Items').click()
      cy.get(listItemWrapper)
        .eq(0)
        .contains(ProseMirror, 'What substance')
        .click()
      cy.contains(antTabs, 'Production chat').click()

      cy.get('[placeholder="Write a message"]').type('@')
      cy.contains('[role="listbox"]', editor.username)
      cy.contains('[role="listbox"]', handlingEditor1.username)
      cy.contains('[role="listbox"]', productionMember1.username)
      cy.contains('[role="listbox"]', productionMember2.username)
    })

    context('Visiblity', () => {
      beforeEach(() => {
        cy.intercept({ method: 'POST', url: graphqlEndpoint }).as('GQLReq')
        cy.viewport(laptop.preset)
      })
      it('only visible in production state', () => {
        cy.login(editor)
        cy.contains(antTabs, 'Editor Items').click()
        cy.get(listItemWrapper)
          .eq(0)
          .contains(ProseMirror, 'What substance')
          .click()
        cy.contains(antTabs, 'Production chat').should('not.exist')
      })
      it('should only be visible to editors and production team', () => {
        cy.login(editor)
        cy.contains(antTabs, 'Editor Items').click()
        cy.get(listItemWrapper)
          .eq(0)
          .contains(ProseMirror, 'What substance')
          .click()
        cy.url().then(url => {
          const id = url.split('/')[4]
          cy.updateQuestionStatus(false, id, 'inProduction')
        })
        cy.reload()
        cy.contains(antTabs, 'Production chat')
        cy.logout()
        // [segment]: Checking if the Production Assigments tab is visible to author
        cy.log(
          'Checking if the Production Assigments tab is visible to author...',
        )
        cy.login(user2)
        cy.get(listItemWrapper)
          .eq(0)
          .contains(ProseMirror, 'What substance')
          .click()
        cy.contains(antTabs, 'Production chat').should('not.exist')
      })
    })
  })
})
