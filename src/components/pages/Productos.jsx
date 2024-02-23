import React, { useEffect, useState } from 'react'
import HeaderInventario from '../shared/headerInventario';
import { FaWarehouse } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdMiscellaneousServices } from "react-icons/md";
import Axios from 'axios';


function Productos() {

  const [productos, setProductos] = useState([]);

  const getProductos = (val) => {
    Axios.get('http://localhost:3001/items')
   .then(response => {
        setProductos(response.data);
        console.log("Data readed successfully"+ response.data);
      })
   .catch(error => {
        console.log(error);
      });
  }

  useEffect(()=>{
    getProductos();
  },[]);

  return (
    <main className='m-3'>
     <HeaderInventario><FaWarehouse/>Inventario</HeaderInventario>
      <hr/>
      <div className='mt-2 bg-light' style={{overflowY: 'scroll', maxHeight: '80vh'}}>
        <table className="table table-striped table-hover">
         <thead className='sticky-top'>
            <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Codigo</th>
                <th scope="col">Impuesto</th>
                <th scope="col">Precio</th>
                <th scope="col">Categoria</th>
                <th scope="col">Cantidad</th>
                <th scope="col" className='fs-4'><MdMiscellaneousServices/></th>
            </tr>
         </thead>
         <tbody >
           {
             productos.map(producto => {
               return (
                 <tr key={producto.id}>
                   <td>{producto.nombre}</td>
                   <td>{producto.codigo}</td>
                   <td>{producto.impuesto}</td>
                   <td>{producto.precio}</td>
                   <td>{producto.Categoria}</td>
                   <td className={producto.cantidadActual>=producto.cantidadMinima ? 'text-danger' : ''}>{producto.cantidadActual}</td>
                   <td><button className='btn btn-outline-dark'><MdEdit/></button></td>
                 </tr>
               )
             })
           }
         </tbody>
        </table>
    </div>    
    </main>

  )
}

export default Productos;