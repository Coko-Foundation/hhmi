/* stylelint-disable string-quotes */
import React, { memo, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { grid, th } from '@coko/client'
import {
  LeftOutlined,
  RightOutlined,
  LoadingOutlined,
  CheckOutlined,
} from '@ant-design/icons'

import { HhmiLayout, TestModeLayout } from '../wax/layout'
import { config } from '../wax/config'

import Metadata from './Metadata'
import ExportToWordButton from './ExportToWordButton'
import {
  Button,
  Checkbox,
  DateParser,
  Modal,
  Paragraph,
  Radio,
  Ribbon,
  Spin,
  TabsStyled as Tabs,
} from '../common'
import WaxWrapper from '../wax/Wax'

const { confirm, info, success, error } = Modal

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

const StyledExportButton = styled(ExportToWordButton)`
  margin-right: ${grid(2)};
  text-transform: uppercase;
`

const RightAreaWrapper = styled.div`
  align-items: center;
  display: flex;
`

const StyledCheckbox = styled(Checkbox)`
  margin-right: ${grid(2)};
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
  background-color: ${th('colorBody')};
  display: grid;
  grid-template-columns: ${props => (props.showMetadata ? `2fr 1fr` : '2fr')};
  height: 100%;
`

const StyledTabs = styled(Tabs)`
  .ant-tabs-tabpane {
    flex: 1;
    overflow: auto;
  }
`

const MetadataWrapper = styled.section`
  background-color: ${th('colorBackground')};
  border-left: 1px solid ${th('colorBorder')};
  height: 100%;
  min-width: 0;
  overflow-y: auto;
`

const StyledRadioToggle = styled(Radio)`
  margin-right: ${grid(2)};

  label.ant-radio-button-wrapper {
    background-color: transparent;
    border: 1px solid ${th('colorPrimary')};
    color: ${th('colorPrimary')};
  }
`
// #endregion styled

// #region wax
const EditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: auto;
  /* max-width: 75vw; */
  overflow: hidden;
  width: 100%;
`

const EditorScrollContainer = styled.div`
  flex-grow: 1;
  overflow: auto;
`

const SubmitTestBar = styled.div`
  background-color: ${th('colorBackground')};
  border-top: 1px solid ${th('colorBorder')};
  box-shadow: 0 0 4px ${th('colorBorder')};
  display: flex;
  justify-content: end;
  margin: auto;
  /* max-width: 100ch; */
  padding: ${grid(2)} ${grid(2)};
  width: 100%;
`

// need to memoize Wax to prevent rerendering on state change (e.g. after accepting T&C)
const MemoizedWax = memo(
  props => {
    const {
      content,
      innerRef,
      layout,
      onContentChange,
      readOnly,
      published,
      withMetadata,
    } = props

    const [submitted, setSubmitted] = useState(false)
    const [editorContent, setEditorContent] = useState(content)

    const [testMode, setTestMode] = useState(
      published && !submitted && !withMetadata,
    )

    // only for users taking the test in student view
    const preserveLocalState = published && !withMetadata

    useEffect(() => {
      setEditorContent(content)
    }, [content])

    useEffect(() => {
      if (withMetadata) {
        setSubmitted(false)
        setTestMode(false)
      } else {
        setSubmitted(false)
        setTestMode(true)
      }

      // reset original content after switching views
      setEditorContent(content)
    }, [withMetadata])

    const submitTest = () => {
      setSubmitted(true)
      setTestMode(false)

      const contentFeedback = JSON.parse(
        JSON.stringify({
          type: 'doc',
          content: innerRef.current.getContent(),
        }),
      )

      setEditorContent(contentFeedback)
    }

    const resetTest = () => {
      setSubmitted(false)
      setTestMode(true)
      setEditorContent(content)
    }

    return (
      <EditorWrapper>
        <EditorScrollContainer>
          <WaxWrapper
            config={config}
            content={preserveLocalState ? editorContent : content}
            customValues={{ showFeedBack: submitted, testMode }}
            innerRef={innerRef}
            layout={layout}
            onContentChange={!testMode && onContentChange}
            readOnly={readOnly}
          />
        </EditorScrollContainer>

        {!withMetadata && (
          <SubmitTestBar>
            {submitted ? (
              <Button onClick={resetTest} type="primary">
                Reset
              </Button>
            ) : (
              <Button onClick={submitTest} type="primary">
                Submit
              </Button>
            )}
          </SubmitTestBar>
        )}
      </EditorWrapper>
    )
  },
  // add a comparison function for when we want the editor to rerender
  // returning true means the component doesn't rerender when parent rerenders
  (prevProps, nextProps) =>
    nextProps.published ? false : prevProps.readOnly === nextProps.readOnly,
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
  layout: PropTypes.elementType.isRequired,
  onContentChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  withMetadata: PropTypes.bool,
  published: PropTypes.bool,
}

MemoizedWax.defaultProps = {
  content: {},
  readOnly: false,
  innerRef: null,
  published: false,
  withMetadata: true,
}
// #endregion wax

// #region Autosave
const AutoSavingWrapper = styled.span`
  padding: 0 ${grid(4)};

  .anticon-check {
    color: ${th('colorSuccess')};
  }

  .anticon-loading {
    color: ${th('colorPrimary')};
    margin-right: ${grid(1)};
  }
`

const AutoSaving = props => {
  const { autoSaving, lastAutoSave } = props

  const timeDifference = Math.floor(
    (new Date() - lastAutoSave) / 1000 / 60 / 60,
  )

  if (!lastAutoSave) {
    return (
      <AutoSavingWrapper>
        <CheckOutlined /> Autosaving is on
      </AutoSavingWrapper>
    )
  }

  if (autoSaving === false) {
    return (
      <AutoSavingWrapper>
        <CheckOutlined /> Last saved{' '}
        <DateParser
          dateFormat={timeDifference < 24 ? 'HH:mm' : 'DD MMMM'}
          timestamp={lastAutoSave.valueOf()}
        >
          {timestamp => <span>{timestamp}</span>}
        </DateParser>
      </AutoSavingWrapper>
    )
  }

  if (autoSaving === true) {
    return (
      <AutoSavingWrapper>
        <LoadingOutlined /> Saving...
      </AutoSavingWrapper>
    )
  }

  return null
}

AutoSaving.propTypes = {
  autoSaving: PropTypes.bool,
  lastAutoSave: PropTypes.shape(),
}

AutoSaving.defaultProps = {
  autoSaving: false,
  lastAutoSave: null,
}
// #endregion Autosave

// QUESTION submit button here seems to be outside the form
// submit also refers to wax
// does all this pose an accessibility problem?

const Question = props => {
  const {
    editorContent,
    editorView,
    facultyView,
    onClickExportToWord,
    onClickExportToScorm,
    initialMetadataValues,
    isUserLoggedIn,
    isPublished,
    isRejected,
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
    updated,
    wordFileLoading,
  } = props

  const formRef = useRef()
  const waxRef = useRef()

  const [agreedTc, setAgreedTc] = useState(questionAgreedTc)
  const [autoSaving, setAutoSaving] = useState(false)
  const [showMetadata, setShowMetadata] = useState(isUserLoggedIn)

  const readOnly =
    (editorView && (!isUnderReview || isPublished)) ||
    (!editorView && isSubmitted) ||
    isRejected

  // need to reset showMetadata, in case user loads after the page is rendered
  useEffect(() => {
    setShowMetadata(isUserLoggedIn)
  }, [isUserLoggedIn])

  // #region handlers
  const handleQuestionContentChange = content => {
    setAutoSaving(true)
    onEditorContentAutoSave(content).then(() => {
      setAutoSaving(false)
    })
  }

  const handleMetadataAutoSave = data => {
    setAutoSaving(true)
    onMetadataAutoSave(data).then(() => {
      setAutoSaving(false)
    })
  }

  const showTermsAndConditions = e => {
    e.preventDefault()
    info({
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
    confirm({
      title: 'Are you sure you want to submit the question?',
      content:
        'This will make the question visible to editors an reviewers, and after a successful review it will be published for all users.',
      okText: 'Submit',
      okType: 'primary',
      onOk() {
        formRef.current.submit()
      },
      onCancel() {},
    })
  }

  const handleMoveToReview = () => {
    confirm({
      title: 'You are about to move the question to review',
      content:
        'Editors will be able to make changes to the question and then publish it. Are you sure?',
      okText: 'Move to review',
      okType: 'primary',
      onOk() {
        onMoveToReview()
          .then(() => {
            showDialog(
              'success',
              'Question moved to review',
              'Question was moved to review successfully',
            )
          })
          .catch(() => {
            showDialog(
              'error',
              'Problem moving the question to review',
              'There was an error while moving your question to review. Please try again!',
            )
          })
      },
      onCancel() {},
    })
  }

  const handlePublish = () => {
    confirm({
      title: 'Are you sure you want to publish this question version?',
      content:
        'Clicking "Yes, publish" will make the question discoverable for all website visitors in the Discover page',
      okText: 'Yes, publish',
      okType: 'primary',
      onOk() {
        onPublish()
          .then(() => {
            showDialog(
              'success',
              'Question published successfully',
              'Question was published and is now available in the Discover page',
            )
          })
          .catch(() => {
            showDialog(
              'error',
              'Problem publishing the question',
              'There was an error while publishin the question. Please try again',
            )
          })
      },
      onCancel() {},
    })
  }

  const handleReject = () => {
    confirm({
      title: 'Are you sure you want to reject this question?',
      content: 'By rejecting, the question will not be reviewed or published.',
      okText: 'Reject',
      okType: 'primary',
      onOk() {
        onReject()
          .then(() => {
            showDialog(
              'success',
              'Question rejected',
              'The question was rejected',
            )
          })
          .catch(() => {
            showDialog(
              'error',
              'Problem rejecting the questions',
              'There was an error while rejecting this question. Please try again!',
            )
          })
      },
      onCancel() {},
    })
  }

  const showDialog = (type, title, content) => {
    const dialogType = type === 'success' ? success : error

    dialogType({
      title,
      content,
      maskClosable: true,
    })
  }

  const onFormFinish = values => {
    onQuestionSubmit({
      agreedTc,
      metadata: values,
      editorContent: waxRef.current.getContent(),
    })
      .then(() => {
        showDialog(
          'success',
          'Question submitted successfully',
          'Question was submitted successfully',
        )
      })
      .catch(() => {
        showDialog(
          'error',
          'Problem submitting the question',
          'There was an error while submitting your question. Please try again!',
        )
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
      icon={<LeftOutlined />}
      onClick={onClickPreviousButton}
      type="primary"
    >
      Previous Question
    </StyledButton>
  )

  const NextQuestion = (
    <StyledButton
      icon={<RightOutlined />}
      onClick={onClickNextButton}
      type="primary"
    >
      Next Question
    </StyledButton>
  )

  const RightAreaAuthor = isSubmitted ? null : (
    <>
      <StyledCheckbox checked={agreedTc} onChange={handleAgreeTcChange}>
        Accept{' '}
        <a
          href="#termsAndCondition"
          id="termsAndConditions"
          onClick={showTermsAndConditions}
        >
          terms and conditions
        </a>
      </StyledCheckbox>

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
    </>
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
        <StyledButton onClick={handlePublish} type="primary">
          Publish
        </StyledButton>
      )}
      {isSubmitted && !isUnderReview && !isPublished && (
        <>
          <StyledButton onClick={handleReject} type="danger">
            Do not accept
          </StyledButton>

          <StyledButton onClick={handleMoveToReview} type="primary">
            Move to Review
          </StyledButton>
        </>
      )}

      {showNextQuestionLink && NextQuestion}
    </>
  )

  const RightArea = (
    <RightAreaWrapper>
      {readOnly ? null : (
        <AutoSaving
          autoSaving={autoSaving}
          lastAutoSave={updated && new Date(updated)}
        />
      )}
      {!isRejected && (editorView ? RightAreaEditor : RightAreaAuthor)}
    </RightAreaWrapper>
  )

  const FacultyHeader = (
    <FacultyHeaderWrapper>
      <div>
        {BackButton}
        {PreviousQuestion}
      </div>

      <div>
        <StyledExportButton
          loading={wordFileLoading}
          onExport={onClickExportToWord}
          showMetadataOption={isUserLoggedIn}
        />

        <StyledButton onClick={onClickExportToScorm} type="primary">
          Export to Scorm
        </StyledButton>

        {isUserLoggedIn && (
          <StyledRadioToggle
            buttonStyle="solid"
            onChange={val => setShowMetadata(val)}
            options={[
              { value: false, label: 'STUDENT' },
              { value: true, label: 'FACULTY' },
            ]}
            optionType="button"
            value={showMetadata}
          />
        )}

        {NextQuestion}
      </div>
    </FacultyHeaderWrapper>
  )
  // #endregion components

  if (loading) return <Spin />

  return (
    <Wrapper>
      <Spin renderBackground={false} spinning={loading}>
        <StyledTabs
          items={[
            {
              label: QuestionTab,
              key: 0,
              children: (
                <>
                  {isRejected && (
                    <Ribbon status="error">
                      This question has been rejected by the editors
                    </Ribbon>
                  )}

                  <QuestionWrapper showMetadata={showMetadata}>
                    <MemoizedWax
                      content={editorContent}
                      innerRef={waxRef}
                      layout={facultyView ? TestModeLayout : HhmiLayout}
                      onContentChange={handleQuestionContentChange}
                      published={isPublished}
                      readOnly={readOnly}
                      withMetadata={showMetadata}
                    />

                    {showMetadata && (
                      <MetadataWrapper>
                        <Metadata
                          editorView={editorView}
                          initialValues={initialMetadataValues}
                          innerRef={formRef}
                          metadata={metadata}
                          onAutoSave={handleMetadataAutoSave}
                          onFormFinish={onFormFinish}
                          presentationMode={facultyView}
                          readOnly={readOnly}
                          resources={resources}
                        />
                      </MetadataWrapper>
                    )}
                  </QuestionWrapper>
                </>
              ),
            },
          ]}
          renderTabBar={(tabProps, DefaultTabBar) => {
            return facultyView ? FacultyHeader : <DefaultTabBar {...tabProps} />
          }}
          tabBarExtraContent={{
            left: BackButton,
            right: RightArea,
          }}
        />
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
  onClickExportToScorm: PropTypes.func,
  onClickExportToWord: PropTypes.func,

  editorContent: PropTypes.shape(),
  questionAgreedTc: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  isPublished: PropTypes.bool.isRequired,
  isRejected: PropTypes.bool.isRequired,
  isSubmitted: PropTypes.bool.isRequired,
  isUnderReview: PropTypes.bool.isRequired,
  isUserLoggedIn: PropTypes.bool,
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
    courses: PropTypes.oneOfType([
      // format for metadata form
      PropTypes.arrayOf(
        PropTypes.shape({
          course: PropTypes.string,
          unit: PropTypes.string,
          courseTopic: PropTypes.string,
          learningObjective: PropTypes.string,
          essentialKnowledge: PropTypes.string,
          application: PropTypes.string,
          skill: PropTypes.string,
          understanding: PropTypes.string,
        }),
      ),
      // format for MetadataInfo
      PropTypes.arrayOf(
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
    ]),
    keywords: PropTypes.arrayOf(PropTypes.string),
    biointeractiveResources: PropTypes.arrayOf(PropTypes.string),
    cognitiveLevel: PropTypes.string,
    affectiveLevel: PropTypes.string,
    psychomotorLevel: PropTypes.string,
    readingLevel: PropTypes.string,
  }),
  updated: PropTypes.string,
  wordFileLoading: PropTypes.bool.isRequired,
}

Question.defaultProps = {
  onMoveToReview: () => {},
  onPublish: () => {},
  onReject: () => {},
  onClickAssignHE: () => {},
  editorContent: {},
  initialMetadataValues: {},
  onClickExportToScorm: null,
  onClickExportToWord: null,
  onClickPreviousButton: () => {},
  onClickNextButton: () => {},
  editorView: false,
  showAssignHEButton: true,
  showNextQuestionLink: false,
  facultyView: false,
  resources: [],
  updated: '',
  isUserLoggedIn: true,
}

export default Question
