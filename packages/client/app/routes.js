import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  useHistory,
} from 'react-router-dom'
import styled from 'styled-components'

import {
  Authenticate,
  PageLayout as Page,
  RequireAuth,
  useCurrentUser,
} from '@coko/client'

import { Header, Footer, VisuallyHiddenElement, Spin } from 'ui'
import GlobalStyles from './globalStyles'
import { hasGlobalRole, MetadataProvider } from './utilities'

import {
  Login,
  Signup,
  VerifyEmail,
  RequestPasswordReset,
  ResetPassword,
  VerifyCheck,
  Dashboard,
  Discover,
  Question,
  ManageUsers,
  TeamManager,
  UserProfile,
  DeactivatedUser,
  Lists,
  ListContent,
  BioInteractiveOauth,
  External,
  PageNotFound,
} from './pages'

import { CURRENT_USER } from './graphql'

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const regexPaths = [
  // {
  //   path: /^\/question\/[A-Za-z0-9-]+\/test$/i,
  //   name: 'Question page',
  // },
  // {
  //   path: /^\/question\/[A-Za-z0-9-]+$/i,
  //   name: 'Question Editor page',
  // },
  {
    path: /^\/discover$/,
    name: 'Browse Questions page',
  },
  {
    path: /^\/dashboard$/,
    name: 'Dashboard page',
  },
  {
    path: /^\/lists$/,
    name: 'Lists page',
  },
  {
    path: /^\/manage-users$/,
    name: 'User Manager page',
  },
  {
    path: /^\/manage-teams$/,
    name: 'Team Manager page',
  },
  {
    path: /^\/profile$/,
    name: 'User Profile page',
  },
  {
    path: /^\/login+/,
    name: 'Login page',
  },
  {
    path: /^\/signup$/,
    name: 'Signup page',
  },
  {
    path: /^\/signup-profile$/,
    name: 'Signup Questionnaire',
  },
  {
    path: /^\/email-verification\/[A-Za-z0-9-]+$/,
    name: 'Verify email',
  },
  {
    path: /^\/request-password-reset$/,
    name: 'Request Password Reset page',
  },
  {
    path: /^\/password-reset\/[A-Za-z0-9-]+$/,
    name: 'Reset Password page',
  },
  {
    path: /^\/ensure-verified-login$/,
    name: 'Email Not Verified page',
  },
  {
    path: /^\/biointeractive-oauth+/,
    name: 'BioInteractive login',
  },
  {
    path: /^\/$/,
    name: 'Home page',
  },
  {
    path: /^\/about$/,
    name: 'About',
  },
  {
    path: /^\/learning$/,
    name: 'Professional Learning',
  },
]

const Wrapper = props => {
  const { children } = props

  const history = useHistory()

  useEffect(() => {
    const path = history.location.pathname
    const title = regexPaths.find(p => p.path.test(path))

    if (title) {
      document.title = `${title?.name} - HHMI Assessment Builder`
    }

    const unlisten = history.listen(val => {
      const pathName = val.pathname
      const pathTitle = regexPaths.find(p => p.path.test(pathName))

      if (pathTitle) {
        document.getElementById('page-announcement').innerHTML = pathTitle?.name

        document.title = `${pathTitle?.name} - HHMI Assessment Builder`
      }
    })

    return unlisten
  }, [])

  useEffect(() => {
    const keyDownListener = e => {
      if (e.key === 'Tab') {
        // select only visible antd modal dialog
        const dialog = document.querySelector(
          ':not([style="display: none;"]) > .ant-modal[role="dialog"]',
        )

        if (dialog) {
          const focusableElements = dialog.querySelectorAll(
            [
              'a[href]',
              'area[href]',
              'input:not([disabled]):not([type=hidden])',
              'select:not([disabled])',
              'textarea:not([disabled])',
              'button:not([disabled])',
              'object',
              'embed',
              '[tabindex]:not([tabindex="-1"]):not([aria-hidden="true"])',
              'audio[controls]',
              'video[controls]',
              '[contenteditable]:not([contenteditable="false"])',
            ].join(', '),
          )

          const firstFocusableElement = focusableElements[0]

          const lastFocusableElement =
            focusableElements[focusableElements.length - 1]

          if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
              lastFocusableElement.focus()
              e.preventDefault()
            }
          } else if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus()
            e.preventDefault()
          }
        }
      }
    }

    document.addEventListener('keydown', keyDownListener)

    return document.removeEventListener('kaydown', keyDownListener)
  }, [])

  return (
    <LayoutWrapper>
      {children}
      <VisuallyHiddenElement
        aria-live="polite"
        as="div"
        id="page-announcement"
        role="status"
      />
    </LayoutWrapper>
  )
}

const StyledPage = styled(Page)`
  height: calc(100% - 64px - 40px);
`

const StyledSpin = styled(Spin)`
  display: grid;
  height: 100vh;
  place-content: center;
`

const Loader = () => <StyledSpin spinning />

const SiteHeader = () => {
  const headerLinks = {
    homepage: '/',
    questions: '/discover',
    dashboard: '/dashboard',
    lists: '/lists',
    about: '/about',
    learning: '/learning',
    manageUsers: '/manage-users',
    manageTeams: '/manage-teams',
    profile: '/profile',
    login: '/login',
  }

  const { currentUser, setCurrentUser } = useCurrentUser()
  const client = useApolloClient()
  const history = useHistory()
  const [currentPath, setCurrentPath] = useState(history.location.pathname)

  useEffect(() => {
    const unlisten = history.listen(val => setCurrentPath(val.pathname))

    return unlisten
  }, [])

  const logout = () => {
    setCurrentUser(null)
    client.cache.reset()

    localStorage.removeItem('token')
    localStorage.removeItem('dashboardLastUsedTab')

    history.push('/login')
  }

  const isAdmin = hasGlobalRole(currentUser, 'admin')

  return (
    <Header
      canManageTeams={isAdmin}
      canManageUsers={isAdmin}
      currentPath={currentPath}
      displayName={currentUser?.displayName}
      links={headerLinks}
      loggedin={!!currentUser}
      onLogout={logout}
    />
  )
}

const StyledMain = styled.main`
  height: 100%;
`

const RequireProfile = ({ children }) => {
  const { pathname } = useLocation()
  const { currentUser } = useCurrentUser()

  if (!currentUser) return null

  if (!currentUser.isActive && pathname !== '/deactivated-user') {
    return <Redirect to="/deactivated-user" />
  }

  if (pathname !== '/signup-profile' && !currentUser.profileSubmitted) {
    return <Redirect to="/signup-profile" />
  }

  return children
}

const Authenticated = ({ children }) => {
  return (
    <RequireAuth notAuthenticatedRedirectTo="/login">
      <RequireProfile>{children}</RequireProfile>
    </RequireAuth>
  )
}

const routes = (
  <Authenticate currentUserQuery={CURRENT_USER} loadingComponent={<Loader />}>
    <Wrapper>
      <GlobalStyles />
      <SiteHeader />
      <MetadataProvider>
        <StyledPage fadeInPages={false} padPages={false}>
          <StyledMain id="main-content" tabIndex="-1">
            <Switch>
              <Route
                exact
                path="/signup-profile"
                render={() => (
                  <Authenticated>
                    <UserProfile signup />
                  </Authenticated>
                )}
              />

              <Route
                exact
                path="/dashboard"
                render={() => (
                  <Authenticated>
                    <Dashboard />
                  </Authenticated>
                )}
              />

              <Route component={Discover} exact path="/discover" />

              <Route
                exact
                path="/lists"
                render={() => (
                  <Authenticated>
                    <Lists />
                  </Authenticated>
                )}
              />

              <Route
                exact
                path="/list/:id"
                render={() => (
                  <Authenticated>
                    <ListContent />
                  </Authenticated>
                )}
              />

              <Route
                exact
                path="/question/:id/test"
                render={() => <Question testMode />}
              />

              <Route
                exact
                path="/question/:id"
                render={() => (
                  <Authenticated>
                    <Question />
                  </Authenticated>
                )}
              />
              <Route
                exact
                path="/manage-users"
                render={() => (
                  <Authenticated>
                    <ManageUsers />
                  </Authenticated>
                )}
              />

              <Route
                exact
                path="/manage-teams"
                render={() => (
                  <Authenticated>
                    <TeamManager />
                  </Authenticated>
                )}
              />
              <Route
                exact
                path="/profile"
                render={() => (
                  <Authenticated>
                    <UserProfile />
                  </Authenticated>
                )}
              />

              <Route component={Login} exact path="/login" />
              <Route component={Signup} exact path="/signup" />
              <Route
                component={VerifyEmail}
                exact
                path="/email-verification/:token"
              />
              <Route
                component={RequestPasswordReset}
                exact
                path="/request-password-reset"
              />
              <Route
                component={ResetPassword}
                exact
                path="/password-reset/:token"
              />
              <Route
                component={VerifyCheck}
                exact
                path="/ensure-verified-login"
              />
              <Route
                component={BioInteractiveOauth}
                exact
                path="/biointeractive-oauth"
              />
              <Route component={DeactivatedUser} path="/deactivated-user" />
              {/* Static pages hosted elsewhere */}
              <Route
                component={() => (
                  <External ariaLabel="Home page" src="/drupal/" />
                )}
                exact
                path="/"
              />
              <Route
                component={() => (
                  <External ariaLabel="About page" src="/drupal/about" />
                )}
                exact
                path="/about"
              />
              <Route
                component={() => (
                  <External
                    ariaLabel="Proffessional learning page"
                    src="/drupal/professional-learning"
                  />
                )}
                exact
                path="/learning"
              />
              <Route component={PageNotFound} path="/404" />
              <Route component={() => <Redirect to="/404" />} path="*" />
            </Switch>
          </StyledMain>
        </StyledPage>
      </MetadataProvider>
      <Footer
        links={{
          termsOfUse: 'https://www.hhmi.org/terms-of-use',
          privacyPolicy: 'https://www.hhmi.org/privacy-policy',
          homepage: '/',
        }}
      />
    </Wrapper>
  </Authenticate>
)

export default routes
