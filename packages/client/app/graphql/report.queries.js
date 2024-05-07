import { gql } from '@apollo/client'

const SUBMIT_REPORT = gql`
  mutation ReportIssue(
    $questionId: ID!
    $content: String!
    $attachments: [Upload!]
  ) {
    reportIssue(
      questionId: $questionId
      content: $content
      attachments: $attachments
    )
  }
`

export default SUBMIT_REPORT
