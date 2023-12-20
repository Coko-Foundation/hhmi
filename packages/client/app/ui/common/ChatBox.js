import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'

const StyledChatBox = styled.span`
  --border: ${p => p.$bc ?? '#555'};
  --border-width: ${p => `${p.$bw ?? '1'}px`};
  --background: ${p => p.$bgc ?? '#f0f0f0'};
  --triangle-x: ${p => `${p.$tx ?? '20'}px`};
  --triangle-height: ${p => `${p.$th ?? '10'}px`};
  --triangle-width: ${p => `${p.$tw ?? '8'}px`};
  --skew: ${p => `${p.$skew ?? '25deg'}`};

  background-color: var(--background);
  border: var(--border-width) solid var(--border);
  display: flex;
  flex-direction: column;
  overflow: visible;
  position: relative;

  &::before,
  &::after {
    background-color: #fff0;
  }

  &::before {
    border-left: var(--triangle-width) solid transparent;
    border-right: calc(var(--triangle-width) + var(--border-width)) solid
      transparent;
    border-top: var(--triangle-height) solid var(--border);
    bottom: calc((var(--triangle-height) + var(--border-width)) * -1);
    /* stylelint-disable-next-line string-quotes */
    content: '';
    height: 0;
    position: absolute;
    right: calc(var(--triangle-x) - (var(--border-width)) + 1px);
    transform: skewX(calc(var(--skew)));
    width: 0;
  }

  &::after {
    border-left: var(--triangle-width) solid transparent;
    border-right: var(--triangle-width) solid transparent;
    border-top: var(--triangle-height) solid var(--background);
    bottom: calc(var(--triangle-height) * -1);
    /* stylelint-disable-next-line string-quotes */
    content: '';
    height: 0;
    position: absolute;
    right: var(--triangle-x);
    transform: skewX(var(--skew));
    width: 0;
  }
`

const ChatBox = ({ header, content, footer, children, ...rest }) => {
  return (
    <StyledChatBox {...rest}>
      <span
        style={{ overflow: 'hidden', border: 'none', borderRadius: 'inherit' }}
      >
        {header && header}
        {content && content}
        {footer && footer}
        {/* {children} */}
      </span>
    </StyledChatBox>
  )
}

ChatBox.propTypes = {
  header: PropTypes.oneOfType([PropTypes.any]),
  content: PropTypes.oneOfType([PropTypes.any]),
  footer: PropTypes.oneOfType([PropTypes.any]),
}
ChatBox.defaultProps = { header: null, content: null, footer: null }

export default ChatBox
