import React from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import {
  Route,
  Switch,
  Redirect,
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
// import { logout } from './utilities'

import {
  Login,
  Signup,
  SignupProfile,
  VerifyEmail,
  RequestPasswordReset,
  ResetPassword,
  VerifyCheck,
  Dashboard,
  Question,
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
    > div:first-child {
      margin-right: ${grid(4)};
    }
  }
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
      <div>HHMI</div>
      <div>
        <div>{currentUser?.displayName}</div>
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
  // const { currentUser } = useCurrentUser()
  const { data: currentUserQueryData } = useQuery(CURRENT_USER)
  const currentUser = currentUserQueryData?.currentUser

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
              <SignupProfile />
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

        <Route
          exact
          path="/question/:id"
          render={() => (
            <Authenticated>
              <Question />
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
