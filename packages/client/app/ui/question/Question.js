import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {
  grid,
  // th
} from '@coko/client'
import { LeftOutlined } from '@ant-design/icons'

import { HhmiLayout } from '../wax/layout'
import { config } from '../wax/config'

import Metadata from './Metadata'
import { Button, Checkbox, Spin, Split, Tabs } from '../common'
import WaxWrapper from '../wax/Wax'

const Wrapper = styled.div`
  height: 100%;

  .ant-spin-nested-loading,
  .ant-spin-container {
    height: 100%;
  }

  .ant-tabs.ant-tabs-top,
  .ant-tabs-content.ant-tabs-content-top,
  .ant-tabs-tabpane.ant-tabs-tabpane-active,
  .ant-row,
  .ant-col {
    height: 100%;
  }
`

const StyledBackButton = styled(Button)`
  margin-right: ${grid(2)};
`

const RightAreaWrapper = styled.div`
  > label {
    margin-right: ${grid(2)};
  }
`

// QUESTION submit button here seems to be outside the form
// submit also refers to wax
// does all this pose an accessibility problem?

const Question = props => {
  const {
    submitting,
    editorContent,
    initialMetadataValues,
    isSubmitted,
    loading,
    onClickBackButton,
    onEditorContentAutoSave,
    onMetadataAutoSave,
    onQuestionSubmit,
    questionAgreedTc,
  } = props

  const formRef = useRef()
  const waxRef = useRef()

  // const contentF = () => [console.log(WaxRef.current.getContent())]

  const [agreedTc, setAgreedTc] = useState(questionAgreedTc)
  // const [questionContent, setQuestionContent] = useState(editorContent)

  const handleQuestionContentChange = content => {
    // setQuestionContent(content)
    onEditorContentAutoSave(content)
  }

  const handleAgreeTcChange = e => {
    setAgreedTc(!agreedTc)
  }

  const handleSubmit = () => {
    // onQuestionSubmit({
    //   agreedTc,
    //   metadata: formRef.current.getFormValues(),
    //   editorContent: questionContent,
    // })
    formRef.current.submit()
  }

  const onFormFinish = values => {
    onQuestionSubmit({
      agreedTc,
      metadata: values,
      editorContent: waxRef.current.getContent(),
    })
  }

  const BackButton = (
    <StyledBackButton icon={<LeftOutlined />} onClick={onClickBackButton}>
      Back
    </StyledBackButton>
  )

  const RightArea = (
    <RightAreaWrapper>
      <Checkbox checked={agreedTc} onChange={handleAgreeTcChange}>
        Accept terms and conditions
      </Checkbox>

      <Button
        disabled={
          // !formRef.current.isFieldsTouched(true) ||
          submitting ||
          // formRef.current.getFieldsError().filter(({ errors }) => errors.length)
          //   .length > 0 ||
          !agreedTc
        }
        onClick={handleSubmit}
        type="primary"
      >
        Submit
      </Button>
    </RightAreaWrapper>
  )

  if (loading) return null

  return (
    <Wrapper>
      <Spin renderBackground={false} spinning={loading}>
        {/* <Wrapper className={className}> */}
        <Tabs
          tabBarExtraContent={{
            left: BackButton,
            right: isSubmitted ? null : RightArea,
          }}
        >
          <Tabs.TabPane key={0} tab="Question">
            <Split gutter={8} splitAt={16}>
              <WaxWrapper
                config={config}
                content={editorContent}
                innerRef={waxRef}
                layout={HhmiLayout}
                onContentChange={handleQuestionContentChange}
                readOnly={isSubmitted}
              />

              <Metadata
                initialValues={initialMetadataValues}
                innerRef={formRef}
                onAutoSave={onMetadataAutoSave}
                onFormFinish={onFormFinish}
                readOnly={isSubmitted}
              />
            </Split>
          </Tabs.TabPane>
        </Tabs>
        {/* </Wrapper> */}
      </Spin>
    </Wrapper>
  )
}

Question.propTypes = {
  loading: PropTypes.bool.isRequired,
  onClickBackButton: PropTypes.func.isRequired,
  onEditorContentAutoSave: PropTypes.func.isRequired,
  onQuestionSubmit: PropTypes.func.isRequired,
  onMetadataAutoSave: PropTypes.func.isRequired,

  editorContent: PropTypes.string,
  questionAgreedTc: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  isSubmitted: PropTypes.bool.isRequired,
  // TO DO - provide valid shape
  /* eslint-disable-next-line react/forbid-prop-types */
  initialMetadataValues: PropTypes.object,
}

Question.defaultProps = {
  editorContent: '',
  initialMetadataValues: null,
}

export default Question
