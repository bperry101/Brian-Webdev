import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { Header, Card, Button } from 'semantic-ui-react';
import { executeFunction, changeDate } from '../Functions'


class Timeseries extends Component {

    
        constructor(props) {
            var dateArr = changeDate();
            super(props);
          this.state = {
            dateArr: dateArr,
            rdbdata:[],
            hdbdata:[],
            totalData:[],
            series: [{
            }],
            options: {
              stacked: true,
              legend: {
                itemMargin: {
                    vertical: 30
                },
                position: 'bottom',
                horizontalAlign: 'center'
              },
              chart: {
                type: 'area',
                height: 350
              },
              colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
                 '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'],
              annotations: {
                yaxis: [{
                  y: 30,
                  borderColor: '#999',
                  label: {
                    show: true,
                    // text: 'Support',
                    style: {
                      color: "#fff",
                      background: '#00E396'
                    }
                  }
                }],
                xaxis: [{
                  borderColor: '#999',
                  yAxisIndex: 0,
                  label: {
                    show: true,
                    text: 'Rally',
                    style: {
                      color: "#fff",
                      background: '#775DD0'
                    }
                  }
                }]
              },
              dataLabels: {
                enabled: false
              },
              markers: {
                size: 0,
                style: 'hollow',
              },
              xaxis: {
                tooltip: {
                    enabled:false,
                    },
                type: 'datetime',
                min: dateArr[3],
              },
              fill: {
                type: 'gradient',
                gradient: {
                  shadeIntensity: 0,
                  opacityFrom: 0.3,
                  opacityTo: 0.4,
                }
              },
            },
            selection: 'three_days',
          };
        }
            

    // Call getData() function and update state with the results
    async updateState(rdb, hdb) { 
        this.setState({ rdbdata: await executeFunction(rdb, {}) }) 
        this.setState({ hdbdata: await executeFunction(hdb, {}) }) 
        const rdbData = this.state.rdbdata
        this.setState({ totalData: this.state.hdbdata.map((row, i) => {
            const priceArray = rdbData[i].price
            const timeArray = rdbData[i].time
            row.price = row.price.concat(priceArray)
            row.time = row.time.concat(timeArray)
            return row
        })
    })
      }
    
        // joinData() {
            
        //     const rdbData = this.state.rdbdata
        //     this.setState({ totalData: this.state.hdbdata.map((row, i) => {
        //         const priceArray = rdbData[i].price
        //         const timeArray = rdbData[i].time
        //         row.price = row.price.concat(priceArray)
        //         row.time = row.time.concat(timeArray)
        //         return row
        //     })
        // })
        // }
    
      // When component mounts, run updateState() every interval
      componentDidMount() {
        // this.setState.changeDate()
        this.updateState(this.props.rdbquery, this.props.hdbquery)
        this.interval = setInterval(() => this.updateState(this.props.rdbquery, this.props.hdbquery), 300000)
      }
    
      // Garbage collection
      componentWillUnmount() {
        clearInterval(this.interval)
      }
    

      
        updateData (timeline) {
          this.setState({
            selection: timeline
          })
        
          switch (timeline) {
            case 'one_day':
              this.setState({
                options: {
                  xaxis: {
                    min: this.state.dateArr[1],
                  }
                }
              })
              break;
            case 'two_days':
              this.setState({
                options: {
                  xaxis: {
                    min: this.state.dateArr[2],
                  }
                }
              })
              break;
            case 'three_days':
              this.setState({
                options: {
                  xaxis: {
                    min: this.state.dateArr[3],
                  }
                }
              })
              break;
            default:
        
          }
        }
 
        render() {
            const graphData = this.state.totalData.map(row => {
                let name = row.sym
                let data = row.time.map((item, i) => [item, row.price[i]] )
                return {name: name, data: data}
            })
          return (
            <div className="timeseries">
            <Card fluid>
              <Card.Content>
                <Header className="cardheader" as='h3'>
                Current Price
                </Header>
                <div id="chart">
                    <div className="toolbar">
                        <Button id="one_day" 
                            onClick={()=>this.updateData('one_day')} className={ (this.state.selection==='one_day' ? 'active' : '')}>        
                            1 Day
                        </Button>
                        &nbsp;
                        <Button id="two_days"
                            onClick={()=>this.updateData('two_days')} className={ (this.state.selection==='two_days' ? 'active' : '')}>
                        2 Days
                        </Button>
                        &nbsp;
                        <Button id="three_days"
                            onClick={()=>this.updateData('three_days')} className={ (this.state.selection==='three_days' ? 'active' : '')}>
                        3 Days
                        </Button>
                        &nbsp;
                    </div>
                    <div id="chart-timeline">
                    <Chart options={this.state.options} series={graphData} type="area" height={350} />
                    </div>
                </div>
            </Card.Content>
        </Card>
    </div>
    );
  }
}
export default Timeseries;