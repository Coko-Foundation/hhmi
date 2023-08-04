import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Iframe } from 'ui'

const External = props => {
  const { src, ariaLabel } = props

  const history = useHistory()
  const frameRef = useRef(null)

  const handleMessage = event => {
    if (event.origin !== window.origin || event.data.type !== 'location') return

    history.push(event.data.url)
  }

  const postMessage = newLocation => {
    window.parent.postMessage(
      {
        type: 'location',
        url: newLocation,
      },
      window.origin,
    )
  }

  const handleIframeLoaded = () => {
    // transform all <a> elements of external resource to postMessage to parent window
    setTimeout(() => {
      frameRef.current.contentWindow.document
        .querySelectorAll('main a')
        .forEach(node => {
          const href = node.getAttribute('href')

          // find all anchor tags that link to pages inside the website
          if (!href.toLowerCase().startsWith('http') /* || contains  */) {
            // make them post message to the parent window and handle it from our app
            // eslint-disable-next-line no-param-reassign
            node.onclick = e => {
              e.preventDefault()
              postMessage(href)
            }
          }
        })
    }, 500)

    // add listener for message events from embeded window
    window.addEventListener('message', handleMessage, false)
  }

  useEffect(() => {
    return () => window.removeEventListener('message', handleMessage, false)
  }, [])

  return (
    <Iframe
      aria-label={ariaLabel}
      id="external"
      onLoad={handleIframeLoaded}
      ref={frameRef}
      src={src}
    />
  )
}

External.propTypes = {
  src: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
}

export default External
