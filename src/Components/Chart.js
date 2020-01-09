import React from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts'

const data = [
  {name: '0', uv: 400, pv: 2400, amt: 2400},
  {name: '1', uv: 500, pv: 2410, amt: 2400},
  {name: '2', uv: 478, pv: 2120, amt: 2400},
  {name: '3', uv: 451, pv: 2250, amt: 2400},
  {name: '4', uv: 422, pv: 2450, amt: 2400}
]

const Chart = (props) => {
  
  return (
  <LineChart width={600} height={300} data={props.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
    <Line type="monotone" dataKey="uv" stroke="#8884d8" strokeWidth="3" />
    <Line type="monotone" dataKey="pv" stroke="#82ca9d" strokeWidth="3" />
    <CartesianGrid stroke="#ccc" strokeDasharray='5 5' />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
  </LineChart>
)}

export default Chart;