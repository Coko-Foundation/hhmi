/* stylelint-disable string-quotes */
import React, { memo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { grid, th } from '@coko/client'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

import { HhmiLayout } from '../wax/layout'
import { config } from '../wax/config'

import Metadata from './Metadata'
import {
  Button,
  Checkbox,
  Modal,
  Paragraph,
  Spin,
  TabsStyled as Tabs,
} from '../common'
import WaxWrapper from '../wax/Wax'

// #region styled
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
  height: 100%;
`

const StyledTabPane = styled(Tabs.TabPane)`
  flex: 1;
  overflow: auto;
`
// #endregion styled

// #region wax
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
  },
  // add a comparison function for when we want the editor to rerender
  // returning true means the component doesn't rerender when parent rerenders
  (prevProps, nextProps) => prevProps.readOnly === nextProps.readOnly,
  // && prevProps.content === nextProps.content,
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
// #endregion wax

// QUESTION submit button here seems to be outside the form
// submit also refers to wax
// does all this pose an accessibility problem?

const Question = props => {
  const {
    editorContent,
    editorView,
    facultyView,
    initialMetadataValues,
    isPublished,
    isSubmitted,
    isUnderReview,
    loading,
    metadata,
    onClickAssignHE,
    onClickBackButton,
    onClickNextButton,
    onClickPreviousButton,
    onEditorContentAutoSave,
    onMetadataAutoSave,
    onMoveToReview,
    onPublish,
    onQuestionSubmit,
    onReject,
    questionAgreedTc,
    resources,
    showAssignHEButton,
    showNextQuestionLink,
    submitting,
  } = props

  const formRef = useRef()
  const waxRef = useRef()

  const [agreedTc, setAgreedTc] = useState(questionAgreedTc)

  const readOnly =
    (editorView && (isUnderReview || isPublished)) ||
    (!editorView && isSubmitted)

  // #region handlers
  const handleQuestionContentChange = content => {
    onEditorContentAutoSave(content)
  }

  const showTermsAndConditions = e => {
    e.preventDefault()
    Modal.info({
      title: 'Accept Terms and Conditions',
      content: (
        <Paragraph>
          By submitting information via the form below (the “Question
          Information”), and clicking the “Submit” button, you agree to{' '}
          <a
            href="https://www.hhmi.org/terms-of-use"
            rel="noreferrer"
            target="_blank"
          >
            HHMI’s Terms of Use
          </a>{' '}
          and you grant to the Howard Hughes Medical Institute (“HHMI”) and our
          affiliates (referred to collectively with HHMI as, “we,” “us,” or
          “our”) a royalty-free, perpetual, irrevocable, non-exclusive right and
          license to use, publish, reproduce, modify, adapt, edit, translate,
          create derivative works from, incorporate into other works,
          distribute, sub-license, and otherwise exploit such Question
          Information, and derivatives or modifications thereof, throughout the
          universe in any form, media or technology now known or hereafter
          developed, including without limitation sub-licensing and distributing
          the Question Information or derivatives or modifications thereof under
          a Creative Commons license selected by HHMI. You hereby represent,
          warrant and covenant that the Question Information submitted by you is
          original to you, and that neither the existence nor the exploitation
          thereof shall infringe upon or violate any trademark, patent,
          copyright, trade secret, right of privacy or publicity, or other
          common law right of any third party.
        </Paragraph>
      ),
      maskClosable: true,
      afterClose: () =>
        document.body.querySelector('#termsAndConditions').focus(),
      width: '570px',
      bodyStyle: {
        marginRight: 38,
        textAlign: 'justify',
      },
    })
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
  // #endregion handlers

  // #region components
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
        Accept{' '}
        <a
          href="#termsAndCondition"
          id="termsAndConditions"
          onClick={showTermsAndConditions}
        >
          terms and conditions
        </a>
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

      {isUnderReview && (
        <StyledButton onClick={onPublish} type="primary">
          Publish
        </StyledButton>
      )}

      {isSubmitted && !isUnderReview && !isPublished && (
        <>
          <StyledButton onClick={onReject} type="danger">
            Do not accept
          </StyledButton>

          <StyledButton onClick={onMoveToReview} type="primary">
            Move to Review
          </StyledButton>
        </>
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
  // #endregion components

  if (loading) return <Spin />

  return (
    <Wrapper>
      <Spin renderBackground={false} spinning={loading}>
        <Tabs
          renderTabBar={(tabProps, DefaultTabBar) => {
            return facultyView ? FacultyHeader : <DefaultTabBar {...tabProps} />
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
                readOnly={readOnly}
              />

              <Metadata
                editorView={editorView}
                initialValues={initialMetadataValues}
                innerRef={formRef}
                metadata={metadata}
                onAutoSave={onMetadataAutoSave}
                onFormFinish={onFormFinish}
                readOnly={readOnly}
                resources={resources}
              />
            </QuestionWrapper>
          </StyledTabPane>
        </Tabs>
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
  isPublished: PropTypes.bool.isRequired,
  isSubmitted: PropTypes.bool.isRequired,
  isUnderReview: PropTypes.bool.isRequired,
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
  initialMetadataValues: PropTypes.shape({
    topics: PropTypes.arrayOf(
      PropTypes.shape({
        topic: PropTypes.string,
        subtopic: PropTypes.string,
      }),
    ),
    courses: PropTypes.arrayOf(
      PropTypes.shape({
        course: PropTypes.string,
        units: PropTypes.arrayOf(
          PropTypes.shape({
            unit: PropTypes.string,
            courseTopic: PropTypes.string,
            learningObjective: PropTypes.string,
            essentialKnowledge: PropTypes.string,
            application: PropTypes.string,
            skill: PropTypes.string,
            understanding: PropTypes.string,
          }),
        ),
      }),
    ),
    keywords: PropTypes.arrayOf(PropTypes.string),
    biointeractiveResources: PropTypes.arrayOf(PropTypes.string),
    cognitiveLevel: PropTypes.string,
    affectiveLevel: PropTypes.string,
    psychomotorLevel: PropTypes.string,
    readingLevel: PropTypes.string,
  }),
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
  resources: [],
}

export default Question
