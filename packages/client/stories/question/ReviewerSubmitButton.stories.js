/* eslint-disable no-console */

import React from 'react'
import ReviewerSubmitButton from '../../app/ui/question/ReviewerSubmitButton'
import { Button, Modal } from '../../app/ui/common'

const ModalContext = React.createContext({ agree: false, setAgree: () => {} })
const ModalFooter = Modal.footer
const ModalHeader = Modal.header

export const Base = args => {
  const [modal, contextHolder] = Modal.useModal()
  const { success, error } = modal

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

  const handleSubmit = ({ attachments, content }) => {
    console.log('reviewer submitted review:', content)
    attachments?.length && console.log('with attachments:', attachments)

    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
  }

  return (
    <ModalContext.Provider value>
      <ReviewerSubmitButton onSubmit={handleSubmit} showDialog={showDialog} />
      {contextHolder}
    </ModalContext.Provider>
  )
}

export default {
  component: ReviewerSubmitButton,
  title: 'Question/ReviewerSubmitButton',
}
