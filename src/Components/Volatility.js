import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import { Header, Card, Button } from 'semantic-ui-react';
import { executeFunction, volDates } from '../Functions';
import ModalBox from './modal';

class Volatility extends Component {

    
        constructor(props) {
            var dateArr = volDates();
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
                max: dateArr[0],
                min: dateArr[dateArr.length - 1],
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
            selection: 'four_weeks',
          };
        }
            

    // Call getData() function and update state with the results
    async updateState(rdb, hdb) { 
        this.setState({ rdbdata: await executeFunction(rdb, {}) }) 
        this.setState({ hdbdata: await executeFunction(hdb, {}) }) 
        const rdbData = this.state.rdbdata
        this.setState({ totalData: this.state.hdbdata.map((row, i) => {
            const priceArray = rdbData[i].volatility
            const timeArray = rdbData[i].time
            row.volatility = row.volatility.concat(priceArray)
            row.time = row.time.concat(timeArray)
            return row
        })
    })
      }
    
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
                    max: this.state.dateArr[0],
                  }
                }
              })
              break;
            case 'one_week':
              this.setState({
                options: {
                  xaxis: {
                    min: this.state.dateArr[2],
                    max: this.state.dateArr[0],
                  }
                }
              })
              break;
            case 'four_weeks':
              this.setState({
                options: {
                  xaxis: {
                    min: this.state.dateArr[5],
                    max: this.state.dateArr[0],
                  }
                }
              })
              break;
            default:
        
          }
        }
 
        render() {
          const graphData = []
          this.state.totalData.map(row => {
           if (this.props.selectedSyms.includes(row.sym)) {
             let name = row.sym
             let data = row.time.map((item, i) => [item, row.volatility[i]] )
             graphData.push ({name: name, data: data})
           }
         })
          return (
            <div className="timeseries">
            <Card fluid>
              <Card.Content>
                <Header className="cardheader" as='h3'>
                Volatility
                </Header>
                <div id="chart">
                    <div className="toolbar">
                        <Button id="one_day" 
                            onClick={()=>this.updateData('one_day')} className={ (this.state.selection==='one_day' ? 'active' : '')}>        
                            Yesterday
                        </Button>
                        &nbsp;
                        <Button id="one_week"
                            onClick={()=>this.updateData('one_week')} className={ (this.state.selection==='one_week' ? 'active' : '')}>
                        1 Week
                        </Button>
                        &nbsp;
                        <Button id="four_weeks"
                            onClick={()=>this.updateData('four_weeks')} className={ (this.state.selection==='four_weeks' ? 'active' : '')}>
                        4 Weeks
                        </Button>
                        &nbsp;
                    </div>
                    <div id="chart-timeline">
                    <Chart options={this.state.options} series={graphData} type="area" height={350} />
                    </div>

                    
                </div>
                <ModalBox content={<div id="chart">
                    <div className="toolbar">
                        <Button id="one_day" 
                            onClick={()=>this.updateData('one_day')} className={ (this.state.selection==='one_day' ? 'active' : '')}>        
                            Yesterday
                        </Button>
                        &nbsp;
                        <Button id="one_week"
                            onClick={()=>this.updateData('one_week')} className={ (this.state.selection==='one_week' ? 'active' : '')}>
                        1 Week
                        </Button>
                        &nbsp;
                        <Button id="four_weeks"
                            onClick={()=>this.updateData('four_weeks')} className={ (this.state.selection==='four_weeks' ? 'active' : '')}>
                        4 Weeks
                        </Button>
                        &nbsp;
                    </div>
                    <div id="chart-timeline">
                    <Chart options={this.state.options} series={graphData} type="area" height={700} />
                    </div>

                    
                </div>}
                title={<Header as='h3'>Volatility</Header>} />
            </Card.Content>
        </Card>
    </div>
    );
  }
}
export default Volatility;