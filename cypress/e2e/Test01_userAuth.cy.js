/* eslint-disable jest/expect-expect */
import { capitalize } from 'lodash'
import { user, generalUser } from '../support/credentials'
import { laptop } from '../support/viewport'
import {
  manageUser,
  manageTeam,
  requestPasswordReset,
  login,
  profile,
  graphqlEndpoint,
} from '../support/routes'

describe('Tests for user authentication', () => {
  const { contact, address, school, reviewing } = user

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
      `docker exec hhmi_server_1 node ./scripts/seedUser.js create ${contact.email} profileSubmited admin`,
    )
      .its('stdout')
      .should('contain', `user created with email - ${contact.email}.`)
      .should('contain', `user given admin role`)

    cy.exec(
      `docker exec hhmi_server_1 node ./scripts/seedUser.js create firstuser@gmail.com profileSubmitted reviewer`,
    )
      .its('stdout')
      .should('contain', `user created with email - firstuser@gmail.com.`)
      .should('contain', `user given reviewer role`)

    cy.exec(
      `docker exec hhmi_server_1 node ./scripts/seedUser.js create seconduser@gmail.com profileSubmitted editor`,
    )
      .its('stdout')
      .should('contain', `user created with email - seconduser@gmail.com.`)
      .should('contain', `user given editor role`)
  })

  beforeEach(() => {
    cy.viewport(laptop.preset)
    cy.intercept({ method: 'POST', url: graphqlEndpoint }).as('GQLReq')
  })

  it('forgot password', () => {
    cy.visit(requestPasswordReset)
    cy.wait('@GQLReq')
    cy.get('[type="submit"]').click()
    cy.contains('[role="alert"]', 'Email is required')
    cy.contains('a[href="/login"]', 'Return to login form')

    cy.contains('Request password reset')
    cy.get('[id="email"]').type(contact.email)
    cy.get('[type="submit"]').click()
    cy.contains('Request successful!')
    cy.contains(
      `An email has been sent to ${contact.email} containing further instructions`,
    )
  })

  it('signup test', () => {
    cy.signup(generalUser)
  })

  it('login & user profile', () => {
    cy.login({ email: contact.email, password: 'Password@123' })
    cy.wait('@GQLReq')
    cy.contains('User profile')
    cy.get('[type="submit"]').click()
    cy.contains('[role="alert"]', 'Last name is required')
    cy.contains('[role="alert"]', 'First name is required')
    // cy.contains('[role="alert"]', 'You have to fill in your prefered pronouns')
    cy.contains('[role="alert"]', 'Phone number is required')
    cy.contains(
      '[role="alert"]',
      'Please select the country where your institution is located',
    )
    cy.contains(
      '[role="alert"]',
      'City where your Institution is located is required',
    )
    cy.contains('[role="alert"]', 'You have to fill in you position')
    cy.contains(
      '[role="alert"]',
      'You have to fill in your Institution/Organization',
    )
    cy.contains('[role="alert"]', 'You have to select your Type of Institution')
    cy.contains(
      '[role="alert"]',
      'You have to select your years of teaching experience',
    )
    cy.contains('[role="alert"]', 'Please select an option')
    cy.contains('[role="alert"]', 'Please select an option')

    // [segment]: Contact
    cy.get('[id="lastName"]').type(contact.lastName)
    cy.get('[id="firstName"]').type(contact.firstName)
    cy.get('[id="pronouns"]').type(contact.pronouns)
    // cy.get('[id="middleName"]').type(contact.middleName)
    cy.get('[id="displayName"]').clear().type(contact.displayName)
    cy.get('[id="phone"]').type(contact.phone)

    // [segment]: Address
    cy.get('[data-testid="select-country"]')
      .click()
      .type(`${address.country}{enter}`)

    cy.get('[data-testid="state-select"]', { timeout: 2000 })
      .click()
      .type(`${address.state}{enter}`)

    cy.get('[id="city"]').type(address.city)
    cy.get('[id="address"]').type(address.address)
    cy.get('[id="zipCode"]').type(address.zipCode)

    // [segment]: School
    cy.get('[id="position"]').type(school.position)
    cy.get('[id="organization"]').type(school.organization)
    cy.get('[data-testid="institutional-setting-select"]').click()
    cy.get(`[title="${school.institutionalSetting}"]`).click()
    cy.get('[data-testid="teaching-experience-select"]').click()
    cy.get(`[title="${school.yearsOfExperience}"]`).click()
    cy.get('[data-testid="primary-institution-select"]').click()
    cy.get(`[title="${school.typeOfInstitution}"]`).click()
    cy.contains('[id="apIbCourses"] span', 'Yes').click()

    // [segment]: Reviewing
    cy.contains('[id="reviewerInterest"] span', 'Yes').click()
    cy.get('[data-testid="course-taught-select"]').click()
    cy.get(`[title="Biology"]`).first().click({ force: true })
    cy.get('[data-testid="course-taught-select"]').click()

    cy.get('[data-testid="three-course-select"]').click()
    reviewing.threeCourses.forEach(subject => {
      cy.get(`[title="${subject}"]`).last().click()
    })
    cy.get('[data-testid="three-course-select"]').click()

    cy.contains('[id="assessmentTraining"] span', 'Yes').click()
    cy.contains('[id="assessmentTrainingInclusive"] span', 'No').click()
    cy.get('[id="source"]').type(reviewing.source)

    cy.get('[type="submit"]').click()
    cy.wait('@GQLReq')
    cy.contains('div', 'Thank you for submitting your profile!', {
      timeout: 8000,
    })
  })

  it('Team manager', () => {
    const addUserToRole = (role, username) => {
      cy.get(`[data-testid="select-${role}"]`).type(username)
      cy.contains('.ant-select-item-option-active', username).click()
      cy.get(`[aria-labelledby="${capitalize(role)}-team"]`).click()
      cy.contains(`[data-testid="${role}-list"]`, username)
    }

    const removeUserFromRole = (role, username) => {
      cy.contains('div', username).click()
      cy.wait('@GQLReq')
      cy.get(`[data-testid="remove-${role}"]`).click({ force: true })
      cy.wait('@GQLReq')
    }

    cy.login({ ...contact, visitUrl: manageTeam })
    // cy.get('[data-testid="usermenu-btn"]').click()
    // cy.contains('a', 'Manage Teams').click()

    // cy.visit(manageTeam, { method: 'GET' })
    cy.contains('h1', 'Team Manager')

    removeUserFromRole('editor', 'seconduser')
    removeUserFromRole('reviewer', 'firstuser')

    addUserToRole('editor', 'seconduser')
    addUserToRole('reviewer', 'firstuser')
  })

  it('User with editor priveleges', () => {
    cy.login({
      email: 'seconduser@gmail.com',
      password: 'Password@123',
      visitUrl: login,
    })
    cy.get('[data-testid="usermenu-btn"]').click()
    cy.contains('a', 'Manage Users').should('not.exist')
    cy.contains('a', 'Manage Teams').should('not.exist')
    cy.visit(manageTeam, { method: 'GET' })
    cy.wait('@GQLReq')
    cy.contains('div', '403')
    cy.contains('div', 'Sorry, you are not authorized to access this page.')
    cy.visit(manageUser, { method: 'GET' })
    cy.wait('@GQLReq')
    cy.contains('div', '403')
    cy.contains('div', 'Sorry, you are not authorized to access this page.')
  })

  it('User with Reviewer priveleges', () => {
    cy.login({
      email: 'firstuser@gmail.com',
      password: 'Password@123',
      visitUrl: '/',
    })
    cy.contains('a', ' Manage Teams').should('not.exist')
    cy.contains('a', ' Manage Users').should('not.exist')
    cy.contains('a', ' Profile').should('not.exist')
    cy.contains('a', ' Logout').should('not.exist')

    cy.visit(manageTeam, { methosd: 'GET' })
    cy.wait('@GQLReq')
    cy.contains('div', '403')
    cy.contains('div', 'Sorry, you are not authorized to access this page.')
    cy.visit(manageUser, { method: 'GET' })
    cy.wait('@GQLReq')
    cy.contains('div', '403')
    cy.contains('div', 'Sorry, you are not authorized to access this page.')
  })

  it('Manage users', () => {
    cy.login({
      email: contact.email,
      password: contact.password,
      visitUrl: manageUser,
    })
    cy.contains('User Manager')
    cy.get('input[aria-label="Select user seconduser"]').click()
    cy.get("[data-testid='deactivate-btn']").click()
    cy.contains('Deactivate User')
    cy.contains('Are you sure you want to deactivate the selected user?')
    cy.contains(
      '[class="ant-modal-body"] [type="button"]',
      'Deactivate',
    ).click()
    cy.contains('td[class="ant-table-cell"]', 'seconduser@gmail.com').should(
      'not.exist',
    )

    cy.get('input[aria-label="Select user firstuser"]').click()
    cy.get("[data-testid='delete-btn']").click()
    cy.contains('Delete User')
    cy.contains('Are you sure you want to delete the selected user?')
    cy.contains('[class="ant-modal-body"] [type="button"]', 'Delete').click()
    cy.contains('td[class="ant-table-cell"]', 'firstuser@gmail.com').should(
      'not.exist',
    )

    // [segment]: user tries to deactivate or delete his own user from user manager list
    cy.get(`[aria-label="Select user ${contact.displayName}"]`).click()
    cy.get('[data-testid="delete-btn"]').click()
    cy.contains(
      '[class="ant-modal-confirm-title"]',
      'Cannot delete or deactivate current user',
    )
    cy.contains(
      '[class="ant-modal-confirm-content"]',
      'You cannot delete or deactivate the user you are currently logged in as. Please deselect your current user and try again',
    )
    cy.get('[class="ant-modal-body"] [type="button"]').click()
    cy.get('[data-testid="deactivate-btn"]').click()
    cy.contains(
      '[class="ant-modal-confirm-title"]',
      'Cannot delete or deactivate current user',
    )
    cy.contains(
      '[class="ant-modal-confirm-content"]',
      'You cannot delete or deactivate the user you are currently logged in as. Please deselect your current user and try again',
    )
    cy.get('[data-testid="show-inactive-users"]').click({ force: true })

    cy.contains('td[class="ant-table-cell"]', 'seconduser@gmail.com').should(
      'exist',
    )
  })

  it('updating user info', () => {
    cy.login({ ...contact, visitUrl: profile })
    // cy.get('a[href="/profile"]').click()
    cy.get('[id="phone"]').clear().type(contact.updatedPhone)
    cy.get('[id="address"]').clear().type(address.updatedAddress)
    cy.contains('[type="submit"]', 'Save').click()
    cy.wait('@GQLReq')
    cy.contains('Profile updated successfully')
    cy.reload()

    // [segment]: Contact
    cy.get('[id="lastName"]').should('have.value', contact.lastName)
    cy.get('[id="firstName"]').should('have.value', contact.firstName)
    cy.get('[id="pronouns"]').should('have.value', contact.pronouns)
    cy.get('[id="phone"]').should('have.value', contact.updatedPhone)

    // [segment]: Address
    cy.contains('[data-testid="select-country"]', address.country)

    cy.contains('[data-testid="state-select"]', address.state)

    cy.get('[id="city"]').should('have.value', address.city)
    cy.get('[id="address"]').should('have.value', address.updatedAddress)
    cy.get('[id="zipCode"]').should('have.value', address.zipCode)

    // [segment]: School
    cy.get('[id="position"]').should('have.value', school.position)
    cy.get('[id="organization"]').should('have.value', school.organization)
    cy.contains(
      '[data-testid="institutional-setting-select"]',
      school.institutionalSetting,
    )
    cy.contains(
      '[data-testid="teaching-experience-select"]',
      school.yearsOfExperience,
    )
    cy.contains(
      '[data-testid="primary-institution-select"]',
      school.typeOfInstitution,
    )
    cy.get('[name="apIbCourses"]').should('have.value', 'true')

    // [segment]: Reviewing
    cy.get('[name="reviewerInterest"]').should('have.value', 'true')
    cy.contains('[data-testid="course-taught-select"]', 'Biology')

    reviewing.threeCourses.forEach(subject => {
      cy.contains('[data-testid="three-course-select"]', subject)
    })

    cy.get('[name="assessmentTraining"]').should('have.value', 'true')
    cy.get('[name="assessmentTrainingInclusive"]').should('have.value', 'true')
    cy.get('[id="source"]').should('have.value', 'college')
  })

  it('password reset', () => {
    cy.login({ ...contact, visitUrl: profile })
    cy.contains('[class="ant-tabs-tab"]', 'Password').click()
    cy.get('[id="currentPassword"]').type(contact.password)
    cy.get('[id="newPassword"]').type(contact.updatedPassword)
    cy.get('[id="newPasswordConfirmation"]').type(contact.updatedPassword)
    cy.contains('button[type="submit"]', 'Save').click({ force: true })
    cy.wait('@GQLReq')
    cy.contains('Profile updated successfully')
  })
})
