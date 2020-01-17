import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

import SymSelect from './SymSelect';

export default class Topbar extends Component {
  state = {}
 
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const { activeItem } = this.state
    return (
      <Menu className='fixHeight' size='massive' color={'blue'} inverted fluid>
        <Menu.Item header>Our Company</Menu.Item>
        <SymSelect className='symSelect' syms={this.props.syms} />
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


