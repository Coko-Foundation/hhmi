/* stylelint-disable string-quotes */
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  LeftOutlined,
  RightOutlined,
  EllipsisOutlined,
  UploadOutlined,
} from '@ant-design/icons'

import { grid, th } from '@coko/client'
import useBreakpoint from '../_helpers/useBreakpoint'
import { HhmiLayout, TestModeLayout } from '../wax/layout'

import Metadata from './Metadata'
import QuestionEditor from './QuestionEditor'
import { ChatThread } from '../chat'

import ExportToWordButton from './ExportToWordButton'
import AssignHEButton from './AssignHEButton'
import ExportToScormButton from './ExportToScormButton'
import AutoSaving from './AutoSaveIndicator'
import {
  Button,
  Checkbox,
  Collapse,
  Link,
  Modal,
  Paragraph,
  Popup,
  Ribbon,
  Select,
  Spin,
  TabsStyled as Tabs,
} from '../common'
import { extractDocumentText } from '../../utilities'
import AssignAuthorButton from './AssignAuthorButton'

const ModalContext = React.createContext({ agree: false, setAgree: () => {} })
const ModalFooter = Modal.footer
const ModalHeader = Modal.header

// #region styled
const Wrapper = styled.div`
  height: 100%;
  overflow: hidden;

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

  @media (min-width: ${th('mediaQueries.medium')}) {
    .ant-tabs-content-holder {
      border-top: 1px solid ${th('colorBorder')};
    }
  }
`

const StyledButton = styled(Button)`
  margin-right: ${grid(2)};
  width: 100%;

  @media (min-width: ${th('mediaQueries.mediumPlus')}) {
    width: auto;
  }
`

const StyledAssignAuthorButton = styled(AssignAuthorButton)`
  margin-right: ${grid(2)};
  width: 100%;
`

const SubmitButton = styled(StyledButton)`
  width: auto;
`

const StyledPrevNextButton = styled(StyledButton)`
  > span:not([role='img']) {
    display: none;
  }

  @media (min-width: ${th('mediaQueries.small')}) {
    > span:not([role='img']) {
      display: inline-block;
    }
  }
`

const StyledWordExportButton = styled(ExportToWordButton)`
  margin-right: ${grid(2)};
  width: 100%;
`

const StyledScormExportButton = styled(ExportToScormButton)`
  margin-right: ${grid(2)};
  width: 100%;
`

const StyledAssignHEButton = styled(AssignHEButton)`
  margin-right: ${grid(2)};
  width: 100%;
`

const RightAreaWrapper = styled.div`
  align-items: center;
  display: flex;
`

const StyledCheckbox = styled(Checkbox)`
  margin-right: ${grid(2)};
`

const PopupContentWrapper = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  gap: ${grid(2)};
  justify-content: space-between;

  > button {
    margin: 0;
    width: unset;
  }
`

const FacultyHeaderWrapper = styled.div`
  align-items: center;
  background-color: ${th('colorBackgroundHue')};
  display: flex;
  flex: none;
  height: 46px;
  justify-content: space-between;
  margin: 0;
  padding: 0 ${grid(3)};

  > div {
    align-items: center;
    display: flex;
  }
`

const StyledTabItem = styled.div`
  padding: 0 ${grid(3)};
`

const QuestionWrapper = styled.div`
  background-color: ${th('colorBackground')};
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

const StyledMetadata = styled(Metadata)`
  background-color: ${th('colorBackground')};
  border-left: 1px solid ${th('colorBorder')};
  height: 100%;
  min-width: 0;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
`

const ActionsWrapper = styled.div`
  display: none;

  @media (min-width: ${th('mediaQueries.mediumPlus')}) {
    display: flex;
  }
`

const PopupToggle = styled(Button)`
  height: 32px;
  margin-right: 10px;
  padding: 0;
  transform: rotate(90deg);
  width: 32px;

  @media (min-width: ${th('mediaQueries.mediumPlus')}) {
    display: none;
  }
`

const ViewAsWrapper = styled.div`
  align-items: center;
  display: inline-flex;
`

const ViewAsLabel = styled.label`
  width: 100%;
`

const StyledSelect = styled(Select)`
  margin: 0 ${grid(2)};
`

const SkipToTop = styled.a`
  background-color: ${th('colorTextDark')};
  border-radius: ${grid(1)} 0 0 ${grid(1)};
  color: ${th('colorTextReverse')};
  height: 30px;
  padding: ${grid(1)} ${grid(2)};
  position: absolute;
  right: -200px;
  width: auto;
  z-index: 3;

  &:focus {
    right: 0;
  }
`
// #endregion styled

// #region Question Panel
const StyledCollapse = styled(Collapse)`
  display: flex;
  flex-direction: column;
  height: 100%;

  // overwrite background and padding inherited from role="tablist"
  // (might also remove role="tablist" itself be removing accordion prop and reimplementing its functionality)
  && {
    background-color: ${th('colorBackground')};
    padding: 0;
  }

  .ant-collapse-item-active {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: auto;

    .ant-collapse-content {
      flex-grow: 1;
      overflow: auto;

      .ant-collapse-content-box {
        height: 100%;
        padding: 0;
      }
    }
  }
`

const PanelWrapper = ({ editor, metadata, showMetadata }) => {
  const isMobile = useBreakpoint('(max-width: 900px)')
  // const [activePanel, setActivePanel] = useState('editor')

  // if it's desktop or mobile without metadata (student view) no need for collapsable panels
  if (!isMobile || !showMetadata) {
    return (
      <QuestionWrapper showMetadata={showMetadata}>
        {editor}
        {showMetadata && metadata}
      </QuestionWrapper>
    )
  }

  // const handlePanelChange = e => {
  // if (e !== undefined) {
  //   setActivePanel(e)
  // }
  // else if (activePanel === 'editor') setActivePanel('metadata')
  // else if (activePanel === 'metadata') setActivePanel('editor')
  // }

  return (
    <StyledCollapse accordion defaultActiveKey="editor">
      <Collapse.Panel
        data-testid="editor-collapse"
        forceRender
        header="Editor"
        key="editor"
      >
        {editor}
      </Collapse.Panel>
      <Collapse.Panel
        data-testid="metadata-collapse"
        forceRender
        header="Metadata"
        key="metadata"
      >
        {metadata}
      </Collapse.Panel>
    </StyledCollapse>
  )
}

PanelWrapper.propTypes = {
  editor: PropTypes.shape().isRequired,
  metadata: PropTypes.shape().isRequired,
  showMetadata: PropTypes.bool.isRequired,
}
// #endregion Question Panel

// QUESTION submit button here seems to be outside the form
// submit also refers to wax
// does all this pose an accessibility problem?

const Question = props => {
  const {
    authors,
    complexItemSetOptions,
    announcementText,
    defaultActiveKey,
    messages,
    editorContent,
    leadingContent,
    complexSetEditLink,
    editorView,
    facultyView,
    hasMoreMessages,
    onClickExportToWord,
    onFetchMoreMessages,
    onClickExportToQti,
    initialMetadataValues,
    isUserLoggedIn,
    isPublished,
    isRejected,
    isSubmitted,
    isUnderReview,
    isInProduction,
    loading,
    loadAuthors,
    metadata,
    onAssignAuthor,
    onClickAssignHE,
    onClickNextButton,
    onClickPreviousButton,
    onCreateNewVersion,
    onEditorContentAutoSave,
    onImageUpload,
    onMetadataAutoSave,
    onMoveToProduction,
    onMoveToReview,
    onPublish,
    onQuestionSubmit,
    onReject,
    onSendMessage,
    questionAgreedTc,
    refetchUser,
    resources,
    questionParticipants,
    qtiZipLoading,
    showAssignHEButton,
    canAssignAuthor,
    showNextQuestionLink,
    submitting,
    updated,
    wordFileLoading,
    canCreateNewVersion,
    handlingEditors,
    onSearchHE,
    searchHELoading,
    assignHELoading,
    currentHandlingEditors,
    loadAssignedHEs,
    onUnassignHandlingEditor,
    selectedQuestionType,
    onChangeTab,
    showAuthorChatTab,
  } = props

  const [modal, contextHolder] = Modal.useModal()
  const { confirm, info, success, error } = modal

  const formRef = useRef()
  const waxRef = useRef()

  const [agreedTc, setAgreedTc] = useState(questionAgreedTc)
  const [autoSaving, setAutoSaving] = useState(false)
  const [showMetadata, setShowMetadata] = useState(isUserLoggedIn)
  const [activeKey, setActiveKey] = useState(defaultActiveKey)

  const readOnly =
    (editorView && !isInProduction && isSubmitted) ||
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
    const infoModal = info()
    infoModal.update({
      title: <ModalHeader>Accept Terms and Conditions</ModalHeader>,
      content: (
        <Paragraph>
          By submitting information via the form below (the “Item Information”),
          and clicking the “Submit” button, you agree to{' '}
          <Link
            as="a"
            href="https://www.hhmi.org/terms-of-use"
            rel="noreferrer"
            target="_blank"
          >
            HHMI’s Terms of Use
          </Link>{' '}
          and you grant to the Howard Hughes Medical Institute (“HHMI”) and our
          affiliates (referred to collectively with HHMI as, “we,” “us,” or
          “our”) a royalty-free, perpetual, irrevocable, non-exclusive right and
          license to use, publish, reproduce, modify, adapt, edit, translate,
          create derivative works from, incorporate into other works,
          distribute, sub-license, and otherwise exploit such Item Information,
          and derivatives or modifications thereof, throughout the universe in
          any form, media or technology now known or hereafter developed,
          including without limitation sub-licensing and distributing the Item
          Information or derivatives or modifications thereof under a Creative
          Commons license selected by HHMI. You hereby represent, warrant and
          covenant that the Item Information submitted by you is original to
          you, and that neither the existence nor the exploitation thereof shall
          infringe upon or violate any trademark, patent, copyright, trade
          secret, right of privacy or publicity, or other common law right of
          any third party.
        </Paragraph>
      ),
      footer: [
        <ModalFooter key="footer">
          <Button autoFocus onClick={() => infoModal.destroy()} type="primary">
            Ok
          </Button>
        </ModalFooter>,
      ],
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

  const isEmptyEditor = () => {
    const questionText = extractDocumentText(
      JSON.stringify(waxRef.current.getContent()),
    )

    const isEditorEmpty = questionText.content[0].content[0].text === '(empty)'

    if (isEditorEmpty) {
      const emptyEditorErrorModal = error()
      emptyEditorErrorModal.update({
        title: <ModalHeader>Item text cannot be empty</ModalHeader>,
        content: 'Please provide some content for your item',
        footer: [
          <ModalFooter key="footer">
            <Button
              autoFocus
              onClick={() => {
                emptyEditorErrorModal.destroy()
                /* focus the editor */
                document.querySelector('.ProseMirror').focus()
              }}
              type="primary"
            >
              Ok
            </Button>
          </ModalFooter>,
        ],
      })

      return true
    }

    return false
  }

  const handleSubmit = () => {
    if (isEmptyEditor()) return

    const confirmSubmitModal = confirm()
    confirmSubmitModal.update({
      title: (
        <ModalHeader>Are you sure you want to submit this item?</ModalHeader>
      ),
      content:
        'This will make this item visible to editors and reviewers, and after a successful review it will be published for all users.',
      footer: [
        <ModalFooter key="footer">
          <Button onClick={() => confirmSubmitModal.destroy()}>Cancel</Button>
          <Button
            autoFocus
            onClick={() => {
              formRef.current.submit()
              confirmSubmitModal.destroy()
            }}
            type="primary"
          >
            Submit
          </Button>
        </ModalFooter>,
      ],
    })
  }

  const handleMoveToReview = () => {
    const confirmMoveToReview = confirm()
    confirmMoveToReview.update({
      title: (
        <ModalHeader>You are about to move this item to review</ModalHeader>
      ),
      content:
        'This item will be passed to a reviewer and will not be editable until they provide their feedback. Are you sure you want to proceed?',
      footer: [
        <ModalFooter key="footer">
          <Button onClick={() => confirmMoveToReview.destroy()}>Cancel</Button>
          <Button
            autoFocus
            onClick={() => {
              confirmMoveToReview.destroy()
              onMoveToReview()
                .then(() => {
                  showDialog(
                    'success',
                    'Item moved to review',
                    'Item was moved to review successfully',
                  )
                })
                .catch(() => {
                  showDialog(
                    'error',
                    'Problem moving this item to review',
                    'There was an error while moving this item to review. Please try again!',
                  )
                })
            }}
            type="primary"
          >
            Move to review
          </Button>
        </ModalFooter>,
      ],
    })
  }

  const handleMoveToProduction = () => {
    const confirmMoveToProduction = confirm()
    confirmMoveToProduction.update({
      title: (
        <ModalHeader>You are about to move this item to production</ModalHeader>
      ),
      content:
        'This item will become editable and editors can apply the feedback from the reviewer. Are you sure?',
      footer: [
        <ModalFooter key="footer">
          <Button onClick={() => confirmMoveToProduction.destroy()}>
            Cancel
          </Button>
          <Button
            autoFocus
            onClick={() => {
              confirmMoveToProduction.destroy()
              onMoveToProduction()
                .then(() => {
                  showDialog(
                    'success',
                    'Item moved to production',
                    'Item was moved to production successfully',
                  )
                })
                .catch(() => {
                  showDialog(
                    'error',
                    'Problem moving this item to produciton',
                    'There was an error while moving this item to production. Please try again!',
                  )
                })
            }}
            type="primary"
          >
            Move to production
          </Button>
        </ModalFooter>,
      ],
    })
  }

  const handlePublish = () => {
    if (isEmptyEditor()) return

    // validate form fields
    formRef.current
      .validateFields()
      .then(() => {
        const confirmPublish = confirm()
        confirmPublish.update({
          title: (
            <ModalHeader>
              Are you sure you want to publish this item version?
            </ModalHeader>
          ),
          content: (
            <>
              <p>
                Clicking &quot;Yes, publish&quot; will make this item
                discoverable for all website visitors in the Browse Items Page.
              </p>
              {canAssignAuthor && (
                <p>
                  As an admin, you can reassign authorship of this item to
                  another user after it is published.
                </p>
              )}
            </>
          ),
          footer: [
            <ModalFooter key="footer">
              <Button onClick={() => confirmPublish.destroy()}>Cancel</Button>
              <Button
                autoFocus
                onClick={() => {
                  confirmPublish.destroy()
                  onPublish()
                    .then(() => {
                      showDialog(
                        'success',
                        'Item published successfully',
                        'Item was published and is now available in the Browse Items page',
                      )
                    })
                    .catch(() => {
                      showDialog(
                        'error',
                        'Problem publishing this item',
                        'There was an error while publishin this item. Please try again',
                      )
                    })
                }}
                type="primary"
              >
                Yes, publish
              </Button>
            </ModalFooter>,
          ],
        })
      })
      .catch(data => {
        const { errorFields } = data

        const firstErrorField = document.getElementById(
          errorFields[0].name.join('_'),
        )

        firstErrorField.focus()
      })
  }

  const handleReject = () => {
    const confirmReject = confirm()
    confirmReject.update({
      title: (
        <ModalHeader>Are you sure you want to reject this item?</ModalHeader>
      ),
      content: 'By rejecting, this item will not be reviewed or published.',
      footer: [
        <ModalFooter key="footer">
          <Button onClick={() => confirmReject.destroy()}>Cancel</Button>
          <Button
            autoFocus
            onClick={() => {
              confirmReject.destroy()
              onReject()
                .then(() => {
                  showDialog(
                    'success',
                    'Item rejected',
                    'This item was rejected',
                  )
                })
                .catch(() => {
                  showDialog(
                    'error',
                    'Problem rejecting the items',
                    'There was an error while rejecting this item. Please try again!',
                  )
                })
            }}
            type="primary"
          >
            Reject
          </Button>
        </ModalFooter>,
      ],
    })
  }

  const showDialog = (type, title, content) => {
    const dialogType = type === 'success' ? success() : error()

    dialogType.update({
      title: <ModalHeader>{title}</ModalHeader>,
      content,
      footer: [
        <ModalFooter key="footer">
          <Button autoFocus onClick={() => dialogType.destroy()} type="primary">
            Ok
          </Button>
        </ModalFooter>,
      ],
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
          'Item submitted successfully',
          'Item was submitted successfully',
        )
      })
      .catch(() => {
        showDialog(
          'error',
          'Problem submitting this item',
          'There was an error while submitting your item. Please try again!',
        )
      })
  }

  const showNewVersionModal = () => {
    const confirmNewVersion = confirm()
    confirmNewVersion.update({
      title: <ModalHeader>Warning!</ModalHeader>,
      content: `You are editing a published item. Any changes you make will be automatically saved, but not automatically published. 
      You will need to publish this item again for the edits to be reflected in the Browse Items page.
      After the edited item is published, the old one will not be available anymore in the Browse Items page. 
      Do you wish to continue?`,
      footer: [
        <ModalFooter key="footer">
          <Button onClick={() => confirmNewVersion.destroy()}>Cancel</Button>
          <Button
            autoFocus
            onClick={() => {
              confirmNewVersion.destroy()
              // TODO: add error handling for this action
              onCreateNewVersion()
            }}
            status="danger"
          >
            Create new version
          </Button>
        </ModalFooter>,
      ],
    })
  }
  // #endregion handlers

  // #region components
  const QuestionTab = <StyledTabItem>Item</StyledTabItem>
  const AuthorChatTab = <StyledTabItem>Chat</StyledTabItem>

  const PreviousQuestion = (
    <StyledPrevNextButton
      aria-label="Previous Item"
      icon={<LeftOutlined />}
      onClick={() =>
        onClickPreviousButton()
          .then()
          .catch(() => {
            const infoModal = modal.info()
            infoModal.update({
              title: <ModalHeader>No previous item</ModalHeader>,
              content: 'There are no more items in this direction',
              footer: [
                <ModalFooter key="footer">
                  <Button autoFocus onClick={infoModal.destroy} type="primary">
                    Ok
                  </Button>
                </ModalFooter>,
              ],
            })
          })
      }
      title="Previous Item"
      type="primary"
    >
      Previous Item
    </StyledPrevNextButton>
  )

  const NextQuestion = (
    <StyledPrevNextButton
      aria-label="Next Item"
      direction="rtl"
      icon={<RightOutlined />}
      onClick={() =>
        onClickNextButton()
          .then()
          .catch(() => {
            const infoModal = modal.info()
            infoModal.update({
              title: <ModalHeader>No next item</ModalHeader>,
              content: 'There are no more items in this direction',
              footer: [
                <ModalFooter key="footer">
                  <Button autoFocus onClick={infoModal.destroy} type="primary">
                    Ok
                  </Button>
                </ModalFooter>,
              ],
            })
          })
      }
      title="Next Item"
      type="primary"
    >
      Next Item
    </StyledPrevNextButton>
  )

  const isMobile = useBreakpoint('(min-width: 550px)')

  // eslint-disable-next-line no-nested-ternary
  const RightAreaAuthor = isSubmitted ? null : isMobile ? (
    <>
      <StyledCheckbox
        aria-label="I accept the terms and conditions"
        checked={agreedTc}
        data-testid="accept-tnc"
        onChange={handleAgreeTcChange}
      >
        Accept{' '}
        <Link
          id="termsAndConditions"
          onClick={showTermsAndConditions}
          to="#termsAndCondition"
        >
          terms and conditions
        </Link>
      </StyledCheckbox>

      <SubmitButton
        data-testid="submit-question-btn"
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
      </SubmitButton>
    </>
  ) : (
    <Button
      aria-label="Submit"
      icon={<UploadOutlined />}
      // onClick={handleSubmitButtonClick}
      onClick={() => {
        const confirmSubmit = confirm()
        confirmSubmit.update({
          title: 'Ready to submit?',
          content: (
            <ModalContext.Consumer>
              {({ agree, setAgree }) => (
                <StyledCheckbox
                  aria-label="I accept the terms and conditions"
                  checked={agree}
                  onChange={() => setAgree(!agree)}
                >
                  Accept{' '}
                  <Link
                    id="termsAndConditions"
                    onClick={showTermsAndConditions}
                    to="#termsAndCondition"
                  >
                    terms and conditions
                  </Link>
                </StyledCheckbox>
              )}
            </ModalContext.Consumer>
          ),
          footer: (
            <ModalFooter>
              <Button
                onClick={() => {
                  confirmSubmit.destroy()
                }}
              >
                Cancel
              </Button>
              <ModalContext.Consumer>
                {({ agree }) => (
                  <Button
                    autoFocus
                    disabled={!agree}
                    onClick={() => {
                      confirmSubmit.destroy()
                      handleSubmit()
                    }}
                    type="primary"
                  >
                    Submit
                  </Button>
                )}
              </ModalContext.Consumer>
            </ModalFooter>
          ),
          maskClosable: true,
          // okText: 'Submit Item',
          // onOk: handleSubmit,
        })
      }}
      title="Submit"
      type="primary"
    />
  )

  const editorActionsDropdownMenu = (
    <>
      <StyledWordExportButton
        loading={wordFileLoading}
        onExport={onClickExportToWord}
        showMetadataOption
      />
      {showAssignHEButton && (
        <StyledAssignHEButton
          currentHandlingEditors={currentHandlingEditors}
          handlingEditors={handlingEditors}
          loadAssignedHEs={loadAssignedHEs}
          loading={assignHELoading}
          onAssign={onClickAssignHE}
          onSearchHE={onSearchHE}
          onUnassign={onUnassignHandlingEditor}
          searchLoading={searchHELoading}
        />
      )}
      {canAssignAuthor && isPublished && (
        <StyledAssignAuthorButton
          authors={authors}
          loadAuthors={loadAuthors}
          onAssignAuthor={onAssignAuthor}
          refetchUser={refetchUser}
        />
      )}
      {isUnderReview && (
        <>
          <StyledButton
            id="doNotAccept"
            onClick={handleReject}
            status="danger"
            type="primary"
          >
            Do not accept
          </StyledButton>

          <StyledButton
            id="moveToProduction"
            onClick={handleMoveToProduction}
            type="primary"
          >
            Move to production
          </StyledButton>
        </>
      )}
      {isInProduction && (
        <StyledButton
          data-testid="publish-question-btn"
          onClick={handlePublish}
          type="primary"
        >
          Publish
        </StyledButton>
      )}
      {isSubmitted && !isUnderReview && !isInProduction && !isPublished && (
        <>
          <StyledButton
            id="doNotAccept"
            onClick={handleReject}
            status="danger"
            type="primary"
          >
            Do not accept
          </StyledButton>
          <StyledButton
            id="moveToReview"
            onClick={handleMoveToReview}
            type="primary"
          >
            Move to review
          </StyledButton>
        </>
      )}
      {isPublished && canCreateNewVersion && (
        <StyledButton onClick={showNewVersionModal} type="primary">
          Edit item
        </StyledButton>
      )}
      {showNextQuestionLink && NextQuestion}
    </>
  )

  const viewAsOptions = [
    { value: true, label: 'Educator' },
    { value: false, label: 'Learner' },
  ]

  const RightAreaEditor = (
    <>
      <ActionsWrapper>
        <StyledWordExportButton
          loading={wordFileLoading}
          onExport={onClickExportToWord}
          showMetadataOption
        />
        {showAssignHEButton && (
          <StyledAssignHEButton
            currentHandlingEditors={currentHandlingEditors}
            handlingEditors={handlingEditors}
            loadAssignedHEs={loadAssignedHEs}
            loading={assignHELoading}
            onAssign={onClickAssignHE}
            onSearchHE={onSearchHE}
            onUnassign={onUnassignHandlingEditor}
            searchLoading={searchHELoading}
          />
        )}
        {canAssignAuthor && isPublished && (
          <StyledAssignAuthorButton
            authors={authors}
            loadAuthors={loadAuthors}
            onAssignAuthor={onAssignAuthor}
            refetchUser={refetchUser}
          />
        )}

        {isUnderReview && (
          <>
            <StyledButton
              id="doNotAccept"
              onClick={handleReject}
              status="danger"
              type="primary"
            >
              Do not accept
            </StyledButton>

            <StyledButton
              id="moveToProduction"
              onClick={handleMoveToProduction}
              type="primary"
            >
              Move to production
            </StyledButton>
          </>
        )}
        {isInProduction && (
          <StyledButton
            data-testid="publish-question-btn"
            onClick={handlePublish}
            type="primary"
          >
            Publish
          </StyledButton>
        )}
        {isSubmitted && !isUnderReview && !isInProduction && !isPublished && (
          <>
            <StyledButton
              id="doNotAccept"
              onClick={handleReject}
              status="danger"
              type="primary"
            >
              Do not accept
            </StyledButton>

            <StyledButton
              id="moveToReview"
              onClick={handleMoveToReview}
              type="primary"
            >
              Move to review
            </StyledButton>
          </>
        )}

        {isPublished && canCreateNewVersion && (
          <StyledButton onClick={showNewVersionModal} type="primary">
            Edit item
          </StyledButton>
        )}
        {showNextQuestionLink && NextQuestion}
      </ActionsWrapper>
      <Popup
        alignment="end"
        data-testid="editor-actions-popup"
        position="block-end"
        toggle={
          <PopupToggle
            aria-label="More actions"
            icon={<EllipsisOutlined />}
            title="More actions"
            type="primary"
          />
        }
      >
        <PopupContentWrapper>{editorActionsDropdownMenu}</PopupContentWrapper>
      </Popup>
    </>
  )

  const RightArea = (
    <RightAreaWrapper id="question-actions" tabIndex="-1">
      {readOnly ? null : (
        <AutoSaving
          autoSaving={autoSaving}
          lastAutoSave={updated && new Date(updated)}
        />
      )}
      {!isRejected &&
        (editorView && isSubmitted ? RightAreaEditor : RightAreaAuthor)}
    </RightAreaWrapper>
  )

  const publishedQuestionActions = (
    <>
      <StyledWordExportButton
        loading={wordFileLoading}
        onExport={onClickExportToWord}
        showMetadataOption={isUserLoggedIn}
      />
      {isUserLoggedIn && (
        <StyledScormExportButton
          loading={qtiZipLoading}
          onExport={onClickExportToQti}
        />
      )}
      {isPublished && canCreateNewVersion && (
        <StyledButton onClick={showNewVersionModal} type="primary">
          Edit item
        </StyledButton>
      )}
    </>
  )

  const FacultyHeader = (
    <FacultyHeaderWrapper>
      <div>
        {/* {BackButton} */}
        {PreviousQuestion}
      </div>

      <div>
        {isUserLoggedIn && (
          <ViewAsWrapper>
            <ViewAsLabel htmlFor="viewAsSelect">View as</ViewAsLabel>
            <StyledSelect
              data-testid="viewas-select"
              id="viewAsSelect"
              onChange={val => setShowMetadata(val)}
              options={viewAsOptions}
              value={showMetadata}
            />
          </ViewAsWrapper>
        )}
        <ActionsWrapper>
          <StyledWordExportButton
            loading={wordFileLoading}
            onExport={onClickExportToWord}
            showMetadataOption={isUserLoggedIn}
          />
          {isUserLoggedIn && (
            <StyledScormExportButton
              loading={qtiZipLoading}
              onExport={onClickExportToQti}
            />
          )}
          {isPublished && canCreateNewVersion && (
            <StyledButton onClick={showNewVersionModal} type="primary">
              Edit item
            </StyledButton>
          )}
        </ActionsWrapper>

        <Popup
          alignment="end"
          position="block-end"
          toggle={
            <PopupToggle
              aria-label="More actions"
              icon={<EllipsisOutlined />}
              title="More actions"
              type="primary"
            />
          }
        >
          <PopupContentWrapper>{publishedQuestionActions}</PopupContentWrapper>
        </Popup>
        <span>{NextQuestion}</span>
      </div>
    </FacultyHeaderWrapper>
  )
  // #endregion components

  const contextValue = React.useMemo(
    () => ({ agree: agreedTc, setAgree: setAgreedTc }),
    [agreedTc],
  )

  const skipButtonText = () => {
    if (!isSubmitted) {
      return 'Jump to submit'
    }

    return 'Jump to action buttons'
  }

  const handleTabChange = activeTab => {
    if (activeTab) {
      setActiveKey(activeTab)
      onChangeTab(activeTab)
    }
  }

  return (
    <ModalContext.Provider value={contextValue}>
      <Wrapper>
        <Spin renderBackground={false} spinning={loading}>
          <StyledTabs
            activeKey={activeKey}
            items={[
              {
                label: QuestionTab,
                key: 'editor',
                children: (
                  <>
                    {isRejected && (
                      <Ribbon status="error">
                        This item has been rejected by the editors
                      </Ribbon>
                    )}
                    <PanelWrapper
                      condition={false}
                      editor={
                        <QuestionEditor
                          complexSetEditLink={complexSetEditLink}
                          content={editorContent}
                          innerRef={waxRef}
                          layout={facultyView ? TestModeLayout : HhmiLayout}
                          leadingContent={leadingContent}
                          onContentChange={handleQuestionContentChange}
                          onImageUpload={onImageUpload}
                          published={facultyView && isPublished}
                          readOnly={readOnly || !selectedQuestionType}
                          selectedQuestionType={selectedQuestionType}
                          withFeedback={showMetadata}
                        />
                      }
                      metadata={
                        <>
                          <StyledMetadata
                            complexItemSetOptions={complexItemSetOptions}
                            editorView={editorView}
                            initialValues={initialMetadataValues}
                            innerRef={formRef}
                            metadata={metadata}
                            onAutoSave={handleMetadataAutoSave}
                            onFormFinish={onFormFinish}
                            presentationMode={facultyView}
                            readOnly={readOnly}
                            resources={resources}
                            selectedQuestionType={
                              selectedQuestionType?.metadataValue
                            }
                          />
                          <SkipToTop
                            href="#question-actions"
                            onClick={e => {
                              e.preventDefault()
                              document
                                .getElementById('question-actions')
                                .focus()
                            }}
                          >
                            {skipButtonText()}
                          </SkipToTop>
                        </>
                      }
                      showMetadata={showMetadata}
                    />
                  </>
                ),
              },
              showAuthorChatTab && {
                label: AuthorChatTab,
                key: 'chat',
                children: (
                  <ChatThread
                    announcementText={announcementText}
                    hasMore={hasMoreMessages}
                    isActive={activeKey === 'chat'}
                    messages={messages}
                    onFetchMore={onFetchMoreMessages}
                    onSendMessage={onSendMessage}
                    participants={questionParticipants}
                  />
                ),
              },
            ]}
            onChange={handleTabChange}
            renderTabBar={(tabProps, DefaultTabBar) => {
              return facultyView ? (
                FacultyHeader
              ) : (
                <DefaultTabBar {...tabProps} />
              )
            }}
            tabBarExtraContent={{
              // left: BackButton,
              right: RightArea,
            }}
          />
        </Spin>
      </Wrapper>
      {contextHolder}
    </ModalContext.Provider>
  )
}

Question.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  complexItemSetOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
    }),
  ),
  defaultActiveKey: PropTypes.string,
  leadingContent: PropTypes.shape(),
  announcementText: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.shape()),
  hasMoreMessages: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  loadAuthors: PropTypes.func,
  onAssignAuthor: PropTypes.func,
  onClickPreviousButton: PropTypes.func,
  onChangeAnnouncement: PropTypes.func,
  onClickNextButton: PropTypes.func,
  onCreateNewVersion: PropTypes.func,
  onEditorContentAutoSave: PropTypes.func,
  onImageUpload: PropTypes.func,
  onQuestionSubmit: PropTypes.func.isRequired,
  onMetadataAutoSave: PropTypes.func,
  onMoveToReview: PropTypes.func,
  onMoveToProduction: PropTypes.func,
  onPublish: PropTypes.func,
  onReject: PropTypes.func,
  onSendMessage: PropTypes.func,
  onClickAssignHE: PropTypes.func,
  onClickExportToQti: PropTypes.func,
  onClickExportToWord: PropTypes.func,
  canCreateNewVersion: PropTypes.bool,
  onFetchMoreMessages: PropTypes.func,
  editorContent: PropTypes.shape(),
  questionAgreedTc: PropTypes.bool,
  submitting: PropTypes.bool,
  isPublished: PropTypes.bool,
  isRejected: PropTypes.bool,
  isSubmitted: PropTypes.bool,
  isUnderReview: PropTypes.bool,
  isInProduction: PropTypes.bool,
  isUserLoggedIn: PropTypes.bool,
  editorView: PropTypes.bool,
  canAssignAuthor: PropTypes.bool,
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
  refetchUser: PropTypes.func,
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
  wordFileLoading: PropTypes.bool,
  questionParticipants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string,
    }),
  ),
  qtiZipLoading: PropTypes.bool,
  complexSetEditLink: PropTypes.string,
  handlingEditors: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  onSearchHE: PropTypes.func,
  searchHELoading: PropTypes.bool,
  assignHELoading: PropTypes.bool,
  currentHandlingEditors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      displayName: PropTypes.string,
    }),
  ),
  loadAssignedHEs: PropTypes.func,
  onUnassignHandlingEditor: PropTypes.func,
  chatLoading: PropTypes.bool,
  selectedQuestionType: PropTypes.shape(),
  onChangeTab: PropTypes.func,
  showAuthorChatTab: PropTypes.bool,
}

Question.defaultProps = {
  authors: [],
  complexItemSetOptions: [],
  defaultActiveKey: 'editor',
  announcementText: '',
  hasMoreMessages: false,
  messages: [],
  onChangeAnnouncement: () => {},
  onCreateNewVersion: () => {},
  onFetchMoreMessages: () => {},
  onMoveToReview: () => {},
  onMoveToProduction: () => {},
  onPublish: () => {},
  onReject: () => {},
  onSendMessage: () => {},
  onClickAssignHE: () => {},
  editorContent: {},
  leadingContent: null,
  initialMetadataValues: {},
  onClickExportToQti: null,
  onClickExportToWord: null,
  onClickPreviousButton: () => {},
  onClickNextButton: () => {},
  onEditorContentAutoSave: () => {},
  onImageUpload: () => {},
  onMetadataAutoSave: () => {},
  onAssignAuthor: () => {},
  loadAuthors: () => {},
  submitting: false,
  isPublished: false,
  isRejected: false,
  isSubmitted: false,
  isUnderReview: false,
  isInProduction: false,
  editorView: false,
  questionAgreedTc: false,
  canAssignAuthor: false,
  showAssignHEButton: true,
  showNextQuestionLink: false,
  facultyView: false,
  refetchUser: () => {},
  resources: [],
  updated: '',
  isUserLoggedIn: true,
  canCreateNewVersion: false,
  wordFileLoading: false,
  questionParticipants: [],
  qtiZipLoading: false,
  complexSetEditLink: null,
  handlingEditors: [],
  onSearchHE: () => {},
  searchHELoading: false,
  assignHELoading: false,
  currentHandlingEditors: [],
  loadAssignedHEs: () => {},
  onUnassignHandlingEditor: () => {},
  chatLoading: false,
  selectedQuestionType: null,

  onChangeTab: () => {},
  showAuthorChatTab: false,
}

export default Question
