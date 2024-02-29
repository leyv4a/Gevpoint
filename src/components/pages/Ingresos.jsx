import { useEffect, useState } from 'react';
import { FaWallet } from "react-icons/fa";
import {Link, NavLink } from "react-router-dom";
import Axios from 'axios';
import Swal from 'sweetalert2';

export default function Ingresos() {
    const [ingresos, setIngresos] = useState([]);

    const getIngresos = ()=>{
        Axios.get('http://localhost:3001/profit').then(response => {setIngresos(response.data)}).catch(
            error => {Swal.fire({
                position: "center",
                icon: "error",
                title: `Algo salio mal... ${error.message}`,
                showConfirmButton: false,
                timer: 1500
              });}
        );
    }

    useEffect(()=>{
        getIngresos();
    },[])

  return (
    <main className='m-3' style={{"height" : "83vh"}}>
    <h2 className='d-flex align-items-center gap-2'><FaWallet/> Ingresos</h2>
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
                <div className="col-12">
                    <div className='bg-light' style={{overflowY: 'scroll', maxHeight: '80vh'}}>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                        <th scope="col">Tipo</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Monto</th>
                        <th scope="col">Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                            ingresos.map(ingreso => {
                                return(
                                    <tr key={ingreso.id}>
                                        <td>{ingreso.tipo}</td>
                                        <td>{ingreso.descripcion}</td>
                                        <td>${ingreso.monto}</td>
                                        <td>{ingreso.fecha}</td>
                                    </tr>
                                );
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
