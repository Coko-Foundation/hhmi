import * as React from 'react'

export default function useSelectTriggerControl(
  elements,
  open,
  triggerOpen,
  customizedTrigger,
) {
  const propsRef = React.useRef(null)
  propsRef.current = {
    open,
    triggerOpen,
    customizedTrigger,
  }

  React.useEffect(() => {
    function onGlobalMouseDown(event) {
      // If trigger is customized, Trigger will take control of popupVisible
      if (propsRef.current?.customizedTrigger) {
        return
      }

      let { target } = event

      if (target.shadowRoot && event.composed) {
        target = event.composedPath()[0] || target
      }

      if (
        propsRef.current.open &&
        elements()
          .filter(element => element)
          .every(element => !element.contains(target) && element !== target)
      ) {
        // Should trigger close
        propsRef.current.triggerOpen(false)
      }
    }

    window.addEventListener('mousedown', onGlobalMouseDown)
    return () => window.removeEventListener('mousedown', onGlobalMouseDown)
  }, [])
}
