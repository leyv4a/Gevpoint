import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
        <p>{`Dia: ${data.dia}`}</p>
        <p>{`Total Vendido: ${data.ventas}`}</p>
      </div>
    );
  }
  return null;
};


function MesVenta({data}) {
  return (
    <ResponsiveContainer width="60%" aspect={2}>
    <BarChart 
        data={data}
        width={500}
        height={300}
        margin={{
            top:5,
            right:30,
            left:20,
            bottom:5
        }}
    >
    {/* <CartesianGrid strokeDasharray="4 1 2" />     */}
    <XAxis dataKey="dia"/>
        <YAxis />
        <Tooltip content={CustomTooltip} />
        <Legend />
        <Bar dataKey="ventas" fill="#791682ff"/>
        </BarChart>
    </ResponsiveContainer>
  )
}

export default MesVenta