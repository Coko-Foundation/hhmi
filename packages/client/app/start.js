import 'antd/dist/antd.less'
import { startClient } from '@coko/client'
import routes from './routes'
import theme from './theme'

startClient(routes, theme)
