import {React, useState} from 'react'
import HeaderInventario from '../shared/headerInventario';
import { IoMdAddCircle } from "react-icons/io";
import { BsCalendar2DateFill } from "react-icons/bs";

function ProductosEntradas() {
  const [fechaActual, setFechaActual] = useState("");
  const [codigo, setCodigo] = useState("");

  const actualizarFecha = () => {
      var curr = new Date();
      setFechaActual(curr);
      ;
  }

  return (
    <main className='m-3' style={{"height" : "83vh"}}>
    <HeaderInventario isEntrada={true}><IoMdAddCircle/> Registrar Entradas</HeaderInventario>
    <hr/>
    <div className='mt-2 bg-light h-100 overflow-y-scroll'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-6 p-2'>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"></span>
            <input onChange={(e)=>{actualizarFecha(); setCodigo(e.target.value) }} type="text" className="form-control me-2" placeholder="Codigo" aria-label="codigo" aria-describedby="basic-addon1"/>
            <label className="form-label me-2"><BsCalendar2DateFill/></label>
            <input type='text' className="form-control" disabled id="fecha" value={codigo.length == 0 ? " " :fechaActual}></input>
          </div>
          <div className='mb-3'> {
            codigo.startsWith("F") || codigo.startsWith("f") ? 
            <div className="mb-3">
              <label className="form-label">Cantidad (kg)</label>
              <div className='d-flex flex-row gap-2 min-vw-25'>
                <div className='w-50 fs-1 card text-center'><div>0</div></div>
                <button className='w-50 btn btn-warning'>Pesar</button>
              </div>
            </div>
            :<div><label className="form-label" >Cantidad (U)</label>
            <input type='number' className="form-control"/></div>
          }
          </div>
          </div>
          <div className='col-6'>2</div>
        </div>
      </div>
    </div>    
  </main>
  )
}

export default ProductosEntradas;