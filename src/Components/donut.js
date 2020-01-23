import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts'
import { Header, Card, Table } from 'semantic-ui-react'
import { executeFunction, sorting } from '../Functions'

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
      this.interval = setInterval(() => this.updateState(this.props.query), 1000)
    }
  
    // Garbage collection
    componentWillUnmount() {
      clearInterval(this.interval)
    }

  render() {
  //   const colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
  //   '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf']
  //   const initData = this.state.data.map((item, i) => {
  //     return {size: item.size, sym: item.sym, color:colors[i]}
  //   }
  //   )
    
  //   const data = initData.sort(function(a, b) {
  //     return b.size - a.size;
  // })
    
      const data = sorting(this.state.data);
     const series= [{
        data: data.map(item => item.size)
      }]
      const options= {
        chart: {
          type: 'bar',
        },
        plotOptions: {
          bar: {
            barHeight: '80%',
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: 'bottom'
            },
          }
        },
        colors: data.map((item) => {
          return item.color
        }),
        dataLabels: {
          enabled: true,
          textAnchor: 'start',
          style: {
            colors: ['#fff'],
            fontSize: 18
          },
          formatter: function (val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
          },
          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        xaxis: {
          categories: data.map(item => item.sym)
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        tooltip: {
          theme: 'dark',
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function () {
                return ''
              }
            }
          }
        }
      }
    return (
        <Card fluid>
          <Card.Content>
            <Header className="cardheader" as='h3'>
                Volume
            </Header>
            <div className="donut-container">
                <ReactApexChart  className="donut-chart"
                  options={options} 
                  series={series} 
                  type="bar" 
                  height= {430}
                  width="100%" 
                />
            </div>
          </Card.Content>
        </Card>
    );
  }
}
export default Donut;


