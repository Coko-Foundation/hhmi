import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { PageLayout } from '@coko/client'
import { NavigationBar } from './ui'
import Dashboard from './pages/Dashboard.page'
import Question from './pages/Question.page'

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

const routes = (
  // <Wrapper>
  <PageLayout fadeInPages navComponent={NavigationBar}>
    <Switch>
      <Route component={Dashboard} exact path="/" />
      <Route component={Question} exact path="/question/:id" />
    </Switch>
  </PageLayout>
  // </Wrapper>
)

export default routes
