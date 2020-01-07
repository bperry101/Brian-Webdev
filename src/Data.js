import React, { Component } from 'react';

// Define header content
const TableHeader = (props) => {
  const header = props.headers.map((h,i) => { return <th key={i}>{h}</th> })
  return <thead><tr>{header}</tr></thead>
}

// Parse query contents into table
const BasicTable = (props) => {
  const rows = Object.keys(props.data)
  const tableData = rows.map((k,i) => {
    const row = props.data[k]
    const rowData = Object.keys(row).map((k,i) => { return <td key={i}>{row[k]}</td> })
    return (
      <tr key={i}>{rowData}</tr>
    )
  })

return <tbody>{tableData}</tbody>
}

// Class for data handling
class Data extends Component {
  constructor() {
    super();
    this.state = {
      data:{},
    }
  }

  // Fetch data from KDB instance
  async getData(kdbQuery) {
    // Define url, kdb params and http params
    const url = 'https://192.168.1.26:8090/executeQuery'
    const kdbParams = {
      query: kdbQuery,
      response: true,
      type: 'sync'
    }
    const httpParams = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Basic '.concat(btoa('user:pass'))  // Basic dXNlcjpwYXNz
      },
      body: JSON.stringify(kdbParams),
    }

    // Fetch data from server
    const response = await fetch(url,httpParams)
    const queryData = await response.json()

    this.setState({ data: queryData.result })
  }

  // When component mounts, run getData() every interval
  componentDidMount() {
    this.interval = setInterval(() => this.getData(this.props.query), 5000)
  }

  // Garbage collection
  componentWillUnmount() {
    clearInterval(this.interval)
  }

  // Render content
  render() {

    // Stall if data is not yet loaded
    if (!Object.entries(this.state.data).length) { return <div>Loading table...</div> }

    const data = this.state.data
    const headers = Object.keys(data[0])

    return(
      <table>
        <TableHeader headers={headers} />
        <BasicTable data={data} />
      </table>
    )
  }

}

export default Data;