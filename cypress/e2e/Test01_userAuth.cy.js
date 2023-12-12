/* eslint-disable jest/no-disabled-tests */
/* eslint-disable jest/expect-expect */
import { admin, user1, user2, editor, reviewer } from '../support/credentials'
import {
  alertContainer,
  antModalConfirmTitle,
  antTableCell,
  buttonAntModalBody,
  submitButton,
  antTabs,
  anchorTags,
  basicButton,
} from '../support/selectors'
import { laptop } from '../support/viewport'
import {
  signup as signupPage,
  dashboard as dashboardPage,
  manageUser as manageUserPage,
  manageTeam as manageTeamPage,
  requestPasswordReset as requestPasswordResetPage,
  login as loginPage,
  profile as profilePage,
  graphqlEndpoint,
} from '../support/routes'

const disableScripts = false

describe('Tests for user authentication', () => {
  const { contact, address, school, reviewing } = user1

  before(() => {
    cy.resetDB(disableScripts)
    cy.seedUser(disableScripts, { ...admin })
    cy.seedUser(disableScripts, { ...contact, profileSubmitted: false })
    cy.seedUser(disableScripts, { ...editor })
  })

  beforeEach(() => {
    cy.viewport(laptop.preset)
    cy.intercept({ method: 'POST', url: graphqlEndpoint }).as('GQLReq')
  })

  it('forgot password', () => {
    cy.visit(requestPasswordResetPage)
    cy.wait('@GQLReq')
    cy.get(submitButton).click()
    cy.contains(alertContainer, 'Email is required')
    cy.contains(anchorTags.login, 'Return to login form')

    cy.contains('Request password reset')
    cy.get('input[id="email"]').type(contact.email)
    cy.get(submitButton).click()
    cy.contains('Request successful!')
    cy.contains(
      `An email has been sent to ${contact.email} containing further instructions`,
    )
  })

  it('signup test', () => {
    cy.visit(signupPage)
    cy.get(submitButton).click()
    cy.contains(alertContainer, 'First name is required')
    cy.contains(alertContainer, 'Last name is required')
    cy.contains(alertContainer, 'Email is required')
    cy.contains(alertContainer, 'Password is required')
    cy.contains(alertContainer, 'Please confirm your password!')
    cy.signup(user2)
  })

  it('login & user profile', () => {
    cy.visit(loginPage)
    cy.contains('h1', 'Login')
    cy.contains(basicButton, 'Log in with BioInteractive')
    cy.contains(basicButton, 'Log in with Email').click()
    cy.get(submitButton).click()
    cy.contains(alertContainer, 'Email is required')
    cy.contains(alertContainer, 'Password is required')

    cy.contains(basicButton, 'Choose another login method')
    cy.contains(anchorTags.requestPasswordRest, 'Forgot your password?')
    cy.contains(anchorTags.signup, 'Do you want to signup instead?')

    cy.login({ ...contact })
    cy.wait('@GQLReq')
    cy.contains('User profile')
    cy.get(submitButton).click()
    cy.contains(alertContainer, 'Last name is required')
    cy.contains(alertContainer, 'First name is required')
    // cy.contains(alertContainer, 'You have to fill in your prefered pronouns')
    cy.contains(alertContainer, 'Phone number is required')
    // cy.contains(
    //   alertContainer,
    //   'Please select the country where your institution is located',
    // )
    cy.contains(
      alertContainer,
      'City where your Institution is located is required',
    )
    cy.contains(alertContainer, 'You have to fill in you position')
    cy.contains(
      alertContainer,
      'You have to fill in your Institution/Organization',
    )
    // cy.contains(alertContainer, 'You have to select your Type of Institution')
    cy.contains(
      alertContainer,
      'You have to select your years of teaching experience',
    )
    cy.contains(alertContainer, 'Please select an option')
    cy.contains(alertContainer, 'Please select an option')

    // [segment]: Contact
    cy.get('[id="lastName"]').type(contact.lastName)
    cy.get('[id="firstName"]').type(contact.firstName)
    // cy.get('[id="pronouns"]').type(contact.pronouns)
    // cy.get('[id="middleName"]').type(contact.middleName)
    cy.get('[id="displayName"]').clear().type(contact.displayName)
    cy.get('[id="phone"]').type(contact.phone)

    // [segment]: Address
    // checking if default country is USA
    cy.contains('[data-testid="select-country"]', 'USA')
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
    // cy.get('[data-testid="institutional-setting-select"]').click()
    // cy.get(`[title="${school.institutionalSetting}"]`).click()
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

    cy.get(submitButton).click()
    cy.wait('@GQLReq')
    cy.contains('div', 'Thank you for submitting your profile!', {
      timeout: 8000,
    })
  })

  it('User with editor priveleges', () => {
    cy.login({
      ...editor,
      visitUrl: loginPage,
    })
    cy.get('[data-testid="usermenu-btn"]').click()
    cy.contains('a', 'Manage Users').should('not.exist')
    cy.contains('a', 'Manage Teams').should('not.exist')
    cy.visit(manageTeamPage, { method: 'GET' })
    cy.wait('@GQLReq')
    cy.contains('div', '403')
    cy.contains('div', 'Sorry, you are not authorized to access this page.')
    cy.visit(manageUserPage, { method: 'GET' })
    cy.wait('@GQLReq')
    cy.contains('div', '403')
    cy.contains('div', 'Sorry, you are not authorized to access this page.')
  })

  it('User with Reviewer priveleges', () => {
    cy.seedUser(disableScripts, { ...reviewer })

    cy.login({
      ...reviewer,
      visitUrl: dashboardPage,
    })
    cy.contains('a', ' Manage Teams').should('not.exist')
    cy.contains('a', ' Manage Users').should('not.exist')
    cy.contains('a', ' Profile').should('not.exist')
    cy.contains('a', ' Logout').should('not.exist')

    cy.visit(manageTeamPage, { methosd: 'GET' })
    cy.wait('@GQLReq')
    cy.contains('div', '403')
    cy.contains('div', 'Sorry, you are not authorized to access this page.')
    cy.visit(manageUserPage, { method: 'GET' })
    cy.wait('@GQLReq')
    cy.contains('div', '403')
    cy.contains('div', 'Sorry, you are not authorized to access this page.')
  })

  it('Team manager', () => {
    const addUserToRole = (role, username) => {
      cy.get(`[data-testid="select-${role}"]`).type(username)
      cy.wait('@GQLReq')
      cy.contains('.ant-select-item-option-active', username).click()
      cy.get(`[aria-labelledby="${role}-team"]`).click()
      cy.contains(`[data-testid="${role}-list"]`, username)
    }

    const removeUserFromRole = (role, username) => {
      cy.contains('div', username).click()
      cy.wait('@GQLReq')
      cy.get(`[data-testid="remove-${role}"]`).click({ force: true })
      cy.wait('@GQLReq')
    }

    cy.login({ ...admin, visitUrl: manageTeamPage })
    // cy.get('[data-testid="usermenu-btn"]').click()
    // cy.contains('a', 'Manage Teams').click()

    // cy.visit(manageTeam, { method: 'GET' })
    cy.contains('h1', 'Team Manager')

    removeUserFromRole('managing-editor', editor.username)

    addUserToRole('managing-editor', editor.username)
  })

  it('Manage users', () => {
    cy.login({
      ...admin,
      visitUrl: manageUserPage,
    })
    cy.contains('User Manager')
    cy.get(`input[aria-label="Select user ${editor.username}"]`).click()
    cy.get("[data-testid='deactivate-btn']").click()
    cy.contains('Deactivate User')
    cy.contains('Are you sure you want to deactivate the selected user?')
    cy.contains(buttonAntModalBody, 'Deactivate').click()
    cy.contains(antTableCell, editor.email).should('not.exist')

    cy.get(`input[aria-label="Select user ${reviewer.username}"]`).click()
    cy.get("[data-testid='delete-btn']").click()
    cy.contains('Delete User')
    cy.contains('Are you sure you want to delete the selected user?')
    cy.contains(buttonAntModalBody, 'Delete').click()
    cy.contains(antTableCell, reviewer.email).should('not.exist')

    // [segment]: user tries to deactivate or delete his own user from user manager list
    cy.get(`[aria-label="Select user ${admin.username}"]`).click()
    cy.get('[data-testid="delete-btn"]').click()
    cy.contains(
      antModalConfirmTitle,
      'Cannot delete or deactivate current user',
    )
    cy.contains(
      '[class="ant-modal-confirm-content"]',
      'You cannot delete or deactivate the user you are currently logged in as. Please deselect your current user and try again',
    )
    cy.get(buttonAntModalBody).click()
    cy.get('[data-testid="deactivate-btn"]').click()
    cy.contains(
      antModalConfirmTitle,
      'Cannot delete or deactivate current user',
    )
    cy.contains(
      '[class="ant-modal-confirm-content"]',
      'You cannot delete or deactivate the user you are currently logged in as. Please deselect your current user and try again',
    )
    cy.get('[data-testid="show-inactive-users"]').click({ force: true })

    cy.contains(antTableCell, editor.email).should('exist')
  })

  it('updating user info', () => {
    cy.login({ ...contact, visitUrl: profilePage })
    // cy.get('a[href="/profile"]').click()
    cy.get('[id="phone"]').clear().type(contact.updatedPhone)
    cy.get('[id="address"]').clear().type(address.updatedAddress)
    cy.contains(submitButton, 'Save').click()
    cy.wait('@GQLReq')
    cy.contains('Profile updated successfully')
    cy.reload()

    // [segment]: Contact
    cy.get('[id="lastName"]').should('have.value', contact.lastName)
    cy.get('[id="firstName"]').should('have.value', contact.firstName)
    // cy.get('[id="pronouns"]').should('have.value', contact.pronouns)
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
    // cy.contains(
    //   '[data-testid="institutional-setting-select"]',
    //   school.institutionalSetting,
    // )
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
    cy.login({ ...contact, visitUrl: profilePage })
    cy.contains(antTabs, 'Password').click()
    cy.get('[id="currentPassword"]').type(contact.password)
    cy.get('[id="newPassword"]').type(contact.updatedPassword)
    cy.get('[id="newPasswordConfirmation"]').type(contact.updatedPassword)
    cy.contains(submitButton, 'Save').click({ force: true })
    cy.wait('@GQLReq')
    cy.contains('Profile updated successfully')
  })

  it('logout', () => {
    cy.login(contact)
    cy.logout()
    cy.wait('@GQLReq')
    cy.visit(dashboardPage)
    cy.location().should(location => {
      // eslint-disable-next-line jest/valid-expect
      expect(location.pathname).to.equal(loginPage)
      // eslint-disable-next-line jest/valid-expect
      expect(location.search).to.equal(`?next=${dashboardPage}`)
    })
  })
})
