/* stylelint-disable string-quotes */
import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { th } from '@coko/client'
import { List, TabsStyled, Search, Button, Checkbox } from '../ui'
import userIcon from '../../static/user.svg'
import { notificationMessageFilters } from '../ui/_helpers/searchFilters'
import theme from '../theme'
import { alpha } from '../ui/_helpers/themeUtils'
import { NotificationsContext } from '../ui/_helpers/NotificationsProvider'

const StyledTabs = styled(TabsStyled)`
  height: 100%;
  width: 100%;

  .ant-tabs-nav {
    background-color: #fff;
    padding: 0.5rem 0.2rem 0;
  }

  .ant-tabs-nav-list .ant-tabs-tab,
  .ant-tabs-nav-list .ant-tabs-tab [role='tab'] {
    border-radius: 0.5rem 0.5rem 0 0;
    margin: 0 0 0 0.2rem;
    padding: 0.3rem 1rem;

    &:focus {
      color: #f0f8fa;
      outline: none;
    }
  }

  .ant-tabs-nav-list .ant-tabs-tab.ant-tabs-tab-active {
    background-color: ${th('colorPrimary')};
    border-radius: 0.5rem 0.5rem 0 0;
    color: ${th('colorBackground')};
  }

  .ant-tabs-content-holder {
    .ant-tabs-content {
      height: 100%;

      .ant-tabs-tabpane {
        height: 100%;
        margin: auto;
      }
    }
  }
`

const Wrapper = styled.span`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const StyledHeader = styled.header`
  --bg: #fff;
  align-items: center;
  background-image: linear-gradient(
    to bottom,
    ${th('colorPrimary')} 85%,
    ${th('colorSecondary')} 100%
  );
  box-shadow: 0 15px 15px #0000000a;
  display: flex;
  gap: 1rem;
  height: fit-content;
  margin: 0;
  padding: 1rem 3rem;
  position: fixed;
  width: 100%;
  z-index: 999;

  > * {
    width: 100%;
  }
`

const StyledList = styled(List)`
  background-color: ${th('colorBackground')};
  margin-top: ${p => p.$marginTop};
`

const ListItem = styled.div`
  align-items: center;
  background-color: #fff0;
  box-shadow: inset 0 0 10px #0001;
  display: flex;
  gap: 1rem;
  justify-content: center;
  outline: 1px solid #0001;
  padding: 15px 0;
  width: 100%;

  &[aria-selected='true'] {
    background-color: #eee;
  }
`

const ListItemContent = styled.span`
  align-items: center;
  background-color: ${p => (p.$unread ? '#fffe' : '#fffe')};
  border: 1px solid ${th('colorChat')};
  border-radius: 1.5rem 0.4rem 0.4rem 1.5rem;
  box-shadow: 0 0 10px #0003, inset 0 0 8px #0002;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem 1rem;
  transition: transform 0.3s;
  user-select: none;
  width: 90%;

  @media screen and (max-width: ${th('mediaQueries.large')}) {
    width: 90%;
  }
`

const MessageContent = styled.span`
  align-items: center;
  display: flex;
  gap: 1ch;
  position: relative;
  white-space: nowrap;
  width: 80%;
`

const MessageSender = styled.p`
  border-right: 1px solid ${alpha('colorChat', 0.7)};
  color: ${th('colorChat')};
  display: flex;
  flex-direction: column;
  font-weight: bold;
  height: 100%;
  margin: 0;
  padding: 0 0.3rem;
  width: 115px;
`

const MessageContentText = styled.p`
  overflow: hidden;
  padding-left: 0.5rem;
  text-overflow: ellipsis;
  width: 30%;
`

const ListItemContentDate = styled.span`
  > p {
    border-left: 1px solid ${alpha('colorChat', 0.2)};
    margin: 0;
    padding-left: 0.8rem;
    white-space: nowrap;
  }
`

const MarkAsRead = styled(Button)`
  margin: 5px;
`

// eslint-disable-next-line react/prop-types
const MessageNotificationsBlock = () => {
  const $header = useRef(null)
  const [headerHeight, setHeaderHeight] = useState('')
  const { mentions, setUpdated } = useContext(NotificationsContext)

  useEffect(() => {
    $header?.current &&
      setHeaderHeight(`${$header.current.getBoundingClientRect().height}px`)
  }, [$header])

  return (
    <Wrapper>
      <StyledHeader id="mentions-header" ref={$header}>
        <Search filters={notificationMessageFilters} withFilters />
      </StyledHeader>
      <StyledList
        $marginTop={headerHeight}
        dataSource={mentions}
        id="mentions-list"
        footerContent={
          <MarkAsRead
            onClick={() => {
              setUpdated()
              document
                .querySelector('#mentions-list')
                .querySelectorAll('[aria-selected="true"]')
                .forEach((el, i) => {
                  el.setAttribute('aria-selected', 'false')
                })
            }}
            type="primary"
          >
            Mark as Read
          </MarkAsRead>
        }
        // itemSelection
        pagination={{
          pageSize: 10,
        }}
        renderItem={message => {
          const itemRef = useRef(null)
          const [ariaSelected, setAriaSelected] = useState(false)

          const isSelected = () =>
            itemRef?.current?.getAttribute('aria-selected') === 'true'

          const { from, content, date, id, unread } = message
          const senderName = from.split(' ')
          const [day, hours] = date.split(',')

          // useEffect(() => {
          //   itemRef?.current &&
          //     itemRef?.current?.setAttribute(
          //       'aria-selected',
          //       ariaSelected.toString(),
          //     )
          // }, [ariaSelected, message])

          return (
            <ListItem
              ariaSelected={() => isSelected()}
              data-id={id}
              key={id}
              onClick={() => {
                itemRef?.current?.getAttribute('aria-selected') === 'true'
                  ? itemRef?.current?.setAttribute('aria-selected', 'false')
                  : itemRef?.current?.setAttribute('aria-selected', 'true')
                setAriaSelected(
                  Boolean(itemRef?.current?.getAttribute('aria-selected')),
                )
              }}
              ref={itemRef}
            >
              <Checkbox checked={isSelected()} />
              <ListItemContent $unread={unread}>
                <MessageContent>
                  <span
                    style={{
                      position: 'absolute',
                      color: theme.colorBackground,
                      border: '1px solid #990000',
                      backgroundColor: theme.colorError,
                      boxShadow: '0 0 7px #0003',
                      fontWeight: 'bold',
                      transition: 'transform 0.3s',
                      transform: `scale(${unread ? '1' : '0'})`,
                      borderRadius: '0.6rem',
                      padding: '0.1rem .4rem',
                      top: '-1rem',
                      left: '-1.8rem',
                      fontSize: theme.fontSizeBaseSmallest,
                    }}
                  >
                    UNREAD
                  </span>
                  <img
                    alt={`user-${senderName[0]}`}
                    src={userIcon}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: `3px double ${theme.colorChat}`,
                      margin: '0',
                    }}
                  />
                  <MessageSender>
                    <small>from:</small>
                    {senderName[0]}
                  </MessageSender>
                  <MessageContentText>{`${content}`}</MessageContentText>
                </MessageContent>
                <ListItemContentDate>
                  <p>{day}</p>
                  <p>{hours}</p>
                </ListItemContentDate>
              </ListItemContent>
            </ListItem>
          )
        }}
        // showTotalCount
        // showSearch
      />
    </Wrapper>
  )
}

// eslint-disable-next-line react/prop-types
const NotificationPage = () => {
  const { tabKey } = useContext(NotificationsContext)

  const tabs = [
    {
      label: '@mentions',
      key: 'mentions',
      children: <MessageNotificationsBlock />,
    },
    {
      label: 'Tasks Notifications',
      key: 'tasks',
      children: (
        <List dataSource={[]} renderItem={({ content }) => <p>{content}</p>} />
      ),
    },
  ]

  return (
    <StyledTabs
      // activeKey={currentTab}
      defaultActiveKey={tabKey}
      items={tabs.map(t => t)}
      type="line"
    />
  )
}

export default NotificationPage
