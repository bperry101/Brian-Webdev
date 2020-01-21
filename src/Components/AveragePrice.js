import React, { Component } from 'react';
import { executeFunction } from '../Functions'
import { Header, Card } from 'semantic-ui-react'
import Chart from "react-apexcharts";
import ModalBox from './modal';

// Class for data handling
class AveragePrice extends Component {
    constructor() {
      super();
      this.state = {
        data: executeFunction('currenttime2', {}),
      }
    }
  
    // Call getData() function and update state with the results
    async updateState(fname) { 
      this.setState({ data: await executeFunction(fname, {}) }) 
    }
  
    // When component mounts, run updateState() every interval
    componentDidMount() {
      this.updateState(this.props.query)
      this.interval = setInterval(() => this.updateState(this.props.query), 3000000)
    }
  
    // Garbage collection
    componentWillUnmount() {
      clearInterval(this.interval)
    }
  
    // Render content
    render() {
      if (!Object.entries(this.state.data).length) { return <div>Loading table...</div> }
    const prices = []
    this.state.data.map(item => {
      if (this.props.selectedSyms.includes(item.sym)) {
        prices.push({name: item.sym, data:item.average})
      }
    })
    const series = prices
    const chartOptions = {
      colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
      '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'],
      dataLabels: {
        enabled: false
      },
      legend:{
        itemMargin: {
          vertical: 30
        } 
      },
      stroke: {
        curve: 'straight'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
       xaxis: {
        type: 'datetime',
        categories: this.state.data[0].time,
      }
    }  
 
    return <Card fluid>
    <Card.Content>
      <Header className="cardheader" as='h3'>
        Average Price
      </Header>
        <Chart
          options={chartOptions}
          series={series}
          type="line"
          height="350px"
          width="100%"
          className="average"
          />
        <ModalBox content={<Chart
          options={chartOptions}
          series={series}
          type="line"
          height="700px"
          width="100%"
          className="average"
          />}
          title={<Header as='h3'>Average Price</Header>} />
    </Card.Content>
  </Card>
  }
}

export default AveragePrice;




