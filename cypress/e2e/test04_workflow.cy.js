/* eslint-disable jest/expect-expect */

import { user, editor } from '../support/credentials'
import { workflowData, question } from '../support/appData'
import { laptop } from '../support/viewport'
import { dashboard, graphqlEndpoint } from '../support/routes'

describe('Question Workflows', () => {
  const { contact } = user
  before(() => {
    cy.exec('docker exec hhmi_server_1 node ./scripts/truncateDB.js')
    cy.exec('docker exec hhmi_server_1 node ./scripts/seedGlobalTeams.js')
    cy.exec(
      `docker exec hhmi_server_1 node ./scripts/seedUser.js create ${contact.email}  profileSubmitted admin`,
    )
    cy.exec(
      `docker exec hhmi_server_1 node ./scripts/seedUser.js create ${editor.email} profileSubmitted editor`,
    )
    cy.exec(
      `docker exec hhmi_server_1 node ./scripts/seedQuestions.js create ${contact.username} -2 population`,
    )
    cy.exec(
      `docker exec hhmi_server_1 node ./scripts/seedQuestions.js create ${contact.username} -2 biochemistry`,
    )
  })
  beforeEach(() => {
    cy.intercept({ method: 'POST', url: graphqlEndpoint }).as('GQLReq')
    cy.viewport(laptop.preset)
  })
  it('Regular workflow', () => {
    const checkStage = async (listItem, stage) => {
      const { operationBtn, prompt, success, QuestionStatus } =
        workflowData[stage]

      cy.get(
        'ul[class="ant-list-items"] li[class="List__ListItemWrapper-dan8sa-6 hYfqM"]',
      )
        .eq(listItem)
        .contains('p')
        .first()
        .click()
      cy.contains('[type="button"]', 'Export to Word')

      if (stage === 'publish') {
        cy.contains('[type="button"]', 'Do not accept').should('not.exist')
      } else {
        cy.contains('[type="button"]', 'Do not accept')
      }

      cy.contains('[type="button"]', operationBtn).click()
      cy.contains('[class="ant-modal-content"]', prompt.header)
      cy.contains('[class="ant-modal-content"]', prompt.body)
      cy.contains(
        'div[class="ant-modal-content"] button[type="button"]',
        prompt.okBtn,
      ).click()
      cy.wait('@GQLReq')
      cy.contains('[class="ant-modal-content"]', success.header)
      cy.contains('[class="ant-modal-content"]', success.body)
      cy.contains('[class="ant-modal-body"] [type="button"]', 'Ok').click()
      cy.visit(dashboard, { method: 'GET' })

      cy.get(
        'ul[class="ant-list-items"] li[class="List__ListItemWrapper-dan8sa-6 hYfqM"]',
      )
        .eq(listItem)
        .contains('[data-testid="question-status"]', QuestionStatus)
    }

    cy.login({ ...editor })

    // [segment]: Checking if questions don't appear in editor's authored questions
    cy.log("checking if questions appear in editor's authored questions...")
    cy.contains(
      '[class="ant-tabs-tab ant-tabs-tab-active"]',
      'Authored Questions',
    ).click()
    cy.get('[class="ant-list-empty-text"]').should('exist')

    cy.contains('[class="ant-tabs-tab"]', 'Editor Questions').click()
    checkStage(1, 'reject')
    checkStage(0, 'review')
    checkStage(0, 'production')

    // [segment]: editing question in production
    cy.log('checking question in production...')
    cy.get(
      'ul[class="ant-list-items"] li[class="List__ListItemWrapper-dan8sa-6 hYfqM"]',
    )
      .eq(0)
      .contains(
        'p',
        'Energy: carbohydrates :: structural materials: water nucleotides lipids proteins',
      )
      .click()

    cy.get('[class="ProseMirror"]').first().type('Production edit')
    cy.visit(dashboard, { method: 'GET' })

    checkStage(0, 'publish')

    // [segment]: checking  published questions
    cy.log('checking published questions...')

    cy.get('a[href="/discover"]').click()

    cy.get(
      'ul[class="ant-list-items"] li[class="List__ListItemWrapper-dan8sa-6 hYfqM"]',
    )
      .eq(0)
      .contains(
        'p',
        'Energy: carbohydrates :: structural materials: water nucleotides lipids proteins',
      )
  })
  it('Admin workflow', () => {
    cy.login({ ...contact })
    cy.get('[data-testid="create-question-btn"]').click()
    cy.get('[data-testid="submit-question-btn"]').should('not.exist')
    cy.fillQuestion(question)
    cy.get('[data-testid="publish-question-btn"]').click()
    cy.contains(
      '[class="ant-modal-confirm-title"]',
      'Are you sure you want to publish this question version?',
    )
    cy.contains(
      '[class="ant-modal-confirm-content"]',
      'Clicking "Yes, publish" will make the question discoverable for all website visitors in the Discover page',
    )
    cy.contains(
      '[class="ant-modal-body"] [type="button"]',
      'Yes, publish',
    ).click()
    cy.wait('@GQLReq')
    cy.visit('/discover')
    cy.contains('[class="ProseMirror"]', 'Question 1')
  })
})
