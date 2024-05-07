/* stylelint-disable string-quotes */
/* eslint-disable react/prop-types */
import React from 'react'
import { PropTypes } from 'prop-types'
import styled from 'styled-components'
import { th } from '@coko/client'
import { TabsStyled } from '../common'
import { MentionsList } from './MentionsList'

const EndMessage = styled.div`
  align-items: center;
  /* background-color: #eee; */
  color: ${th('colorPrimary')};
  display: flex;
  font-size: 20px;
  justify-content: center;
  padding: 4rem;
  text-align: center;
  white-space: nowrap;
  width: 100%;

  &::before,
  &::after {
    background-color: ${th('colorPrimary')};
    content: '';
    display: inline-block;
    height: 1px;
    margin: 0 1rem;
    width: 50px;
  }
`

export const NotificationsUI = ({
  tabKey,
  setTabKey,
  fullListOfIds,
  handleScrollNext,
  mentionsError,
  markMentionsAs,
  mentionsLoading,
  updatedMentions,
  totalCount,
  onSearch,
  infiniteScrollMessage,
}) => {
  const tabs = [
    {
      label: '@MENTIONS',
      key: 'messages',
      children: mentionsError ? (
        <p>There was a problem trying to fetch your messages</p>
      ) : (
        <MentionsList
          fullListOfIds={fullListOfIds}
          infiniteScroll={{
            enabled: true,
            props: {
              dataLength: updatedMentions.length ?? 0,
              endMessage: !mentionsLoading && totalCount > 0 && (
                <EndMessage>There are no more conversations</EndMessage>
              ),
              hasMore: updatedMentions.length < totalCount,
              next: handleScrollNext,
              scrollableTarget: 'list-content-wrapper',
              scrollThreshold: '50px',
            },
          }}
          loading={mentionsLoading}
          locale={{
            emptyText: <EndMessage>{infiniteScrollMessage}</EndMessage>,
          }}
          markMentionsAs={markMentionsAs}
          mentions={updatedMentions}
          onSearch={onSearch}
          showTotal
          totalCount={totalCount}
        />
      ),
    },
  ]

  return <TabsStyled activeKey={tabKey} items={tabs} onChange={setTabKey} />
}

NotificationsUI.propTypes = {
  tabKey: PropTypes.string.isRequired,
  setTabKey: PropTypes.func.isRequired,
}
export default NotificationsUI
