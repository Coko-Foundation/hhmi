/* stylelint-disable value-list-comma-newline-after */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { PropTypes } from 'prop-types'
import { th, grid } from '@coko/client'
import { ArrowRightOutlined, EyeOutlined } from '@ant-design/icons'
import { Button, Checkbox, List } from '..'
import { notificationMessageFilters } from '../_helpers/searchFilters'
import MentionsItem from './MentionsItem'

const MessagePreview = styled.aside`
  align-items: center;
  background-color: #f9fafa;
  border: ${p => p.$collapsed && '1px solid #aaa'};
  border-left: 1px solid #aaa;
  border-radius: ${p => p.$collapsed && '50% .2rem 50% 50%'};
  border-right: 1px solid #aaa;
  box-shadow: ${p => p.$collapsed && '0 0 8px #0002'};

  display: flex;
  flex-direction: column;
  height: calc(100% - 80px);
  margin-right: ${p => (p.$collapsed ? '5px' : '0')};
  margin-top: ${p => (p.$collapsed ? '5px' : '0')};
  max-height: ${p => (p.$collapsed ? '0' : '100%')};
  max-width: ${p => (p.$collapsed ? '40px' : '400px')};
  min-height: 40px;

  overflow: hidden;
  padding: 0 0 1rem;
  position: absolute;
  right: 0;
  transition: max-width 0.4s, max-height 0.5s, margin-right 0.7s,
    margin-top 0.7s, border-radius 0.3s, border 0.7s, box-shadow 0.7s;
  width: 100%;
  z-index: 10;

  @media screen and (min-width: 1200px) {
    height: 100%;
    width: 100%;
  }
`

const MessagePreviewFrom = styled.span`
  border-bottom: 1px solid ${th('colorPrimary')};
  color: ${th('colorPrimary')};
  display: flex;
  flex-direction: column;
  margin: 0;
  min-width: 400px;
  overflow: hidden;
  padding: 0.5rem 2rem 1rem;
  text-align: left;
  width: 100%;

  > * {
    margin: 0;
  }
`

const MessagePreviewContent = styled.span`
  align-items: center;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 0.2rem;
  box-shadow: 0 0 5px #0001;
  display: flex;
  flex-direction: column;
  margin: 1rem;
  min-width: 200px;
  padding: 0 0 1rem;
`

const MessagePreviewText = styled.p`
  min-width: 200px;
  padding: 0 2rem;
`

const MessagePreviewDate = styled.small`
  align-self: flex-end;
  color: ${th('colorPrimary')};
  padding: 0 2rem;
`

const MessagePreviewOpenIcon = styled(EyeOutlined)`
  color: ${th('colorPrimary')};
  font-size: 18px;
  padding: 0.3rem;
`

const SearchWrapper = styled.div`
  background: ${th('colorBackgroundHue')};
  padding: 1rem;
  width: 100%;

  @media screen and (min-width: 1200px) {
    padding: 1rem 4rem;
  }
`

export const SubHeader = styled.div`
  align-items: center;
  background: ${th('colorBackground')};
  border-bottom: 1px solid #0005;
  border-top: 1px solid #0005;
  box-shadow: inset 0 0 10px #0001;
  display: flex;
  font-size: ${th('fontSizeBaseSmaller')};
  gap: 0.7rem;
  justify-content: flex-start;
  margin: 0;
  padding: 0.3rem 0.56rem;
`

const SubHeaderItem = styled.span`
  align-items: center;
  border-right: 1px solid #0002;
  display: flex;
  height: fit-content;
  justify-content: center;
  outline: 1px solid #fff2;
  padding: 0 0.5rem;
  white-space: nowrap;
  width: fit-content;

  > strong {
    padding: 0 0.5rem 0 0;
  }
`

const CheckBox = styled(Checkbox)`
  align-items: center;
  border-right: 1px solid #0002;
  display: flex;
  height: fit-content;
  outline: 1px solid #fff2;
  padding: 0 0.2rem;
  white-space: nowrap;
  width: fit-content;

  > * {
    font-size: ${th('fontSizeBaseSmaller')};
  }
`

const StyledList = styled(List)`
  background-color: ${th('colorBackground')};
  margin-top: ${p => p.$marginTop};
`

const ListItemWrapper = styled.li`
  align-items: center;
  background-color: #fff0;
  box-shadow: inset 0 0 10px #0001;
  display: flex;
  justify-content: center;
  margin: 0;
  overflow: hidden;
  position: relative;
  width: 100%;

  /* the list wrapper (Ant Checkbox label) */
  & label {
    align-items: center;
    display: flex;
    padding: ${grid(5)} ${grid(3)};
    position: relative;
    width: 100%;
    /* the actual checkbox */
    > :first-child {
      margin: 0 0.3rem 0 0;
    }

    > :last-child {
      display: flex;
      justify-content: center;
      width: 100%;
    }

    @media screen and (max-width: 800px) {
      padding: ${grid(7)} 0;

      > :first-child {
        left: 0.3rem;
        position: absolute;
        top: 0.3rem;
      }
    }
  }
`

const MarkAsRead = styled(Button)`
  height: fit-content;
  margin: 5px;
`

const TopMenu = styled.span`
  align-items: center;
  background-color: ${th('colorBackgroundHue')};
  display: flex;
  gap: 1.5rem;
  height: 40px;
  justify-content: space-between;
  width: 100%;
`

const TopMenuTitle = styled.p`
  color: ${p => (p.$collapsed ? '#fff0' : th('colorText'))};
  margin: 0;
  padding: 0.5rem 1rem;
  transition: color 0.3s;
  white-space: nowrap;
`

const ArrowIcon = styled(ArrowRightOutlined)`
  border-radius: 50%;
  display: flex;
  height: 40px;
  justify-content: center;
  position: ${p => p.$collapsed && 'absolute'};
  right: 0;
  text-align: center;
  transform: ${p =>
    p.$collapsed ? 'rotate(180deg) translate(-1px, 1px)' : 'none'};
  transition: transform 0.2s;
  width: 40px;
  z-index: 999;
`

const MessagePreviewBody = styled.div`
  min-width: 200px;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
  width: 100%;
`

// eslint-disable-next-line react/prop-types
const Preview = ({ message }) => {
  const [collapse, setCollapse] = useState(true)

  useEffect(() => {
    message?.from && collapse && setCollapse(false)
  }, [message])
  return (
    <MessagePreview $collapsed={collapse}>
      <TopMenu>
        <TopMenuTitle $collapsed={collapse}>Message Preview</TopMenuTitle>
        <ArrowIcon
          $collapsed={collapse}
          onClick={() => setCollapse(!collapse)}
        />
      </TopMenu>
      <MessagePreviewBody>
        {message?.from && (
          <MessagePreviewFrom>
            <strong>from:</strong>
            <h2>@{message?.from}</h2>
          </MessagePreviewFrom>
        )}
        <MessagePreviewContent>
          <MessagePreviewText>
            {message?.content ?? (
              <>
                Click the <MessagePreviewOpenIcon /> icon on the message you
                want to preview
              </>
            )}
          </MessagePreviewText>
          <MessagePreviewDate>{message?.date}</MessagePreviewDate>
        </MessagePreviewContent>
      </MessagePreviewBody>
    </MessagePreview>
  )
}

Preview.propTypes = {
  message: PropTypes.shape({
    from: PropTypes.string,
    content: PropTypes.string,
    date: PropTypes.string,
  }).isRequired,
}

export const MentionsList = ({
  // withPreview,
  totalCount,
  mentions,
  infiniteScroll,
  locale,
  loading,
  markMentionsAs,
  onSearch,
}) => {
  const [selectedItems, setSelectedItems] = useState([])

  const customComponents = {
    Header: SubHeader,
    ListItemWrapper,
    SearchWrapper,
    CheckBox,
    // AsideRight: withPreview && <Preview message={messageToPreview} />,
    ContentWrapper,
  }

  const markAs = (state, ids) => {
    markMentionsAs({
      read: state,
      notificationIds: ids || selectedItems,
    })
    setSelectedItems([])
  }

  const getSelectedByReadState = (state = true) =>
    selectedItems.filter(
      id =>
        mentions?.find(item => item.unread === state && item.id === id) && id,
    )

  return (
    <StyledList
      CustomComponents={customComponents}
      dataSource={mentions}
      filters={notificationMessageFilters}
      footerContent={
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <MarkAsRead
            disabled={getSelectedByReadState(true).length === 0}
            onClick={() => markAs(true)}
            type="primary"
          >
            Mark as Read
          </MarkAsRead>
          <MarkAsRead
            disabled={getSelectedByReadState(false).length === 0}
            onClick={() => markAs(false)}
            type="primary"
          >
            Mark as Unread
          </MarkAsRead>
        </span>
      }
      id="mentions-list"
      infiniteScroll={infiniteScroll}
      itemSelection={{
        onChange: id => setSelectedItems(id),
      }}
      loading={loading}
      locale={locale}
      onSearch={onSearch}
      renderItem={item => <MentionsItem item={item} markAs={markAs} />}
      selectedItems={selectedItems}
      showPagination={false}
      showSearch
      subHeaderItems={
        <SubHeaderItem>
          <strong>Selected:</strong>
          {`${selectedItems.length} / ${totalCount ?? mentions.length}`}
        </SubHeaderItem>
      }
      withFilters
    />
  )
}

MentionsList.propTypes = {
  mentions: PropTypes.arrayOf(PropTypes.shape({})),
  userMentions: PropTypes.shape({
    userMentions: PropTypes.shape({
      userNotifications: PropTypes.shape({
        result: PropTypes.arrayOf(PropTypes.shape({})),
        totalCount: PropTypes.number,
      }),
    }),
    mentionsLoading: PropTypes.bool,
  }),
  totalCount: PropTypes.number,
  loading: PropTypes.bool,
  // withPreview: PropTypes.bool,
  infiniteScroll: PropTypes.shape({}),
  locale: PropTypes.shape({}),
  markMentionsAs: PropTypes.func,
  onSearch: PropTypes.func,
}
MentionsList.defaultProps = {
  mentions: [],
  totalCount: 0,
  markMentionsAs: () => {},
  userMentions: {},
  // withPreview: false,
  loading: false,
  infiniteScroll: {},
  locale: {},
  onSearch: () => {},
}
export default MentionsList
