import React, {Component} from 'react'
import { Data, NewsFeed, ButtonTest, Topbar, Chart } from './Components'
import { executeQuery, executeFunction } from './Functions'

// Class containing the main body of the page
class App extends Component {
  // Character array now part of state and so can be altered
  state = {
    charts: [
      {query: 'select max price by sym, 60 xbar time.minute from trade'},
      {query: 'select[-5] from trade'},
      {query: 'exec distinct sym from trade'},
      {query: 'select maxAsk:max ask by sym from quote'}
    ],
    syms: []
  }

  // Fetch list of syms (needs to be separate function because it is async)
  async getSyms() {
    const symQuery = 'exec distinct sym from trade'
    this.setState({ syms: await executeQuery(symQuery) })
  }

  async getthing() {
    this.setState({ thing: await executeFunction('piv', {}) })
  }

  // When component mounts get all distinct syms in the trade table
  componentDidMount() {
    this.getSyms()
    this.getthing()
  }

  render() {

    // Stall if symlist hasn't been fetched (use semantic Placeholder?)
    if (!Object.entries(this.state.syms).length) { return <div>Loading data...</div> }

    // Display data as table
    return (
      <div>
        {/*  Create top bar */}
        <Topbar data={this.state.syms} />
        {/*  Lay out data in a 16x16 grid */}
        <div className="ui grid">
          <div className='row'>
            <div className='column six wide'>
              <Data query={this.state.charts[1].query} />
            </div>
          </div>
          {/* 
          <div className='row'>
            <div className='column six wide' >
              <Data query={this.state.charts[2].query} />
            </div>
            <div className='column six wide' >
              <Data query={this.state.charts[3].query} />
            </div>
          </div>  
          */}
          <div className='row'>
            <div className='column eight wide'>
              <Chart data={this.state.thing} syms={this.state.syms} />
            </div>
          </div>
          <div className='row'><ButtonTest /></div>
          <div className='row'>
            <div className='column sixteen wide'><NewsFeed /></div>          
          </div>
        </div>
      </div>
    )
  }
}

export default App