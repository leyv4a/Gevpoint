import React from 'react'
import HeaderInventario from '../shared/headerInventario';
import { FaWarehouse } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdMiscellaneousServices } from "react-icons/md";


function Productos() {
  return (
    <main className='m-3' style={{"height" : "83vh"}}>
     <HeaderInventario isInventario={true}><FaWarehouse/>Inventario</HeaderInventario>
      <hr/>
      <div className='mt-2 bg-light h-100 overflow-y-scroll'>
        <table className="table table-striped">
         <thead className='sticky-top'>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Codigo</th>
                <th scope="col">Impuesto</th>
                <th scope="col">Precio</th>
                <th scope="col">Categoria</th>
                <th scope="col">Cantidad</th>
                <th scope="col" className='fs-4'><MdMiscellaneousServices/></th>
            </tr>
         </thead>
         <tbody>
            <tr>
                <th scope="row">1</th>
                <td>Manzana</td>
                <td>F1</td>
                <td>N/A</td>
                <td>49.90</td>
                <td>Frutas y verduras</td>
                <td>54kg</td>
                <td><button className='btn btn-outline-warning'><MdEdit/></button></td>
            </tr>
            <tr>
                <th scope="row">2</th>
                <td>Pera</td>
                <td>F2</td>
                <td>N/A</td>
                <td>41.90</td>
                <td>Frutas y verduras</td>
                <td>30kg</td>
                <td><button className='btn btn-outline-warning'><MdEdit/></button></td>
            </tr>
            <tr>
                <th scope="row">3</th>
                <td>Salsa Huichol</td>
                <td>A1</td>
                <td>N/A</td>
                <td>19.00</td>
                <td>Abarrotes</td>
                <td>22</td>
                <td><button className='btn btn-outline-warning'><MdEdit/></button></td>
            </tr>
         </tbody>
        </table>
    </div>    
    </main>

  )
}

export default Productos;