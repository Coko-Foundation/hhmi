import styled from 'styled-components'
import { grid } from '@coko/client'
import { Modal } from 'antd'

const ModalFooter = styled.div`
  margin-top: ${grid(3)};
  text-align: right;

  > button:not(:last-of-type) {
    margin-right: ${grid(2)};
  }
`

const ModalHeader = styled.h2`
  font-size: unset;
  margin: 0;
`

Modal.header = ModalHeader
Modal.footer = ModalFooter

export default Modal
