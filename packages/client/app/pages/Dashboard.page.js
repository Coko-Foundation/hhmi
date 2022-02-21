import React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import { QUESTIONS, CREATE_QUESTION } from '../graphql'
import { Dashboard, Spin } from '../ui'
import { dashboardDataMapper } from '../utilities'

const DashboardPage = () => {
  const history = useHistory()
  const { loading, data } = useQuery(QUESTIONS, { variables: { where: {} } })

  const [createQuestion] = useMutation(CREATE_QUESTION, {
    refetchQueries: [
      {
        query: QUESTIONS,
        variables: {
          where: {},
        },
      },
    ],
  })

  const onClickHandler = () => {
    createQuestion().then(
      ({
        data: {
          createQuestion: { id },
        },
      }) => {
        history.push(`/question/${id}`)
      },
    )
  }

  if (!data) {
    return null
  }

  let result, totalCount

  if (data) {
    result = data.questions.result
    totalCount = data.questions.totalCount
  }

  const authorData = dashboardDataMapper(result)

  return (
    <Spin renderBackground={false} spinning={loading}>
      <Dashboard
        authorItems={authorData}
        authorTotalCountNumber={totalCount}
        editorItems={[]}
        onClickCreateQuestion={onClickHandler}
        reviewerItems={[]}
        withTotalCount
      />
    </Spin>
  )
}

export default DashboardPage
