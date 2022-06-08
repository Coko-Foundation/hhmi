/* stylelint-disable string-quotes */
import React, { memo, useRef, useState } from 'react'
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

// need to memoize Wax to prevent rerendering on state change (e.g. after accepting T&C)
const MemoizedWax = memo(
  props => {
    const { content, innerRef, onContentChange, readOnly } = props

    return (
      <WaxWrapper
        config={config}
        content={content}
        innerRef={innerRef}
        layout={HhmiLayout}
        onContentChange={onContentChange}
        readOnly={readOnly}
      />
    )
  }, // add a comparison function for when we want the editor to rerender
  // returning true means the component doesn't rerender when parent rerenders
  (prevProps, nextProps) =>
    prevProps.readOnly === nextProps.readOnly &&
    prevProps.content === nextProps.content,
)

MemoizedWax.propTypes = {
  content: PropTypes.shape(),
  innerRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({
      current: PropTypes.shape(),
    }),
  ]),
  onContentChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
}

MemoizedWax.defaultProps = {
  content: {},
  readOnly: false,
  innerRef: null,
}

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
    onReject,
    onPublish,
    onClickAssignHE,
    onMoveToReview,
    questionAgreedTc,
    resources,
    showAssignHEButton,
    showNextQuestionLink,
    underReview,
  } = props

  const formRef = useRef()
  const waxRef = useRef()

  const [agreedTc, setAgreedTc] = useState(questionAgreedTc)

  const handleQuestionContentChange = content => {
    onEditorContentAutoSave(content)
  }

  const handleAgreeTcChange = e => {
    setAgreedTc(!agreedTc)
  }

  const handleSubmit = () => {
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
        <StyledButton
          aria-label="Assign Handling Editor"
          ghost
          onClick={onClickAssignHE}
          type="primary "
        >
          Assign HE
        </StyledButton>
      )}
      <StyledButton onClick={onReject} type="danger">
        Do not accept
      </StyledButton>
      {underReview ? (
        <StyledButton onClick={onPublish} type="primary">
          Publish
        </StyledButton>
      ) : (
        <StyledButton onClick={onMoveToReview} type="primary">
          Move to Review
        </StyledButton>
      )}

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
              <MemoizedWax
                content={editorContent}
                innerRef={waxRef}
                onContentChange={handleQuestionContentChange}
                readOnly={isSubmitted && !underReview}
              />

              <Metadata
                editorView={editorView}
                initialValues={initialMetadataValues}
                innerRef={formRef}
                metadata={metadata}
                onAutoSave={onMetadataAutoSave}
                onFormFinish={onFormFinish}
                readOnly={isSubmitted && !underReview}
                resources={resources}
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
  // don't think we need this, the back "button" should be a link to dashboard I guess?
  onClickBackButton: PropTypes.func.isRequired,
  onClickPreviousButton: PropTypes.func,
  onClickNextButton: PropTypes.func,
  onEditorContentAutoSave: PropTypes.func.isRequired,
  onQuestionSubmit: PropTypes.func.isRequired,
  onMetadataAutoSave: PropTypes.func.isRequired,
  onMoveToReview: PropTypes.func,
  onPublish: PropTypes.func,
  onReject: PropTypes.func,
  onClickAssignHE: PropTypes.func,

  editorContent: PropTypes.shape(),
  questionAgreedTc: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  isSubmitted: PropTypes.bool.isRequired,
  editorView: PropTypes.bool,
  showAssignHEButton: PropTypes.bool,
  showNextQuestionLink: PropTypes.bool,
  facultyView: PropTypes.bool,
  metadata: PropTypes.shape({
    topics: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
        subtopics: PropTypes.arrayOf(
          PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string,
          }),
        ),
      }),
    ),
    blooms: PropTypes.shape({
      cognitive: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string,
          options: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
            }),
          ),
        }),
      ),
      affective: PropTypes.arrayOf(
        PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
      ),
      psychomotor: PropTypes.arrayOf(
        PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }),
      ),
    }),
    frameworks: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
          units: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
            }),
          ),
          topics: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              unit: PropTypes.string,
            }),
          ),
          learningObjectives: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              unit: PropTypes.string,
              topic: PropTypes.string,
            }),
          ),
          essentialKnowledge: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              unit: PropTypes.string,
              topic: PropTypes.string,
              learningObjective: PropTypes.string,
            }),
          ),
        }),
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
          units: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
            }),
          ),
          topics: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              unit: PropTypes.string,
            }),
          ),
          applications: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              unit: PropTypes.string,
              topic: PropTypes.string,
            }),
          ),
          skills: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              unit: PropTypes.string,
              topic: PropTypes.string,
            }),
          ),
          understandings: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              unit: PropTypes.string,
              topic: PropTypes.string,
            }),
          ),
        }),
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
        }),
      ]),
    ),
    introToBioMeta: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
          coreConcepts: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              explanatoryItems: PropTypes.arrayOf(PropTypes.string),
            }),
          ),
          subdisciplines: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
            }),
          ),
          subdisciplineStatements: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              coreConcept: PropTypes.string,
              subdiscipline: PropTypes.string,
            }),
          ),
          coreCompetencies: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
            }),
          ),
          subcompetencies: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              coreCompetence: PropTypes.string,
              explanation: PropTypes.string,
            }),
          ),
          subcompetenceStatements: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              coreCompetence: PropTypes.string,
              subcompetence: PropTypes.string,
            }),
          ),
        }),
        PropTypes.shape({
          label: PropTypes.string,
          value: PropTypes.string,
          concepts: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
            }),
          ),
          categories: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string,
              value: PropTypes.string,
              concept: PropTypes.string,
              explanation: PropTypes.string,
            }),
          ),
        }),
      ]),
    ),
  }).isRequired,
  resources: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      url: PropTypes.string,
      topics: PropTypes.arrayOf(PropTypes.string),
      subtopics: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
  // TO DO - provide valid shape
  initialMetadataValues: PropTypes.shape(),
  underReview: PropTypes.bool,
}

Question.defaultProps = {
  onMoveToReview: () => {},
  onPublish: () => {},
  onReject: () => {},
  onClickAssignHE: () => {},
  editorContent: {},
  initialMetadataValues: {},
  onClickPreviousButton: () => {},
  onClickNextButton: () => {},
  editorView: false,
  showAssignHEButton: true,
  showNextQuestionLink: false,
  facultyView: false,
  underReview: false,
  resources: [],
}

export default Question
