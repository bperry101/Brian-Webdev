import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { Header, Card, Button } from 'semantic-ui-react';
import { executeFunction } from '../Functions'
import changeDate from './changeDate'


class Timeseries extends Component {

    
        constructor(props) {
            var dateArr = changeDate();
            // var timeArr = [];
            // var priceArr = [];
            // var newArr = [];
            // const dataGen = () => {
            
            //   var firstDate = new Date('14 Jan 2020').getTime();
            //   var lastDate = new Date('17 Jan 2020').getTime();
            //   var sep = (lastDate - firstDate) / 200;
            
            //   var i = 0;
            //   for (i=firstDate; i<lastDate; i+=sep) {
            //     timeArr.push(i);
            //   }
            
            //   var i = 0;
            //   for (i=0; i<timeArr.length; i++) {
            //     priceArr.push( Math.random() * 100 );
            //   }
            
            //   var i = 0;
            //   for (i=0; i<timeArr.length; i++) {
            //     newArr.push( [ timeArr[i], priceArr[i] ] );
            //   }
            
              
            // }
            
            
            // dataGen();
            // console.log(timeArr)
            // console.log(priceArr)
            // console.log(newArr)
            super(props);
          this.state = {
            dateArr: dateArr,
            data:[],
            series: [{
            //   data: newArr
            }],
            options: {
              stacked: true,
              legend: {
                position: 'top',
                horizontalAlign: 'left'
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
                  x: dateArr[0],
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
                type: 'datetime',
                min: dateArr[3],
                max: dateArr[0],
                // tickAmount: 6,
              },
              tooltip: {
                x: {
                  format: 'dd MMM yyyy'
                }
              },
              fill: {
                type: 'gradient',
                gradient: {
                  shadeIntensity: 1,
                  opacityFrom: 0.7,
                  opacityTo: 0.9,
                  stops: [0, 100]
                }
              },
            },
          
          
            selection: 'three_days',
          
          };
        }
            

            // Call getData() function and update state with the results
    async updateState(fname) { 
        this.setState({ data: await executeFunction(fname, {}) }) 
      }
    
      // When component mounts, run updateState() every interval
      componentDidMount() {
        // this.setState.changeDate()
        this.updateState(this.props.query)
        this.interval = setInterval(() => this.updateState(this.props.query), 15000)
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
                    max: this.state.dateArr[0],
                  }
                }
              })
              break;
            case 'two_days':
              this.setState({
                options: {
                  xaxis: {
                    min: this.state.dateArr[2],
                    max: this.state.dateArr[0],
                  }
                }
              })
              break;
            case 'three_days':
              this.setState({
                options: {
                  xaxis: {
                    min: this.state.dateArr[3],
                    max: this.state.dateArr[0],
                  }
                }
              })
              break;
            case 'all':
              this.setState({
                options: {
                  xaxis: {
                    min: undefined,
                    max: undefined,
                  }
                }
              })
              break;
            default:
        
          }
        }
        
        render() {
            const graphData = this.state.data.map(row => {
                let name = row.sym
                let data = row.time.map((item, i) => [item, row.price[i]] )
                return {name: name, data: data}
            })


            const prices = []
    this.state.data.map((item, i) => {
        prices.push({name: item.sym, data:[item.time,item.price]})
            })
            console.log(this.state.dateArr)
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
                            1D
                        </Button>
                        &nbsp;
                        <Button id="two_days"
                            onClick={()=>this.updateData('two_days')} className={ (this.state.selection==='two_days' ? 'active' : '')}>
                        2D
                        </Button>
                        &nbsp;
                        <Button id="three_days"
                            onClick={()=>this.updateData('three_days')} className={ (this.state.selection==='three_days' ? 'active' : '')}>
                        3D
                        </Button>
                        &nbsp;
                        <Button id="ytd"
                            onClick={()=>this.updateData('all')} className={ (this.state.selection==='all' ? 'active' : '')}>
                        ALL
                        </Button>
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