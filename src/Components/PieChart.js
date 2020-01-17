import React, { Component } from 'react';
import { executeFunction } from '../Functions'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Header, Card } from 'semantic-ui-react'


class AmountChart extends Component {
  constructor() {
    super();
    this.state = {
      data:{},
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
    if (!Object.entries(this.state.data).length) { return <div>Loading table...</div> }
  const data = this.state.data
  const COLORS = [
    '#1abc9c', '#f1c40f', '#d35400', '#3498db', '#c0392b', 
    '#8e44ad', '#2c3e50', '#7f8c8d', '#f39c12', '#16a085'
  ];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx, cy, midAngle, outerRadius, percent,
  }) => {
    const x = cx + (outerRadius - 30) * Math.cos(-midAngle * RADIAN)- 10;
    const y = cy + (outerRadius - 30) * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="black"  dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const numberWithCommas = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <Card fluid>
      <Card.Content>
        <Header className="cardheader" as='h3'>
          Pie Chart
        </Header>
        <ResponsiveContainer width="100%" height={465}>
          <PieChart>
            <Pie
              data={data}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={180}
              dataKey="size"
              value={data.sym}
            >
              {
                data.map((item,index) => <Cell fill={COLORS[index % COLORS.length]}key={index} />)
              }
            </Pie>
            <Legend align="right" layout="vertical" verticalAlign="middle" payload={
              data.map(
                (item, index) => ({
                    id: item.sym,
                    color: COLORS[index % COLORS.length],
                    value: `${item.sym} (${numberWithCommas(item.size)})`,
                })
              )
            }  />
          </PieChart>
        </ResponsiveContainer>
      </Card.Content>
    </Card>
    );
  }
}

export default AmountChart;
