import React from 'react'

import { Status } from 'ui'

export const NotSubmitted = () => <Status status="Not Submitted" />
export const Submitted = () => <Status status="Submitted" />
export const Rejected = () => <Status status="Rejected" />
export const UnderReview = () => <Status status="Under Review" />
export const InProduction = () => <Status status="In Production" />
export const Published = () => <Status status="Published" />
export const Assigned = () => <Status label="Assigned" status="Submitted" />
export const ReviewerInvitation = () => (
  <Status label="Invitation" status="Under Review" />
)
export const ReviewerInProgress = () => (
  <Status label="In Progress" status="Under Review" />
)
export const ReviewerSubmitted = () => (
  <Status label="Submitted" status="Under Review" />
)

export default {
  component: Status,
  title: 'Common/Status',
}
