/* stylelint-disable string-quotes */
import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { th, grid } from '@coko/client'
import Wax from '../wax/Wax'
import { simpleConfig } from '../wax/config'
import { HhmiLayout } from '../wax/layout'
import { Form, Input, Button, Spin, Modal } from '../common'

const Wrapper = styled.div`
  margin-inline: auto;
  max-width: 900px;
  padding-block-end: ${grid(4)};
  width: 100%;
`

const StyledForm = styled(Form)`
  padding-inline: ${grid(4)};

  input[type='file'] {
    display: none;
  }
`

const FormFooter = styled.div`
  text-align: right;
`

const StyledSpin = styled(Spin)`
  margin: 100px 50%;
  transform: translateX(-50%);
`

const WaxWrapper = styled.div`
  border: 1px solid ${th('colorBorder')};
  margin-bottom: ${grid(5)};

  .ProseMirror {
    min-height: 155px;
  }
`

const ModalContext = React.createContext(null)
const ModalHeader = Modal.header
const ModalFooter = Modal.footer

const ComplexItemSetForm = props => {
  const {
    id,
    onImageUpload,
    content,
    onSave,
    title,
    loadingData,
    loadingSave,
    submissionMessage,
    submissionStatus,
    warning,
  } = props

  const waxRef = useRef(null)
  const [modal, contextHolder] = Modal.useModal()
  const { confirm } = modal

  const saveComplexItemSet = values => {
    if (warning) {
      const confirmSubmitModal = confirm()
      confirmSubmitModal.update({
        title: (
          <ModalHeader>
            Are you sure you want to update this complex set?
          </ModalHeader>
        ),
        content:
          'The set already contains published questions, and the changes will affect all of them.',
        footer: [
          <ModalFooter key="footer">
            <Button onClick={() => confirmSubmitModal.destroy()}>Cancel</Button>
            <Button
              autoFocus
              onClick={() => {
                onSave({
                  title: values.title,
                  leadingContent: waxRef.current.getContent(),
                })
                confirmSubmitModal.destroy()
              }}
              type="primary"
            >
              Save
            </Button>
          </ModalFooter>,
        ],
      })
    } else {
      onSave({
        title: values.title,
        leadingContent: waxRef.current.getContent(),
      })
    }
  }

  if (loadingData) return <StyledSpin data-testId="spinner" spinning />

  return (
    <ModalContext.Provider value={null}>
      <Wrapper>
        <StyledForm
          initialValues={{ title }}
          layout="vertical"
          onFinish={saveComplexItemSet}
          ribbonMessage={submissionMessage}
          ribbonPosition="bottom"
          submissionStatus={submissionStatus}
        >
          <h2>
            {id
              ? 'Edit Context-Dependent Item Set'
              : 'Create new Context-Dependent Item Set'}
          </h2>
          <Form.Item
            label="Context-Dependent Item Set Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Context-dependent item set must have a title',
              },
            ]}
          >
            <Input placeholder="Enter title for Context-dependent item set" />
          </Form.Item>

          <h3>
            {id ? `Edit` : 'Create'} the content for the Context-Dependent Item
            Set leading text in the editor below
          </h3>
          <WaxWrapper>
            <Wax
              config={simpleConfig}
              content={content}
              innerRef={waxRef}
              layout={HhmiLayout}
              onImageUpload={onImageUpload}
            />
          </WaxWrapper>
          <FormFooter>
            <Button htmlType="submit" loading={loadingSave} type="primary">
              {content && content.content?.length > 0 ? 'Update' : 'Save'}
            </Button>
          </FormFooter>
        </StyledForm>
      </Wrapper>
      {contextHolder}
    </ModalContext.Provider>
  )
}

ComplexItemSetForm.propTypes = {
  //   onContentChange: PropTypes.func,
  id: PropTypes.string,
  onImageUpload: PropTypes.func,
  content: PropTypes.shape(),
  loadingData: PropTypes.bool,
  loadingSave: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
  title: PropTypes.string,
  submissionMessage: PropTypes.string,
  submissionStatus: PropTypes.string,
  warning: PropTypes.bool,
}

ComplexItemSetForm.defaultProps = {
  //   onContentChange: () => {},
  id: null,
  onImageUpload: () => {},
  content: {
    type: 'doc',
    content: [],
  },
  loadingData: false,
  loadingSave: false,
  title: '',
  submissionMessage: null,
  submissionStatus: null,
  warning: false,
}

export default ComplexItemSetForm
