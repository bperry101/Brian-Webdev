import React, {Component} from 'react'
import { LastFive, Topbar, LineChart, NewsFeed, PieChart, ValueCache } from './Components'
import { executeQuery, executeFunction } from './Functions'
import 'semantic-ui-css/semantic.min.css';
import { Grid } from 'semantic-ui-react'
import './Components/style.css'

// Class containing the main body of the page
class App extends Component {
  // Character array now part of state and so can be altered
  state = {
    charts: [
      {query: 'select max price by sym, 60 xbar time.minute from trade'},
      {query: 'select[-5] from trade'},
      {query: 'exec distinct sym from trade'},
      {query: 'select maxAsk:max ask by sym from quote'},
      {query: 'select last price, last change by sym from update change:signum deltas price by sym from trade'}
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

  async getAmount() {
    const symQuery = 'desc select sum size by sym from trade'
    this.setState({ amounts: await executeQuery(symQuery) })
  }

  // When component mounts get all distinct syms in the trade table
  componentDidMount() {
    this.getSyms()
    this.getthing()
    this.getAmount()
  }

  render() {
    // Stall if symlist hasn't been fetched (use semantic Placeholder?)
    if (!Object.entries(this.state.syms).length) { return <div>Loading data...</div> }
    console.log(this.state.amounts)
    return (
      <div className="dashboard">
        <Topbar data={this.state.syms} />
        <Grid padded>
          <Grid.Row className="charts">
            <Grid.Column width={10}>
              <LineChart data={this.state.thing} syms={this.state.syms} />
            </Grid.Column>
            <Grid.Column width={6}>
            <ValueCache query={this.state.charts[4].query} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="table">
            <Grid.Column width={10}>
              <LastFive query={this.state.charts[1].query} />
            </Grid.Column>
            <Grid.Column width={6}>
              <PieChart data={this.state.amounts} syms={this.state.syms} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row className="news">
            <Grid.Column width={16}>
              <NewsFeed/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>   
    )
  }
}

export default App