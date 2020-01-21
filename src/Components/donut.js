import React, { Component } from 'react';
import Chart from 'react-apexcharts'
import { Header, Card, Table } from 'semantic-ui-react'
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
      this.interval = setInterval(() => this.updateState(this.props.query), 5000)
    }
  
    // Garbage collection
    componentWillUnmount() {
      clearInterval(this.interval)
    }

  render() {
    const data = this.state.data
    const headers = ['Sym', 'Size']
    const TableHeader = (props) => {
        const header = props.headers.map((h,i) => { 
          return <Table.HeaderCell key={i}><div>{h}</div></Table.HeaderCell> 
        })
        return <Table.Header><Table.Row>{header}</Table.Row></Table.Header>
      }
    const TableContents = (props) => {
        const rows = Object.keys(props.data.sort(function(a, b) {
          return b.size - a.size;
      }))
        const numberWithCommas = (x) => {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      };
        const tableData = rows.map((k,i) => {
          const row = props.data[k]
          const newObject= {
            'Sym': row.sym,
            'Size': numberWithCommas(row.size),
        };
          const rowData = Object.keys(newObject).map((k,i) => { 
            return <Table.Cell key={i}><div>
              {newObject[k]}
              </div></Table.Cell> 
          })
          return (
            <Table.Row key={i}>{rowData}</Table.Row>
          )
        })
        return <Table.Body>{tableData}</Table.Body>
      }
    const options= {
        labels: [],
        legend: {
            position: 'left',
            itemMargin: {
                horizontal: 5,
                vertical: 11
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
        <Card fluid>
          <Card.Content>
            <Header className="cardheader" as='h3'>
                Volume
            </Header>
            <div className="donut-container">
                <Chart className="donut-chart"
                  options={options} 
                  series={series} 
                  type="donut" 
                  width="230%" 
                />
                <Table className="donut-table">
                    <TableHeader headers={headers} />
                    <TableContents data={data} />
                </Table>
            </div>
          </Card.Content>
        </Card>
    );
  }
}
export default Donut;