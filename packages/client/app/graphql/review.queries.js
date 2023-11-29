import { gql } from '@apollo/client'

const SUBMIT_REVIEW = gql`
  mutation SubmitReview($questionVersionId: ID!, $content: String) {
    submitReview(questionVersionId: $questionVersionId, content: $content)
  }
`

export default SUBMIT_REVIEW
