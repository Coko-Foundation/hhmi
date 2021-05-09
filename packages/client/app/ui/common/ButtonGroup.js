import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { grid } from '@coko/client'

const Wrapper = styled.div`
  display: inline-block;

  > button {
    margin-right: ${grid(1)};
  }

  > button:first-child {
    margin-left: 0;
  }

  > button:last-child {
    margin-right: 0;
  }
`

const ButtonGroup = props => {
  const { className, children } = props
  return <Wrapper className={className}>{children}</Wrapper>
}

ButtonGroup.propTypes = {
  /** Must be multiple Button components */
  children: PropTypes.arrayOf(
    (propValue, key, componentName, location, propFullName) => {
      const notButton = propValue.find(el => el.type.displayName !== 'Button')

      if (notButton)
        return new Error('ButtonGroup children should be instances of Button!')

      return null
    },
  ).isRequired,
}

ButtonGroup.defaultProps = {}

export default ButtonGroup
