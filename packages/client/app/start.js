import { startClient } from '@coko/client'

import routes from './routes'
import theme from './theme'
// import makeApolloConfig from './apolloConfig'

startClient(routes, theme)
