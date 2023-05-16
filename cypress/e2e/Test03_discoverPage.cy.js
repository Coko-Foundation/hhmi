/* eslint-disable jest/expect-expect */

import { user } from '../support/credentials'
import { discover, graphqlEndpoint } from '../support/routes'
import { multipleChoiceQuestionString } from '../support/appData'
import { getDateInFormat } from '../utils/helpers'
import { laptop } from '../support/viewport'

const path = require('path')

describe('Discover page tests', () => {
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
      `docker exec hhmi_server_1 node ./scripts/seedUser.js create ${contact.email} profileSubmitted reviewer`,
    )
      .its('stdout')
      .should('contain', `user created with email - ${contact.email}.`)
      .should('contain', `user given reviewer role`)

    cy.exec(
      `docker exec hhmi_server_1 node ./scripts/seedQuestions.js create ${contact.username} -1 anatomy published`,
    )
      .its('stdout')
      .should(
        'contain',
        `question created under the author ${contact.username}`,
      )

    cy.exec(
      `docker exec hhmi_server_1 node ./scripts/seedQuestions.js create ${contact.username} -2 biochemistry published`,
    )
      .its('stdout')
      .should(
        'contain',
        `question created under the author ${contact.username}`,
      )

    cy.exec(
      `docker exec hhmi_server_1 node ./scripts/seedQuestions.js create ${contact.username} -3 population published`,
    )
      .its('stdout')
      .should(
        'contain',
        `question created under the author ${contact.username}`,
      )

    // cy.visit('/discover')
  })

  beforeEach(() => {
    cy.visit('/discover')
    cy.intercept('POST', graphqlEndpoint).as('GQLReq')

    cy.viewport(laptop.preset)
  })

  it('sort functionality', () => {
    // [segment]: Descending order
    cy.log('checking descedning order...')
    cy.get('[data-testid="sort-select"]').click({ force: true })
    cy.get('[title="Date (descending)"]').first().click({ force: true })
    cy.get('[data-testid="list-item-wrapper"]')
      .eq(0)
      .contains('[data-testid="published date-value"]', getDateInFormat(-1))
    cy.get('[data-testid="list-item-wrapper"]')
      .eq(1)
      .contains('[data-testid="published date-value"]', getDateInFormat(-2))
    cy.get('[data-testid="list-item-wrapper"]')
      .eq(2)
      .contains('[data-testid="published date-value"]', getDateInFormat(-3))

    // [segment]: Ascending order
    cy.log('checking ascending order...')
    cy.get('[data-testid="sort-select"]').click({ force: true })
    cy.get('[title="Date (ascending)"]').first().click({ force: true })
    cy.get('[data-testid="list-item-wrapper"]')
      .eq(0)
      .contains('[data-testid="published date-value"]', getDateInFormat(-3))
    cy.get('[data-testid="list-item-wrapper"]')
      .eq(1)
      .contains('[data-testid="published date-value"]', getDateInFormat(-2))
    cy.get('[data-testid="list-item-wrapper"]')
      .eq(2)
      .contains('[data-testid="published date-value"]', getDateInFormat(-1))
  })

  // wait for fixes to be merged
  // eslint-disable-next-line jest/no-disabled-tests
  it.skip('search functionality', () => {
    cy.wait('@GQLReq')
    cy.get('[placeholder="Search..."]', { timeout: 10000 }).type(
      'Energy: carbohydrates{enter}',
    )
    cy.contains(
      '[data-testid="topic-value"]',
      'Biochemistry & Molecular Biology',
    )

    cy.get('[class="ant-list-items"]')
      .find('.List__ListItemWrapper-dan8sa-6')
      .should('have.length', 1)
    cy.contains(
      '[data-testid="list-item-wrapper"]',
      'Energy: carbohydrates :: structural materials: water nucleotides lipids proteins',
    )
    cy.contains('[data-testid="subtopic-value"]', 'General Chemistry')
    cy.contains(`[data-testid="bloom's level-value"]`, 'Create')
    cy.get('[placeholder="Search..."]').clear().type('{enter}')
  })

  it('filter functionality', () => {
    cy.get('[data-testid="topic-select"]').type('biochemistry{enter}')
    cy.get('[data-testid="subtopic-select"]').type('General Chemistry{enter}')
    cy.contains('button[type="submit"]', 'Update').click()
    cy.get('[class="ant-list-items"]')
      .find('.List__ListItemWrapper-sc-dan8sa-7')
      .should('have.length', 1)
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
    cy.contains('button[type="submit"]', 'Update').click()
    cy.get('[class="ant-list-items"]')
      .find('.List__ListItemWrapper-sc-dan8sa-7')
      .should('have.length', 1)
    cy.contains('[data-testid="topic-value"]', 'Environmental science')
    cy.contains('[data-testid="subtopic-value"]', 'Human Population & Impacts')
  })

  it('checking the question', () => {
    // cy.login({ ...contact, visitUrl: discover })
    cy.visit(discover)

    cy.get('[data-testid="list-item-wrapper"]')
      .eq(2)
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
      cy.contains('[type="button"]', 'Export to Word').click({ force: true })
      cy.get('[type="checkbox"]').last().click()

      cy.contains(
        'div[class="ant-modal-footer"] [type="button"]',
        'Export',
      ).click({
        force: true,
      })
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
        timeout: 90000,
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
