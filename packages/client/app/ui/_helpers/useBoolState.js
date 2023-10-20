import { useEffect, useState } from 'react'
import { safeCall } from '../../utilities'

// #endregion Styleds
// useBoolState :
//  params:
//    - start(initial state)
//    - options: object to optionally execute the following callbacks:
//          NOTE: All of them will be executed on the Effect with the state iself as dependency
//              - onTrue: callback to execute when the state is setted to true
//              - onFalse: callback to execute when the state is setted to false
//              - onToggle: callback to execute when the state changes
//  returns: Array of 5 positions [state, actions to set the state to true, false and/or toggle (in that order), state setter function ]
export default function useBoolState(start = false, options = {}) {
  const { onTrue, onFalse, onToggle } = options
  const [isTrue, setIsTrue] = useState(start)

  const actions = [
    () => setIsTrue(true),
    () => setIsTrue(false),
    () => setIsTrue(!isTrue),
  ]

  useEffect(() => {
    isTrue ? safeCall(onTrue) : safeCall(onFalse)
    safeCall(onToggle)
  }, [isTrue])
  return [isTrue, ...actions, setIsTrue]
}
