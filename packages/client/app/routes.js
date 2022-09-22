import React from 'react'
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
import { Button /* Spin */ } from 'ui'
import { hasGlobalRole } from './utilities'
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

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

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

    <StyledPage fadeInPages={false} padPages={false}>
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
        <Route component={ResetPassword} exact path="/password-reset/:token" />
        <Route component={VerifyCheck} exact path="/ensure-verified-login" />

        <Route component={() => <Redirect to="/dashboard" />} path="*" />
      </Switch>
    </StyledPage>

    <Footer />
  </Layout>
)

export default routes
