import React, {Component} from 'react'
import { NewsFeed, ValueCache, AveragePrice, Donut, Timeseries, Volatility } from './Components'
import { executeFunction } from './Functions'
import 'semantic-ui-css/semantic.min.css';
import { Grid, Menu, Dropdown,Image } from 'semantic-ui-react'
import './Components/style.css'
import logo from './Images/datascape.png'

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
      'average',
      'currenttime1',
      'volatilityfunc'
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
      const labelOptions = this.state.syms.map(item => ({
        className: item.sym,
        }))
    // var selectedSyms= this.state.selectedSyms
    const handleChange = (e, {value}) => {
      selectedSyms = value
      console.log(selectedSyms)
    }
    var selectedSyms = this.state.syms.map(item => (
      item.sym
      ))
    if (!selectedSyms.length) { return <div>Loading table...</div> }
    return (
      <div className="dashboard">
      <Menu className='fixHeight' size='massive' color={'blue'} inverted fluid>
      <Image src={logo} size='small' />
        <Dropdown
          multiple search selection fluid
          placeholder='Select Syms'
          onChange={handleChange.bind(this)}
          options={stateOptions}
          defaultValue={selectedSyms}
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
          <Grid.Column width={7}>
              <AveragePrice query={this.state.functions[6]} syms={this.state.functions[2]} />
            </Grid.Column>
            <Grid.Column width={9}> 
              <Timeseries hdbquery={this.state.functions[7]} rdbquery={this.state.functions[5]} selectedSyms={selectedSyms} />
            </Grid.Column>
            
          </Grid.Row>

          {/* <Grid.Row className="charts">
            <Grid.Column width={16}>
              <AveragePrice query={this.state.functions[6]} syms={this.state.functions[2]} />
            </Grid.Column>
          </Grid.Row> */}

          <Grid.Row className="table">
            <Grid.Column width={16}> 
              <Volatility hdbquery={this.state.functions[8]} rdbquery={this.state.functions[4]} selectedSyms={selectedSyms} />
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