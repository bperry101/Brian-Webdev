import React from 'react'
import { Menu, Container, Dropdown, Image } from 'semantic-ui-react'

const MakeDropdown = (props) => {
  const menu = props.data.map((s, i) => <Dropdown.Item key={i}>{s}</Dropdown.Item>)
  return <Dropdown item simple text='Options'><Dropdown.Menu>{menu}</Dropdown.Menu></Dropdown>
}

const Topbar = (props) => (
  <Menu fixed='top' inverted>
    <Container>
      <Menu.Item header>
        <Image size='mini' src='../Images/logo1.png' style={{ marginRight: '1.5em' }} />
        Webdev Project
      </Menu.Item>
      <Menu.Item as='a' header>Home</Menu.Item>
      <MakeDropdown data={props.data} />
    </Container>
  </Menu>
)

export default Topbar;