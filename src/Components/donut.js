import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import { Header, Card } from 'semantic-ui-react'
import { executeFunction } from '../Functions'



class Donut extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data:[]
        }
      }
  
    // Call getData() function and update state with the results
    async updateState(fname) { 
      this.setState({ data: await executeFunction(fname, {}) }) 
    }
  
    // When component mounts, run updateState() every interval
    componentDidMount() {
      this.updateState(this.props.query)
      this.interval = setInterval(() => this.updateState(this.props.query), 15000)
    }
  
    // Garbage collection
    componentWillUnmount() {
      clearInterval(this.interval)
    }
  
    // Render content

  render() {
    const options= {
        labels: [],
        legend: {
            itemMargin: {
                horizontal: 5,
                vertical: 9
            },
        },
        colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
                 '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf']
      }
    const series= []
    this.state.data.map(item => (
       options.labels.push(item.sym)
        ))
        this.state.data.map(item => (
            series.push(item.size)
        ))
    return (
      <div className="donut">
        <Card fluid>
          <Card.Content>
            <Header className="cardheader" as='h3'>
            Volume
            </Header>
              <Chart 
              options={options} 
              series={series} 
              type="donut" 
              width="500" 
              />
          </Card.Content>
        </Card>
      </div>
    );
  }
}
export default Donut;