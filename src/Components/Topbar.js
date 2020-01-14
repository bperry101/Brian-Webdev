import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

import SymSelect from './SymSelect';

export default class Topbar extends Component {
  state = {}
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const { activeItem } = this.state
    return (
      <Menu className='fixHeight' size='massive' color={'blue'} inverted>
        <Menu.Item header>Our Company</Menu.Item>
        <SymSelect className='symSelect' />
        <Menu.Item
          name='jobs'
          active={activeItem === 'jobs'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='locations'
          active={activeItem === 'locations'}
          onClick={this.handleItemClick}
        />
      </Menu>
    )
  }
}