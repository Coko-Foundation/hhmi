import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { grid, th } from '@coko/client'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

import { HhmiLayout } from '../wax/layout'
import { config } from '../wax/config'

import Metadata from './Metadata'
import { Button, Checkbox, Spin, TabsStyled as Tabs } from '../common'
import WaxWrapper from '../wax/Wax'

const Wrapper = styled.div`
  height: 100%;

  .ant-spin-nested-loading,
  .ant-spin-container {
    background-color: ${th('colorBackground')};
    height: 100%;
  }

  .ant-tabs.ant-tabs-top,
  .ant-tabs-content.ant-tabs-content-top,
  .ant-tabs-tabpane.ant-tabs-tabpane-active,
  .ant-row,
  .ant-col {
    height: 100%;
  }

  /* stylelint-disable declaration-no-important */
  .ant-col {
    padding: 0 !important;
  }

  div[role='tabpanel'] > .ant-row {
    margin: 0 !important;
  }
  /* stylelint-enable declaration-no-important */

  .ant-tabs-nav {
    margin: 0;
    padding: 0 ${grid(2)};
  }

  .ant-tabs-nav-operations {
    display: none;
  }
`

const StyledButton = styled(Button)`
  margin-right: ${grid(2)};
  text-transform: uppercase;
`

const RightAreaWrapper = styled.div`
  > label {
    margin-right: ${grid(2)};
  }
`

const FacultyHeaderWrapper = styled.div`
  align-items: center;
  background-color: ${th('colorSecondary')};
  display: flex;
  flex: none;
  height: 46px;
  justify-content: space-between;
  margin: 0;
  padding: 0 ${grid(3)};
  text-transform: uppercase;
`

const StyledTabItem = styled.div`
  padding: 0 ${grid(3)};
`

const QuestionWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
`

const StyledTabPane = styled(Tabs.TabPane)`
  flex: 1;
  overflow: auto;
`

// QUESTION submit button here seems to be outside the form
// submit also refers to wax
// does all this pose an accessibility problem?

const Question = props => {
  const {
    submitting,
    editorContent,
    editorView,
    facultyView,
    initialMetadataValues,
    isSubmitted,
    loading,
    metadata,
    onClickBackButton,
    onClickPreviousButton,
    onClickNextButton,
    onEditorContentAutoSave,
    onMetadataAutoSave,
    onQuestionSubmit,
    questionAgreedTc,
    showAssignHEButton,
    showNextQuestionLink,
    underReview,
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
    <StyledButton
      ghost
      href="#"
      icon={<LeftOutlined />}
      onClick={onClickBackButton}
      type="primary"
    >
      Back
    </StyledButton>
  )

  const QuestionTab = <StyledTabItem>Question</StyledTabItem>

  const PreviousQuestion = (
    <StyledButton
      href="#"
      icon={<LeftOutlined />}
      onClick={onClickPreviousButton}
      type="primary"
    >
      Previous Question
    </StyledButton>
  )

  const NextQuestion = (
    <StyledButton
      href="#"
      icon={<RightOutlined />}
      onClick={onClickNextButton}
      type="primary"
    >
      Next Question
    </StyledButton>
  )

  const RightAreaAuthor = isSubmitted ? null : (
    <RightAreaWrapper>
      <Checkbox checked={agreedTc} onChange={handleAgreeTcChange}>
        Accept terms and conditions
      </Checkbox>

      <StyledButton
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
      </StyledButton>
    </RightAreaWrapper>
  )

  const RightAreaEditor = (
    <>
      {showAssignHEButton && (
        <StyledButton ghost type="primary">
          Assign HE
        </StyledButton>
      )}
      <StyledButton type="danger">Do not accept</StyledButton>
      <StyledButton type="primary">
        {underReview ? 'Publish' : 'Move to Review'}
      </StyledButton>
      {showNextQuestionLink && NextQuestion}
    </>
  )

  const RightArea = editorView ? RightAreaEditor : RightAreaAuthor

  const FacultyHeader = (
    <FacultyHeaderWrapper>
      <div>
        {BackButton}
        {PreviousQuestion}
      </div>
      <div>
        <StyledButton type="primary">Export to Word</StyledButton>
        <StyledButton type="primary">Export to Scorm</StyledButton>
        {NextQuestion}
      </div>
    </FacultyHeaderWrapper>
  )

  if (loading) return null

  return (
    <Wrapper>
      <Spin renderBackground={false} spinning={loading}>
        {/* <Wrapper className={className}> */}
        <Tabs
          renderTabBar={(tabProps, DefaultTabBar) => {
            return facultyView ? (
              FacultyHeader
            ) : (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <DefaultTabBar {...tabProps} />
            )
          }}
          tabBarExtraContent={{
            left: BackButton,
            right: RightArea,
          }}
        >
          <StyledTabPane key={0} tab={QuestionTab}>
            <QuestionWrapper>
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
                metadata={metadata}
                onAutoSave={onMetadataAutoSave}
                onFormFinish={onFormFinish}
                readOnly={isSubmitted}
              />
            </QuestionWrapper>
          </StyledTabPane>
        </Tabs>
        {/* </Wrapper> */}
      </Spin>
    </Wrapper>
  )
}

Question.propTypes = {
  loading: PropTypes.bool.isRequired,
  onClickBackButton: PropTypes.func.isRequired,
  onClickPreviousButton: PropTypes.func,
  onClickNextButton: PropTypes.func,
  onEditorContentAutoSave: PropTypes.func.isRequired,
  onQuestionSubmit: PropTypes.func.isRequired,
  onMetadataAutoSave: PropTypes.func.isRequired,

  editorContent: PropTypes.string,
  questionAgreedTc: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  isSubmitted: PropTypes.bool.isRequired,
  editorView: PropTypes.bool,
  showAssignHEButton: PropTypes.bool,
  showNextQuestionLink: PropTypes.bool,
  facultyView: PropTypes.bool,
  metadata: PropTypes.shape().isRequired,
  // TO DO - provide valid shape
  /* eslint-disable-next-line react/forbid-prop-types */
  initialMetadataValues: PropTypes.object,
  underReview: PropTypes.bool,
}

Question.defaultProps = {
  editorContent: '',
  initialMetadataValues: null,
  onClickPreviousButton: () => {},
  onClickNextButton: () => {},
  editorView: false,
  showAssignHEButton: true,
  showNextQuestionLink: false,
  facultyView: false,
  underReview: false,
}

export default Question
