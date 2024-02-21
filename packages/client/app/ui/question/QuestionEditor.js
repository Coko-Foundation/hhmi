import React, { useEffect, useState, createContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { grid, th } from '@coko/client'

import Button from '../common/Button'
import Wax from '../wax/Wax'
import { config } from '../wax/config'

// # region styled
const EditorWrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: auto;
  /* max-width: 75vw; */
  overflow: auto;
  position: relative;
  width: 100%;
`

const EditorScrollContainer = styled.div`
  flex-grow: 1;
  overflow: auto;
`

const SubmitTestBar = styled.div`
  background-color: ${th('colorBackground')};
  border-top: 1px solid ${th('colorBorder')};
  display: flex;
  justify-content: end;
  margin: auto;
  /* max-width: 100ch; */
  padding: ${grid(2)} ${grid(2)};
  width: 100%;
`

const MissingQuestionTypeAlert = styled.div`
  background-color: rgba(200 200 200 / 25%);
  inset: 0;
  position: absolute;

  > span {
    background-color: ${th('colorBackground')};
    border: 1px solid ${th('colorBorder')};
    inset-block-start: 40%;
    inset-inline-start: 50%;
    padding: ${grid(4)};
    position: absolute;
    transform: translate(-50%, -50%);
  }
`
// #endregion styled

export const ComplexItemSetContext = createContext({})

const QuestionEditor = props => {
  const {
    content,
    innerRef,
    layout,
    onContentChange,
    onImageUpload,
    readOnly,
    published,
    withFeedback,
    leadingContent,
    complexSetEditLink,
    complexItemSetId,
    selectedQuestionType,
  } = props

  const [showFeedBack, setShowFeedBack] = useState(false)
  const [editorContent, setEditorContent] = useState(content)

  const [testMode, setTestMode] = useState(
    published && !showFeedBack && !withFeedback,
  )

  const [customValues, setCustomValues] = useState({ showFeedBack, testMode })

  // only for users taking the test in student view
  const preserveLocalState = published && !withFeedback

  useEffect(() => {
    setEditorContent(content)
  }, [content])

  useEffect(() => {
    if (withFeedback) {
      setShowFeedBack(false)
      setTestMode(false)
    } else {
      setShowFeedBack(false)
      setTestMode(true)
    }

    // reset original content after switching views
    setEditorContent(content)
  }, [withFeedback])

  // changing customValues will rerender the editor
  // avoid rerendering if testMode or showFeedBack don't change
  // force rerendering when question is published and content changes (for next/previous navigation)
  useEffect(() => {
    if (
      testMode !== customValues.testMode ||
      showFeedBack !== customValues.showFeedBack ||
      published
    ) {
      setCustomValues({ testMode, showFeedBack })
    }
  }, [testMode, showFeedBack, published, content])

  const submitTest = () => {
    setShowFeedBack(true)
    setTestMode(false)

    const contentFeedback = JSON.parse(
      JSON.stringify(innerRef?.current?.getContent()),
    )

    setEditorContent(contentFeedback)
  }

  const resetTest = () => {
    setShowFeedBack(false)
    setTestMode(true)
    setEditorContent(content)
  }

  const contextValue = React.useMemo(
    () => ({
      leadingContent,
      complexSetEditLink,
      complexItemSetId,
    }),
    [leadingContent],
  )

  return (
    <EditorWrapper aria-label="Question editor">
      <EditorScrollContainer>
        <ComplexItemSetContext.Provider value={contextValue}>
          <Wax
            config={config}
            content={preserveLocalState ? editorContent : content}
            customValues={customValues}
            innerRef={innerRef}
            key={selectedQuestionType?.waxValue}
            layout={layout}
            onContentChange={!testMode ? onContentChange : () => {}}
            onImageUpload={onImageUpload}
            readOnly={readOnly}
          />
        </ComplexItemSetContext.Provider>
      </EditorScrollContainer>

      {!withFeedback && (
        <SubmitTestBar>
          {showFeedBack ? (
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

      {!selectedQuestionType && (
        <MissingQuestionTypeAlert data-testid="missing-question-text">
          <span>
            Please select an item type in the metadata form to start editing
          </span>
        </MissingQuestionTypeAlert>
      )}
    </EditorWrapper>
  )
}

QuestionEditor.propTypes = {
  content: PropTypes.shape(),
  leadingContent: PropTypes.shape(),
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
  onImageUpload: PropTypes.func,
  readOnly: PropTypes.bool,
  withFeedback: PropTypes.bool,
  published: PropTypes.bool,
  complexSetEditLink: PropTypes.string,
  complexItemSetId: PropTypes.string,
  selectedQuestionType: PropTypes.shape(),
}

QuestionEditor.defaultProps = {
  content: {},
  leadingContent: null,
  readOnly: false,
  innerRef: null,
  onImageUpload: () => {},
  published: false,
  withFeedback: true,
  complexSetEditLink: null,
  complexItemSetId: null,
  selectedQuestionType: null,
}

export default QuestionEditor
