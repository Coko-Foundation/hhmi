/* eslint-disable jest/expect-expect */

import { admin, editor, user2 } from '../support/credentials'
import { workflowData, question, complexItemSet1 } from '../support/appData'
import { laptop } from '../support/viewport'
import {
  createQuestionButton,
  buttonAntModalBody,
  antModalContent,
  antTabs,
  listItemWrapper,
  antModalConfirmTitle,
  submitQuestionButton,
  exportToWordButton,
  anchorTags,
} from '../support/selectors'
import {
  dashboard as dashboardRoute,
  discover as discoverPage,
  sets as setsPage,
  graphqlEndpoint,
} from '../support/routes'

describe('Question Workflows', () => {
  before(() => {
    cy.resetDB()
    cy.seedUser({ ...admin })
  })
  beforeEach(() => {
    cy.intercept({ method: 'POST', url: graphqlEndpoint }).as('GQLReq')
    cy.viewport(laptop.preset)
  })
  describe('Editor worflow', () => {
    before(() => {
      cy.seedUser({ ...editor })
      cy.seedQuestion(admin.username, -3, 'population', 'submitted')
      cy.seedQuestion(admin.username, -2, 'biochemistry', 'submitted')
    })
    after(() => {
      cy.deleteAllQuestions()
    })
    context('Managing Editor functionalities', () => {
      it('All submitted questions are listed', () => {
        cy.login({ ...editor })
        // [segment]: if questions appear in editor's authored questions tab
        cy.log("if questions appear in editor's authored questions tab...")
        cy.contains(
          '[class="ant-tabs-tab ant-tabs-tab-active"]',
          'Authored Questions',
        ).click()
        cy.get('[class="ant-list-empty-text"]').should('exist')
        // [segment]: if all questions appear in editor questions tab
        cy.log('if all questions appear in editor questions tab')
        cy.contains(antTabs, 'Editor Questions').click()
        cy.wait('@GQLReq')
        cy.get(listItemWrapper).should('have.length', 2)
      })
      it('overall flow', () => {
        const checkStage = (listItem, stage) => {
          const { operationBtn, prompt, success, QuestionStatus } =
            workflowData[stage]

          cy.get(listItemWrapper)
            .eq(listItem)
            .should('be.visible')
            .contains('p')
            .first()
            .click()
          // [segment]: checking buttons that should be visible based on the question status
          cy.contains(exportToWordButton, 'Export to Word')

          if (stage === 'publish') {
            cy.contains('[type="button"]', 'Do not accept').should('not.exist')
          } else {
            cy.contains('[type="button"]', 'Do not accept')
          }

          cy.contains('[type="button"]', operationBtn).click()
          cy.contains(antModalContent, prompt.header)
          cy.contains(antModalContent, prompt.body)
          cy.contains(
            'div[class="ant-modal-content"] button[type="button"]',
            prompt.okBtn,
          ).click()
          cy.wait('@GQLReq')
          cy.contains(antModalContent, success.header)
          cy.contains(antModalContent, success.body)
          cy.contains(buttonAntModalBody, 'Ok').click()
          cy.visit(dashboardRoute, { method: 'GET' })
          cy.wait('@GQLReq')
          cy.get(listItemWrapper)
            .eq(listItem)
            .should('be.visible')
            .contains('[data-testid="question-status"]', QuestionStatus)
        }

        cy.login({ ...editor })
        cy.contains(antTabs, 'Editor Questions').click()
        cy.wait('@GQLReq')
        checkStage(1, 'reject')
        checkStage(0, 'review')
        checkStage(0, 'production')
        // [segment]: editing question in production
        cy.log('checking question in production...')
        cy.get(listItemWrapper)
          .eq(0)
          .should('be.visible')
          .contains(
            'p',
            'Energy: carbohydrates :: structural materials: water nucleotides lipids proteins',
          )
          .click()
        cy.get('[class="ProseMirror"]').first().type('Production edit')
        cy.visit(dashboardRoute, { method: 'GET' })
        cy.wait('@GQLReq')
        checkStage(0, 'publish')
        // [segment]: checking  published questions
        cy.log('checking published questions...')
        cy.contains(anchorTags.discover, 'Browse Questions').click()
        cy.wait('@GQLReq')
        cy.get(listItemWrapper)
          .eq(0)
          .should('be.visible')
          .contains(
            'p',
            'Energy: carbohydrates :: structural materials: water nucleotides lipids proteins',
          )
      })
    })
  })
  describe('Admin worflow', () => {
    it('Publishing the question', () => {
      cy.login({ ...admin })
      cy.get(createQuestionButton).click()
      cy.get(submitQuestionButton).should('not.exist')
      cy.fillQuestion(question)
      cy.get('[data-testid="publish-question-btn"]').first().click()
      cy.contains(
        antModalConfirmTitle,
        'Are you sure you want to publish this question version?',
      )
      cy.contains(
        '[class="ant-modal-confirm-content"]',
        'Clicking "Yes, publish" will make the question discoverable for all website visitors in the Browse Questions Page.',
      )
      cy.contains(buttonAntModalBody, 'Yes, publish').click()
      cy.wait('@GQLReq')
      cy.visit(discoverPage)
      cy.wait('@GQLReq')
      cy.contains('[class="ProseMirror"]', 'Question 1')
      cy.deleteAllQuestions()
    })
    it('Assign author to a question', () => {
      cy.seedUser(user2)
      cy.seedQuestion(admin.username, -2, 'biochemistry', 'published')
      cy.login({ ...admin })
      cy.get(listItemWrapper).eq(0).get('p').click()
      cy.wait('@GQLReq')
      cy.get('[id="assignAuthor"]').first().click()
      cy.get('[data-testid="author-select"]').type(user2.username)
      cy.contains('.ant-select-dropdown', user2.username).click()
      cy.contains(
        '[class="ant-modal-footer"] button[type="button"]',
        'Yes, assign author',
      ).click()
      cy.contains(
        '[class="ant-modal-body"]',
        'This action is irreversible. You will not be able to change the author of this question again.',
      )
      cy.contains(
        '[class="ant-modal-footer"] button[type="button"]',
        'Assign',
      ).click()
      cy.wait('@GQLReq')
      cy.contains(
        '[class="ant-modal-confirm-content"]',
        `User ${user2.username} has been assgined as the author of this question`,
      )
      cy.contains(
        '[class="ant-modal-content"] button[type="button"]',
        'Ok',
      ).click()
      cy.logout()
      cy.login({ ...user2 })
      cy.get(listItemWrapper)
        .eq(0)
        .should('be.visible')
        .contains('.ProseMirror', 'Energy: carbohydrates')
    })
  })
})

describe('Complex item set workflows', () => {
  before(() => {
    cy.resetDB()
    cy.seedUser(admin)

    cy.seedComplexItemSet(
      admin.username,
      complexItemSet1.title,
      complexItemSet1.leadingContent,
    )
  })

  beforeEach(() => {
    cy.intercept({ url: graphqlEndpoint, method: 'POST' }).as('GQLReq')
    cy.viewport(laptop.preset)
  })

  it('Set created by a user must not be editable by other users', () => {
    cy.seedUser(user2)

    cy.login({ ...user2, visitUrl: setsPage })
    cy.wait('@GQLReq')
    cy.get(listItemWrapper).eq(0).contains('h2', complexItemSet1.title).click()
    cy.wait('@GQLReq')
    cy.contains(antTabs, 'Content').should('be.visible')
    cy.contains('h2', complexItemSet1.title).should('be.visible')
    cy.get(antTabs).contains('Edit').should('not.exist')
  })

  it('Editors should be able to edit any questions', () => {
    cy.seedUser(editor)

    cy.login({ ...editor, visitUrl: setsPage })
    cy.wait('@GQLReq')
    cy.get(listItemWrapper).eq(0).contains('h2', complexItemSet1.title).click()
    cy.wait('@GQLReq')
    cy.contains(antTabs, 'Content').should('be.visible')
    cy.contains('h2', complexItemSet1.title).should('be.visible')
    cy.get(antTabs).contains('Edit').should('exist')
  })
  it('Sets with submitted questions shouldnt be editable', () => {
    cy.seedQuestion(admin.username, -1, 'anatomy', 'submitted')

    cy.login({ ...admin, visit: dashboardRoute })
    cy.get(listItemWrapper).eq(0).get('.ProseMirror').click()
    cy.url().then(url => {
      const qId = url.split('/')[4]

      cy.addQuestionToComplexItemSet(complexItemSet1.title, qId)
    })
    cy.visit(setsPage, { method: 'GET' })
    cy.wait('@GQLReq')
    cy.get(listItemWrapper).eq(0).contains('h2', complexItemSet1.title).click()
    cy.wait('@GQLReq')
    cy.contains(antTabs, 'Content').should('be.visible')
    cy.contains('h2', complexItemSet1.title).should('be.visible')
    cy.get(antTabs).contains('Edit').should('not.exist')
  })
  it('Sets should only display published questions', () => {
    cy.exec(
      `docker exec hhmi_server_1 node ./scripts/seedQuestions.js create ${admin.username} -1 population submitted`,
    )
      .its('stdout')
      .should('contain', `question created under the author ${admin.username}`)
    cy.seedQuestion(admin.username, -1, 'population', 'submitted')

    cy.login({ ...admin, visit: dashboardRoute })
    cy.get(listItemWrapper)
      .eq(0)
      .contains('.ProseMirror', 'By 2040, the world s population')
      .click()
    cy.url().then(url => {
      const qId = url.split('/')[4]
      cy.exec(
        `docker exec hhmi_server_1 node ./scripts/seedComplexItemSet.js addQuestion "${complexItemSet1.title}" ${qId}`,
      )
        .its('stdout')
        .should(
          'contains',
          ` question - ${qId} added to set "${complexItemSet1.title}"`,
        )
    })

    // [segment]: checking if submitted questions are listed in the set
    cy.log('checking if submitted questions are listed in the set...')
    cy.visit(setsPage, { method: 'GET' })
    cy.wait('@GQLReq')

    cy.get(listItemWrapper).eq(0).contains('h2', complexItemSet1.title).click()
    cy.wait('@GQLReq')

    cy.get('div[class="ant-list-empty-text"]').should('exist')
    cy.visit(dashboardRoute, { method: 'GET' })
    cy.get(listItemWrapper)
      .eq(0)
      .contains('.ProseMirror', 'By 2040, the world s population')
      .click()
    cy.url().then(url => {
      const qId = url.split('/')[4]
      cy.exec(
        `docker exec hhmi_server_1 node ./scripts/seedQuestions.js updateStatus ${qId} published`,
      )
        .its('stdout')
        .should('contains', `question ${qId} updated to published`)
    })

    // [segment]: cheking if published questions are listed
    cy.log('cheking if published questions are listed...')
    cy.visit(setsPage, { method: 'GET' })
    cy.wait('@GQLReq')

    cy.get(listItemWrapper).eq(0).contains('h2', complexItemSet1.title).click()
    cy.wait('@GQLReq')

    cy.get(listItemWrapper)
      .eq(0)
      .contains('.ProseMirror', 'By 2040, the world s population')
    cy.get(listItemWrapper)
      .eq(0)
      .contains('[data-testid="question-status"]', 'Published')
  })
})
