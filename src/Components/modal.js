// import React from 'react'
// import { Button, Header, Image, Modal } from 'semantic-ui-react'


// const ModalBox = (props) => (
//     <Modal className="modal-box" size='fullscreen' trigger={<Button>Enlarge</Button>}>
//       <Modal.Header> {props.title} </Modal.Header>
//       <Modal.Content>
//          {props.content}
        
//       </Modal.Content>
//       <Modal.Actions> 
//         <Button>Enlarge</Button>
//       </Modal.Actions>
//     </Modal>
//   )
  
// export default ModalBox

import React, { Component } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

export default class ModalBox extends Component {
  state = { modalOpen: false }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  render() {
    return (
      <Modal
        className="modal-box"
        size="fullscreen"
        trigger={<Button onClick={this.handleOpen}>Enlarge</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>{this.props.title}</Modal.Header>
        <Modal.Content>
          {this.props.content}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}