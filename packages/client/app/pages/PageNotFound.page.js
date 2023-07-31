import React from 'react'
import { Link } from 'react-router-dom'
import { Result } from 'ui'

const PageNotFound = () => (
  <Result
    extra={<Link to="/discover">Back to Browse Questions</Link>}
    status="404"
    subTitle="Sorry, the page you visited does not exist."
    title="404"
  />
)

PageNotFound.propTypes = {}

PageNotFound.defaultProps = {}

export default PageNotFound
