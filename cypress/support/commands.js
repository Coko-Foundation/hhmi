// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { login, signup } from './routes'
import { submitButton } from './selectors'

const selectData = section => {
  Object.values(section).forEach(data => {
    cy.get(data.selector, { force: true })
      .scrollIntoView()
      .should('be.visible', { timeout: 8000 })
      .click()
    cy.contains(data.value).click({ force: true })
  })
}

const selectDataWithoutParent = section => {
  cy.get(section.selector).should('be.visible').click()
  cy.contains(section.value).should('be.visible').click()
}

Cypress.Commands.add('login', ({ email, password, visitUrl }) => {
  cy.visit(visitUrl || login)
  cy.contains('button[type="button"]', 'Log in with Email').click()
  cy.get('input[id="email"]').type(email)
  cy.get('input[id="password"]').type(password)
  cy.contains(submitButton, 'Log in').click()
})

Cypress.Commands.add('signup', ({ firstName, lastName, email, password }) => {
  cy.visit(signup)

  cy.get('input[id="firstName"]').type(firstName)
  cy.get('input[id="lastName"]').type(lastName)
  cy.get('input[id="email"]').type(email)
  cy.get('input[id="password"]').type(password)
  cy.get('input[id="confirmPassword"]').type(password)
  cy.get('input[id="agreedTc"]').click()
  cy.contains(submitButton, 'Sign up').click()

  cy.contains('div', 'Sign up successful!', { timeout: 8000 })
  cy.contains(
    'div',
    "We've sent you a verification email. Click on the link in the email to activate your account.",
  )
})

Cypress.Commands.add(
  'fillQuestion',
  (
    {
      questionType,
      mainTopic,
      course,
      keywords,
      biointeractiveResources,
      cognitiveLevel,
      // affectiveLevel,
      // psychomotorLevel,
    },
    options,
  ) => {
    selectDataWithoutParent(cognitiveLevel)
    selectData(course)
    keywords.value.forEach(keyword =>
      cy.get(keywords.selector).type(`${keyword}{enter}`),
    )

    if (options?.admin) {
      selectData(mainTopic)
      cy.get(biointeractiveResources.selector).click()
      biointeractiveResources.values.forEach(key => {
        cy.get(biointeractiveResources.selector).type(key.slice(0, 10))
        cy.contains(key, { timeout: 50000 }).click({ force: true })
      })
      cy.get(biointeractiveResources.selector).click()
    }

    // temporarily disabled affective level and psychomotorLevel from metadata form
    // selectDataWithoutParent(affectiveLevel)
    // selectDataWithoutParent(psychomotorLevel)

    // [info]: selecting multiple choice at last to avoid focus miss issue
    cy.get(questionType.selector).scrollIntoView().click()
    cy.contains('.ant-select-item-option-content', questionType.value).click()
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000)

    cy.get('.multiple-choice-single-correct .ProseMirror')
      .eq(0)
      .click()
      .focus()
      .type('Question 1', {
        force: true,
      })
  },
)

Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="usermenu-btn"]').click({ force: true })
  cy.get('[data-testid="logout-btn"]').click({ force: true })
})

Cypress.Commands.add('createQuestionWidget', () => {
  cy.get('[data-testid="questionType-select"]').scrollIntoView().click()
  cy.contains('Multiple Answers').click({ force: true })
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(2000)
  cy.get('.multiple-choice').should('exist')
})

Cypress.Commands.add('resetDB', disabled => {
  if (!disabled) {
    cy.exec('docker exec hhmi-server-1 node ./scripts/truncateDB.js')
      .its('stdout')
      .should('contain', 'database cleared')
    cy.exec('docker exec hhmi-server-1 node ./scripts/seedGlobalTeams.js')
      .its('stdout')
      .should('contain', `Added global team "admin"`)
      .should('contain', `Added global team "reviewer"`)
      .should('contain', `Added global team "editor"`)
  } else {
    cy.log(`resetDB is command disabled`)
  }
})

Cypress.Commands.add(
  'seedUser',
  (disabled, { email, role, profileSubmitted = true }) => {
    if (!disabled) {
      cy.exec(
        `docker exec hhmi-server-1 node ./scripts/seedUser.js create ${email} ${
          profileSubmitted ? 'profileSubmitted' : '_'
        } ${role || ''}`,
      )
        .its('stdout')
        .should('contain', `user created with email - ${email}.`)
        .should(`${role ? '' : 'not.'}contain`, `user given ${role} role`)
    } else {
      cy.log(`seedUser is command disabled`)
    }
  },
)

Cypress.Commands.add(
  'seedQuestion',
  (disabled, username, date, metadata, status, handlingEditor = '') => {
    if (!disabled) {
      cy.exec(
        `docker exec hhmi-server-1 node ./scripts/seedQuestions.js create ${username} ${date} ${metadata} ${status} ${handlingEditor}`,
      )
        .its('stdout')
        .should(
          'contain',
          `question created under the author ${username} and is ${status}`,
        )
        .should(
          `${handlingEditor.length > 0 ? '' : 'not.'}contain`,
          `assigned ${handlingEditor} as handling editor`,
        )
    }
  },
)

Cypress.Commands.add('updateQuestionStatus', (disabled, questionId, status) => {
  if (!disabled) {
    cy.exec(
      `docker exec hhmi-server-1 node ./scripts/seedQuestions.js updateStatus ${questionId} ${status}`,
    )
      .its('stdout')
      .should('contains', `question ${questionId} updated to ${status}`)
  } else {
    cy.log(`updateQuestionStatus is command disabled`)
  }
})

Cypress.Commands.add('deleteAllQuestions', disabled => {
  if (!disabled) {
    cy.exec(
      'docker exec hhmi-server-1 node ./scripts/seedQuestions.js deleteAll',
    )
      .its('stdout')
      .should('contain', 'Emptied questions and question_versions')
  } else {
    cy.log(`deleteAllQuestions is command disabled`)
  }
})

Cypress.Commands.add('seedList', (disabled, listName, username) => {
  if (!disabled) {
    cy.exec(
      `docker exec hhmi-server-1 node ./scripts/seedList.js create ${listName} ${username}`,
    )
      .its('stdout')
      .should('contain', `created ${listName} with author as ${username}`)
  } else {
    cy.log(`seedList is command disabled`)
  }
})

Cypress.Commands.add('addQuestionToList', (disabled, listName, questionId) => {
  if (!disabled) {
    cy.exec(
      `docker exec hhmi-server-1 node ./scripts/seedList addToList ${listName} ${questionId}`,
    )
      .its('stdout')
      .should(
        'contain',
        `added question with id - ${questionId} to list ${listName}`,
      )
  } else {
    cy.log(`addQuestionToList is command disabled`)
  }
})

Cypress.Commands.add(
  'seedComplexItemSet',
  (disabled, username, title, leadingContent) => {
    if (!disabled) {
      cy.exec(
        `docker exec hhmi-server-1 node ./scripts/seedComplexItemSet.js create ${username} "${title}" "${leadingContent}"`,
      )
        .its('stdout')
        .should('contain', `set with title: "${title}" created!`)
        .should('contain', `${username} set as author!`)
    } else {
      cy.log('seedComplexItemSet is command disabled')
    }
  },
)

Cypress.Commands.add(
  'addQuestionToComplexItemSet',
  (disabled, title, questionId) => {
    if (!disabled) {
      cy.exec(
        `docker exec hhmi-server-1 node ./scripts/seedComplexItemSet.js addQuestion "${title}" ${questionId}`,
      )
        .its('stdout')
        .should('contains', ` question - ${questionId} added to set "${title}"`)
    } else {
      cy.log(`addQuestionToComplexItemSet command is disabled`)
    }
  },
)

Cypress.Commands.add('createChat', (disabled, questionId) => {
  if (!disabled) {
    cy.exec(
      `docker exec hhmi-server-1 node ./scripts/seedQuestions.js createChat ${questionId}`,
    )
      .its('stdout')
      .should(
        'contains',
        `[seedQuestions]: chat thread created for question ${questionId}`,
      )
  } else {
    cy.log('createChat command is disabled')
  }
})
