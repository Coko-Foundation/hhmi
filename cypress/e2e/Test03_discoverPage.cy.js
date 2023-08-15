/* eslint-disable jest/expect-expect */
import path from 'path'
import { user2 } from '../support/credentials'
import { discover as discoverPage, graphqlEndpoint } from '../support/routes'
import { multipleChoiceQuestionString } from '../support/appData'
import { listItemWrapper, submitButton } from '../support/selectors'
import { getDateInFormat } from '../utils/helpers'
import { laptop } from '../support/viewport'

// eslint-disable-next-line jest/no-disabled-tests
describe('Discover page tests', () => {
  before(() => {
    cy.resetDB()

    cy.seedUser({ ...user2 })

    cy.seedQuestion(user2.username, -1, 'anatomy', 'published')

    cy.seedQuestion(user2.username, -2, 'biochemistry', 'published')

    cy.seedQuestion(user2.username, -3, 'population', 'published')

    // cy.visit('/discoverPage')
  })

  beforeEach(() => {
    cy.visit(discoverPage)
    cy.intercept('POST', graphqlEndpoint).as('GQLReq')

    cy.viewport(laptop.preset)
  })

  it('sort functionality', () => {
    // [segment]: Descending order
    cy.log('checking descedning order...')
    cy.get('[data-testid="sort-select"]').click({ force: true })
    cy.get('[title="Date (descending)"]').first().click({ force: true })
    cy.get(listItemWrapper)
      .eq(0)
      .should('be.visible')

      .contains('[data-testid="published date-value"]', getDateInFormat(-1))
    cy.get(listItemWrapper)
      .eq(1)
      .should('be.visible')

      .contains('[data-testid="published date-value"]', getDateInFormat(-2))
    cy.get(listItemWrapper)
      .eq(2)
      .should('be.visible')

      .contains('[data-testid="published date-value"]', getDateInFormat(-3))

    // [segment]: Ascending order
    cy.log('checking ascending order...')
    cy.get('[data-testid="sort-select"]').click({ force: true })
    cy.get('[title="Date (ascending)"]').first().click({ force: true })
    cy.get(listItemWrapper)
      .eq(0)
      .should('be.visible')
      .contains('[data-testid="published date-value"]', getDateInFormat(-3))
    cy.get(listItemWrapper)
      .eq(1)
      .should('be.visible')

      .contains('[data-testid="published date-value"]', getDateInFormat(-2))
    cy.get(listItemWrapper)
      .eq(2)
      .should('be.visible')

      .contains('[data-testid="published date-value"]', getDateInFormat(-1))
  })

  it('search functionality', () => {
    cy.wait('@GQLReq')
    cy.get('[placeholder="Search..."]', { timeout: 10000 }).type(
      'bacillus{enter}',
    )

    cy.get(listItemWrapper).should('have.length', 1)
    cy.get(listItemWrapper)
      .eq(0)
      .should('be.visible')
      .contains(
        '.ProseMirror',
        'What substance from Bacillus thuringiensis was most likely inserted into rice plants',
      )
    cy.contains('[data-testid="topic-value"]', 'Anatomy & Physiology')

    cy.contains('[data-testid="subtopic-value"]', 'Cardiovascular System')
    cy.contains(`[data-testid="bloom's level-value"]`, 'Analyze')
    cy.contains('[data-testid="author-value"]', user2.username)
    cy.get('[placeholder="Search..."]').clear().type('{enter}')
  })

  it('filter functionality', () => {
    cy.get('[data-testid="topic-select"]').type('biochemistry{enter}')
    cy.get('[data-testid="subtopic-select"]').type('General Chemistry{enter}')
    cy.contains(submitButton, 'Update').click()
    cy.get(listItemWrapper).should('have.length', 1)
    cy.contains(
      '[data-testid="topic-value"]',
      'Biochemistry & Molecular Biology',
    )
    cy.contains('[data-testid="subtopic-value"]', 'General Chemistry')

    cy.contains('button[type="button"]', 'Clear filters').click()
    cy.contains(
      '[data-testid="topic-select"]',
      'Biochemistry & Molecular Biology',
    ).should('not.exist')
    cy.contains('[data-testid="subtopic-select"]', 'General Chemistry').should(
      'not.exist',
    )

    cy.get('[data-testid="course-select"]').type('science{enter}')
    cy.get('[data-testid="course-unit-select"]').type('population{enter}')
    cy.contains(submitButton, 'Update').click()
    cy.get(listItemWrapper).should('have.length', 1)
    cy.contains('[data-testid="topic-value"]', 'Environmental science')
    cy.contains('[data-testid="subtopic-value"]', 'Human Population & Impacts')
  })

  it('checking the question', () => {
    // cy.login({ ...user2, visitUrl: discoverPage })
    cy.visit(discoverPage)
    cy.wait('@GQLReq')

    cy.get(listItemWrapper)
      .eq(2)
      .should('be.visible')
      .contains('p')
      .first()
      .click()
    cy.wait('@GQLReq')

    // cy.get(
    //   '[class="Question__FacultyHeaderWrapper-sc-12z17kk-6 dnjWAN"] button.ant-switch',
    // ).click()

    // cy.get(
    //   'segment[class="Question__MetadataWrapper-sc-12z17kk-9 bVIFon"]',
    // ).should('not.exist')

    // [segment]: student/faculty view.
    // cy.contains(
    //   '[class="Question__FacultyHeaderWrapper-sc-12z17kk-6 dnjWAN"] [class="ant-switch-inner"]',
    //   'Student view',
    // )

    // cy.get(
    //   '[class="Question__FacultyHeaderWrapper-sc-12z17kk-6 dnjWAN"] button.ant-switch',
    // ).click()
    // cy.contains(
    //   '[class="Question__FacultyHeaderWrapper-sc-12z17kk-6 dnjWAN"] [class="ant-switch-inner"]',
    //   'Show Metadata',
    // )

    // cy.get(
    //   'segment[class="Question__MetadataWrapper-sc-12z17kk-10 fxLITj"]',
    // ).should('exist')

    // [segment]: word export
    cy.log('checking word export...')
    cy.url().then(url => {
      const id = url.split('/')[4]

      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(4000)
      cy.get('button[id="exportToWord"]', {
        timeout: 10000,
      })
        .first()
        .should('be.visible')
        .click()
      cy.get('[type="checkbox"]').last().click()

      cy.contains(
        'div[class="ant-modal-footer"] [type="button"]',
        'Export',
      ).click({
        force: true,
      })
      cy.wait('@GQLReq')

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
        expect(data).to.equal(multipleChoiceQuestionString)
      })
    })

    // [segment]: scrom export
    // cy.url().then(url => {
    //   const id = url.split('/')[4]
    //   cy.contains('[type="button"]', 'Export to SCORM').click({ force: true })

    //   cy.window()
    //     .document()
    //     .then(doc => {
    //       setTimeout(() => {
    //         doc.location.reload()
    //       }, 1000)
    //     })
    //   const downloadsFolder = Cypress.config('downloadsFolder')
    //   cy.readFile(path.join(downloadsFolder, `${id}.zip`), {
    //     timeout: 90000,
    //   })
    // })
  })
})
