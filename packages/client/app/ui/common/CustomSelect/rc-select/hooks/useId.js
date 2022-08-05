/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react'
import canUseDom from 'rc-util/lib/Dom/canUseDom'

let uuid = 0

/** Is client side and not jsdom */
export const isBrowserClient = process.env.NODE_ENV !== 'test' && canUseDom()

/** Get unique id for accessibility usage */
export function getUUID() {
  let retId

  // Test never reach
  /* istanbul ignore if */
  if (isBrowserClient) {
    retId = uuid
    uuid += 1
  } else {
    retId = 'TEST_OR_SSR'
  }

  return retId
}

export default function useId(id) {
  // Inner id for accessibility usage. Only work in client side
  const [innerId, setInnerId] = React.useState()
  React.useEffect(() => {
    setInnerId(`rc_select_${getUUID()}`)
  }, [])
  return id || innerId
}
