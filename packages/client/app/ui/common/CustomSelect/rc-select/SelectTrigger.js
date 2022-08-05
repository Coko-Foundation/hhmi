/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import * as React from 'react'
import Trigger from 'rc-trigger'
// import type { AlignType } from 'rc-trigger/lib/interface';
import classNames from 'classnames'
// import type { Placement, RenderDOMFunc } from './BaseSelect';

const getBuiltInPlacements = dropdownMatchSelectWidth => {
  // Enable horizontal overflow auto-adjustment when a custom dropdown width is provided
  const adjustX = dropdownMatchSelectWidth === true ? 0 : 1
  return {
    bottomLeft: {
      points: ['tl', 'bl'],
      offset: [0, 4],
      overflow: {
        adjustX,
        adjustY: 1,
      },
    },
    bottomRight: {
      points: ['tr', 'br'],
      offset: [0, 4],
      overflow: {
        adjustX,
        adjustY: 1,
      },
    },
    topLeft: {
      points: ['bl', 'tl'],
      offset: [0, -4],
      overflow: {
        adjustX,
        adjustY: 1,
      },
    },
    topRight: {
      points: ['br', 'tr'],
      offset: [0, -4],
      overflow: {
        adjustX,
        adjustY: 1,
      },
    },
  }
}

// export interface RefTriggerProps {
//   getPopupElement: () => HTMLDivElement;
// }

// export interface SelectTriggerProps {
//   prefixCls: string;
//   children: React.ReactElement;
//   disabled: boolean;
//   visible: boolean;
//   popupElement: React.ReactElement;
//   forceRender: boolean;

//   animation?: string;
//   transitionName?: string;
//   containerWidth: number;
//   placement?: Placement;
//   dropdownStyle: React.CSSProperties;
//   dropdownClassName: string;
//   direction: string;
//   dropdownMatchSelectWidth?: boolean | number;
//   dropdownRender?: (menu: React.ReactElement) => React.ReactElement;
//   getPopupContainer?: RenderDOMFunc;
//   dropdownAlign: AlignType;
//   empty: boolean;

//   getTriggerDOMNode: () => HTMLElement;
//   onPopupVisibleChange?: (visible: boolean) => void;

//   onPopupMouseEnter: () => void;
// }

const SelectTrigger = (props, ref) => {
  const {
    prefixCls,
    disabled,
    visible,
    children,
    popupElement,
    containerWidth,
    animation,
    transitionName,
    dropdownStyle,
    dropdownClassName,
    direction = 'ltr',
    placement,
    dropdownMatchSelectWidth,
    dropdownRender,
    dropdownAlign,
    getPopupContainer,
    empty,
    getTriggerDOMNode,
    onPopupVisibleChange,
    onPopupMouseEnter,
    // forceRender,
    ...restProps
  } = props

  const dropdownPrefixCls = `${prefixCls}-dropdown`

  let popupNode = popupElement

  if (dropdownRender) {
    popupNode = dropdownRender(popupElement)
  }

  const builtInPlacements = React.useMemo(
    () => getBuiltInPlacements(dropdownMatchSelectWidth),
    [dropdownMatchSelectWidth],
  )

  // ===================== Motion ======================
  const mergedTransitionName = animation
    ? `${dropdownPrefixCls}-${animation}`
    : transitionName

  // ======================= Ref =======================
  const popupRef = React.useRef(null)

  React.useImperativeHandle(ref, () => ({
    getPopupElement: () => popupRef.current,
  }))

  const popupStyle = {
    minWidth: containerWidth,
    ...dropdownStyle,
  }

  if (typeof dropdownMatchSelectWidth === 'number') {
    popupStyle.width = dropdownMatchSelectWidth
  } else if (dropdownMatchSelectWidth) {
    popupStyle.width = containerWidth
  }

  return (
    <Trigger
      {...restProps}
      builtinPlacements={builtInPlacements}
      // forceRender={forceRender}
      getPopupContainer={getPopupContainer}
      getTriggerDOMNode={getTriggerDOMNode}
      hideAction={onPopupVisibleChange ? ['click'] : []}
      onPopupVisibleChange={onPopupVisibleChange}
      popup={
        <div onMouseEnter={onPopupMouseEnter} ref={popupRef}>
          {popupNode}
        </div>
      }
      popupAlign={dropdownAlign}
      popupClassName={classNames(dropdownClassName, {
        [`${dropdownPrefixCls}-empty`]: empty,
      })}
      popupPlacement={
        placement || (direction === 'rtl' ? 'bottomRight' : 'bottomLeft')
      }
      popupStyle={popupStyle}
      popupTransitionName={mergedTransitionName}
      popupVisible={visible}
      prefixCls={dropdownPrefixCls}
      showAction={onPopupVisibleChange ? ['click'] : []}
    >
      {children}
    </Trigger>
  )
}

const RefSelectTrigger = React.forwardRef(SelectTrigger)
RefSelectTrigger.displayName = 'SelectTrigger'

export default RefSelectTrigger
