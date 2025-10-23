/* eslint-disable jest/expect-expect */
import { user2 } from '../support/credentials'
import { laptop } from '../support/viewport'
import {
  complexItemSet1,
  complexItemSet2,
  complexItemSet3,
} from '../support/appData'
import {
  anchorTags,
  antTabs,
  createQuestionButton,
  listItemWrapper,
  ProseMirror,
} from '../support/selectors'

const disableScripts = false

describe('Context-dependent item set', () => {
  before(() => {
    cy.resetDB(disableScripts)

    cy.seedUser(disableScripts, user2)

    cy.seedComplexItemSet(
      disableScripts,
      user2.username,
      complexItemSet1.title,
      complexItemSet1.leadingContent,
    )
  })
  beforeEach(() => {
    cy.viewport(laptop.preset)
    cy.login({ ...user2 })
  })

  it('checking if the set displays correct info from the database', () => {
    cy.get(anchorTags.sets).click({ force: true })
    cy.get(listItemWrapper).eq(0).contains('h2', complexItemSet1.title)
    cy.get(listItemWrapper)
      .eq(0)
      .contains(ProseMirror, complexItemSet1.leadingContent)
    cy.get(listItemWrapper)
      .eq(0)
      .contains("[data-testid='author-value']", user2.username)
  })

  it('create context-dependent item set', () => {
    // [segment]: creating a complex item set
    cy.log('creating a context-dependent item set...')
    cy.get(anchorTags.sets).click({ force: true })
    cy.contains('button', 'Create Set').click()
    cy.contains('label', 'Context-Dependent Item Set Title')

    // cy.get('input[id="title"]').then($title => {
    //   cy.wrap($title).type(complexItemSet2.title, { delay: 0 })
    // })
    cy.get('input[id="title"]')
      .should('exist')
      .then($el => {
        cy.wrap($el).focus().type(complexItemSet2.title, { delay: 0 })
      })

    cy.contains(
      'Create the content for the Context-Dependent Item Set leading text in the editor below',
    ).should('exist')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000)
    cy.get(ProseMirror).should('be.visible')
    cy.get(ProseMirror).type(complexItemSet2.leadingContent, { delay: 50 })
    cy.contains('button[type="submit"]', 'Save').click()
    cy.contains('Context-dependent item set was created successfully!')
    cy.get(anchorTags.sets).click({ force: true })
    cy.reload()
    // [segment]: checking if correct complex item set info is displayed
    cy.log(
      'checking if correct context-dependent item set info is displayed...',
    )
    // cy.get(listItemWrapper).eq(0).contains('h2', complexItemSet2.title).click()
    cy.get(listItemWrapper).contains('h2', complexItemSet2.title).click()
    cy.wait('@GQLReq')
    cy.contains('h2[data-testid="set-title"]', complexItemSet2.title)
    cy.contains(
      'div[data-testid="leading-content-wrapper"]',
      complexItemSet2.leadingContent,
    )
  })

  it('edit context-dependent item set', () => {
    cy.get(anchorTags.sets).click({ force: true })
    // cy.get(listItemWrapper).eq(1).contains('h2', complexItemSet1.title).click()
    cy.get(listItemWrapper).contains('h2', complexItemSet1.title).click()
    cy.contains(antTabs, 'Edit').click()

    cy.get('input[id="title"]')
      .should('not.be.disabled')
      .clear()
      .type('edited set')

    cy.get(ProseMirror).last().type(`{selectall}{del} edited set description`)
    cy.contains('button[type="submit"]', 'Update').click()
    cy.contains('div', 'Context-dependent item set updated successfully')
  })

  context('add item to list', () => {
    before(() => {
      cy.seedComplexItemSet(
        disableScripts,
        user2.username,
        complexItemSet3.title,
        complexItemSet3.leadingContent,
      )
    })

    it('with "Add item to this set" button', () => {
      cy.get(anchorTags.sets).click({ force: true })

      cy.get(listItemWrapper)
        // .eq(0)
        .contains('h2', complexItemSet3.title)
        .click()
      cy.get('button[title="Add item to this set"]').click()

      // [segment]: checking if the leading content is displayed above the editor
      cy.log('checking if the leading content is displayed above the editor...')
      cy.contains(
        'div[data-testid="leading-content-wrapper"]',
        complexItemSet3.leadingContent,
      )
      cy.createQuestionWidget()
      cy.get('.multiple-choice .ProseMirror').first().type('{enter}')
      cy.get(ProseMirror).first().type('Question1')
      cy.url().then(url => {
        const qId = url.split('/')[4]

        cy.updateQuestionStatus(disableScripts, qId, 'published')
      })
      cy.get(anchorTags.sets).click({ force: true })

      cy.get(listItemWrapper)
        // .eq(0)
        .contains('h2', complexItemSet3.title)
        .click()
      // [segment]: checking if the question is listed in the set
      cy.log('checking if the question is listed in the set')
      // cy.get(listItemWrapper).eq(0).contains('p', 'Question1')
      cy.get(listItemWrapper).contains('p', 'Question1')
      cy.deleteAllQuestions(disableScripts)
    })

    it('from the question page', () => {
      cy.get(anchorTags.dashboard).first().click({ force: true })
      cy.get(createQuestionButton).click()
      cy.get('input[data-testid="belongs-to-set-checkbox"]').click()
      cy.get('div[data-testid="complexItemSet-select"]').click()
      cy.contains(complexItemSet3.title).click({ force: true })
      cy.contains(
        'div[data-testid="leading-content-wrapper"]',
        complexItemSet3.leadingContent,
      )
      cy.createQuestionWidget()
      cy.get('.multiple-choice .ProseMirror').first().type('{enter}')

      cy.get(ProseMirror).first().type('Question2')

      cy.url().then(url => {
        const qId = url.split('/')[4]
        cy.updateQuestionStatus(disableScripts, qId, 'published')
      })
      cy.get(anchorTags.sets).click({ force: true })

      cy.get(listItemWrapper)
        // .eq(0)
        .contains('h2', complexItemSet3.title)
        .click()

      // [segment]: checking if the question is listed in the set
      cy.log('checking if the question is listed in the set')

      // cy.get(listItemWrapper).eq(0).contains('p', 'Question2')
      cy.get(listItemWrapper).contains('p', 'Question2')
    })
  })
})
