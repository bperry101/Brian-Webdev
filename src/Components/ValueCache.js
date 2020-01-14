import React, { Component } from 'react';
import { executeQuery } from '../Functions'
import { Table } from 'semantic-ui-react'
import { Header, Card, Modal, Button } from 'semantic-ui-react'

// Class for data handling
class ValueCache extends Component {
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
    console.log(this.props.query)
    this.interval = setInterval(() => this.updateState(this.props.query), 100)
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
          return <Table.Cell key={i}><div>
            {k === "price" ?
            (Math.round(row[k] * 100) / 100).toFixed(2) :
            row[k] 
            }
            </div></Table.Cell> 
        })
        return (
          <Table.Row   className= { row.change === 1 ? "increase" : row.change === 0 ? "level" : "decrease" } key={i}>{rowData}</Table.Row>
        )
      })
      return <Table.Body>{tableData}</Table.Body>
    }
    return <Card fluid>
      <Card.Content>
        <Header className="cardheader" as='h3'>
          Table
        </Header>
          <Table inverted>
            <TableHeader headers={headers} />
            <TableContents data={data} />
          </Table>
      </Card.Content>
  </Card>
  }

}

export default ValueCache;

