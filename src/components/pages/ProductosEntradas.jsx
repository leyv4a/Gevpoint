import {React, useState, useEffect} from 'react'
import HeaderInventario from '../shared/headerInventario';
import { IoMdAddCircle } from "react-icons/io";
import { BsCalendar2DateFill } from "react-icons/bs";
import Axios from 'axios';

function ProductosEntradas() {
  const [fechaActual, setFechaActual] = useState("");
  const [codigo, setCodigo] = useState("");
  const [unidades, setUnidades] = useState(0); 
  const [entradas, setEntradas] = useState([]);
  const id_producto = 1;
  const tipo = 'Entrada';

  const actualizarFecha = () => {
      var curr = new Date();
      var fecha = curr.toLocaleDateString("es-MX"); // "23/02/2024"
      var hora = curr.toLocaleTimeString("es-MX"); // "09:55:55"
      var fechaHora = `${fecha} ${hora}`; // "23/02/2024 09:55:55"
      setFechaActual(fechaHora);
  }

  const getEntradas = (val) => {
    Axios.get('http://localhost:3001/transaction').then(response=>{
      setEntradas(response.data);
      console.log("Data readed successfully"+ response.data);
    }).catch(error => {
      console.log(error);
    });
}

  const addEntrada = ()=>{
    Axios.post('http://localhost:3001/transaction',{
    producto_id: id_producto,
    tipo: tipo,
    cantidad: unidades,
    fecha: fechaActual
    }).then(alert('Entrada agregada con exito'));
  }

  useEffect(()=>{
    getEntradas();
  },[]);

  return (
    <main className='m-3' style={{"height" : "83vh"}}>
    <HeaderInventario ><IoMdAddCircle/> Registrar Entradas</HeaderInventario>
    <hr/>
    <div className='mt-2 bg-light h-100 overflow-y-hidden'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-6 p-2'>
         <form onSubmit={addEntrada}>
         <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1"></span>
            <input required onChange={(e)=>{actualizarFecha(); setCodigo(e.target.value) }} type="text" className="form-control me-2" placeholder="Codigo" aria-label="codigo" aria-describedby="basic-addon1"/>
            <label className="form-label me-2"><BsCalendar2DateFill/></label>
            <input type='text' required className="form-control" disabled id="fecha" value={codigo.length == 0 ? " " :fechaActual}></input>
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
            <input required type='number' pattern="^[0-9]+(\.[0-9]+)?$" onChange={(e)=>{setUnidades(e.target.value)}} className="form-control"/></div>
          }
          </div>
          <div className="div">
            <button type='submit'>Agregar entrada</button>
          </div>
         </form>
          </div>

          <div className='col-6 position-relative ' style={{height : '83vh'}}>
          <table className="table table-striped table-hover">
          <thead className='sticky-top'>
              <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Fecha</th>
              </tr>
          </thead>
          <tbody >
            {
              entradas.map(entrada => {
                return (
                  <tr key={entrada.id}>
                    <td>{entrada.nombre}</td>
                    <td>{entrada.cantidad}</td>
                    <td>{entrada.tipo}</td>
                    <td>{entrada.fecha}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
          </div>
        </div>
      </div>
    </div>    
  </main>
  )
}

export default ProductosEntradas;