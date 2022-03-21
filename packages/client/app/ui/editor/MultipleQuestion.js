import React, { useState, useRef } from 'react'
import { PlusSquareOutlined, DeleteOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import PmEditor from './PmEditor'
import CustomSwitch from './CustomSwitch'
import { Button } from '../common'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const InfoRow = styled.div`
  color: black;
  display: flex;
  flex-direction: row;
  padding: 10px 0 4px;
`

const QuestionNunber = styled.span``

const QuestionControlsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const QuestionWrapper = styled.div`
  border: 1px solid #a5a1a2;
  border-radius: 4px;
  color: black;
  display: flex;
  flex: 2 1 auto;
  flex-direction: column;
  padding: 10px;
`

const IconsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  button {
    border: none;
  }

  span {
    cursor: pointer;
  }
`

const QuestionData = styled.div`
  align-items: normal;
  display: flex;
  flex-direction: row;
`

const FeedBack = styled.div`
  color: black;
  margin-top: 10px;
`

const FeedBackLabel = styled.span`
  font-weight: 700;
`

const FeedBackInput = styled.input`
  border: none;
  display: flex;
  width: 100%;
`

const MultipleQuestion = props => {
  const {
    questionText,
    feedBackText,
    questionNumber,
    showAddIcon,
    showRemoveIcon,
    addOption,
    removeOption,
    readOnly,
  } = props

  const [feadBack, setFeedBack] = useState(feedBackText)
  const feedBackRef = useRef(null)

  const feedBackInput = () => {
    setFeedBack(feedBackRef.current.value)
  }

  return (
    <Wrapper>
      <InfoRow>
        <QuestionNunber>Answer {questionNumber}</QuestionNunber>
      </InfoRow>
      <QuestionControlsWrapper>
        <QuestionWrapper>
          <QuestionData>
            <PmEditor content={questionText} readonly={readOnly} />

            <CustomSwitch />
          </QuestionData>
          <FeedBack>
            <FeedBackLabel>Feedback</FeedBackLabel>
            <FeedBackInput
              onChange={feedBackInput}
              placeholder="Insert feedback"
              ref={feedBackRef}
              type="text"
              value={feadBack}
            />
          </FeedBack>
        </QuestionWrapper>
        <IconsWrapper>
          {showAddIcon && !readOnly && (
            <Button
              icon={
                <PlusSquareOutlined onClick={addOption} title="Add Option" />
              }
            />
          )}
          {showRemoveIcon && !readOnly && (
            <Button
              icon={
                <DeleteOutlined onClick={removeOption} title="Delete Option" />
              }
            />
          )}
        </IconsWrapper>
      </QuestionControlsWrapper>
    </Wrapper>
  )
}

MultipleQuestion.propTypes = {
  addOption: PropTypes.func,
  questionText: PropTypes.string,
  feedBackText: PropTypes.string,
  questionNumber: PropTypes.number.isRequired,
  removeOption: PropTypes.func,
  showAddIcon: PropTypes.bool,
  showRemoveIcon: PropTypes.bool,
  readOnly: PropTypes.bool,
}

MultipleQuestion.defaultProps = {
  addOption: () => true,
  removeOption: () => true,
  questionText: '',
  feedBackText: '',
  showAddIcon: true,
  showRemoveIcon: true,
  readOnly: false,
}

export default MultipleQuestion
