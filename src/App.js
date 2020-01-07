import React, {Component} from 'react'
import Data from './Data'
import NewsFeed from './NewsFeed'

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
      <div className="container">
        <Data query={this.state.charts[0].query} />
        <Data query={this.state.charts[1].query} />
        <NewsFeed />
      </div>
    )
  }
}

export default App