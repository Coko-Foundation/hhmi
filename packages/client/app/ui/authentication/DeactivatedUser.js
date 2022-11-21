import React from 'react'
import { Result } from '../common'

const DeactivateUsers = () => {
  return (
    <Result
      status="403"
      subTitle="Sorry, your user has been deactivated. Please contact the administrators if you think this is a mistake."
      title="403"
    />
  )
}

export default DeactivateUsers
