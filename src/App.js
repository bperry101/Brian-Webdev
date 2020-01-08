import React, {Component} from 'react'
import { Data, NewsFeed, ButtonTest, SidebarTest, Topbar } from './Components'

// Class containing the main body of the page
class App extends Component {
  // Character array now part of state and so can be altered
  state = {
    charts: [
      {query: 'select[-5] from trade', timer: 500},
      {query: 'select[-5] from quote', timer: 1500}
    ]
  }

  render() {

    // Display data as table
    return (
      <div>
        <Topbar />
        <div className="ui grid">
          <div className='row'>
            <div className='column six wide'>
              <Data query={this.state.charts[0].query} />
            </div>
            <div className='column six wide'>
              <Data query={this.state.charts[1].query} />
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