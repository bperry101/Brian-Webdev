import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

const Chart = ({ data, syms }) => {
  
  // Stall if data is not yet loaded (placeholder)  <MakeLines syms={props.syms} />
  if (!data) { return <div>Loading chart...</div> }

  const colours = ['#1abc9c', '#f1c40f', '#d35400', '#3498db', '#c0392b', 
                   '#8e44ad', '#2c3e50', '#7f8c8d', '#f39c12', '#16a085']
  const pairs = syms.map((s,i) => {return {sym: s, colour: colours[i]}})
  const lines = pairs.map((p,i) => 
    <Line type="monotone" dataKey={p.sym} stroke={p.colour} strokeWidth="3" key={i} />
    )

  return (
  <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>    
    {lines}
    <CartesianGrid stroke="#ccc" strokeDasharray='5 5' />
    <XAxis dataKey="time.i" />
    <YAxis />
    <Tooltip />
  </LineChart>
)}

export default Chart;