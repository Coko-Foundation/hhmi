import { gql } from '@apollo/client'

const SUBMIT_REVIEW = gql`
  mutation SubmitReview($input: SubmitReviewInput) {
    submitReview(input: $input)
  }
`

export default SUBMIT_REVIEW
