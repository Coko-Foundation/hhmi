import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { PaperClipOutlined } from '@ant-design/icons'
// eslint-disable-next-line import/no-unresolved
import UIAssignReviewers from '@coko/client/dist/ui/assignReviewers/AssignReviewers'
import { grid, th } from '@coko/client'
import { profileOptions } from '../../utilities'
import ReviewerEditorUploadButton from '../question/ReviewerEditorUploadButton'

const AttachmentsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  > :last-child:not(:first-child) {
    margin-block-start: ${grid(2)};
  }
`

const AttachmentItem = styled.a`
  border: 1px solid white;
  border-radius: 5px;
  color: inherit;
  cursor: pointer;
  display: inline-flex;
  gap: ${grid(1)};
  max-inline-size: 200px;
  overflow: hidden;
  padding: ${grid(1)};
  text-overflow: ellipsis;
  white-space: nowrap;

  &:focus {
    outline: 2px solid ${th('colorPrimaryBorder')};
    outline-offset: 1px;
  }
`

const StyledAssignReviewers = styled(UIAssignReviewers)`
  div:nth-child(3) {
    overflow-x: auto;
  }

  > div:nth-child(2) {
    > div:first-child {
      display: none;
    }

    > div:nth-child(2) {
      > div:not(:nth-child(3)) {
        display: none;
      }
    }
  }
`

const additionalSearchFields = [
  {
    label: 'Assessment Training',
    value: 'assessmentTraining',
  },
  {
    label: 'Language Training',
    value: 'languageTraining',
  },
  {
    label: 'Topics',
    value: 'topics',
    items: profileOptions.topics.map(t => t.label),
  },
]

const AssignReviewers = props => {
  const {
    amountOfReviewers,
    automate,
    canInviteMore,
    onAddReviewers,
    onAmountOfReviewersChange,
    onAutomationChange,
    onClickInvite,
    onClickRemoveRow,
    onClickRevokeInvitation,
    onSearch,
    onTableChange,
    onUploadReview,
    reviewerPool,
    searchPlaceholder,
    showDialog,
  } = props

  const additionalReviewerColumns = [
    {
      title: 'Submitted reviews',
      dataIndex: 'submitted',
      render: (val, record) =>
        val ? (
          <AttachmentsWrapper>
            {val.map(att => (
              <AttachmentItem
                data-testid="message-attachment"
                href={att.url}
                key={att.name}
                target="_blank"
              >
                <PaperClipOutlined />
                {att.name}
              </AttachmentItem>
            ))}
            <ReviewerEditorUploadButton
              onSubmit={onUploadReview}
              reviewerId={record.id}
              showDialog={showDialog}
            />
          </AttachmentsWrapper>
        ) : (
          record.acceptedInvitation && (
            <ReviewerEditorUploadButton
              onSubmit={onUploadReview}
              reviewerId={record.id}
              showDialog={showDialog}
            />
          )
        ),
    },
    {
      title: 'Topics',
      dataIndex: 'topics',
    },
    {
      title: 'Assessment Training',
      dataIndex: 'assessmentTraining',
      render: val => (val ? 'Yes' : ''),
      sorter: (a, b) =>
        Number(a.assessmentTraining) - Number(b.assessmentTraining),
    },
    {
      title: 'Language Training',
      dataIndex: 'languageTraining',
      render: val => (val ? 'Yes' : ''),
      sorter: (a, b) => Number(a.languageTraining) - Number(b.languageTraining),
    },
  ]

  return (
    <StyledAssignReviewers
      additionalReviewerColumns={additionalReviewerColumns}
      additionalSearchFields={additionalSearchFields}
      amountOfReviewers={amountOfReviewers}
      automate={automate}
      canInviteMore={canInviteMore}
      onAddReviewers={onAddReviewers}
      onAmountOfReviewersChange={onAmountOfReviewersChange}
      onAutomationChange={onAutomationChange}
      onClickInvite={onClickInvite}
      onClickRemoveRow={onClickRemoveRow}
      onClickRevokeInvitation={onClickRevokeInvitation}
      onSearch={onSearch}
      onTableChange={onTableChange}
      reviewerPool={reviewerPool}
      searchPlaceholder={searchPlaceholder}
      useShowEmail
    />
  )
}

AssignReviewers.propTypes = {
  amountOfReviewers: PropTypes.number.isRequired,
  automate: PropTypes.bool.isRequired,
  canInviteMore: PropTypes.bool.isRequired,
  onAddReviewers: PropTypes.func.isRequired,
  onAmountOfReviewersChange: PropTypes.func.isRequired,
  onAutomationChange: PropTypes.func.isRequired,
  onClickInvite: PropTypes.func.isRequired,
  onClickRemoveRow: PropTypes.func.isRequired,
  onClickRevokeInvitation: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onTableChange: PropTypes.func.isRequired,
  reviewerPool: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      invited: PropTypes.bool,
      acceptedInvitation: PropTypes.bool,
      rejectedInvitation: PropTypes.bool,
      invitationRevoked: PropTypes.bool,
      reviewSubmitted: PropTypes.bool,
    }),
  ).isRequired,
  searchPlaceholder: PropTypes.string,
  onUploadReview: PropTypes.func,
  showDialog: PropTypes.func,
}

AssignReviewers.defaultProps = {
  searchPlaceholder: '',
  onUploadReview: null,
  showDialog: null,
}

export default AssignReviewers
