/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import * as React from 'react'
import classNames from 'classnames'
// import type { RenderNode } from './BaseSelect';

// export interface TransBtnProps {
//   className: string;
//   customizeIcon: RenderNode;
//   customizeIconProps?: any;
//   onMouseDown?: React.MouseEventHandler<HTMLSpanElement>;
//   onClick?: React.MouseEventHandler<HTMLSpanElement>;
//   children?: React.ReactNode;
// }

const TransBtn = ({
  className,
  customizeIcon,
  customizeIconProps,
  onMouseDown,
  onClick,
  children,
}) => {
  let icon

  if (typeof customizeIcon === 'function') {
    icon = customizeIcon(customizeIconProps)
  } else {
    icon = customizeIcon
  }

  return (
    <span
      aria-hidden
      className={className}
      onClick={onClick}
      onMouseDown={event => {
        event.preventDefault()

        if (onMouseDown) {
          onMouseDown(event)
        }
      }}
      style={{
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
      unselectable="on"
    >
      {icon !== undefined ? (
        icon
      ) : (
        <span
          className={classNames(
            className.split(/\s+/).map(cls => `${cls}-icon`),
          )}
        >
          {children}
        </span>
      )}
    </span>
  )
}

export default TransBtn
