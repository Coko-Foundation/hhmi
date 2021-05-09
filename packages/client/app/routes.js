import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Dummy from './ui/DummyPage'

const routes = (
  <Switch>
    <Route component={Dummy} exact path="/" />
  </Switch>
)

export default routes
