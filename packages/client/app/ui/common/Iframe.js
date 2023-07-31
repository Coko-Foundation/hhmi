import React, { useState, useEffect, useImperativeHandle, useRef } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Spin from './Spin'

const StyledIframe = styled.iframe`
  height: 100%;
  margin-bottom: -10px;
  width: 100%;
`

const Wrapper = styled.div`
  height: 100%;

  > * {
    height: 100%;

    .ant-spin-container {
      height: 100%;
    }
  }
`

const Iframe = React.forwardRef((props, ref) => {
  const { src, onLoad, ...otherProps } = props
  const [loading, setLoading] = useState(true)

  const iframeRef = useRef(null)

  useImperativeHandle(ref, () => iframeRef.current)

  useEffect(() => {
    iframeRef.current.onload = () => {
      onLoad()
      setLoading(false)
    }
  }, [])

  return (
    <Wrapper>
      <Spin renderBackground spinning={loading}>
        <StyledIframe ref={iframeRef} src={src} {...otherProps} />
      </Spin>
    </Wrapper>
  )
})

Iframe.propTypes = {
  src: PropTypes.string.isRequired,
  onLoad: PropTypes.func,
}

Iframe.defaultProps = {
  onLoad: () => {},
}

export default Iframe
