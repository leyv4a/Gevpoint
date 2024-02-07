import React from 'react'
import {Link, NavLink } from "react-router-dom";

function HeaderInventario({children, isInventario, isEntrada}) {
  return (
    <>
    <h2 className='d-flex align-items-center gap-2'>{children}</h2>
    <nav>
      <ul className='nav align-items-center d-flex flex-row gap-3 '>
        {isInventario ? " " : <li><NavLink style={{"textDecoration": "none"}} className={"text-dark"} to={"/productos"}>Inventario</NavLink></li>}
        {isEntrada ? " " : <li><NavLink style={{"textDecoration": "none"}} className={"text-dark"} to={"/productos/entradas"}>Registrar Entrada</NavLink></li>}
        <li>Registrar producto</li>
        <li>Registrar categoria</li>
      </ul>
    </nav>
    </>
  )
}

export default HeaderInventario;
