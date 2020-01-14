import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { Header, Card } from 'semantic-ui-react'

const PriceChart = ({ data, syms }) => {
  
  // Stall if data is not yet loaded (placeholder)  <MakeLines syms={props.syms} />
  if (!data) { return <div>Loading chart...</div> }
  const colours = [
    '#1abc9c', '#f1c40f', '#d35400', '#3498db', '#c0392b', 
    '#8e44ad', '#2c3e50', '#7f8c8d', '#f39c12', '#16a085'
  ]
  const pairs = syms.map((s,i) => {return {sym: s, colour: colours[i]}})
  const lines = pairs.map((p,i) => 
    <Line type="monotone" dataKey={p.sym} stroke={p.colour} strokeWidth="3" key={i} />
  )
  return (
  <Card fluid>
    <Card.Content>
      <Header className="cardheader" as='h3'>
        Line Chart
      </Header>
      <ResponsiveContainer width="100%" height={465}>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>    
          {lines}
          <CartesianGrid stroke="#ccc" strokeDasharray='5 5' />
          <XAxis dataKey="time.i" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </Card.Content>
  </Card>
)}

export default PriceChart;