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

import { PageLayout, RequireAuth, useCurrentUser } from '@coko/client'

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
} from './pages'

import { CURRENT_USER } from './graphql'

// hack as PageLayout does not have className prop
// const Wrapper = styled.div`
//   height: 100%;
//   > div {
//     > div {
//       > div {
//         padding: ${grid(2)};
//       }
//     }
//   }
// `

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;

  > div:first-child {
    font-size: 18px;
    margin-bottom: 20px;
  }
`

const Placeholder = () => {
  const { setCurrentUser } = useCurrentUser()
  const client = useApolloClient()
  const history = useHistory()

  const logout = () => {
    setCurrentUser(null)
    client.cache.reset()
    localStorage.removeItem('token')
    history.push('/login')
  }

  return (
    <Wrapper>
      <div>landing page</div>
      <div>
        <Button onClick={logout}>Logout</Button>
      </div>
    </Wrapper>
  )
}

// const Loader = () => <Spin spinning />

// const currentUserHasGlobalRole = (user, role) => {
//   user.teams.find(t => t.global && t.role === role)
// }

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
  // <Wrapper>
  <PageLayout
    fadeInPages
    // navComponent={NavigationBar}
  >
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <Authenticated>
            <Placeholder />
          </Authenticated>
        )}
      />

      <Route
        exact
        path="/signup-profile"
        render={() => (
          <Authenticated>
            <SignupProfile />
          </Authenticated>
        )}
      />

      <Route component={Login} exact path="/login" />
      <Route component={Signup} exact path="/signup" />
      <Route component={VerifyEmail} exact path="/email-verification/:token" />
      <Route
        component={RequestPasswordReset}
        exact
        path="/request-password-reset"
      />
      <Route component={ResetPassword} exact path="/password-reset/:token" />
      <Route component={VerifyCheck} exact path="/ensure-verified-login" />

      {/* <Route component={Dashboard} exact path="/dashboard" /> */}
      {/* <Route component={Question} exact path="/question/:id" /> */}
    </Switch>
  </PageLayout>
  // </Wrapper>
)

export default routes
