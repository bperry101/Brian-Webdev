import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'


const ModalBox = (props) => (
    <Modal className="modal-box" size='fullscreen' trigger={<Button>Enlarge</Button>}>
      <Modal.Header> {props.title} </Modal.Header>
      <Modal.Content>
         {props.content}
      </Modal.Content>
    </Modal>
  )
  
export default ModalBox