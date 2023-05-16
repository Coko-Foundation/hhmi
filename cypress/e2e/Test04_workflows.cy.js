/* eslint-disable jest/expect-expect */

import { user, editor } from '../support/credentials'
import { workflowData, question } from '../support/appData'
import { laptop } from '../support/viewport'
import { dashboard, graphqlEndpoint } from '../support/routes'

describe('Question Workflows', () => {
  const { contact } = user
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
      `docker exec hhmi_server_1 node ./scripts/seedUser.js create ${contact.email}  profileSubmitted admin`,
    )
      .its('stdout')
      .should('contain', `user created with email - ${contact.email}.`)
      .should('contain', `user given admin role`)

    cy.exec(
      `docker exec hhmi_server_1 node ./scripts/seedUser.js create ${editor.email} profileSubmitted editor`,
    )
      .its('stdout')
      .should('contain', `user created with email - ${editor.email}.`)
      .should('contain', `user given editor role`)
    cy.exec(
      `docker exec hhmi_server_1 node ./scripts/seedQuestions.js create ${contact.username} -3 population`,
    )
      .its('stdout')
      .should(
        'contain',
        `question created under the author ${contact.username}`,
      )
    cy.exec(
      `docker exec hhmi_server_1 node ./scripts/seedQuestions.js create ${contact.username} -2 biochemistry`,
    )
      .its('stdout')
      .should(
        'contain',
        `question created under the author ${contact.username}`,
      )
  })
  beforeEach(() => {
    cy.intercept({ method: 'POST', url: graphqlEndpoint }).as('GQLReq')
    cy.viewport(laptop.preset)
  })
  it('Regular workflow', () => {
    const checkStage = (listItem, stage) => {
      const { operationBtn, prompt, success, QuestionStatus } =
        workflowData[stage]

      cy.get('[data-testid="list-item-wrapper"]')
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

      cy.get('[data-testid="list-item-wrapper"]')
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
    cy.get('[data-testid="list-item-wrapper"]')
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
    cy.wait('@GQLReq')

    cy.get('[data-testid="list-item-wrapper"]')
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
    cy.get('[data-testid="publish-question-btn"]').first().click()
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
