import { useEffect, useState } from 'react';
import { FaMoneyCheckAlt } from "react-icons/fa";
import {Link, NavLink } from "react-router-dom";
import Axios from 'axios';
import Swal from 'sweetalert2';

export default function Egresos() {

    //Recupera los datos del formulario
    const [descripcion, setDescripcion] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [fecha, setFecha] = useState('');
    const tipo = 'Egreso';

    //Guarda los egresos resultantes de la consulta a la base de datos
    const [Egresos, setEgresos]= useState([]);

    //Actualiza la hora exacta al usar el formulario
    const actualizarFecha=()=>{
        var curr = new Date();
        var fecha = curr.toLocaleDateString("es-MX"); // "23/02/2024"
        var hora = curr.toLocaleTimeString("es-MX"); // "09:55:55"
        var fechaHora = `${fecha} ${hora}`; // "23/02/2024 09:55:55"
        setFecha(fechaHora);
    }
    

    const formatCurrencies = (currency) => { 
         const formater = new Intl.NumberFormat('es-MX',{
            style: 'currency',
            currency: 'MXN'
        })
        return formater.format(currency);
    }
    
    const limpiarCampos = () => {
        setDescripcion('');
        setCantidad(0);
        setFecha('');
    }

    //Ingresa un nuevo egreso mediante una peticion POST
    const agregarEgreso = ()=>{
        if (!descripcion || !descripcion.length && cantidad != 0) {

            Swal.fire({
                position: "center",
                icon: "info",
                title: "¡Complete todos los campos!",
                showConfirmButton: false,
                timer: 1500
              });
              console.log(descripcion + cantidad)
              return;
        }

        Axios.post('http://localhost:3001/profit', {
            tipo: tipo,
            descripcion: descripcion,
            monto: cantidad,
            fecha: fecha
        }).then(()=>{
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Egreso agregado correctamente",
                showConfirmButton: false,
                timer: 1500
              });
              limpiarCampos();
              getEgresos();
        }).catch(error => {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Algo salio mal...",
                text: `Error: ${error.message}`,
                showConfirmButton: true,
                confirmButtonColor: '#dc3545'
              });
        });
    }

    //Recupera los egresos mediante una peticion GET
    const getEgresos =()=>{
        Axios.get('http://localhost:3001/losses').then(response=>{setEgresos(response.data); 
        }).catch(error =>{
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Algo salio mal...",
                text: `Error: ${error.message}`,
                showConfirmButton: true,
                confirmButtonColor: '#dc3545'
              });
          })
    }

    useEffect(()=>{
        getEgresos();
    },[]);

  return (
    <main className='m-3' style={{"height" : "83vh"}}>
    <h2 className='d-flex align-items-center gap-2'><FaMoneyCheckAlt/> Egresos</h2>
    <nav>
      <ul className='nav align-items-center d-flex flex-row gap-3 '>
          <li><NavLink style={{"textDecoration": "none"}} className={"text-dark"} to={"/ingresos"}>Ingresos</NavLink></li>
          <li><NavLink style={{"textDecoration": "none"}} className={"text-dark"} to={"/egresos"}>Egresos</NavLink></li>
     
      </ul>
    </nav>
    <hr/>
    <div className='mt-2 bg-light h-100 overflow-y-hidden'>
        <div className="container-fluid">
            <div className="row">
                <div className="col-6">
                    <div className="d-flex gap-4">
                        <div className="mb-3">
                            <label  className="form-label">Descripcion</label>
                            <input  type="text" className="form-control" maxLength={18} onChange={(e)=>{actualizarFecha(); setDescripcion(e.target.value);
                           }} value={descripcion} placeholder="Ejemplo : Gasto viaticos"/>
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Cantidad</label>
                            <input  type="number" pattern='^[0-9]+(\.[0-9]+)?$' onChange={(e)=>{setCantidad(parseFloat(e.target.value))}} className="form-control" value={cantidad} placeholder="Ejemplo: 2345.50"/>
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Fecha</label>
                            <input  type="text"  className="form-control" disabled value={descripcion.length == 0 ? '' : fecha} />
                        </div>
                    </div>
                    <div>
                        <button className="btn btn-success" onClick={()=>{agregarEgreso()}}>Agregar</button>
                    </div>
                </div>
                <div className="col-6">
                <div className='bg-light' style={{overflowY: 'scroll', maxHeight: '80vh'}}>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                            <th scope="col">Tipo</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Egresos.map(egreso=>{
                                    return (
                                        <tr key={egreso.id}>
                                            <td>{egreso.tipo}</td>
                                            <td>{egreso.descripcion}</td>
                                            <td>{formatCurrencies(egreso.monto)}</td>
                                            <td>{egreso.fecha}</td>
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
    </div>
    </main>
  )
}
