import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { DeleteOutlined } from '@ant-design/icons'

import {
  Button,
  Form,
  Select,
  Modal,
  VisuallyHiddenElement,
  Paragraph,
} from '../common'

const ModalHeader = Modal.header
const ModalFooter = Modal.footer
const ModalContext = React.createContext(null)

const HeContainer = styled.span`
  align-items: baseline;
  display: flex;
  justify-content: space-between;
  width: 50%;
`

const StyledButton = styled(Button)`
  background-color: transparent;
  border: none;
  cursor: pointer;
`

const StyledFormItem = styled(Form.Item)`
  label.ant-form-item-required::before {
    /* stylelint-disable-next-line declaration-no-important */
    display: none !important;
  }
`

const AssignHEButton = props => {
  const {
    className,
    loading,
    onAssign,
    onSearchHE,
    onUnassign,
    handlingEditors,
    searchLoading,
    loadAssignedHEs,
    currentHandlingEditors,
    expanded,
    updateSelectedQuestions,
  } = props

  const [showModal, setShowModal] = useState(false)
  const [modal, contextHolder] = Modal.useModal()
  const [assingHeForm] = Form.useForm()

  useEffect(async () => {
    if (showModal) {
      loadAssignedHEs()
    }
  }, [showModal])

  useEffect(() => {
    onSearchHE()
  }, [])

  const handleAssign = ({ newHandlingEditor }) => {
    onAssign(newHandlingEditor)
      .then(({ data: { assignHandlingEditors } }) => {
        assingHeForm.resetFields()

        document.getElementById('he-update').innerHTML =
          ' selected users assigned as handling editors'

        const hasAssignedAuthor = assignHandlingEditors.some(
          assignHandlingEditor =>
            assignHandlingEditor.hasAuthorshipConflict === true,
        )

        const infoModalContent = hasAssignedAuthor
          ? `${
              newHandlingEditor.length > 1
                ? 'Some Handling Editors'
                : 'Selected Handling Editor'
            } couldn't be assigned for ${
              assignHandlingEditors.length > 1
                ? 'selected questions'
                : 'this question'
            }, because Handling editors cannot handle the questions they authored.`
          : `Handling editor${
              newHandlingEditor.length > 1 ? 's' : ''
            } assigned to the question${
              assignHandlingEditors.length > 1 ? 's' : ''
            } successfully`

        const assignmentInfoModal = modal.info()

        const onInfoModalClose = () => {
          updateSelectedQuestions(assignHandlingEditors)
          assignmentInfoModal.destroy()
          setShowModal(false)
        }

        assignmentInfoModal.update({
          title: <ModalHeader>Assignment Info</ModalHeader>,
          content: (
            <div>
              <Paragraph>{infoModalContent}</Paragraph>
            </div>
          ),
          footer: [
            <ModalFooter>
              <Button autoFocus onClick={onInfoModalClose} type="primary">
                Ok
              </Button>
            </ModalFooter>,
          ],
        })
      })
      .catch(() => {
        const conversionErrorModal = modal.error()
        conversionErrorModal.update({
          title: <ModalHeader>Assignment error</ModalHeader>,
          content:
            'Something went wrong while assigning the handling editor! Please try again or contact your system administrator.',
          footer: [
            <ModalFooter key="footer">
              <Button onClick={conversionErrorModal.destroy} type="primary">
                Ok
              </Button>
            </ModalFooter>,
          ],
        })
      })
  }

  const handleUnassignHE = user => {
    onUnassign(user.id).then(() => {
      document.getElementById(
        'he-update',
      ).innerHTML = `${user.displayName} removed from this question's handling editors`
    })
  }

  return (
    <ModalContext.Provider value={null}>
      <Button
        aria-label="Assign Handling Editor"
        className={className}
        id="assignHE"
        onClick={() => setShowModal(true)}
        type="primary"
      >
        {expanded ? 'Assign handling editors' : 'Assign HE'}
      </Button>

      <Modal
        afterClose={() => document.body.querySelector('#assignHE').focus()}
        destroyOnClose
        footer={[
          <ModalFooter key="footer">
            <Button onClick={() => setShowModal(false)}>Cancel</Button>
            <Button
              autoFocus
              loading={loading}
              onClick={() => assingHeForm.submit()}
              type="primary"
            >
              Assign
            </Button>
          </ModalFooter>,
        ]}
        onCancel={() => setShowModal(false)}
        open={showModal}
        title={<ModalHeader>Assign Handling Editor</ModalHeader>}
      >
        {currentHandlingEditors.length > 0 ? (
          <>
            <h3>Current assigned handling editors:</h3>
            <ol>
              {currentHandlingEditors.map(he => (
                <li key={he.id}>
                  <HeContainer>
                    {he.displayName}
                    <StyledButton
                      aria-label={`Unassign handling editor ${he.displayName}`}
                      icon={<DeleteOutlined />}
                      onClick={() => handleUnassignHE(he)}
                    />
                  </HeContainer>
                </li>
              ))}
            </ol>
          </>
        ) : null}
        <VisuallyHiddenElement id="he-update" role="status" />
        <Form
          form={assingHeForm}
          layout="vertical"
          onFinish={handleAssign}
          onValuesChange={() =>
            assingHeForm.validateFields(['newHandlingEditor'])
          }
        >
          <StyledFormItem
            label="Find a user to assign as handling editor for this question"
            name="newHandlingEditor"
            rules={[
              {
                required: true,
                message: 'Please select a user to assign',
              },
              {
                validator(_, value) {
                  if (
                    (value &&
                      currentHandlingEditors
                        .map(e => e.id)
                        .indexOf(value.value) === -1) ||
                    !value
                  ) {
                    return Promise.resolve()
                  }

                  return Promise.reject(
                    new Error(
                      'This user is already a handling editor for this question.',
                    ),
                  )
                },
              },
            ]}
            validateTrigger="onSubmit"
          >
            <Select
              // https://github.com/ant-design/ant-design/issues/19970#issuecomment-763139893
              async
              defaultOpen={false}
              labelInValue
              loading={searchLoading}
              mode="multiple"
              onSearch={onSearchHE}
              options={handlingEditors}
              placeholder="Search for a handling editor"
            />
          </StyledFormItem>
        </Form>
      </Modal>
      {contextHolder}
    </ModalContext.Provider>
  )
}

AssignHEButton.propTypes = {
  expanded: PropTypes.bool,
  loading: PropTypes.bool,
  onAssign: PropTypes.func,
  onUnassign: PropTypes.func,
  handlingEditors: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  currentHandlingEditors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      displayName: PropTypes.string,
    }),
  ),
  onSearchHE: PropTypes.func,
  searchLoading: PropTypes.bool,
  loadAssignedHEs: PropTypes.func,
  updateSelectedQuestions: PropTypes.func,
}

AssignHEButton.defaultProps = {
  expanded: false,
  loading: false,
  onAssign: () => {},
  onUnassign: () => {},
  onSearchHE: () => {},
  searchLoading: false,
  handlingEditors: [],
  loadAssignedHEs: () => {},
  currentHandlingEditors: [],
  updateSelectedQuestions: () => {},
}

export default AssignHEButton
