import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react'

export default class SymSelect extends Component {
  state = { 
    selected: ["HPQ", "GOOG", "DELL", "AAPL", "AMD", "IBM", "DOW", "MSFT", "AIG", "INTC"],
    activeIndex: 0 
  }
  render() {
    const stateOptions = this.props.syms.map(item => ({
      key: item.sym,
      text: item.sym,
      value: item.sym,
      }))
    var selectedSyms= this.state.selected
    const handleChange = (e, {value}) => {
      selectedSyms = value
    }
    return (
      <Dropdown
      multiple search selection fluid
      placeholder='State'
      onChange={handleChange.bind(this)}
      options={stateOptions}
      defaultValue={selectedSyms}
      />
    )
  }
}

