import React, { Component } from 'react';
import { executeFunction } from '../Functions'
import { Table } from 'semantic-ui-react'
import { Header, Card, Modal, Button } from 'semantic-ui-react'
import './style.css'

// Class for data handling
class ValueCache extends Component {
  constructor() {
    super();
    this.state = {
      data:{},
    }
  }

  // Call getData() function and update state with the results
  async updateState(fname) { 
    this.setState({ data: await executeFunction(fname, {}) }) 
  }

  // When component mounts, run updateState() every interval
  componentDidMount() {
    this.updateState(this.props.query)
    this.interval = setInterval(() => this.updateState(this.props.query), 10000)
  }

  // Garbage collection
  componentWillUnmount() {
    clearInterval(this.interval)
  }

  // Render content
  render() {
    // Stall if data is not yet loaded (placeholder)
    if (!Object.entries(this.state.data).length) { 
      return <div>Loading table...</div> 
    }
    const data = this.state.data
    // const headers = Object.keys(data[0])
    const headers = ['Sym', 'Min Traded Price', 'Last Traded Price', 'Max Traded Price', 'Change']
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
        const newObject= {
          'Sym': row.sym,
          'Min Traded Price': row.mintradedprice,
          'Last Traded Price': row.lasttradedprice,
          'Max Traded Price': row.maxtradedprice,
          'Change': row.change
      };
        const rowData = Object.keys(newObject).map((k,i) => { 
          return <Table.Cell key={i}><div>
            {newObject[k]}
            </div></Table.Cell> 
        })
        return (
          <Table.Row   className= { newObject.Change === 1 ? "increase" : newObject.Change === 0 ? "level" : "decrease" } key={i}>{rowData}</Table.Row>
        )
      })
      return <Table.Body>{tableData}</Table.Body>
    }
    return <Card fluid>
      <Card.Content className="cache">
        <Header className="cardheader" as='h3'>
          Last Value Cache
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
