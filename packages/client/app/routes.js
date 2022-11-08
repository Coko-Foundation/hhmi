import React, { useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import {
  Route,
  Switch,
  Redirect,
  Link,
  useLocation,
  useHistory,
} from 'react-router-dom'
import styled from 'styled-components'

import {
  PageLayout as Page,
  RequireAuth,
  useCurrentUser,
  grid,
  th,
} from '@coko/client'

// import { NavigationBar } from './ui'
import { Button, VisuallyHiddenElement /* Spin */ } from 'ui'
import { hasGlobalRole, MetadataProvider } from './utilities'
// import { logout } from './utilities'

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
} from './pages'

import { CURRENT_USER } from './graphql'

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const pathToPageNameMap = {
  '/discover': 'Discover page',
  '/dashboard': 'Dashboard page',
  '/manage-users': 'User Manager page',
  '/manage-teams': 'Team Manager page',
  '/profile': 'User Profile page',
}

const Layout = props => {
  const { children } = props

  const history = useHistory()

  useEffect(() => {
    document.title = `${
      pathToPageNameMap[history.location.pathname]
    } - HHMI Assessment Builder`
  }, [])

  history.listen(val => {
    document.getElementById('page-announcement').innerHTML =
      pathToPageNameMap[val.pathname]

    document.title = `${
      pathToPageNameMap[val.pathname]
    } - HHMI Assessment Builder`
  })

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

const HeaderFooter = styled.div`
  align-items: center;
  /* background-color: darkseagreen; */
  background-color: slategray;
  /* background-color: ${th('colorPrimary')}; */
  color: white;
  display: flex;
  font-weight: bold;
  height: ${grid(10)};
  justify-content: space-between;
  padding: 0 ${grid(4)};
  width: 100%;

  /* stylelint-disable-next-line */
  > div {
    align-items: center;
    display: flex;

    /* stylelint-disable-next-line */
    > div:not(:last-child) {
      margin-right: ${grid(4)};
    }
  }
`

const StyledLink = styled(Link)`
  color: ${th('colorTextReverse')};
`

const StyledPage = styled(Page)`
  height: calc(100% - ${grid(20)});
`

const LogoutButton = () => {
  const { setCurrentUser } = useCurrentUser()
  const client = useApolloClient()
  const history = useHistory()

  const logout = () => {
    setCurrentUser(null)
    client.cache.reset()

    localStorage.removeItem('token')
    localStorage.removeItem('dashboardLastUsedTab')

    history.push('/login')
  }

  return <Button onClick={logout}>Logout</Button>
}

// const Loader = () => <Spin spinning />

const Header = () => {
  const { currentUser } = useCurrentUser()

  return (
    <HeaderFooter>
      <div>
        <div>
          <StyledLink to="/dashboard">HHMI</StyledLink>
        </div>
        <div>
          <StyledLink to="/discover">Discover</StyledLink>
        </div>
      </div>
      <div>
        {currentUser && hasGlobalRole(currentUser, 'admin') && (
          <>
            <div>
              <StyledLink to="/manage-users">User Manager</StyledLink>
            </div>
            <div>
              <StyledLink to="/manage-teams">Team Manager</StyledLink>
            </div>
          </>
        )}
        <div>
          <StyledLink to="/profile">{currentUser?.displayName}</StyledLink>
        </div>
        <div>{currentUser && <LogoutButton />}</div>
      </div>
    </HeaderFooter>
  )
}

const Footer = () => {
  return (
    <HeaderFooter>
      <div>Footer</div>
    </HeaderFooter>
  )
}

const StyledMain = styled.main`
  height: 100%;
`

const RequireProfile = ({ children }) => {
  const { pathname } = useLocation()
  const { currentUser } = useCurrentUser()

  if (!currentUser) return null

  if (pathname !== '/signup-profile' && !currentUser.profileSubmitted) {
    return <Redirect to="/signup-profile" />
  }

  return children
}

const Authenticated = ({ children }) => {
  return (
    <RequireAuth
      // LoadingComponent={Loader}
      currentUserQuery={CURRENT_USER}
      notAuthenticatedRedirectTo="/login"
    >
      <RequireProfile>{children}</RequireProfile>
    </RequireAuth>
  )
}

const routes = (
  <Layout>
    <Header />
    <MetadataProvider>
      <StyledPage fadeInPages={false} padPages={false}>
        <StyledMain>
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

            <Route component={() => <Redirect to="/dashboard" />} path="*" />
          </Switch>
        </StyledMain>
      </StyledPage>
    </MetadataProvider>
    <Footer />
  </Layout>
)

export default routes
