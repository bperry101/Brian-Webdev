import React, { Component } from 'react'
import { Accordion, Form, Menu } from 'semantic-ui-react'

const ColorForm = (
  <Form>
    <Form.Group grouped>
      <Form.Checkbox label='Red' name='color' value='red' />
      <Form.Checkbox label='Orange' name='color' value='orange' />
      <Form.Checkbox label='Green' name='color' value='green' />
      <Form.Checkbox label='Blue' name='color' value='blue' />
    </Form.Group>
  </Form>
)

export default class SymSelect extends Component {
  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state

    return (
      <Accordion as={Menu} vertical className='whitespace'>
        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 1}
            content='Colors'
            index={1}
            onClick={this.handleClick}
          />
          <Accordion.Content active={activeIndex === 1} content={ColorForm} />
        </Menu.Item>
      </Accordion>
    )
  }
}