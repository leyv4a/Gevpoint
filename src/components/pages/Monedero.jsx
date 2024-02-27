import React from 'react'
import { FaWallet } from "react-icons/fa6";

export default function Monedero() {
  return (
<main className='m-3' style={{"height" : "83vh"}}>
    <h2 className='d-flex align-items-center gap-2'><FaWallet/> Monedero</h2>
    <nav>
      <ul className='nav align-items-center d-flex flex-row gap-3 '>
          {/* <li><NavLink style={{"textDecoration": "none"}} className={"text-dark"} to={"/productos"}>Inventario</NavLink></li>
          <li><NavLink style={{"textDecoration": "none"}} className={"text-dark"} to={"/productos/entradas"}>Registrar Entrada</NavLink></li>
          <li><NavLink style={{"textDecoration": "none"}} className={"text-dark"} to={"/productos/agregar"}>Registrar Producto</NavLink></li>
          <li><NavLink style={{"textDecoration": "none"}} className={"text-dark"} to={"/productos/categorias"}>Registrar Categoria</NavLink></li> */}
      </ul>
    </nav>
</main>
  )
}
