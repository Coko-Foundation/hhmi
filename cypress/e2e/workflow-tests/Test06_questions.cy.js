/* eslint-disable jest/expect-expect */

import {
  admin,
  editor,
  user2,
  handlingEditor1,
  handlingEditor2,
  productionMember1,
} from '../../support/credentials'
import { workflowData, question } from '../../support/appData'
import { laptop } from '../../support/viewport'
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
  antSelectItem,
  ProseMirror,
} from '../../support/selectors'
import {
  dashboard as dashboardRoute,
  discover as discoverPage,
  graphqlEndpoint,
} from '../../support/routes'

const disableScripts = false

/**
 *
 * @param {string} listItem - The index of question inside the wrapper
 * @param {string} stage - The stage in which the question page is going to be checked
 */
const checkStage = (listItem, stage) => {
  const { operationBtn, prompt, success, QuestionStatus } = workflowData[stage]

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

  // if (!isHE) {
  cy.get(listItemWrapper)
    .eq(listItem)
    .should('be.visible')
    .contains('[data-testid="question-status"]', QuestionStatus)
  // }
}

describe('Question Workflows', () => {
  before(() => {
    cy.resetDB(disableScripts)
    cy.seedUser(disableScripts, { ...admin })
    cy.seedUser(disableScripts, user2)
    cy.seedUser(disableScripts, { ...editor })
    cy.seedUser(disableScripts, handlingEditor1)
  })

  beforeEach(() => {
    cy.intercept({ method: 'POST', url: graphqlEndpoint }).as('GQLReq')
    cy.viewport(laptop.preset)
  })

  describe('Editor worflow', () => {
    before(() => {
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
          'Authored Items',
        ).click()
        cy.get('[class="ant-list-empty-text"]').should('exist')
        // [segment]: if all questions appear in editor items tab
        cy.log('if all questions appear in editor items tab')
        cy.contains(antTabs, 'Editor Items').click()
        cy.wait('@GQLReq')
        cy.get(listItemWrapper).should('have.length', 2)
      })
      it('Overall question flow', () => {
        cy.login({ ...editor })
        cy.contains(antTabs, 'Editor Items').click()
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
        cy.contains(anchorTags.discover, 'Browse Items').click()
        cy.wait('@GQLReq')
        cy.get(listItemWrapper)
          .eq(0)
          .should('be.visible')
          .contains(
            'p',
            'Energy: carbohydrates :: structural materials: water nucleotides lipids proteins',
          )
      })
      it('Should be able to edit published questions', () => {
        cy.deleteAllQuestions(disableScripts)
        cy.seedQuestion(
          disableScripts,
          user2.username,
          -6,
          'anatomy',
          'published',
        )
        cy.seedQuestion(
          disableScripts,
          editor.username,
          -6,
          'population',
          'published',
        )
        cy.login(editor)
        cy.contains(anchorTags.discover, 'Browse Items').click()
        cy.get(listItemWrapper).eq(0).contains('p', 'By 2040').click()
        cy.contains('button[type="button"]', 'Edit item').should('not.exist')
        cy.contains(anchorTags.discover, 'Browse Items').click()
        cy.get(listItemWrapper).eq(1).contains('p', 'What substance from')
        cy.contains('button[type="button"]', 'Edit item').should('not.exist')
      })

      context('Assign handling editor', () => {
        before(() => {
          cy.deleteAllQuestions()
          cy.seedUser(disableScripts, handlingEditor2)
          cy.seedQuestion(
            disableScripts,
            handlingEditor1.username,
            -2,
            'population',
            'submitted',
          )
          cy.seedQuestion(
            disableScripts,
            user2.username,
            -3,
            'biochemistry',
            'submitted',
          )
        })
        beforeEach(() => {
          cy.login(editor)
          cy.contains(antTabs, 'Editor Items').click()
          cy.wait('@GQLReq')
        })
        it('Assign HE to a single question', () => {
          cy.get(listItemWrapper, { force: true })
            .eq(0)
            .contains('p', 'By 2040,')
            .click({ force: true })
          cy.wait('@GQLReq')

          // [segment]: checking if HE is able to handle their authored question
          cy.log('checking if HE is able to handle their authored item...')
          cy.get('button[id="assignHE"]').first().click()
          cy.get('div[data-testid="handlingEditor-select"]').click()
          cy.contains(antSelectItem, handlingEditor1.username).click()
          cy.get('div[data-testid="handlingEditor-select"]').click()

          cy.contains(
            'div[class="ant-modal-footer"] button[type="button"]',
            'Assign',
          ).click()
          cy.wait('@GQLReq')
          cy.contains(
            '[class="ant-modal-body"]',
            `Selected Handling Editor couldn't be assigned for this item, because Handling editors cannot handle the items they authored.`,
          )

          cy.contains(
            '[class="ant-modal-content"] button[type="button"]',
            'Ok',
          ).click()

          //

          // [segment]: assign he
          cy.get('button[id="assignHE"]').first().click()
          cy.get('div[data-testid="handlingEditor-select"]').click()
          cy.contains(antSelectItem, handlingEditor2.username).click()
          cy.get('div[data-testid="handlingEditor-select"]').click()

          cy.contains(
            'div[class="ant-modal-footer"] button[type="button"]',
            'Assign',
          ).click()
          cy.wait('@GQLReq')

          cy.contains(
            '[class="ant-modal-body"]',
            `Handling editor assigned to the item successfully`,
          )

          cy.contains(anchorTags.dashboard, 'Dashboard', { force: true }).click(
            { force: true },
          )
          // [segment]: checking if he Assigned badge is displayed
          cy.log('checking if he Assigned badge is displayed')
          cy.get(listItemWrapper)
            .eq(0)
            .contains('[data-testid="status-wrapper"]', 'Assigned')
          //
        })
        it('Assign HE bulk action', () => {
          cy.get('[data-testid="select-all-checkbox"]')
            .should('be.enabled')
            .check()
            .check()
          // cy.get('[class="ant-checkbox-input"]').last().click()
          // eslint-disable-next-line cypress/no-unnecessary-waiting
          cy.wait(4000)
          cy.contains('button[type="button"]', 'Assign HE').click()
          cy.get('div[data-testid="handlingEditor-select"]').click()
          cy.contains(antSelectItem, handlingEditor1.username).click()
          cy.contains(antSelectItem, handlingEditor2.username).click()
          cy.get('div[data-testid="handlingEditor-select"]').click()

          cy.contains(
            'div[class="ant-modal-footer"] button[type="button"]',
            'Assign',
          ).click({ force: true })
          cy.contains(
            '[class="ant-modal-body"]',
            `Some Handling Editors couldn't be assigned for selected items, because Handling editors cannot handle the items they authored.`,
          )

          cy.contains(
            '[class="ant-modal-content"] button[type="button"]',
            'Ok',
          ).click()

          // [segment]: checking if question with conflict remains checked...
          cy.log('checking if question with conflict remains checked...')
          cy.get('[class="ant-checkbox-input"]').eq(1).should('be.checked')
        })

        it('unassign HE', () => {
          cy.seedQuestion(
            disableScripts,
            user2.username,
            -1,
            'anatomy',
            'submitted',
            handlingEditor1.username,
          )
          cy.reload()

          cy.get(listItemWrapper)
            .eq(0)
            .contains('p', 'What substance from Bacillus')
            .click()
          cy.get('[id="assignHE"]').first().click()
          cy.contains(
            '[data-testid="current-handling-editors"]',
            handlingEditor1.username,
          )
          cy.get(`[data-testid="unassign-${handlingEditor1.username}"]`).click()
          cy.contains(
            '[data-testid="current-handling-editors"]',
            handlingEditor1.username,
          ).should('not.exist')
        })
      })
    })
    context('Handling Editor functionalities', () => {
      before(() => {
        cy.deleteAllQuestions(disableScripts)
      })
      it('Only assinged questions are visible', () => {
        cy.seedQuestion(
          disableScripts,
          user2.username,
          -6,
          'anatomy',
          'submitted',
          handlingEditor1.username,
        )
        cy.login({ ...handlingEditor1 })
        cy.log("if questions appear in editor's authored questions tab...")
        cy.contains(antTabs, 'Authored Items').click()
        cy.get('[class="ant-list-empty-text"]').should('exist')
        cy.log('if all questions appear in editor questions tab')
        cy.contains(antTabs, 'Handling Editor Items').click()

        cy.wait('@GQLReq')
        cy.get(listItemWrapper).should('have.length', 1)
        cy.get(listItemWrapper)
          .eq(0)
          .should('be.visible')
          .contains(
            ProseMirror,
            'What substance from Bacillus thuringiensis was most likely inserted into rice plants',
          )
      })
      it("Shouldn't be able to edit published questions", () => {
        cy.seedQuestion(
          disableScripts,
          user2.username,
          -6,
          'anatomy',
          'published',
        )
        cy.seedQuestion(
          disableScripts,
          handlingEditor1.username,
          -6,
          'population',
          'published',
        )
        cy.login(handlingEditor1)
        cy.contains(anchorTags.discover, 'Browse Items').click()
        cy.get(listItemWrapper).eq(0).contains('p', 'By 2040').click()
        cy.contains('button[type="button"]', 'Edit item').should('not.exist')
        cy.contains(anchorTags.discover, 'Browse Items').click()
        cy.get(listItemWrapper)
          .eq(1)
          .contains('p', 'What substance from')
          .click()
        cy.contains('button[type="button"]', 'Edit item').should('not.exist')
      })
      it('Overall question workflow', () => {
        cy.deleteAllQuestions(disableScripts)
        cy.seedQuestion(
          disableScripts,
          user2.username,
          -2,
          'anatomy',
          'submitted',
          handlingEditor1.username,
        )
        cy.seedQuestion(
          disableScripts,
          user2.username,
          -3,
          'population',
          'submitted',
          handlingEditor1.username,
        )
        cy.login(handlingEditor1)
        cy.contains(antTabs, 'Handling Editor Items').click()
        checkStage(1, 'reject')
        checkStage(0, 'review')
        checkStage(0, 'production')
        checkStage(0, 'publish')
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
        'Are you sure you want to publish this item version?',
      )
      cy.contains(
        '[class="ant-modal-confirm-content"]',
        'Clicking "Yes, publish" will make this item discoverable for all website visitors in the Browse Items Page.',
      )
      cy.contains(buttonAntModalBody, 'Yes, publish').click()
      cy.wait('@GQLReq')
      cy.visit(discoverPage)
      cy.wait('@GQLReq')
      cy.contains('[class="ProseMirror"]', 'Question 1')
      cy.deleteAllQuestions(disableScripts)
    })
    it('Assign author to a question', () => {
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
        'This action is irreversible. You will not be able to change the author of this item again.',
      )
      cy.contains(
        '[class="ant-modal-footer"] button[type="button"]',
        'Assign',
      ).click()
      cy.wait('@GQLReq')
      cy.contains(
        '[class="ant-modal-confirm-content"]',
        `User ${user2.username} has been assgined as the author of this item`,
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
        .contains(ProseMirror, 'Energy: carbohydrates')
    })
    it('Should be able to edit published questions', () => {
      cy.deleteAllQuestions()
      cy.seedQuestion(
        disableScripts,
        user2.username,
        -6,
        'anatomy',
        'published',
      )
      cy.seedQuestion(
        disableScripts,
        admin.username,
        -6,
        'population',
        'published',
      )
      cy.login(admin)
      cy.contains(anchorTags.discover, 'Browse Items').click()
      cy.get(listItemWrapper).eq(0).contains('p', 'By 2040').click()
      cy.contains('button[type="button"]', 'Edit item').should('not.exist')
      cy.contains(anchorTags.discover, 'Browse Items').click()
      cy.get(listItemWrapper).eq(1).contains('p', 'What substance from')
      cy.contains('button[type="button"]', 'Edit item').should('not.exist')
    })
  })

  describe('Production team worflow', () => {
    before(() => {
      cy.seedUser(disableScripts, productionMember1)
      cy.seedQuestion(
        disableScripts,
        user2.username,
        -4,
        'population',
        'inProduction',
      )
    })

    it('Question in production stage available for editing', () => {
      cy.login(productionMember1)
      cy.contains(antTabs, 'Production Items').click()
      cy.get(listItemWrapper).eq(0).contains(ProseMirror, 'By 2040').click()
      cy.get('[data-testid="topic-select"]').scrollIntoView().click()
      cy.contains('Ecology').click({ force: true })
      cy.get('[data-testid="subtopic-select"]').scrollIntoView().click()
      cy.contains('Matter & Energy').click({ force: true })
      cy.get('[data-testid="publish-question-btn"]').first().click()
      cy.contains(
        '[class="ant-modal-body"] button[type="button"]',
        'Yes, publish',
      ).click()
      cy.contains(
        '[class="ant-modal-body"] [class="ant-modal-confirm-content"]',
        'Item was published and is now available in the Browse Items page',
      )
    })
  })
})
