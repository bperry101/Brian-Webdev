import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Header, Card } from 'semantic-ui-react'



const AmountChart = ({ data, syms }) => {
  if (!data) { return <div>Loading chart...</div> }
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
        <ResponsiveContainer width="100%" height={255}>
          <PieChart>
            <Pie
              data={data}
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
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

export default AmountChart;
