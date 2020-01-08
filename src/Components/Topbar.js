import React from 'react'
import { Menu, Container, Dropdown } from 'semantic-ui-react'

const MakeDropdown = () => {
  const syms = ['APPL', 'MSFT', 'GOOG', 'IBM']
  const menu = syms.map(s => <Dropdown.Item>{s}</Dropdown.Item>)
  return <Dropdown item simple text='Options'><Dropdown.Menu>{menu}</Dropdown.Menu></Dropdown>
}

const Topbar = () => (
  <Menu fixed='top' inverted>
    <Container>
      <Menu.Item header>Webdev Project</Menu.Item>
      <Menu.Item as='a' header>Home</Menu.Item>
      <MakeDropdown />
    </Container>
  </Menu>
)

export default Topbar;