/* eslint-disable jest/expect-expect */

import { admin, user2 } from '../support/credentials'
import { editor, question } from '../support/appData'
import {
  antModalConfirmTitle,
  listItemWrapper,
  createQuestionButton,
  buttonAntModalBody,
  antModalContent,
  antTableCell,
  submitQuestionButton,
  anchorTags,
} from '../support/selectors'
import {
  dashboard as dashboardRoute,
  graphqlEndpoint,
  lists,
} from '../support/routes'
import { laptop } from '../support/viewport'

describe('Testing questions', () => {
  const listItems = ['item1', 'item2', 'item3']

  const {
    mainTopic,
    course,
    keywords,
    biointeractiveResources,
    cognitiveLevel,
    // affectiveLevel,
    // psychomotorLevel,
  } = question

  before(() => {
    cy.resetDB()
    cy.seedUser({ ...admin })
    cy.seedUser({ ...user2 })
  })

  beforeEach(() => {
    cy.intercept('POST', graphqlEndpoint).as('GQLReq')
    cy.viewport(laptop.preset)
  })

  it('checking the wax editor', () => {
    cy.login(user2)
    cy.get(createQuestionButton).click()
    cy.wait('@GQLReq')
    // [segment]: Checking if user can submit when question is empty
    cy.log('checking if user can submit when question is empty...')
    cy.get('[data-testid="accept-tnc"]').click()
    cy.get(submitQuestionButton).click()
    cy.contains(antModalContent, 'Question text cannot be empty')
    cy.contains(
      antModalContent,
      'Please provide some content for your question',
    )
    cy.contains(buttonAntModalBody, 'Ok').click()
    // [segment]: question dropdown
    cy.log('checking question dropdown...')
    cy.contains('[aria-controls="questions-list"]', 'Question Type').click()
    cy.contains('#questions-list  > :nth-child(1)', 'Multiple choice')
    cy.contains(
      '#questions-list  > :nth-child(2)',
      'Multiple choice (single correct)',
    )
    cy.contains('#questions-list  > :nth-child(3)', 'True/False')
    cy.contains(
      '#questions-list  > :nth-child(4)',
      'True/False (single correct)',
    )
    cy.contains('#questions-list  > :nth-child(5)', 'Matching')
    cy.contains('#questions-list  > :nth-child(6)', 'Essay')
    cy.contains('#questions-list  > :nth-child(7)', 'Multiple dropdowns')
    cy.contains('#questions-list  > :nth-child(8)', 'Fill in the blank')
    cy.contains('[aria-controls="questions-list"]', 'Question Type').click()

    // [segment]: Testing text formats
    cy.log('testing text formats...')
    Object.entries(editor).forEach(([key, value]) => {
      cy.get('.ProseMirror').type('{enter}')
      cy.get(`[title="Toggle ${key}"]`).click()
      cy.get('.ProseMirror').type(value.value)
      cy.contains(value.selector, value.value)
    })
    cy.get('.ProseMirror').type('{enter}')
    // [segment]: Testing lists
    cy.log('testing lists...')
    cy.get("[title='Wrap in ordered list']").click()
    listItems.forEach(li => {
      cy.get('.ProseMirror').type(`${li}{enter}`)
    })
    cy.get('.ProseMirror').type('{enter}')
    cy.get("[title='Wrap in bullet list']").click()
    listItems.forEach(li => {
      cy.get('.ProseMirror').type(`${li}{enter}`)
    })
    cy.get('.ProseMirror').type('{enter}')
    // eslint-disable-next-line consistent-return
    cy.get('ul>li').each(($el, index) => {
      if (index < 2) return false
      cy.get($el).contains(listItems[index])
    })
    // eslint-disable-next-line consistent-return
    cy.get('ol>li').each(($el, index) => {
      if (index < 2) return false
      cy.get($el).contains(listItems[index])
    })
    // [segment]: Testing undo , redo
    cy.log('testing redo, undo...')
    cy.get('.ProseMirror').type('Temp text')
    cy.get('[title="Undo"]').click()
    cy.contains('Temp text').should('not.exist')
    cy.get('[title="Redo"]').click()
    cy.contains('Temp text')
    cy.get('.ProseMirror').clear()
    cy.get('.ProseMirror').type('Question 2')
    cy.get('.ProseMirror').click({ force: true })
    cy.deleteAllQuestions()
  })
  it('creating a question & checking values in the UI', () => {
    cy.login(user2)
    cy.get(createQuestionButton).click()
    cy.wait('@GQLReq')
    cy.wait('@GQLReq')
    cy.fillQuestion(question)
    // [segment]: checking last save
    // cy.log('checking the last saved...')
    // const today = new Date()
    // const time = `Last saved ${today.getHours()}:${String(
    //   today.getMinutes(),
    // ).padStart(2, 0)}`
    // cy.contains('span', time)
    cy.get('[data-testid="accept-tnc"]').click()
    cy.get(submitQuestionButton).click()
    cy.contains(
      antModalConfirmTitle,
      'Are you sure you want to submit the question?',
    )
    cy.contains(
      '[class="ant-modal-confirm-content"]',
      'This will make the question visible to editors and reviewers, and after a successful review it will be published for all users.',
    )
    cy.contains(buttonAntModalBody, 'Submit').click()
    cy.wait('@GQLReq')
    // [segment]: checking if the values are retained in the UI
    cy.visit(dashboardRoute, { method: 'GET' })
    cy.wait('@GQLReq')
    // [segment]: Checking  dashboardRoute
    cy.log('checking in the dashboard...')
    cy.contains('.ProseMirror p.paragraph', 'Question 1')
    cy.contains('[data-testid="topic-value"]', mainTopic.topic.value)
    cy.contains('[data-testid="subtopic-value"]', mainTopic.subtopic.value)
    cy.contains(`[data-testid="bloom's level-value"]`, cognitiveLevel.value)
    cy.contains('[data-testid="question-status"]', 'Submitted')
    cy.get('[data-testid="wax-container"]')
      .invoke('attr', 'href')
      .then(href => {
        cy.visit(href)
      })
    // [segment]: checking the question
    cy.log('checking the question...')

    const checkData = section => {
      Object.values(section).forEach(data => {
        cy.contains(data.selector, data.value)
      })
    }

    const checkDataWithoutParent = section => {
      cy.contains(section.selector, section.value)
    }

    checkData(mainTopic)
    checkData(course)
    keywords.value.forEach(keyword =>
      cy.contains(`${keywords.selector} span`, keyword),
    )
    biointeractiveResources.values.forEach(key => {
      cy.contains(`${biointeractiveResources.selector} span`, key)
    })
    // temporarily disabled affective level and psychomotor level from metadata form
    // checkDataWithoutParent(affectiveLevel)
    // checkDataWithoutParent(psychomotorLevel)
    checkDataWithoutParent(cognitiveLevel)
    cy.deleteAllQuestions()
  })
  it('editing the question', () => {
    cy.seedQuestion(user2.username, -3, 'ecology', 'published')
    cy.login(admin)
    cy.contains(anchorTags.discover, 'Browse Questions').click()
    cy.wait('@GQLReq')
    cy.get(listItemWrapper)
      .eq(0)
      .should('be.visible')
      .contains('.ProseMirror', 'Plants growing under direct sunlight')
      .click()
    cy.wait('@GQLReq')
    cy.contains('button[type="button"]', 'Edit question').click()
    cy.contains(antModalConfirmTitle, 'Warning!')
    cy.contains(
      '[class="ant-modal-confirm-content"]',
      `You are editing a published question. Any changes you make will be automatically saved, but not automatically published. You will need to publish the question again for the edits to be reflected in the Browse Questions page. After the edited question is published, the old one will not be available anymore in the Browse Questions page. Do you wish to continue`,
    )
    cy.contains(buttonAntModalBody, 'Create new version').click()
    cy.wait('@GQLReq')

    cy.get('[contenteditable="true"]', {
      force: true,
    })
      .clear()
      .type('Edited')
    cy.contains('[type="button"]', 'Publish').click()
    cy.contains('[type="button"]', 'Yes, publish').click()
    cy.contains(antModalConfirmTitle, 'Question published successfully')
    cy.contains(
      '[class="ant-modal-confirm-content"]',
      'Question was published and is now available in the Browse Questions page',
    )
    cy.contains(buttonAntModalBody, 'Ok').click()
  })
  it('duplicate question', () => {
    cy.deleteAllQuestions()
    cy.seedQuestion(user2.username, -3, 'population', 'published')
    cy.login({ ...user2 })
    cy.contains(anchorTags.discover, 'Browse Questions').click()
    cy.wait('@GQLReq')
    cy.get(listItemWrapper)
      .eq(0)
      .should('be.visible')
      .get('input[type="checkbox"]', { timeout: 10000 })
      .last()
      .click()
    cy.get('[data-testid="duplicate-question"]').click()
    cy.contains(
      'div[class="ant-modal-body"] button[type="button"]',
      'Duplicate',
    ).click()
    cy.wait('@GQLReq')
    cy.visit(dashboardRoute)
    cy.wait('@GQLReq')
    cy.contains('div[role="tab"]', 'Authored Questions').click()
    cy.wait('@GQLReq')
    cy.get(listItemWrapper)
      .eq(0)
      .should('be.visible')
      .contains('p')
      .should('contain', 'By 2040')
    cy.contains('span[data-testid="question-status"]', 'Not Submitted')
  })
  // skipped due to #172
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('check alternative text for empty questions', () => {
    cy.login(user2)
    cy.get(createQuestionButton).click()
    cy.wait('@GQLReq')
    cy.wait('@GQLReq')
    cy.visit(dashboardRoute, { method: 'GET' })
    cy.wait('@GQLReq')
    cy.get(listItemWrapper)
      .eq(0)
      .should('be.visible')
      .contains('.ProseMirror', '(empty)')
      .click()
    cy.get('[id="file-upload"]').selectFile(
      'cypress/fixtures/images/img12.png',
      { force: true },
    )
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000)
    cy.visit(dashboardRoute, { method: 'GET' })
    cy.wait('@GQLReq')
    cy.get(listItemWrapper)
      .eq(0)
      .should('be.visible')
      .contains('.ProseMirror', 'image with no alt text')
      .click()
    cy.get('img').click()
    cy.get('[placeholder="Alt Text"]').type('alternative text')
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000)
  })
})

describe('Testing lists', () => {
  before(() => {
    cy.resetDB()
    cy.seedUser({ ...user2 })
    cy.seedQuestion(user2.username, -10, 'biochemistry', 'published')
    cy.seedQuestion(user2.username, -20, 'population', 'published')
  })
  beforeEach(() => {
    cy.intercept('POST', graphqlEndpoint).as('GQLReq')
    cy.viewport(laptop.preset)
  })
  it('creating a list and deleting a list', () => {
    cy.login({ ...user2, visitUrl: lists })
    // [segment]: create a list
    cy.get('[id="newList"]').type('list1')
    cy.get('[data-testid="create-btn"]').click()
    cy.get('.ant-table-row').eq(0).contains(antTableCell, 'list1')
    // [segment]: deleting a list
  })
  // skipped due to logout button issue.
  // eslint-disable-next-line jest/no-disabled-tests
  it('adding questions to new & existing list', () => {
    cy.seedList('new_list', user2.username)
    cy.login({ ...user2 })
    cy.contains(anchorTags.discover, 'Browse Questions').click()
    cy.wait('@GQLReq')
    // [segment]: adding question to new lsit
    cy.get(listItemWrapper)
      .eq(0)
      .should('be.visible')
      .get('input[type="checkbox"]', { timeout: 10000 })
      .first()
      .click()
    cy.get('button[data-testid="add-to-list-btn"]').click()
    cy.get('input[id="newList"]').type('list2')
    cy.get('button[data-testid="create-btn"]').click()
    cy.contains('span', 'List created')
    // [segment]: adding question to existing list
    // making a random click to close the popup
    cy.reload()
    cy.wait('@GQLReq')
    cy.get(listItemWrapper)
      .eq(1)
      .should('be.visible')
      .get('input[type="checkbox"]', { timeout: 10000 })
      .last()
      .click()
    cy.get('button[data-testid="add-to-list-btn"]').click()
    cy.get('[data-testid="select-existing-list"]').click()
    cy.contains('new_list').click()
    cy.wait('@GQLReq')
    cy.get('[data-testid="add-btn"]').click()
    // [segment]: checking if the questions are displayed inside the list
    cy.log('checking if the questions are displayed inside the list...')
    // Existing list
    cy.log('Existing list')
    cy.visit(lists, { method: 'GET' })
    cy.wait('@GQLReq')
    cy.contains('new_list').click()
    cy.get(listItemWrapper)
      .eq(0)
      .should('be.visible')
      .contains('p')
      .should('contain', 'By 2040')
    // New list
    cy.log('new list')
    cy.visit(lists, { method: 'GET' })
    cy.wait('@GQLReq')
    cy.contains('list2').click()
    cy.get(listItemWrapper)
      .eq(0)
      .should('be.visible')
      .contains('p')
      .should('contain', 'Energy: carbohydrates')
  })
  it('checking if export triggers download', () => {
    cy.seedList('list3', user2.username)
    cy.login({ ...user2, visitUrl: dashboardRoute })
    cy.get(listItemWrapper).eq(0).should('be.visible').contains('p').click()
    cy.url().then(url => {
      const qId = url.split('/')[4]
      cy.addQuestionToList('list3', qId)
    })
    cy.visit(lists)
    cy.wait('@GQLReq')
    cy.contains('list3').click()
    cy.get(listItemWrapper)
      .eq(0)
      .should('be.visible')
      .contains('p')
      .should('contain', 'Energy: carbohydrates')
  })
  it('rename list', () => {
    cy.seedList('list4', user2.username)
    cy.login({ ...user2, visitUrl: lists })
    cy.get('[aria-label="Rename list list4"]').click()
    cy.get('div[id="list4-rename-popup"] input[name="renameList"]').type(
      '{backspace}5',
    )
    cy.get(
      'div[id="list4-rename-popup"] button[data-testid="rename-btn"]',
    ).click()
    cy.wait('@GQLReq')
    cy.contains('a', 'list5')
  })
})
