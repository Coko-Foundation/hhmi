import React, { useState } from 'react'
import { lorem } from 'faker'
import { MultipleQuestion } from 'ui'
import { last } from 'lodash'
import { uuid } from '@coko/client'

export const SingleEmptyAnswer = () => {
  const [data, setData] = useState([{ id: uuid() }])

  const addOption = () => {
    setData(data.concat(...[{ id: uuid() }]))
  }

  const removeOption = id => {
    setData(data.filter(element => element.id !== id))
  }

  const answerGroup = data.map((element, index) => {
    return (
      <MultipleQuestion
        addOption={addOption}
        feedBackText=""
        key={element.id}
        questionNumber={parseInt(index, 10)}
        questionText=""
        removeOption={() => removeOption(element.id)}
        showAddIcon={data.length === index + 1}
        showRemoveIcon={data.length !== 1}
      />
    )
  })

  return <>{answerGroup}</>
}

export const SingleAnswerWithText = () => {
  const [data, setData] = useState([{ id: uuid() }])

  const addOption = () => {
    setData(data.concat(...[{ id: uuid() }]))
  }

  const removeOption = id => {
    setData(data.filter(element => element.id !== id))
  }

  const answerGroup = data.map((element, index) => {
    return (
      <MultipleQuestion
        addOption={addOption}
        feedBackText={data.length > 1 ? '' : lorem.sentences(1)}
        key={element.id}
        questionNumber={parseInt(index, 10)}
        questionText={data.length > 1 ? '' : lorem.sentences(3)}
        removeOption={() => removeOption(element.id)}
        showAddIcon={data.length === index + 1}
        showRemoveIcon={data.length !== 1}
      />
    )
  })

  return <>{answerGroup}</>
}

export const AnswerGroupReadOnly = () => {
  const data = [{ id: uuid() }, { id: uuid() }, { id: uuid() }, { id: uuid() }]

  const answerGroup = data.map((element, index) => {
    return (
      <MultipleQuestion
        feedBackText={lorem.sentences(1)}
        key={element.id}
        questionNumber={parseInt(index, 10)}
        questionText={lorem.sentences(3)}
        readOnly
        showAddIcon={last(data) === index}
        showRemoveIcon={data.length !== 1}
      />
    )
  })

  return <>{answerGroup}</>
}

export default {
  component: MultipleQuestion,
  title: 'Editor/MultipleChoice',
}
