/* eslint-disable jest/expect-expect */
import { admin, editor, user2 } from '../../support/credentials'
import {
  complexItemSet1,
  complexItemSet2,
  complexItemSet3,
} from '../../support/appData'
import { laptop } from '../../support/viewport'
import {
  antTabs,
  listItemWrapper,
  anchorTags,
  ProseMirror,
} from '../../support/selectors'
import {
  dashboard as dashboardRoute,
  sets as setsPage,
  graphqlEndpoint,
} from '../../support/routes'

const disableScripts = false

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
    cy.get(listItemWrapper).eq(0).get(ProseMirror).click()
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
      .contains(ProseMirror, 'By 2040, the world s population')
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
        ProseMirror,
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
      .contains(ProseMirror, 'By 2040, the world s population')
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
        ProseMirror,
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
      .contains(ProseMirror, 'By 2040, the world s population')
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
      ProseMirror,
      `Energy: carbohydrates :: structural materials: water nucleotides lipids proteins`,
    )
  })
})
