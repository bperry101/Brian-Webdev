import React, { Component } from 'react';
import { executeQuery } from '../Functions'
import { BasicTable } from  '../Components'

// Class for data handling
class Data extends Component {
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

    return <BasicTable data={data} headers={headers} />
  }

}

export default Data;