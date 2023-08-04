import { gql } from '@apollo/client'

export default gql`
  query LoginConfig {
    getLoginConfig {
      showEmailLogin
      biointeractiveOathClientId
      biointeractiveOathRedirectUri
    }
  }
`
