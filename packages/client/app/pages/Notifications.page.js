/* stylelint-disable string-quotes */
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { th } from '@coko/client'
// eslint-disable-next-line import/no-extraneous-dependencies
import { name, lorem } from 'faker'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { List, TabsStyled, Search } from '../ui'
import userIcon from '../../static/user-icon.svg'
import { notificationMessageFilters } from '../ui/_helpers/searchFilters'
import theme from '../theme'

const StyledTabs = styled(TabsStyled)`
  height: 100%;
  width: 100%;

  .ant-tabs-nav {
    padding: 0.5rem 0.2rem 0;
  }

  .ant-tabs-nav-list .ant-tabs-tab [role='tab'] {
    border-radius: 0.5rem 0.5rem 0 0;
    box-shadow: 0 0 10px #0003;
    margin-bottom: -2px;
    padding: 0.5rem 1rem;

    &:focus {
      outline: none;
    }
  }

  .ant-tabs-nav-list .ant-tabs-tab.ant-tabs-tab-active {
    border-radius: 0.5rem 0.5rem 0 0;
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
  background-image: linear-gradient(to bottom, #fff 90%, #e6e6e6 100%);
  box-shadow: 0 12px 15px #0005;
  display: flex;
  gap: 1rem;
  height: fit-content;
  margin: 0;
  padding: 1rem;
  position: fixed;
  width: 100vw;
  z-index: 999;

  > * {
    width: 100%;
  }
`

const StyledList = styled(List)`
  margin-top: ${p => p.$marginTop};

  & :last-of-type(li) {
    margin-bottom: 12px;
  }
`

const ListItem = styled.div`
  align-items: center;
  background-color: ${th('colorChat')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 12px;
  width: 100%;
`

const ListItemContent = styled.span`
  align-items: center;
  background-color: #fff;
  border: 1px solid ${th('colorChat')};
  border-radius: 1.5rem 0.4rem 0.4rem 1.5rem;
  box-shadow: 0 0 15px #0004, inset 0 0 15px #0003;
  display: flex;
  gap: 2ch;
  justify-content: space-between;
  margin: 0.1rem 0;
  padding: 0.2rem 1rem;
  width: 95%;
`

const MessageContent = styled.span`
  align-items: center;
  display: flex;
  gap: 1ch;
  white-space: nowrap;
  width: 80%;
`

const MessageSender = styled.p`
  border-right: 1px solid ${th('colorChat')};
  color: ${th('colorChat')};
  display: flex;
  font-weight: bold;
  height: 100%;
  margin: 0;
  padding: 0.5rem 0.5rem 0.5rem 0;
`

const MessageContentText = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  width: 30%;
`

const ListItemContentDate = styled.span`
  > p {
    margin: 0;
    padding: 0;
    white-space: nowrap;
  }
`

// eslint-disable-next-line react/prop-types
const MessageNotificationsBlock = ({ messages }) => {
  const $header = useRef(null)

  return (
    <Wrapper>
      <StyledHeader id="mentions-header" ref={$header}>
        <Search filters={notificationMessageFilters} withFilters />
      </StyledHeader>
      <StyledList
        $marginTop={
          $header?.current &&
          `${$header.current.getBoundingClientRect().height}px`
        }
        dataSource={messages}
        pagination={{
          pageSize: 10,
        }}
        renderItem={({ from, content, date, id }) => {
          const senderName = from.split(' ')
          const [day, hours] = date.split(',')
          return (
            <ListItem key={id * 4}>
              <ListItemContent>
                <MessageContent>
                  {/* <Checkbox /> */}
                  <img
                    alt={`user-${senderName[0]}`}
                    src={userIcon}
                    style={{
                      width: '35px',
                      height: '35px',
                      borderRadius: '50%',
                      border: `1px solid ${theme.colorChat}`,
                      margin: '0',
                    }}
                  />
                  <MessageSender>
                    {senderName.length === 3
                      ? `${senderName[0]} ${senderName[1]}`
                      : `${senderName[0]}`}
                    :
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
      />
    </Wrapper>
  )
}

const fakeMessages = length => {
  const lngth = Array.from({ length })
  const messages = []
  lngth.forEach((e, i) => {
    messages[i] = {
      id: i,
      from: `@${name.findName()}`,
      content: lorem.words(15),
      date: new Date().toLocaleString(),
      unread: true,
    }
  })
  return messages
}

// eslint-disable-next-line react/prop-types
const NotificationPage = ({ currentTabKey }) => {
  const fakesmsgs = fakeMessages(33)
  const location = useLocation()
  const [currentTab, setCurrentTab] = useState(currentTabKey)

  useEffect(() => {
    if (location) {
      const tmp = location.pathname.slice(
        location.pathname.lastIndexOf('/') + 1,
      )

      setCurrentTab(tmp)
    }
  }, [location])

  const tabs = [
    {
      label: '@mentions',
      key: 'messages',
      children: <MessageNotificationsBlock messages={fakesmsgs} />,
    },
    {
      label: 'Tasks Notifications',
      key: 'tasks',
      children: (
        <List
          dataSource={fakesmsgs}
          renderItem={({ content }) => <p>{content}</p>}
        />
      ),
    },
  ]

  return (
    <StyledTabs
      // activeKey={currentTab}
      defaultActiveKey={currentTab}
      items={tabs.map(t => t)}
      type="line"
    />
  )
}

export default NotificationPage
