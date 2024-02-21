/* eslint-disable jest/no-disabled-tests */
/* eslint-disable jest/expect-expect */
import path from 'path'

import { admin, user2 } from '../support/credentials'

import { editor, question, listExportContent } from '../support/appData'
import {
  antModalConfirmTitle,
  listItemWrapper,
  createQuestionButton,
  buttonAntModalBody,
  antModalContent,
  antTableCell,
  submitQuestionButton,
  anchorTags,
  ProseMirror,
  basicButton,
} from '../support/selectors'
import {
  dashboard as dashboardRoute,
  graphqlEndpoint,
  lists,
} from '../support/routes'
import { laptop } from '../support/viewport'

const disableScripts = false

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
    cy.resetDB(disableScripts)
    cy.seedUser(disableScripts, { ...admin })
    cy.seedUser(disableScripts, { ...user2 })
  })

  beforeEach(() => {
    cy.intercept('POST', graphqlEndpoint).as('GQLReq')
    cy.viewport(laptop.preset)
  })
  context.skip('Wax editor', () => {
    beforeEach(() => {
      cy.login(user2)
      cy.get(createQuestionButton).click()
      cy.wait('@GQLReq')
    })
    it('Widget is created correctly from the Item Type dropdown', () => {
      cy.contains(
        '[data-testid="missing-question-text"]',
        'Please select an item type in the metadata form to start editing',
      )
      cy.createQuestionWidget()
      cy.get('[data-testid="questionType-select"]').scrollIntoView().click()
      cy.contains('Multiple Choice').click()
      cy.contains(
        '[class="ant-modal-confirm-content"]',
        'All content will be replaced by the new item type.',
      )
      cy.contains(basicButton, 'Yes, update').click()
      cy.get('.multiple-choice')
    })

    it('checking the wax editor', () => {
      // [segment]: Checking if user can submit when question is empty
      cy.log('checking if user can submit when question is empty...')
      cy.get(submitQuestionButton).click()
      cy.contains(antModalContent, 'Item text cannot be empty')
      cy.contains(antModalContent, 'Please provide some content for your item')
      cy.contains(buttonAntModalBody, 'Ok').click()
      // [segment]: display missing question text

      cy.createQuestionWidget()
      cy.get('.multiple-choice').first().type('{enter}')

      // [segment]: Testing text formats
      cy.log('testing text formats...')
      Object.entries(editor).forEach(([key, value]) => {
        cy.get(ProseMirror).first().type('{enter}')
        cy.get(`[title="Toggle ${key}"]`).click()
        cy.get(ProseMirror).first().type(value.value)
        cy.contains(value.selector, value.value)
      })
      cy.get(ProseMirror).first().type('{enter}')
      // [segment]: Testing lists
      cy.log('testing lists...')
      cy.get("[title='Wrap in ordered list']").click()
      listItems.forEach(li => {
        cy.get(ProseMirror).first().type(`${li}{enter}`)
      })
      cy.get(ProseMirror).first().type('{enter}')
      cy.get("[title='Wrap in bullet list']").click()
      listItems.forEach(li => {
        cy.get(ProseMirror).first().type(`${li}{enter}`)
      })
      cy.get(ProseMirror).first().type('{enter}')
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
      cy.get(ProseMirror).first().type('Temp text')
      cy.get('[title="Undo"]').click()
      cy.contains('Temp text').should('not.exist')
      cy.get('[title="Redo"]').click()
      cy.contains('Temp text')
      cy.get(ProseMirror).first().clear()
      cy.deleteAllQuestions(disableScripts)
    })
  })
  context('Functionalities', () => {
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

      // [segment]: checking if the Export to word is present
      cy.log('checking if the Export to word is present')
      cy.get('[id="question-actions"] [id="exportToWord"]').should('be.visible')
      cy.get(submitQuestionButton).click()

      cy.contains(
        antModalConfirmTitle,
        'Are you sure you want to submit this item?',
      )
      cy.contains(
        '[class="ant-modal-confirm-content"]',
        'This will make this item visible to editors and reviewers, and after a successful review it will be published for all users.',
      )
      cy.contains('[class="ant-modal-body"] button.ant-btn', 'Submit').should(
        'be.disabled',
      )
      cy.get('[data-testid="accept-tnc"]').click()

      cy.contains('[class="ant-modal-body"] button.ant-btn', 'Submit')
        .should('not.be.disabled')
        .click()

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

      cy.deleteAllQuestions(disableScripts)
    })
    it('editing the question', () => {
      cy.seedQuestion(
        disableScripts,
        user2.username,
        -3,
        'ecology',
        'published',
      )
      cy.login(admin)
      // [info]: checking for dashboard to wait for login to complete
      cy.contains(anchorTags.dashboard, 'Dashboard').should('exist')
      cy.contains(anchorTags.discover, 'Browse Items').click({ force: true })
      cy.wait('@GQLReq')
      cy.get(listItemWrapper)
        .eq(0)
        .should('be.visible')
        .contains(ProseMirror, 'Plants growing under direct sunlight')
        .click()
      cy.wait('@GQLReq')
      cy.contains(basicButton, 'Unpublish').click()
      cy.contains(
        antModalContent,
        'Unpublishing an item will remove it from the Browse Items page. After an item is unpublished you can choose to edit and republish it',
      )
      cy.contains(buttonAntModalBody, 'Unpublish').click()

      cy.contains(basicButton, 'Edit item').click()
      cy.contains(antModalConfirmTitle, 'Edit unpublished item')
      cy.contains(
        '[class="ant-modal-confirm-content"]',
        `This item is unpublished. You will need to publish this item again for the changes to be reflected in the Browse Items page. After the item is edited, the previous version will not be available. Do you wish to continue?`,
      )
      cy.contains(buttonAntModalBody, 'Edit').click()
      cy.wait('@GQLReq')

      cy.get('[contenteditable="true"]', {
        force: true,
      })
        .clear()
        .type('Edited')
      cy.contains('[type="button"]', 'Publish').click()
      cy.contains('[type="button"]', 'Yes, publish').click()
      cy.contains(antModalConfirmTitle, 'Item published successfully')
      cy.contains(
        '[class="ant-modal-confirm-content"]',
        'Item was published and is now available in the Browse Items page',
      )
      cy.contains(buttonAntModalBody, 'Ok').click()
    })
    it('duplicate question', () => {
      cy.deleteAllQuestions(disableScripts)
      cy.seedQuestion(
        disableScripts,
        user2.username,
        -3,
        'population',
        'published',
      )
      cy.login({ ...user2, visitUrl: dashboardRoute })
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(2000)
      cy.contains(anchorTags.discover, 'Browse Items').click({ force: true })
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
      cy.contains('div[role="tab"]', 'Authored Items').click()
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
        .contains(ProseMirror, '(empty)')
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
        .contains(ProseMirror, 'image with no alt text')
        .click()
      cy.get('img').click()
      cy.get('[placeholder="Alt Text"]').type('alternative text')
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000)
    })
  })
})

describe('Testing lists', () => {
  before(() => {
    cy.resetDB(disableScripts)
    cy.seedUser(disableScripts, { ...user2 })
    cy.seedQuestion(
      disableScripts,
      user2.username,
      -10,
      'biochemistry',
      'published',
    )
    cy.seedQuestion(
      disableScripts,
      user2.username,
      -20,
      'population',
      'published',
    )
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
  it('adding questions to new & existing list', () => {
    cy.seedList(disableScripts, 'new_list', user2.username)
    cy.login({ ...user2 })

    // [info]: checking for dashboard to wait for login to complete
    cy.contains(anchorTags.dashboard, 'Dashboard').should('exist')
    cy.contains(anchorTags.discover, 'Browse Items').click({ force: true })
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
    cy.seedList(disableScripts, 'list3', user2.username)
    cy.login({ ...user2, visitUrl: dashboardRoute })
    cy.get(listItemWrapper).eq(0).should('be.visible').contains('p').click()
    cy.url().then(url => {
      const qId = url.split('/')[4]
      cy.addQuestionToList(disableScripts, 'list3', qId)
    })
    cy.visit(lists)
    cy.wait('@GQLReq')
    cy.contains('list3').click()
    cy.get(listItemWrapper)
      .eq(0)
      .should('be.visible')
      .contains('p')
      .should('contain', 'Energy: carbohydrates')

    // [segment]: export word
    cy.log('export to word')

    cy.url().then(url => {
      const id = url.split('/')[4]

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(4000)
      cy.contains('Select All').click()
      cy.get('[data-testid="add-to-list-btn"]').click()
      cy.get('[id="exportToWord"]').click()
      cy.contains(
        '[class="ant-modal-footer"] button[type="button"]',
        'Export',
      ).click()

      // [info]: triggering  a reload manually to avoid the page reload error
      cy.window()
        .document()
        .then(doc => {
          setTimeout(() => {
            doc.location.reload()
          }, 1000)
        })

      const downloadsFolder = Cypress.config('downloadsFolder')

      cy.log(downloadsFolder, `${id}.docx`)
      cy.readFile(path.join(downloadsFolder, `${id}.docx`), {
        timeout: 100000,
      })
      cy.task('readF', path.join(downloadsFolder, `${id}.docx`)).then(data => {
        // eslint-disable-next-line jest/valid-expect
        expect(data).to.equal(listExportContent)
      })
    })

    // [segment]: export to QTI
    cy.log('export to QTI')
    cy.url().then(url => {
      const id = url.split('/')[4]

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(4000)
      cy.contains('Select All').click()
      cy.get('[data-testid="add-to-list-btn"]').click()
      cy.get('[id="exportToQTI"]').click()

      // [info]: triggering  a reload manually to avoid the page reload error
      cy.window()
        .document()
        .then(doc => {
          setTimeout(() => {
            doc.location.reload()
          }, 1000)
        })

      const downloadsFolder = Cypress.config('downloadsFolder')

      cy.log(downloadsFolder, `${id}.zip`)
      cy.readFile(path.join(downloadsFolder, `${id}.zip`), {
        timeout: 100000,
      })
    })
  })
  it('rename list', () => {
    cy.seedList(disableScripts, 'list4', user2.username)
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
