import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { grid, th } from '@coko/client'
import { CheckOutlined, LoadingOutlined } from '@ant-design/icons'
import { Popover } from 'antd'
import { DateParser } from '../common'
import useBreakpoint from '../_helpers/useBreakpoint'

const AutoSavingWrapper = styled.span`
  padding: 0 ${grid(4)};

  .anticon-check {
    color: ${th('colorSuccess')};
  }

  .anticon-loading {
    color: ${th('colorPrimary')};
    margin-right: ${grid(1)};
  }

  button {
    background: transparent;
    border: navajowhite;
  }
`

const AutoSaveIndicator = props => {
  const { autoSaving, lastAutoSave } = props

  const [open, setOpen] = useState(false)

  const timeDifference = Math.floor(
    (new Date() - lastAutoSave) / 1000 / 60 / 60,
  )

  const handlePopoverKeydown = e => {
    if (e.key === 'Escape') setOpen(false)
  }

  let text = null
  let icon = null

  if (!lastAutoSave) {
    text = <span>Autosaving is on</span>
    icon = <CheckOutlined />
  } else if (autoSaving === false) {
    text = (
      <>
        <span>Last saved </span>
        <DateParser
          dateFormat={timeDifference < 24 ? 'HH:mm' : 'DD MMMM'}
          timestamp={lastAutoSave?.valueOf()}
        >
          {timestamp => <span>{timestamp}</span>}
        </DateParser>
      </>
    )
    icon = <CheckOutlined />
  } else if (autoSaving === true) {
    text = <span>Saving...</span>
    icon = <LoadingOutlined />
  }

  const isMobile = useBreakpoint('(max-width: 700px)')

  if (isMobile) {
    return (
      <AutoSavingWrapper>
        <Popover
          content={text}
          onOpenChange={setOpen}
          open={open}
          placement="bottom"
          trigger={['click', 'focus']}
        >
          <button onKeyDown={handlePopoverKeydown} type="button">
            {icon}
          </button>
        </Popover>
      </AutoSavingWrapper>
    )
  }

  return (
    <AutoSavingWrapper>
      {icon} {text}
    </AutoSavingWrapper>
  )
}

AutoSaveIndicator.propTypes = {
  autoSaving: PropTypes.bool,
  lastAutoSave: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
  ]),
}

AutoSaveIndicator.defaultProps = {
  autoSaving: false,
  lastAutoSave: null,
}

export default AutoSaveIndicator
