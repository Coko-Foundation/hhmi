import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Iframe, PageNotFound } from 'ui'

const External = props => {
  const { src, ariaLabel } = props
  const [notFound, setNotFound] = useState(false)

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
    // render our local 404 if external url is not found
    if (
      frameRef.current.contentWindow.document.title ===
      'Page not found - HHMI Assessment Builder'
    ) {
      setNotFound(true)
      return
    }

    // transform all <a> elements of external resource to postMessage to parent window
    frameRef.current.contentWindow.document
      .querySelectorAll('main a')
      .forEach(node => {
        const href = node.getAttribute('href')

        if (href) {
          // find all anchor tags that link to pages inside the website
          if (!href.toLowerCase().startsWith('http')) {
            // make them post message to the parent window and handle it from our app
            // eslint-disable-next-line no-param-reassign
            node.onclick = e => {
              e.preventDefault()
              postMessage(href)
            }
          } else {
            // if it is an external link, navigate to that url
            // eslint-disable-next-line no-param-reassign
            node.onclick = e => {
              e.preventDefault()
              window.location.href = href
            }
          }
        }
      })

    // add listener for message events from embeded window
    window.addEventListener('message', handleMessage, false)
  }

  useEffect(() => {
    return () => window.removeEventListener('message', handleMessage, false)
  }, [])

  return notFound ? (
    <PageNotFound />
  ) : (
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
