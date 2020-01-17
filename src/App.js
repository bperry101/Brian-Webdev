import React, {Component} from 'react'
import { LastFive, LineChart, NewsFeed, PieChart, ValueCache, CurrentPrice, AveragePrice, Donut, Timeseries } from './Components'
import { executeFunction } from './Functions'
import 'semantic-ui-css/semantic.min.css';
import { Grid, Menu, Dropdown,activeItem } from 'semantic-ui-react'
import './Components/style.css'

// Class containing the main body of the page
class App extends Component {
  // Character array now part of state and so can be altered
  state = {
    selectedSyms: [],
    activeIndex: 0 ,
    functions: [
      'maxminfunc',
      'volumefunc',
      'distinctsymfunc',
      'summarytable',
      'todayvolatilityfunc',
      'currenttime2',
      'average'
    ],
    syms: []
  }

  // Fetch list of syms (needs to be separate function because it is async)
  async getSyms() {
    this.setState({ syms: await executeFunction('distinctsymfunc', {}) })
  }



  // When component mounts get all distinct syms in the trade table
  componentDidMount() {
    this.getSyms()
  }

  render() {
    const stateOptions = this.state.syms.map(item => ({
      key: item.sym,
      text: item.sym,
      value: item.sym,
      }))
    // var selectedSyms= this.state.selectedSyms
    const handleChange = (e, {value}) => {
      selectedSyms = value
    }
    var selectedSyms = this.state.syms.map(item => (
      item.sym
      ))
    if (!selectedSyms.length) { return <div>Loading table...</div> }
    return (
      <div className="dashboard">
      <Menu className='fixHeight' size='massive' color={'blue'} inverted fluid>
        <Menu.Item header>Our Company</Menu.Item>
        <Dropdown
          multiple search selection fluid
          placeholder='State'
          onChange={handleChange.bind(this)}
          options={stateOptions}
          defaultValue={selectedSyms}
          style= { {color:'red'}} 
        />
      </Menu>
        <Grid padded>
          <Grid.Row className="charts">
            <Grid.Column width={10}>
              < Donut query={this.state.functions[1]} />
            </Grid.Column>
            <Grid.Column width={6}>
              <ValueCache query={this.state.functions[3]} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row className="table">
            <Grid.Column width={16}> 
              <Timeseries query={this.state.functions[5]} selectedSyms={selectedSyms} />
              {/* <CurrentPrice query={this.state.functions[5]} selectedSyms={selectedSyms} /> */}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row className="charts">
            <Grid.Column width={16}>
              <AveragePrice query={this.state.functions[6]} syms={this.state.functions[2]} />
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