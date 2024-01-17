import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import UIAssignReviewers from '@coko/client/dist/ui/assignReviewers/AssignReviewers'
import { profileOptions } from '../../utilities'

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

const additionalReviewerColumns = [
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
    reviewerPool,
  } = props

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
}

export default AssignReviewers
