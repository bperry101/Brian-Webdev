import React from 'react';
import { Table } from 'semantic-ui-react'

// Define header content
const TableHeader = (props) => {
  const header = props.headers.map((h,i) => { 
    return <Table.HeaderCell key={i}><div>{h}</div></Table.HeaderCell> 
  })
  return <Table.Header><Table.Row>{header}</Table.Row></Table.Header>
}

// Parse query contents into table
const TableContents = (props) => {
  const rows = Object.keys(props.data)
  const tableData = rows.map((k,i) => {
    const row = props.data[k]
    const rowData = Object.keys(row).map((k,i) => { 
      return <Table.Cell key={i}><div>{row[k]}</div></Table.Cell> 
    })
    return (
      <Table.Row key={i}>{rowData}</Table.Row>
    )
  })

return <Table.Body>{tableData}</Table.Body>
}

const BasicTable = (props) => (
  <Table color='blue' inverted>
    <TableHeader headers={props.headers} />
    <TableContents data={props.data} />
  </Table>
)

export default BasicTable;