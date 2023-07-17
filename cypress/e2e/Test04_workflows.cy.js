/* eslint-disable jest/expect-expect */

import { admin, editor } from '../support/credentials'
import { workflowData, question } from '../support/appData'
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

        cy.get(anchorTags.discover).click()
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
        'Clicking "Yes, publish" will make the question discoverable for all website visitors in the Discover page',
      )
      cy.contains(buttonAntModalBody, 'Yes, publish').click()
      cy.wait('@GQLReq')
      cy.visit(discoverPage)
      cy.wait('@GQLReq')
      cy.contains('[class="ProseMirror"]', 'Question 1')
    })
  })
})
