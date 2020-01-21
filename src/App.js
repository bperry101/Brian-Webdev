import React, { Component } from 'react'
import { NewsFeed, ValueCache, AveragePrice, Donut, Timeseries, Volatility } from './Components'
import { executeFunction } from './Functions'
import 'semantic-ui-css/semantic.min.css';
import { Grid, Menu, Dropdown, Image } from 'semantic-ui-react'
import './Components/style.css'
import logo from './Images/datascapelogo.png'

// Class containing the main body of the page
class App extends Component {
  // Character array now part of state and so can be altered
  state = {
    selectedSyms: [],
    activeIndex: 0,
    functions: [
      'maxminfunc',
      'volumefunc',
      'distinctsymfunc',
      'summarytable',
      'todayvolatilityfunc',
      'currenttime2',
      'average',
      'currenttime1',
      'volatilityfunc'
    ],
    syms: []
  }

  // Fetch list of syms (needs to be separate function because it is async)
  async getSyms() {
    const syms = await executeFunction('distinctsymfunc', {})
    const stateOptions = syms.map(item => ({
      key: item.sym,
      text: item.sym,
      value: item.sym,
    }))
    var selectedSyms = syms.map(item => item.sym)
    this.setState({
      stateOptions,
      selectedSyms
    })

  }



  // When component mounts get all distinct syms in the trade table
  componentDidMount() {
    this.getSyms()
  }

  handleChange = (e, { value }) => {
    this.setState({
      selectedSyms: value.sort()
    })
  }

  render() {
    // var selectedSyms= this.state.selectedSyms

    if (!this.state.selectedSyms.length) { return <div>Loading table...</div> }
    return (
      <div className="dashboard">
        <Menu className='fixHeight' size='massive' inverted fluid>
          <Image src={logo} size='tiny' />
          <Dropdown
            multiple search selection fluid
            placeholder='Select Syms'
            onChange={this.handleChange.bind(this)}
            options={this.state.stateOptions}
            defaultValue={this.state.selectedSyms}
          />
        </Menu>
        <Grid padded>
          <Grid.Row className="charts">
            <Grid.Column width={10}>
              < Donut query={this.state.functions[1]} selectedSyms={this.state.selectedSyms} />
            </Grid.Column>
            <Grid.Column width={6}>
              <ValueCache query={this.state.functions[3]} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row className="table">
            <Grid.Column width={7}>
              <AveragePrice query={this.state.functions[6]} syms={this.state.functions[2]} selectedSyms={this.state.selectedSyms} />
            </Grid.Column>
            <Grid.Column width={9}>
              <Timeseries hdbquery={this.state.functions[7]} rdbquery={this.state.functions[5]} selectedSyms={this.state.selectedSyms} />
            </Grid.Column>

          </Grid.Row>

          {/* <Grid.Row className="charts">
            <Grid.Column width={16}>
              <AveragePrice query={this.state.functions[6]} syms={this.state.functions[2]} />
            </Grid.Column>
          </Grid.Row> */}

          <Grid.Row className="table">
            <Grid.Column width={16}>
              <Volatility hdbquery={this.state.functions[8]} rdbquery={this.state.functions[4]} selectedSyms={this.state.selectedSyms} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row className="news">
            <Grid.Column width={16}>
              <NewsFeed />
            </Grid.Column>
          </Grid.Row>

        </Grid>
      </div>
    )
  }
}

export default App 