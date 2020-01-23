import React, { Component } from 'react';
import _ from 'lodash'
import { executeFunction } from '../Functions'
import { Table, Icon } from 'semantic-ui-react'
import { Header, Card } from 'semantic-ui-react'

// Class for data handling
class ValueCache extends Component {
  constructor() {
    super();
    this.state = {
      data:{},
      column: {
        h: 'sym'
      },
      direction: null,
      sort: 0,
    }
  }

  // Call getData() function and update state with the results
  async updateState(fname) { 
    this.setState({ data: await executeFunction(fname, {}) }) 
  }

  // When component mounts, run updateState() every interval
  componentDidMount() {
    this.updateState(this.props.query)
    this.interval = setInterval(() => this.updateState(this.props.query), 1000)
  }

  // Garbage collection
  componentWillUnmount() {
    clearInterval(this.interval)
  }

  handleSort = (clickedColumn) => () => {
    const { column, direction } = this.state

    if (column !== clickedColumn.h && clickedColumn.h !== 'Change') {
      this.setState({
        column: clickedColumn.h,
        // data: _.sortBy(data, [clickedColumn.h]),
        direction: 'ascending',
      })
      return
    }
    if (clickedColumn.h !== 'Change') {
      this.setState({
        direction: direction === 'ascending' ? 'descending' : 'ascending',
      })
    }
    
  }

  sorting = (data) => {
    const { column, direction } = this.state
    if (column == 'Sym') {
      if (direction == 'ascending') {
          return _.sortBy(data, ['sym'])
      } else if (direction == 'descending') {
        return  _.sortBy(data, ['sym']).reverse()
      }

    } else if (column == 'Min Traded Price') {
      if (direction == 'ascending') {
          return _.sortBy(data, ['mintradedprice'])
      } else if (direction == 'descending') {
        return  _.sortBy(data, ['mintradedprice']).reverse()
      }

    } else if (column == 'Max Traded Price') {
      if (direction == 'ascending') {
          return _.sortBy(data, ['maxtradedprice'])
      } else if (direction == 'descending') {
        return  _.sortBy(data, ['maxtradedprice']).reverse()
      }
    }

    else if (column == 'Last Traded Price') {
      if (direction == 'ascending') {
          return _.sortBy(data, ['lasttradedprice'])
      } else if (direction == 'descending') {
        return  _.sortBy(data, ['lasttradedprice']).reverse()
      }
    } 
    else {
      return data
    }
  }

  setAsc = () => {
    return <Icon sort ascending />
  }

  // Render content
  render() {
    const { column, direction } = this.state
    const data = this.sorting(this.state.data)
    // Stall if data is not yet loaded (placeholder)
    if (!Object.entries(this.state.data).length) { 
      return <div>Loading table...</div> 
    }
    // const headers = Object.keys(data[0])
    const headers = ['Sym', 'Min Traded Price', 'Max Traded Price', 'Last Traded Price', 'Change']
    const TableHeader = (props) => {
      const header = props.headers.map((h,i) => { 
        return <Table.HeaderCell 
        key={i}
        sorted={column === {h} ? direction : null}
        onClick={this.handleSort({h})}
        >{h} { h==column  ?  direction == 'ascending' ? <Icon name='sort ascending' />: <Icon name='sort descending' />  : "" }
        </Table.HeaderCell> 
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
          'Max Traded Price': row.maxtradedprice,
          'Last Traded Price': row.lasttradedprice,
          'Change': row.change
      };
        const rowData = Object.keys(newObject).map((k,i) => { 
          return <Table.Cell key={i}><div>
            
            { (k==='Change' && newObject[k] === 1) ? <Icon color='green' name='arrow circle up' /> :
             (k==='Change' && newObject[k] === -1) ? <Icon color='red' name='arrow circle down' /> :
             (k==='Change' && newObject[k] === 0) ? <Icon color='grey' name='minus circle' /> :
             newObject[k]
              }
          
            </div></Table.Cell> 
        })
        return (
          <Table.Row  
      // className= { newObject.Change === 1 ? "increase" : newObject.Change === 0 ? "level" : "decrease" } 
          key={i}>{rowData}</Table.Row>
        )
      })
      return <Table.Body>{tableData}</Table.Body>
    }
    return <Card fluid>
      <Card.Content className="cache">
        <Header className="cardheader" as='h3'>
          Last Value Cache
        </Header>
          <Table>
            <TableHeader headers={headers} />
            <TableContents data={data} />
          </Table>
      </Card.Content>
  </Card>
  }
}

export default ValueCache;
