/* eslint-disable jest/expect-expect */
import { user2 } from '../support/credentials'
import { laptop } from '../support/viewport'
import {
  complexItemSet1,
  complexItemSet2,
  complexItemSet3,
} from '../support/appData'
import { graphqlEndpoint } from '../support/routes'
import {
  anchorTags,
  antTabs,
  createQuestionButton,
  listItemWrapper,
} from '../support/selectors'

describe('Complex item set', () => {
  before(() => {
    cy.resetDB()

    cy.seedUser(user2)

    cy.seedComplexItemSet(
      user2.username,
      complexItemSet1.title,
      complexItemSet1.leadingContent,
    )
  })
  beforeEach(() => {
    cy.viewport(laptop.preset)
    cy.intercept({ method: 'POST', url: graphqlEndpoint }).as('GQLReq')

    cy.login({ ...user2 })
  })

  it('checking if the set displays correct info from the database', () => {
    cy.get(anchorTags.sets).click()
    cy.wait('@GQLReq')
    cy.get(listItemWrapper).eq(0).contains('h2', complexItemSet1.title)
    cy.get(listItemWrapper)
      .eq(0)
      .contains('.ProseMirror', complexItemSet1.leadingContent)
    cy.get(listItemWrapper)
      .eq(0)
      .contains("[data-testid='author-value']", user2.username)
  })

  it('create complex item set', () => {
    // [segment]: creating a complex item set
    cy.log('creating a complex item set...')
    cy.get(anchorTags.sets).click()
    cy.contains('button', 'Create Set').click()
    cy.contains('label', 'Complex item set title')
    cy.get('input[id="title"]').type(complexItemSet2.title)
    cy.get('.ProseMirror').type(complexItemSet2.leadingContent)
    cy.contains('button[type="submit"]', 'Save').click()
    cy.wait('@GQLReq')
    cy.contains('Complex item set wax created successfully!')
    cy.get(anchorTags.sets).click()
    cy.reload()
    cy.wait('@GQLReq')
    // [segment]: checking if correct complex item set info is displayed
    cy.log('checking if correct complex item set info is displayed...')
    cy.get(listItemWrapper).eq(1).contains('h2', complexItemSet2.title).click()
    cy.wait('@GQLReq')
    cy.contains('h2[data-testid="set-title"]', complexItemSet2.title)
    cy.contains(
      'div[data-testid="leading-content-wrapper"]',
      complexItemSet2.leadingContent,
    )
  })

  it('edit complex item set', () => {
    cy.get(anchorTags.sets).click()
    cy.get(listItemWrapper).eq(0).contains('h2', complexItemSet1.title).click()
    cy.contains(antTabs, 'Edit').click()

    cy.get('input[id="title"]')
      .should('not.be.disabled')
      .clear()
      .type('edited set')

    cy.get('.ProseMirror')
      .last()
      .type(`{selectall}{del} edited set description`)
    cy.contains('button[type="submit"]', 'Update').click()
    cy.wait('@GQLReq')
    cy.contains('div', 'Complex item set updated successfully')
  })

  context('add question to list', () => {
    before(() => {
      cy.seedComplexItemSet(
        user2.username,
        complexItemSet3.title,
        complexItemSet3.leadingContent,
      )
    })

    it('with "Add question to this set" button', () => {
      cy.get(anchorTags.sets).click()
      cy.wait('@GQLReq')

      cy.get(listItemWrapper)
        .eq(2)
        .contains('h2', complexItemSet3.title)
        .click()
      cy.get('button[title="Add question to this set"]').click()

      // [segment]: checking if the leading content is displayed above the editor
      cy.log('checking if the leading content is displayed above the editor...')
      cy.contains(
        'div[data-testid="leading-content-wrapper"]',
        complexItemSet3.leadingContent,
      )
      cy.get('[id="wax-editor"]').type('question 1')
      cy.url().then(url => {
        const qId = url.split('/')[4]

        cy.updateQuestionStatus(qId, 'published')
      })
      cy.get(anchorTags.sets).click()
      cy.wait('@GQLReq')

      cy.get(listItemWrapper)
        .eq(2)
        .contains('h2', complexItemSet3.title)
        .click()
      cy.wait('@GQLReq')
      // [segment]: checking if the question is listed in the set
      cy.log('checking if the question is listed in the set')
      cy.get(listItemWrapper).eq(0).contains('p', 'question 1')
      cy.deleteAllQuestions()
    })

    it('from the question page', () => {
      cy.get(anchorTags.dashboard).first().click()
      cy.wait('@GQLReq')
      cy.get(createQuestionButton).click()
      cy.get('input[data-testid="belongs-to-set-checkbox"]').click()
      cy.get('div[data-testid="complexItemSet-select"]').click()
      cy.contains(complexItemSet3.title).click({ force: true })
      cy.contains(
        'div[data-testid="leading-content-wrapper"]',
        complexItemSet3.leadingContent,
      )
      cy.get('[id="wax-editor"]').type('question 2')

      cy.url().then(url => {
        const qId = url.split('/')[4]
        cy.updateQuestionStatus(qId, 'published')
      })
      cy.get(anchorTags.sets).click()
      cy.wait('@GQLReq')

      cy.get(listItemWrapper)
        .eq(2)
        .contains('h2', complexItemSet3.title)
        .click()
      cy.wait('@GQLReq')

      // [segment]: checking if the question is listed in the set
      cy.log('checking if the question is listed in the set')

      cy.get(listItemWrapper).eq(0).contains('p', 'question 2')
    })
  })
})
