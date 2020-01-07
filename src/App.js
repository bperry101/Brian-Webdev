import React, {Component} from 'react'
import Data from './Data'
//import NewsFeed from './NewsFeed'

// Class containing the main body of the page
class App extends Component {
  // Character array now part of state and so can be altered
  state = {
    characters: [],
    charts: [
      {query: 'select[-5] from trade', timer: 500},
      {query: 'select[-5] from quote', timer: 1500}
    ]
  }

  // Remove character from state array based on index
  removeCharacter = (index) => {
    const { characters } = this.state

    // Filter array, only return elements where i !== index
    this.setState({
      characters: characters.filter((_c, i) => { return i !== index }),
    })
  }

  // Add new character to state array
  handleSubmit = (character) => {
    this.setState({ characters: [...this.state.characters, character] })
  }

  render() {

    // Display data as table
    return (
      <div className="container">
        <Data query={this.state.charts[0].query} />
        <Data query={this.state.charts[1].query} />
        
        {/* <NewsFeed /> */}
      </div>
    )
  }
}

export default App