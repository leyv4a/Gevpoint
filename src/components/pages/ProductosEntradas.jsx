import {React, useState, useEffect} from 'react'
import HeaderInventario from '../shared/headerInventario';
import { IoMdAddCircle } from "react-icons/io";
import { BsCalendar2DateFill } from "react-icons/bs";
import Axios from 'axios';
import Swal from 'sweetalert2';

function ProductosEntradas() {
  const [fechaActual, setFechaActual] = useState("");
  const [codigo, setCodigo] = useState("");
  const [unidades, setUnidades] = useState(0); 
  const [entradas, setEntradas] = useState([]);
  const [id_producto, setId_producto] = useState(0);
  const tipo = 'Entrada';

  const actualizarFecha = () => {
      var curr = new Date();
      var fecha = curr.toLocaleDateString("es-MX"); // "23/02/2024"
      var hora = curr.toLocaleTimeString("es-MX"); // "09:55:55"
      var fechaHora = `${fecha} ${hora}`; // "23/02/2024 09:55:55"
      setFechaActual(fechaHora);
  }

  const limpiarCampos= () =>{
    setCodigo("");
    setUnidades(0);
    setId_producto(0);
  }

  const getEntradas = (val) => {
    Axios.get('http://localhost:3001/transaction').then(response=>{
      setEntradas(response.data);
    }).catch(error => {
      Swal.fire({
        title: "¡Algo salio mal leyendo los registros!",
        text : `${error.message}`,
        icon: "error",
        showConfirmButton: false,
        timer: 1000
      })
    });
}

  const getIdByCode = () => {
    if (id_producto === 0) {
      Axios.get(`http://localhost:3001/items/${codigo}` ).then(response => {
      setId_producto(response.data[0].id);
    })}
  }

  const addEntrada = ()=>{
    // getIdByCode();
    if (id_producto === 0 || id_producto == null || id_producto.length === 0 || id_producto === undefined) {
      Swal.fire({
        title: "¡Ingresa un codigo existente!",
        icon: "error",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    } else if (unidades == 0 || codigo.trim == "") {
      Swal.fire({
        title: "¡Debe ingresar todos los datos!",
        icon: "info",
        showConfirmButton: false,
        timer: 1000
      })
      return;
    }else{
    }
    Axios.post('http://localhost:3001/transaction',{
    producto_id: id_producto,
    tipo: tipo,
    cantidad: unidades,
    fecha: fechaActual
    }).then(()=>{
      getEntradas();
      limpiarCampos();
      Swal.fire({
        title: "¡Entrada registrada con exito!",
        icon: "success",
        showConfirmButton: false,
        timer: 1000
      });
    }).catch(()=>{
      setId_producto(0);
      Swal.fire({
        title: "Algo salio mal",
        icon: "error",
        showConfirmButton: false,
        timer: 1000
      })
    });
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
         <div className="input-group mb-3">
            <div className="input-group ">
              <input type="text" className="form-control" placeholder="Codigo" value={codigo} onChange={(e)=>{actualizarFecha(); setCodigo(e.target.value)}} />
              <button className="btn btn-outline-secondary me-3" type="button" onClick={getIdByCode}>Buscar</button>
              <label className="form-label me-2"><BsCalendar2DateFill/></label>
                <input type='text' required className="form-control" disabled id="fecha" value={codigo.length == 0 ? " " :fechaActual}/>
            </div>
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
            <input required value={unidades} type='number' pattern="^[0-9]+(\.[0-9]+)?$" onChange={(e)=>{setUnidades(parseFloat(e.target.value))}} className="form-control"/></div>
          }
          </div>
          <div className="div">
              <button className='btn btn-success' onClick={()=>{ addEntrada()}}>Agregar entrada</button>
          </div>
          </div>

          <div className='col-6 position-relative ' style={{overflowY: 'scroll', height : '83vh'}}>
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