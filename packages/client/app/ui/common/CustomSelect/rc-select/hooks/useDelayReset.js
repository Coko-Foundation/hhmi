import * as React from 'react'

/**
 * Similar with `useLock`, but this hook will always execute last value.
 * When set to `true`, it will keep `true` for a short time even if `false` is set.
 */
export default function useDelayReset(timeout = 10) {
  const [bool, setBool] = React.useState(false)
  const delayRef = React.useRef(null)

  const cancelLatest = () => {
    window.clearTimeout(delayRef.current)
  }

  React.useEffect(() => cancelLatest, [])

  const delaySetBool = (value, callback) => {
    cancelLatest()

    delayRef.current = window.setTimeout(() => {
      setBool(value)

      if (callback) {
        callback()
      }
    }, timeout)
  }

  return [bool, delaySetBool, cancelLatest]
}
