import React, { Component } from 'react';
import { executeQuery } from '../Functions'
import { Table } from 'semantic-ui-react'
import { Header, Card } from 'semantic-ui-react'

// Class for data handling
class LastFive extends Component {
  constructor() {
    super();
    this.state = {
      data:{},
    }
  }
  // Call getData() function and update state with the results
  async updateState(kdbQuery) { 
    this.setState({ data: await executeQuery(kdbQuery) }) 
  }

  // When component mounts, run updateState() every interval
  componentDidMount() {
    this.interval = setInterval(() => this.updateState(this.props.query), 5000)
  }

  // Garbage collection
  componentWillUnmount() {
    clearInterval(this.interval)
  }

  // Render content
  render() {

    // Stall if data is not yet loaded (placeholder)
    if (!Object.entries(this.state.data).length) { return <div>Loading table...</div> }
    const data = this.state.data
    const headers = Object.keys(data[0])
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

    return   <Card fluid>
    <Card.Content>
      <Header className="cardheader" as='h3'>
        Table
      </Header>
        <Table color='blue' inverted>
          <TableHeader headers={headers} />
          <TableContents data={data} />
        </Table>
    </Card.Content>
  </Card>
  }

}

export default LastFive;

