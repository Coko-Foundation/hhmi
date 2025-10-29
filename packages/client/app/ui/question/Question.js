/* stylelint-disable string-quotes */
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  LeftOutlined,
  RightOutlined,
  EllipsisOutlined,
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
  VisuallyHiddenElement,
  AddToListPopup,
} from '../common'
import { REVIEWER_STATUSES, extractDocumentText } from '../../utilities'
import AssignAuthorButton from './AssignAuthorButton'
import ReviewerRejectButton from './ReviewerRejectButton'
import ReviewerAcceptButton from './ReviewerAcceptButton'
import ReviewerSubmitButton from './ReviewerSubmitButton'
import ReviewerChats from './ReviewerChats'
import { AssignReviewers } from '../assignReviewers'

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
      /* border-top: 1px solid ${th('colorBorder')}; */
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

const Details = styled.details`
  cursor: pointer;
  margin-block: ${grid(2)};

  & .tnc-content {
    padding: ${grid(2)};
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
  > span:not(.ant-btn-icon) {
    display: none;
  }

  @media (min-width: ${th('mediaQueries.small')}) {
    > span:not(.ant-btn-icon) {
      display: inline-block;
    }
  }
`

const StyledWordExportButton = styled(ExportToWordButton)`
  margin-right: ${grid(2)};
  width: auto;
`

const StyledScormExportButton = styled(ExportToScormButton)`
  margin-right: ${grid(2)};
  width: 100%;
`

const StyledAssignHEButton = styled(AssignHEButton)`
  margin-right: ${grid(2)};
  width: 100%;
`

const StyledReviewerRejectInviteButton = styled(ReviewerRejectButton)`
  margin-right: ${grid(2)};
  width: 100%;
`

const StyledReviewerAcceptInviteButton = styled(ReviewerAcceptButton)`
  width: 100%;
`

const StyledSubmitReviewButton = styled(ReviewerSubmitButton)`
  width: 100%;
`

const RightAreaWrapper = styled.div`
  align-items: center;
  display: flex;
  text-transform: initial;
`

const StyledCheckbox = styled(Checkbox)`
  margin-right: ${grid(2)};
`

const ReviewerActionsWrapper = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
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

  ${ReviewerActionsWrapper} {
    align-items: stretch;
    flex-direction: column;
    gap: ${grid(3)};

    button {
      margin: 0;
    }
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
    amountOfReviewers,
    authors,
    automateReviewerInvites,
    complexItemSetOptions,
    announcementText,
    defaultActiveKey,
    authorChatMessages,
    productionChatMessages,
    reviewerChatMessages,
    editorContent,
    leadingContent,
    complexSetEditLink,
    complexItemSetId,
    editorView,
    facultyView,
    hasMoreMessages,
    onClickExportToWord,
    onFetchMoreMessages,
    onClickExportToQti,
    onSubmitReport,
    initialMetadataValues,
    isAccepted,
    isArchived,
    isUserLoggedIn,
    isPublished,
    isRejected,
    isSubmitted,
    isUnderReview,
    isInProduction,
    isUnpublished,
    canUnpublish,
    canPublish,
    loading,
    loadAuthors,
    metadata,
    onAcceptQuestion,
    onAddReviewers,
    onAssignAuthor,
    onAutomateReviewerChange,
    onChangeAmountOfReviewers,
    onClickAssignHE,
    onClickNextButton,
    onClickPreviousButton,
    onEditorContentAutoSave,
    onImageUpload,
    onInviteReviewer,
    onMetadataAutoSave,
    onMoveToProduction,
    onMoveToReview,
    onPublish,
    onRemoveReviewerRow,
    onRevokeReviewerInvitation,
    onUnpublish,
    onCreateNewVersion,
    onQuestionSubmit,
    onReject,
    onReviewerSearch,
    onReviewerTableChange,
    onSendAuthorChatMessage,
    onSendProductionChatMessage,
    onSendReviewerChatMessage,
    onSubmitReview,
    authorChatParticipants,
    productionChatParticipants,
    reviewerChatParticipants,
    onReviewerAcceptInvite,
    onReviewerRejectInvite,
    questionAgreedTc,
    refetchUser,
    resources,
    reviewInviteStatus,
    reviewSubmitted,
    reviewerPool,
    reviewerView,
    qtiZipLoading,
    showAssignHEButton,
    showPreviewButton,
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
    showProductionChatTab,
    showReviewerChatTab,
    showAssignReviewers,
    hasDeletedAuthor,
    onSelectReviewer,
    hasGeneralReviewerChatId,
    reviewerId,
    authorsCurrent,
    onAuthorEdit,
    isEditing,
    onAddToList,
    onAddToNewList,
    existingLists,
    loadingAddToList,
    loadingCreateList,
    dependencyOptions,
    unreadMentions,
    onMarkAsRead,
  } = props

  const [modal, contextHolder] = Modal.useModal()
  const { confirm, success, error } = modal

  const formRef = useRef()
  const waxRef = useRef()

  const [agreedTc, setAgreedTc] = useState(questionAgreedTc)
  const [autoSaving, setAutoSaving] = useState(false)

  const [showMetadata, setShowMetadata] = useState(isUserLoggedIn)

  const [activeKey, setActiveKey] = useState(defaultActiveKey)
  const [preview, setPreview] = useState(facultyView)
  const [refreshEditorContent, setRefreshEditorContent] = useState(false)

  const [imageLongDescs, setImageLongDescs] = useState([])

  const readOnly =
    (editorView && isSubmitted && !isInProduction && !isAccepted) /* &&
      (isUnderReview || isPublished || isUnpublished) */ ||
    (editorView && (isUnderReview || isPublished || isUnpublished)) ||
    (!editorView && isSubmitted && !isEditing) ||
    isRejected

  // need to reset showMetadata, in case user loads after the page is rendered
  useEffect(() => {
    setShowMetadata(isUserLoggedIn && !reviewerView)
  }, [isUserLoggedIn, reviewerView])

  useEffect(() => {
    setTimeout(() => {
      const images = [...document.querySelectorAll('.ProseMirror img')]
      const parsedImages = []

      images.forEach(image => {
        const describedBy = image.getAttribute('aria-describedby')
        const { ariaDescription } = image

        if (describedBy && ariaDescription) {
          parsedImages.push({ id: describedBy, content: ariaDescription })
        }
      })

      setImageLongDescs(parsedImages)
    }, 500)
  }, [editorContent])

  // #region handlers
  const handleQuestionContentChange = content => {
    if (onEditorContentAutoSave) {
      setAutoSaving(true)
      onEditorContentAutoSave(content).then(({ update }) => {
        setRefreshEditorContent(update)
        setAutoSaving(false)
      })
    }
  }

  const handleMetadataAutoSave = data => {
    setAutoSaving(true)
    onMetadataAutoSave(data).then(() => {
      setAutoSaving(false)
    })
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

  const TermsAndConditions = (
    <Details>
      <summary>Read terms and conditions</summary>
      <Paragraph className="tnc-content">
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
        affiliates (referred to collectively with HHMI as, “we,” “us,” or “our”)
        a royalty-free, perpetual, irrevocable, non-exclusive right and license
        to use, publish, reproduce, modify, adapt, edit, translate, create
        derivative works from, incorporate into other works, distribute,
        sub-license, and otherwise exploit such Item Information, and
        derivatives or modifications thereof, throughout the universe in any
        form, media or technology now known or hereafter developed, including
        without limitation sub-licensing and distributing the Item Information
        or derivatives or modifications thereof under a Creative Commons license
        selected by HHMI. You hereby represent, warrant and covenant that the
        Item Information submitted by you is original to you, and that neither
        the existence nor the exploitation thereof shall infringe upon or
        violate any trademark, patent, copyright, trade secret, right of privacy
        or publicity, or other common law right of any third party.
      </Paragraph>
    </Details>
  )

  const handleSubmit = () => {
    if (isEmptyEditor()) return

    const confirmSubmitModal = confirm()
    confirmSubmitModal.update({
      title: (
        <ModalHeader>Are you sure you want to submit this item?</ModalHeader>
      ),
      content: (
        <>
          <Paragraph>
            This will make this item visible to editors and reviewers, and after
            a successful review it will be published for all users.
          </Paragraph>
          {TermsAndConditions}
          <ModalContext.Consumer>
            {({ agree, setAgree }) => (
              <StyledCheckbox
                aria-label="I accept the terms and conditions"
                checked={agree}
                data-testid="accept-tnc"
                onChange={() => setAgree(!agree)}
              >
                Accept terms and conditions
              </StyledCheckbox>
            )}
          </ModalContext.Consumer>
        </>
      ),
      footer: [
        <ModalFooter key="footer">
          <Button onClick={() => confirmSubmitModal.destroy()}>Cancel</Button>
          <ModalContext.Consumer>
            {({ agree }) => (
              <Button
                autoFocus
                disabled={!agree}
                onClick={() => {
                  formRef?.current?.submit()
                  confirmSubmitModal.destroy()
                }}
                type="primary"
              >
                Submit
              </Button>
            )}
          </ModalContext.Consumer>
        </ModalFooter>,
      ],
    })
  }

  const handleEdit = () => {
    onAuthorEdit().catch(e => {
      if (e.message.indexOf('Not Authorised!') > -1) {
        const errorModal = error()
        errorModal.update({
          title: <ModalHeader>This item has already been accepted</ModalHeader>,
          content: (
            <Paragraph>
              You cannot edit this item anymore, because it has already been
              accepted by the editors.
            </Paragraph>
          ),
        })
      }
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

    const pendingReviews = reviewerPool.filter(
      r =>
        r.invited &&
        !r.invitationRevoked &&
        !r.rejectedInvitation &&
        !r.reviewSubmitted,
    )

    const content =
      pendingReviews.length > 0
        ? `Some of the invited reviewers have not yet submitted their review, and they won't be able to do so after you move the item to production. Do you want to continue?`
        : "This item will become editable so that editors and the production team can apply the reviewers' feedback. Are you sure?"

    confirmMoveToProduction.update({
      title: (
        <ModalHeader>You are about to move this item to production</ModalHeader>
      ),
      content,
      footer: [
        <ModalFooter key="footer" style={{ marginTop: '20px' }}>
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
    formRef?.current
      ?.validateFields()
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
                        'There was an error while publishing this item. Please try again',
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

  const isReviewerActive = r =>
    r.invited && !r.invitationRevoked && !r.rejectedInvitation

  const isReviewerAvailable = r => !r.invited

  const findAvailableReviewerSlots = () => {
    const active = reviewerPool.filter(r => isReviewerActive(r))
    const reviewerSlotsLeft = amountOfReviewers - active.length

    if (reviewerSlotsLeft < 0) return 0
    return reviewerSlotsLeft
  }

  const runAutomateInviteReviewers = async () => {
    const reviewerSlotsLeft = findAvailableReviewerSlots()
    const notInvited = reviewerPool.filter(r => isReviewerAvailable(r))

    const reviewerIdsToInvite = notInvited
      .slice(0, reviewerSlotsLeft)
      .map(r => r.id)

    await Promise.all(reviewerIdsToInvite.map(id => onInviteReviewer(id)))
  }

  const handleReviewerInviteAutomationChange = async toAutomate => {
    await onAutomateReviewerChange(toAutomate)

    if (toAutomate) runAutomateInviteReviewers()
  }

  const handleClickInviteReviewer = async invitedReviewerId => {
    if (!findAvailableReviewerSlots()) return Promise.resolve()

    return onInviteReviewer(invitedReviewerId)
  }

  const handleRevokeReviewerInvite = async uninvitedReviewerId => {
    await onRevokeReviewerInvitation(uninvitedReviewerId)

    if (automateReviewerInvites) await runAutomateInviteReviewers()
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
      editorContent: waxRef?.current?.getContent(),
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

  const showUnpublishModal = () => {
    const confirmUnpublish = confirm()
    confirmUnpublish.update({
      title: <ModalHeader>Unpublish item</ModalHeader>,
      content: (
        <>
          <p>
            Unpublishing an item will remove it from the Browse Items page.
            After an item is unpublished you can choose to edit and republish
            it.
          </p>
          {hasDeletedAuthor && (
            <p>
              <strong>NOTE: </strong>The author of this item has been deleted
              from the system. If you want to edit and publish a new version of
              the item, you will have to assign a new author to it.
            </p>
          )}
        </>
      ),
      footer: [
        <ModalFooter key="footer">
          <Button onClick={() => confirmUnpublish.destroy()}>Cancel</Button>
          <Button
            autoFocus
            onClick={() => {
              confirmUnpublish.destroy()
              onUnpublish()
                .then(() =>
                  showDialog(
                    'success',
                    'Item unpublished successfully',
                    'Item was unpublished and removed from Browse Items page.',
                  ),
                )
                .catch(() =>
                  showDialog(
                    'error',
                    'Problem unpublishing this item',
                    'There was an error while unpublishing this item. Please try again!',
                  ),
                )
            }}
            status="danger"
          >
            Unpublish
          </Button>
        </ModalFooter>,
      ],
    })
  }

  const showNewVersionModal = () => {
    const confirmNewVersion = confirm()
    confirmNewVersion.update({
      title: <ModalHeader>Edit unpublished item</ModalHeader>,
      content: `This item is unpublished. You will need to publish this item again 
      for the changes to be reflected in the Browse Items page.
      After the item is edited, the previous version will not be available. 
      Do you wish to continue?`,
      footer: [
        <ModalFooter key="footer">
          <Button onClick={() => confirmNewVersion.destroy()}>Cancel</Button>
          <Button
            autoFocus
            onClick={() => {
              confirmNewVersion.destroy()
              onCreateNewVersion()
                .then()
                .catch(() =>
                  showDialog(
                    'error',
                    'Problem updating this item',
                    'Item cannot be updated',
                  ),
                )
            }}
            status="danger"
          >
            Edit
          </Button>
        </ModalFooter>,
      ],
    })
  }
  // #endregion handlers

  // #region components
  const QuestionTab = <StyledTabItem>Item</StyledTabItem>
  const AuthorChatTab = <StyledTabItem>Author chat</StyledTabItem>

  const ReviewerChatTab = <StyledTabItem>Reviewer chat</StyledTabItem>

  const AssignReviewersTab = <StyledTabItem>Invite reviewers</StyledTabItem>

  const ProductionAssignmentsTab = (
    <StyledTabItem>Production chat</StyledTabItem>
  )

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

  const isMobile = useBreakpoint('(max-width: 900px)')

  const RightAreaAuthor =
    // eslint-disable-next-line no-nested-ternary
    isSubmitted ? (
      <>
        <StyledWordExportButton
          hasUnmetDependencies={initialMetadataValues.dependsOn?.length}
          isIconButton={isMobile}
          loading={wordFileLoading}
          onExport={onClickExportToWord}
          showMetadataOption={isUserLoggedIn}
        />

        {!isEditing && !isAccepted && (
          <Button onClick={handleEdit} type="primary">
            Edit
          </Button>
        )}
        {isEditing && (
          <Button
            aria-label="Submit"
            onClick={handleSubmit}
            title="Submit"
            type="primary"
          >
            Submit
          </Button>
        )}
      </>
    ) : isMobile ? (
      <>
        <StyledWordExportButton
          hasUnmetDependencies={initialMetadataValues.dependsOn?.length}
          isIconButton
          loading={wordFileLoading}
          onExport={onClickExportToWord}
          showMetadataOption={isUserLoggedIn}
        />

        <Button
          aria-label="Submit"
          // onClick={handleSubmitButtonClick}

          onClick={handleSubmit}
          title="Submit"
          type="primary"
        >
          Submit
        </Button>
      </>
    ) : (
      <>
        <StyledWordExportButton
          hasUnmetDependencies={initialMetadataValues.dependsOn?.length}
          loading={wordFileLoading}
          onExport={onClickExportToWord}
          showMetadataOption={isUserLoggedIn}
        />

        <SubmitButton
          data-testid="submit-question-btn"
          disabled={
            // !formRef.current.isFieldsTouched(true) ||
            submitting
            // formRef.current.getFieldsError().filter(({ errors }) => errors.length)
            //   .length > 0 ||
          }
          onClick={handleSubmit}
          type="primary"
        >
          Submit
        </SubmitButton>
      </>
    )

  const editorActionsDropdownMenu = (
    <>
      <StyledWordExportButton
        hasUnmetDependencies={initialMetadataValues.dependsOn?.length}
        loading={wordFileLoading}
        onExport={onClickExportToWord}
        showMetadataOption
      />
      {((canAssignAuthor && isPublished) ||
        (isUnpublished && hasDeletedAuthor && canUnpublish)) && (
        <StyledAssignAuthorButton
          authors={authors}
          currentAuthor={authorsCurrent}
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
      {canPublish && isInProduction && !isPublished && (
        <StyledButton
          data-testid="publish-question-btn"
          onClick={handlePublish}
          type="primary"
        >
          Publish
        </StyledButton>
      )}
      {isSubmitted &&
        !isAccepted &&
        !isUnderReview &&
        !isInProduction &&
        !isPublished && (
          <>
            <StyledButton
              id="doNotAccept"
              onClick={handleReject}
              status="danger"
              type="primary"
            >
              Do not accept
            </StyledButton>
            <StyledButton id="accept" onClick={onAcceptQuestion} type="primary">
              Accept
            </StyledButton>
          </>
        )}
      {isAccepted &&
        !isUnderReview &&
        !isInProduction &&
        !isPublished &&
        !isUnpublished && (
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
      {isPublished && canUnpublish && (
        <StyledButton onClick={showUnpublishModal} type="primary">
          Unpublish
        </StyledButton>
      )}
      {isUnpublished && canCreateNewVersion && !hasDeletedAuthor && (
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
          hasUnmetDependencies={initialMetadataValues.dependsOn?.length}
          loading={wordFileLoading}
          onExport={onClickExportToWord}
          showMetadataOption
        />
        {((canAssignAuthor && isPublished) ||
          (isUnpublished && hasDeletedAuthor && canUnpublish)) && (
          <StyledAssignAuthorButton
            authors={authors}
            authorsCurrent={authorsCurrent}
            currentAuthor={authorsCurrent}
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
        {isSubmitted &&
          !isAccepted &&
          !isUnderReview &&
          !isInProduction &&
          !isPublished &&
          !isUnpublished && (
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
                id="accept"
                onClick={onAcceptQuestion}
                type="primary"
              >
                Accept
              </StyledButton>
            </>
          )}
        {isAccepted &&
          !isUnderReview &&
          !isInProduction &&
          !isPublished &&
          !isUnpublished && (
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
        {canPublish && isInProduction && !isPublished && (
          <StyledButton
            data-testid="publish-question-btn"
            onClick={handlePublish}
            type="primary"
          >
            Publish
          </StyledButton>
        )}
        {isPublished && canUnpublish && (
          <StyledButton onClick={showUnpublishModal} type="primary">
            Unpublish
          </StyledButton>
        )}
        {isUnpublished && canCreateNewVersion && !hasDeletedAuthor && (
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

  const ViewAsContent = (
    <>
      <ViewAsLabel htmlFor="viewAsSelect">View as</ViewAsLabel>
      <StyledSelect
        data-testid="viewas-select"
        id="viewAsSelect"
        onChange={setShowMetadata}
        options={viewAsOptions}
        value={showMetadata}
      />
    </>
  )

  const reviewerInviteActions = (
    <ReviewerActionsWrapper>
      <StyledWordExportButton
        hasUnmetDependencies={initialMetadataValues.dependsOn?.length}
        loading={wordFileLoading}
        onExport={onClickExportToWord}
        showMetadataOption={isUserLoggedIn}
      />
      {reviewInviteStatus === REVIEWER_STATUSES.invited && (
        <>
          <StyledReviewerRejectInviteButton
            onReject={onReviewerRejectInvite}
            showDialog={showDialog}
          />
          <StyledReviewerAcceptInviteButton
            onAccept={onReviewerAcceptInvite}
            showDialog={showDialog}
          />
        </>
      )}
      {reviewInviteStatus === REVIEWER_STATUSES.accepted &&
        !reviewSubmitted && (
          <StyledSubmitReviewButton
            onSubmit={onSubmitReview}
            showDialog={showDialog}
          />
        )}
    </ReviewerActionsWrapper>
  )

  const RightAreaReviewer = (
    <>
      {/* {ReviewerViewAsContent} */}
      {ViewAsContent}
      <ActionsWrapper>{reviewerInviteActions}</ActionsWrapper>
      <Popup
        alignment="end"
        position="block-end"
        toggle={
          <PopupToggle
            icon={<EllipsisOutlined />}
            title="More actions"
            type="primary"
          />
        }
      >
        <PopupContentWrapper>{reviewerInviteActions}</PopupContentWrapper>
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
      {showPreviewButton && (
        <StyledButton onClick={() => setPreview(prev => !prev)}>
          {!preview ? 'Preview' : 'Continue editing'}
        </StyledButton>
      )}
      {!isRejected &&
        !reviewerView &&
        (editorView && isSubmitted ? RightAreaEditor : RightAreaAuthor)}
      {reviewerView &&
        !isRejected &&
        (reviewInviteStatus === REVIEWER_STATUSES.invited ||
          reviewInviteStatus === REVIEWER_STATUSES.accepted) &&
        RightAreaReviewer}
    </RightAreaWrapper>
  )

  const publishedQuestionActions = (
    <>
      <StyledWordExportButton
        hasUnmetDependencies={initialMetadataValues.dependsOn?.length}
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
      {isPublished && canUnpublish && (
        <StyledButton onClick={showUnpublishModal} type="primary">
          Unpublish
        </StyledButton>
      )}
      {isPublished && canAssignAuthor && (
        <StyledAssignAuthorButton
          authors={authors}
          currentAuthor={authorsCurrent}
          loadAuthors={loadAuthors}
          onAssignAuthor={onAssignAuthor}
          refetchUser={refetchUser}
        />
      )}
      {isUnpublished && canCreateNewVersion && (
        <StyledButton onClick={showNewVersionModal} type="primary">
          Edit item
        </StyledButton>
      )}
    </>
  )

  const FacultyHeader = (
    <FacultyHeaderWrapper id="question-actions" tabIndex="-1">
      <div>
        {/* {BackButton} */}
        {PreviousQuestion}
      </div>

      <div>
        {isUserLoggedIn && <ViewAsWrapper>{ViewAsContent}</ViewAsWrapper>}
        <span style={{ marginInlineEnd: '8px' }}>
          <AddToListPopup
            alignment="end"
            existingListsOptions={existingLists}
            id="list-actions-popup"
            loadingAddToList={loadingAddToList}
            loadingCreateList={loadingCreateList}
            onAddToList={onAddToList}
            onCreateList={onAddToNewList}
            position="block-end"
          />
        </span>
        <ActionsWrapper>
          <Popup
            id="export-popup"
            position="block-end"
            toggle={
              <Button
                data-testid="export-btn"
                id="export-popup-toggle"
                style={{ marginInlineEnd: '8px' }}
                type="primary"
              >
                Export
              </Button>
            }
          >
            <PopupContentWrapper>
              <StyledWordExportButton
                hasUnmetDependencies={initialMetadataValues.dependsOn?.length}
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
            </PopupContentWrapper>
          </Popup>

          {isPublished && canUnpublish && (
            <StyledButton onClick={showUnpublishModal} type="primary">
              Unpublish
            </StyledButton>
          )}
          {isPublished && canAssignAuthor && (
            <StyledAssignAuthorButton
              authors={authors}
              currentAuthor={authorsCurrent}
              loadAuthors={loadAuthors}
              onAssignAuthor={onAssignAuthor}
              refetchUser={refetchUser}
            />
          )}
          {isUnpublished && canCreateNewVersion && (
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

  const tabItems = [
    {
      label: QuestionTab,
      key: 'editor',
      children: (
        <>
          {isRejected && (
            <Ribbon status="error">
              This item has been rejected by the editors.
            </Ribbon>
          )}
          {isUnpublished && (
            <Ribbon status="error">
              This item has been unpublished by the editors.
              {hasDeletedAuthor &&
                ` The author of this item has been deleted. Assign a new author to be able to edit.`}
            </Ribbon>
          )}
          {reviewInviteStatus === REVIEWER_STATUSES.revoked && (
            <Ribbon status="error">
              Invitation to review this item has been revoked.
            </Ribbon>
          )}
          {reviewInviteStatus === REVIEWER_STATUSES.rejected && (
            <Ribbon status="error">
              You have rejected the invitation to review this item.
            </Ribbon>
          )}
          {isArchived && (
            <Ribbon status="error">This item has been archived.</Ribbon>
          )}
          <PanelWrapper
            condition={false}
            editor={
              <QuestionEditor
                complexItemSetId={complexItemSetId}
                complexSetEditLink={complexSetEditLink}
                content={editorContent}
                innerRef={waxRef}
                layout={preview || reviewerView ? TestModeLayout : HhmiLayout}
                leadingContent={leadingContent}
                onContentChange={handleQuestionContentChange}
                onImageUpload={onImageUpload}
                onSubmitReport={onSubmitReport}
                published={isPublished}
                readOnly={
                  readOnly || preview || !selectedQuestionType //
                }
                refreshEditorContent={refreshEditorContent}
                selectedQuestionType={selectedQuestionType}
                showDialog={showDialog}
                withFeedback={
                  !(preview || reviewerView) || (showMetadata && facultyView)
                }
              />
            }
            metadata={
              <>
                <StyledMetadata
                  complexItemSetOptions={complexItemSetOptions}
                  dependencyOptions={dependencyOptions}
                  editorView={editorView}
                  initialValues={initialMetadataValues}
                  innerRef={formRef}
                  metadata={metadata}
                  onAutoSave={handleMetadataAutoSave}
                  onFormFinish={onFormFinish}
                  presentationMode={facultyView}
                  readOnly={readOnly}
                  resources={resources}
                  selectedQuestionType={selectedQuestionType?.metadataValue}
                  showIBoptionalFields={
                    isInProduction || isPublished || isUnpublished
                  }
                  showTopicAndSubtopicFields={
                    isInProduction || isPublished || isUnpublished
                  }
                />
                <SkipToTop
                  href="#question-actions"
                  onClick={e => {
                    e.preventDefault()
                    document.getElementById('question-actions').focus()
                  }}
                >
                  {skipButtonText()}
                </SkipToTop>
              </>
            }
            showMetadata={showMetadata && (!preview || facultyView)}
          />
          <VisuallyHiddenElement as="div">
            {imageLongDescs.map(longDesc => (
              <p id={longDesc.id}>{longDesc.content}</p>
            ))}
          </VisuallyHiddenElement>
        </>
      ),
    },
    showAuthorChatTab && {
      label: AuthorChatTab,
      key: 'authorChat',
      children: (
        <ChatThread
          announcementText={announcementText}
          hasMore={hasMoreMessages}
          isActive={activeKey === 'authorChat'}
          messages={authorChatMessages}
          onFetchMore={onFetchMoreMessages}
          onSendMessage={onSendAuthorChatMessage}
          participants={authorChatParticipants}
        />
      ),
    },
    showProductionChatTab && {
      label: ProductionAssignmentsTab,
      key: 'productionChat',
      children: (
        <ChatThread
          isActive={activeKey === 'productionChat'}
          messages={productionChatMessages}
          onSendMessage={onSendProductionChatMessage}
          participants={productionChatParticipants}
        />
      ),
    },
    showReviewerChatTab && {
      label: ReviewerChatTab,
      key: 'reviewerChat',
      children:
        reviewerView || hasGeneralReviewerChatId ? (
          <ChatThread
            hasMore={hasMoreMessages}
            isActive={activeKey === 'reviewerChat'}
            messages={reviewerChatMessages}
            onFetchMore={onFetchMoreMessages}
            onSendMessage={onSendReviewerChatMessage}
            participants={reviewerChatParticipants}
          />
        ) : (
          <ReviewerChats
            hasMore={hasMoreMessages}
            isActive={activeKey === 'reviewerChat'}
            messages={reviewerChatMessages}
            onFetchMore={onFetchMoreMessages}
            onSelectReviewer={onSelectReviewer}
            onSendMessage={onSendReviewerChatMessage}
            participants={reviewerChatParticipants}
            reviewerId={reviewerId}
            reviewers={reviewerPool.filter(r => r.acceptedInvitation)}
          />
        ),
    },
    showAssignReviewers && {
      label: AssignReviewersTab,
      key: 'assignReviewers',
      children: (
        <AssignReviewers
          amountOfReviewers={amountOfReviewers}
          automate={automateReviewerInvites}
          canInviteMore={!!findAvailableReviewerSlots()}
          onAddReviewers={onAddReviewers}
          onAmountOfReviewersChange={onChangeAmountOfReviewers}
          onAutomationChange={handleReviewerInviteAutomationChange}
          onClickInvite={handleClickInviteReviewer}
          onClickRemoveRow={onRemoveReviewerRow}
          onClickRevokeInvitation={handleRevokeReviewerInvite}
          onSearch={onReviewerSearch}
          onTableChange={onReviewerTableChange}
          onUploadReview={onSubmitReview}
          reviewerPool={reviewerPool}
          searchPlaceholder="Search by reviewer name or relevant topic"
          showDialog={showDialog}
        />
      ),
    },
  ]

  useEffect(() => {
    if (
      showAuthorChatTab !== null &&
      showProductionChatTab !== null &&
      showReviewerChatTab !== null &&
      showAssignReviewers !== null
    ) {
      switch (activeKey) {
        case 'authorChat':
          !showAuthorChatTab && handleTabChange('editor')
          break
        case 'reviewerChat':
          !showReviewerChatTab && handleTabChange('editor')
          break
        case 'productionChat':
          !showProductionChatTab && handleTabChange('editor')
          break
        case 'assignReviewers':
          !showAssignReviewers && handleTabChange('editor')
          break
        default:
          handleTabChange('editor')
          break
      }
    }
  }, [
    showAuthorChatTab,
    showProductionChatTab,
    showReviewerChatTab,
    showAssignReviewers,
  ])

  useEffect(() => {
    let toMarkAsRead

    switch (activeKey) {
      case 'authorChat':
      case 'productionChat':
      case 'reviewerChat':
        toMarkAsRead = unreadMentions
          .filter(({ content }) => content.chatType === activeKey)
          .map(({ id }) => id)

        onMarkAsRead(toMarkAsRead)
        break
      default:
        break
    }
  }, [activeKey])

  return (
    <ModalContext.Provider value={contextValue}>
      <Wrapper>
        <Spin renderBackground={false} spinning={loading}>
          <StyledTabs
            $activebg="#fff"
            activeKey={activeKey}
            items={tabItems}
            onChange={handleTabChange}
            renderTabBar={(tabProps, DefaultTabBar) => {
              return facultyView && !reviewerView ? (
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
  amountOfReviewers: PropTypes.number,
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  automateReviewerInvites: PropTypes.bool,
  complexItemSetOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
    }),
  ),
  defaultActiveKey: PropTypes.string,
  leadingContent: PropTypes.shape(),
  announcementText: PropTypes.string,
  authorChatMessages: PropTypes.arrayOf(PropTypes.shape()),
  productionChatMessages: PropTypes.arrayOf(PropTypes.shape()),
  reviewerChatMessages: PropTypes.arrayOf(PropTypes.shape()),
  hasMoreMessages: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  loadAuthors: PropTypes.func,
  onAcceptQuestion: PropTypes.func,
  onAddReviewers: PropTypes.func,
  onAssignAuthor: PropTypes.func,
  onAutomateReviewerChange: PropTypes.func,
  onClickPreviousButton: PropTypes.func,
  onChangeAmountOfReviewers: PropTypes.func,
  onChangeAnnouncement: PropTypes.func,
  onClickNextButton: PropTypes.func,
  onEditorContentAutoSave: PropTypes.func,
  onImageUpload: PropTypes.func,
  onInviteReviewer: PropTypes.func,
  onQuestionSubmit: PropTypes.func.isRequired,
  onMetadataAutoSave: PropTypes.func,
  onMoveToReview: PropTypes.func,
  onMoveToProduction: PropTypes.func,
  onPublish: PropTypes.func,
  onUnpublish: PropTypes.func,
  onCreateNewVersion: PropTypes.func,
  onReject: PropTypes.func,
  onRemoveReviewerRow: PropTypes.func,
  onReviewerAcceptInvite: PropTypes.func,
  onReviewerRejectInvite: PropTypes.func,
  onReviewerSearch: PropTypes.func,
  onReviewerTableChange: PropTypes.func,
  onRevokeReviewerInvitation: PropTypes.func,
  onSendAuthorChatMessage: PropTypes.func,
  onSendProductionChatMessage: PropTypes.func,
  onSendReviewerChatMessage: PropTypes.func,
  onSubmitReport: PropTypes.func,
  onSubmitReview: PropTypes.func,
  onClickAssignHE: PropTypes.func,
  onClickExportToQti: PropTypes.func,
  onClickExportToWord: PropTypes.func,
  canCreateNewVersion: PropTypes.bool,
  onFetchMoreMessages: PropTypes.func,
  editorContent: PropTypes.shape(),
  questionAgreedTc: PropTypes.bool,
  submitting: PropTypes.bool,
  isAccepted: PropTypes.bool,
  isArchived: PropTypes.bool,
  isPublished: PropTypes.bool,
  isRejected: PropTypes.bool,
  isSubmitted: PropTypes.bool,
  isUnderReview: PropTypes.bool,
  isInProduction: PropTypes.bool,
  isUserLoggedIn: PropTypes.bool,
  isUnpublished: PropTypes.bool,
  canUnpublish: PropTypes.bool,
  editorView: PropTypes.bool,
  canPublish: PropTypes.bool,
  canAssignAuthor: PropTypes.bool,
  reviewerPool: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      displayName: PropTypes.string.isRequired,
      invited: PropTypes.bool,
      acceptedInvitation: PropTypes.bool,
      rejectedInvitation: PropTypes.bool,
      invitationRevoked: PropTypes.bool,
      reviewSubmitted: PropTypes.bool,
    }),
  ),
  showAssignHEButton: PropTypes.bool,
  showPreviewButton: PropTypes.bool,
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
  reviewInviteStatus: PropTypes.string,
  reviewSubmitted: PropTypes.bool,
  reviewerView: PropTypes.bool,
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
    dependsOn: PropTypes.arrayOf(PropTypes.string),
  }),
  updated: PropTypes.string,
  wordFileLoading: PropTypes.bool,
  authorChatParticipants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string,
    }),
  ),
  productionChatParticipants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string,
    }),
  ),
  reviewerChatParticipants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      username: PropTypes.string,
    }),
  ),
  qtiZipLoading: PropTypes.bool,
  complexSetEditLink: PropTypes.string,
  complexItemSetId: PropTypes.string,
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
  showProductionChatTab: PropTypes.bool,
  showReviewerChatTab: PropTypes.bool,
  showAssignReviewers: PropTypes.bool,

  hasDeletedAuthor: PropTypes.bool,
  onSelectReviewer: PropTypes.func,
  hasGeneralReviewerChatId: PropTypes.bool,
  reviewerId: PropTypes.string,
  authorsCurrent: PropTypes.arrayOf(PropTypes.shape()),
  onAuthorEdit: PropTypes.func,
  isEditing: PropTypes.bool,
  onAddToList: PropTypes.func,
  onAddToNewList: PropTypes.func,
  existingLists: PropTypes.arrayOf(PropTypes.shape()),
  loadingAddToList: PropTypes.bool,
  loadingCreateList: PropTypes.bool,
  dependencyOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.shape()]),
    }),
  ),
  unreadMentions: PropTypes.arrayOf(PropTypes.shape()),
  onMarkAsRead: PropTypes.func,
}

Question.defaultProps = {
  amountOfReviewers: 0,
  authors: [],
  automateReviewerInvites: false,
  complexItemSetOptions: [],
  defaultActiveKey: 'editor',
  announcementText: '',
  hasMoreMessages: false,
  authorChatMessages: [],
  productionChatMessages: [],
  reviewerChatMessages: [],
  onAcceptQuestion: () => {},
  onAddReviewers: () => {},
  onAutomateReviewerChange: () => {},
  onChangeAmountOfReviewers: () => {},
  onChangeAnnouncement: () => {},
  onFetchMoreMessages: () => {},
  onInviteReviewer: () => {},
  onMoveToReview: () => {},
  onMoveToProduction: () => {},
  onPublish: () => {},
  onUnpublish: () => {},
  onCreateNewVersion: () => {},
  onReject: () => {},
  onRemoveReviewerRow: () => {},
  onReviewerSearch: () => {},
  onReviewerTableChange: () => {},
  onRevokeReviewerInvitation: () => {},
  onSendAuthorChatMessage: () => {},
  onSendProductionChatMessage: () => {},
  onSendReviewerChatMessage: () => {},
  onSubmitReport: () => {},
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
  onReviewerAcceptInvite: () => {},
  onReviewerRejectInvite: () => {},
  onSubmitReview: () => {},
  loadAuthors: () => {},
  submitting: false,
  isAccepted: false,
  isArchived: false,
  isPublished: false,
  isRejected: false,
  isSubmitted: false,
  isUnderReview: false,
  isInProduction: false,
  isUnpublished: false,
  canUnpublish: false,
  canPublish: false,
  editorView: false,
  questionAgreedTc: false,
  canAssignAuthor: false,
  showAssignHEButton: true,
  showPreviewButton: false,
  showNextQuestionLink: false,
  facultyView: false,
  refetchUser: () => {},
  resources: [],
  reviewInviteStatus: null,
  reviewSubmitted: false,
  reviewerPool: [],
  reviewerView: false,
  updated: '',
  isUserLoggedIn: true,
  canCreateNewVersion: false,
  wordFileLoading: false,
  authorChatParticipants: [],
  productionChatParticipants: [],
  reviewerChatParticipants: [],
  qtiZipLoading: false,
  complexSetEditLink: null,
  complexItemSetId: null,
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
  showAuthorChatTab: null,
  showProductionChatTab: null,
  showReviewerChatTab: null,
  showAssignReviewers: null,

  hasDeletedAuthor: false,
  onSelectReviewer: null,
  hasGeneralReviewerChatId: false,
  reviewerId: null,
  authorsCurrent: [],
  onAuthorEdit: null,
  isEditing: false,
  onAddToList: null,
  onAddToNewList: null,
  existingLists: [],
  loadingAddToList: false,
  loadingCreateList: false,
  dependencyOptions: [],
  unreadMentions: [],
  onMarkAsRead: null,
}

export default Question
