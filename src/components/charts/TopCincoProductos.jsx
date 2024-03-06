import React from 'react'
import { PieChart, ResponsiveContainer, Pie, Tooltip, Legend } from 'recharts';


const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
          <p>{`Producto: ${data.Producto}`}</p>
          <p>{`Total Vendido: ${data.TotalVendidoMes}`}</p>
        </div>
      );
    }
    return null;
  };

  const data02 = [
    { name: 'Group A', value: 2400 },
    { name: 'Group B', value: 4567 },
    { name: 'Group C', value: 1398 },
    { name: 'Group D', value: 9800 },
    { name: 'Group E', value: 3908 },
    { name: 'Group F', value: 4800 },
  ];


function TopCincoProductos({data}) {

    
  return (
    <div className='' style={{ width: '100%', height: '40%'}}>
    <ResponsiveContainer >
        <PieChart >
           <Pie
            dataKey="TotalVendidoMes"
            data={data}
            cx="30%"
            cy="50%"
            outerRadius={80}
            innerRadius={60}
            paddingAngle={5}
            fill="#791682ff"
            />
             <Pie
            dataKey="value"
            data={data02}
            cx="70%"
            cy="50%"
            outerRadius={80}
            innerRadius={60}
            paddingAngle={5}
            fill="#791682ff"
            />
            <Tooltip content={<CustomTooltip />}/>
        </PieChart>
      </ResponsiveContainer>
</div>
  )
}

export default TopCincoProductos