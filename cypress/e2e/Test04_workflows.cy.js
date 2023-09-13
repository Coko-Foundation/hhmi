/* eslint-disable jest/expect-expect */

import { admin, editor, user2 } from '../support/credentials'
import {
  workflowData,
  question,
  complexItemSet1,
  complexItemSet2,
  complexItemSet3,
} from '../support/appData'
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

const disableScripts = false
describe('Question Workflows', () => {
  before(() => {
    cy.resetDB(disableScripts)
    cy.seedUser(disableScripts, { ...admin })
  })
  beforeEach(() => {
    cy.intercept({ method: 'POST', url: graphqlEndpoint }).as('GQLReq')
    cy.viewport(laptop.preset)
  })
  describe('Editor worflow', () => {
    before(() => {
      cy.seedUser(disableScripts, { ...editor })
      cy.seedQuestion(
        disableScripts,
        admin.username,
        -3,
        'population',
        'submitted',
      )
      cy.seedQuestion(
        disableScripts,
        admin.username,
        -2,
        'biochemistry',
        'submitted',
      )
    })
    after(() => {
      cy.deleteAllQuestions(disableScripts)
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
      cy.deleteAllQuestions(disableScripts)
    })
    it('Assign author to a question', () => {
      cy.seedUser(disableScripts, user2)
      cy.seedQuestion(
        disableScripts,
        admin.username,
        -2,
        'biochemistry',
        'published',
      )
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
    cy.resetDB(disableScripts)
    cy.seedUser(disableScripts, admin)
    cy.seedUser(disableScripts, user2)

    cy.seedComplexItemSet(
      disableScripts,
      admin.username,
      complexItemSet1.title,
      complexItemSet1.leadingContent,
    )
  })

  beforeEach(() => {
    cy.intercept({ url: graphqlEndpoint, method: 'POST' }).as('GQLReq')
    cy.viewport(laptop.preset)
  })

  // eslint-disable-next-line jest/no-disabled-tests
  it.skip("Set shouldn't be visible to other user's without a published question", () => {
    cy.login({ ...user2, visitUrl: setsPage })
    cy.wait('@GQLReq')
    cy.contains(`[class="ant-empty-description"]`, 'No Data')
  })

  it('Editors should be able to edit any questions', () => {
    cy.seedUser(disableScripts, editor)

    cy.login({ ...editor, visitUrl: setsPage })
    cy.wait('@GQLReq')
    cy.get(listItemWrapper).eq(0).contains('h2', complexItemSet1.title).click()
    cy.wait('@GQLReq')
    cy.contains(antTabs, 'Content').should('be.visible')
    cy.contains('h2', complexItemSet1.title).should('be.visible')
    cy.get(antTabs).contains('Edit').should('exist')
  })
  it('Sets with submitted questions shouldnt be editable', () => {
    cy.seedQuestion(disableScripts, admin.username, -1, 'anatomy', 'submitted')

    cy.login({ ...admin, visit: dashboardRoute })
    cy.get(listItemWrapper).eq(0).get('.ProseMirror').click()
    cy.url().then(url => {
      const qId = url.split('/')[4]

      cy.addQuestionToComplexItemSet(disableScripts, complexItemSet1.title, qId)
    })
    cy.visit(setsPage, { method: 'GET' })
    cy.wait('@GQLReq')
    cy.get(listItemWrapper).eq(0).contains('h2', complexItemSet1.title).click()
    cy.wait('@GQLReq')
    cy.contains(antTabs, 'Content').should('be.visible')
    cy.contains('h2', complexItemSet1.title).should('be.visible')
    cy.get(antTabs).contains('Edit').should('not.exist')
  })

  it('Sets should only display published questions to other users', () => {
    cy.deleteAllQuestions(disableScripts)
    cy.seedQuestion(
      disableScripts,
      admin.username,
      -1,
      'population',
      'submitted',
    )
    cy.seedQuestion(
      disableScripts,
      admin.username,
      -2,
      'biochemistry',
      'submitted',
    )
    cy.login({ ...admin, visitUrl: dashboardRoute })
    cy.get(listItemWrapper)
      .eq(0)
      .contains('.ProseMirror', 'By 2040, the world s population')
      .click()
    cy.url().then(url => {
      const qId = url.split('/')[4]
      cy.addQuestionToComplexItemSet(disableScripts, complexItemSet1.title, qId)
      cy.updateQuestionStatus(disableScripts, qId, 'published')
    })
    cy.visit(dashboardRoute, { method: 'GET' })
    cy.get(listItemWrapper)
      .eq(1)
      .contains(
        '.ProseMirror',
        'Energy: carbohydrates :: structural materials: water nucleotides lipids proteins',
      )
      .click()
    cy.url().then(url => {
      const qId = url.split('/')[4]

      cy.addQuestionToComplexItemSet(disableScripts, complexItemSet1.title, qId)
    })
    cy.logout()

    cy.login({ ...user2, visitUrl: setsPage })

    // [segment]: cheking if published questions are listed
    cy.log('cheking if published questions are listed...')

    cy.get(listItemWrapper).eq(0).contains('h2', complexItemSet1.title).click()
    cy.wait('@GQLReq')

    cy.get(listItemWrapper)
      .eq(0)
      .contains('.ProseMirror', 'By 2040, the world s population')
    cy.get(listItemWrapper)
      .eq(0)
      .contains('[data-testid="question-status"]', 'Published')
    // [segment]: checking if submitted questions are listed in the set
    cy.log('checking if submitted questions are listed in the set...')
    cy.contains(
      'Energy: carbohydrates :: structural materials: water nucleotides lipids proteins',
    ).should('not.exist')
  })
  it('Only published sets must be visible in discover page for non logged in users', () => {
    cy.deleteAllQuestions(disableScripts)
    cy.seedComplexItemSet(
      disableScripts,
      admin.username,
      complexItemSet2.title,
      complexItemSet2.leadingContent,
    )
    cy.seedComplexItemSet(
      disableScripts,
      admin.username,
      complexItemSet3.title,
      complexItemSet3.leadingContent,
    )
    cy.seedQuestion(
      disableScripts,
      admin.username,
      -2,
      'biochemistry',
      'submitted',
    )
    cy.seedQuestion(
      disableScripts,
      admin.username,
      -3,
      'population',
      'submitted',
    )
    cy.login(admin)
    cy.get(listItemWrapper)
      .eq(0)
      .contains(
        '.ProseMirror',
        'Energy: carbohydrates :: structural materials: water nucleotides lipids proteins',
      )
      .click()

    cy.url().then(url => {
      const qId = url.split('/')[4]
      cy.addQuestionToComplexItemSet(disableScripts, complexItemSet2.title, qId)
      cy.updateQuestionStatus(disableScripts, qId, 'published')
    })
    cy.get(anchorTags.dashboard).click()
    cy.get(listItemWrapper)
      .eq(1)
      .contains('.ProseMirror', 'By 2040, the world s population')
      .click()
    cy.url().then(url => {
      const qId = url.split('/')[4]
      cy.addQuestionToComplexItemSet(disableScripts, complexItemSet3.title, qId)
    })
    cy.logout()
    cy.get(anchorTags.discover).click()
    cy.get('[data-testid="complex-item-set-select"]').click()
    cy.contains(
      '[class="ant-select-item-option-content"]',
      complexItemSet2.title,
    )
    cy.contains(
      '[class="ant-select-item-option-content"]',
      complexItemSet3.title,
    ).should('not.exist')

    // [segment]: checking if published set question appears
    cy.contains(
      '.ProseMirror',
      `Energy: carbohydrates :: structural materials: water nucleotides lipids proteins`,
    )
  })
})
