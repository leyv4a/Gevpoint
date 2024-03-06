import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
          <p>{`Producto: ${data.dia}`}</p>
          <p>{`Total Vendido: ${data.ventas}`}</p>
        </div>
      );
    }
    return null;
  };



function MesVentaLine({data}) {
  return (
    <ResponsiveContainer  width="50%" aspect={2}>
    <LineChart
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="dia" />
      <YAxis />
      <Tooltip content={CustomTooltip}/>
      <Legend />
      <Line type="monotone" dataKey="ventas" stroke="#8884d8"  />
    </LineChart>
  </ResponsiveContainer>
  )
}

export default MesVentaLine