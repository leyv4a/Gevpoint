import React from 'react'
import HeaderInventario from '../shared/headerInventario'
import { MdCreateNewFolder } from "react-icons/md";
import { useState, useEffect} from 'react';
import Axios from 'axios';
export default function ProductosAgregar() {

  //Guarda los valores del formulario
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  const [minimo, setMinimo] = useState(0);
  const [codigo, setCodigo] = useState(0);
  const [categoria, setCategoria] = useState("");

  //Lista las categorias de la base de datos
  const [categorias, setCategorias] = useState([]);
  //Recupera el codigo en base a
  const [inicialCodigo, setInicial] = useState('');
  const [unidadMedida, setUnidad] = useState('');
 
  //HACER UN SELECT BY ID PARA CONSULTAR LA INICIAL
  //Recupera los cambios del <Select> de categorias y asigna automaticamente el codigo y la unidad
  const handeChange = (e) =>{
    setCategoria(e.target.value);
  
    console.log( categoria  );
  };

  //Recupera las categorias de la base de datos mediante una peticion get
  const getCategorias = (val) => {
    Axios.get('http://localhost:3001/category').then(response =>{setCategorias(response.data)}
    ).catch(error => console.log(error));
  }

  useEffect(() => {
    getCategorias();
  }, [])
  return (
    <main className='m-3' style={{"height" : "83vh"}}>
    <HeaderInventario ><MdCreateNewFolder/> Agregar productos</HeaderInventario>
    <hr/>
    <div className='mt-2 bg-light h-100'>
        <div className="container-fluid">
            <div className="row">
                <div className="col-6">
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Nombre</label>
                      <input type="text" className="form-control" onChange={(e) => {setNombre(e.target.value)}} placeholder="Nombre" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Categoria</label>
                      <select className='form-select' onChange={handeChange
                      }>
                        {
                          categorias.map((categoria, index) => (
                            <option key={index} value={categoria.id}>{categoria.nombre}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Codigo</label>
                      <div className="input-group mb-3">
                        <span className="input-group-text" >{inicialCodigo}</span>
                        <input type="text" className="form-control" onChange={(e)=>{setCodigo(inicialCodigo+e.target.value)}} placeholder="Ejemplo: 001" aria-label="Username" aria-describedby="basic-addon1"/>
                      </div>
                    </div>
                      <div className="d-flex gap-3 mb-3">
                      <div>
                      <label className="form-label">Unidad</label>
                      <div className="d-flex gap-2">
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="radioUnidad" id="kg" />
                          <label className="form-check-label" htmlFor="kg">
                            Kg
                          </label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="radioUnidad" id="unidad" />
                          <label className="form-check-label" htmlFor='unidad'>
                            Unidad
                          </label>
                        </div>
                      </div>
                    </div>
                        <div className="">
                        <label className="form-label">Stock Min.</label>
                         <input type="number" pattern="^[0-9]+(\.[0-9]+)?$" onChange={(e)=>{setMinimo(e.target.value)}} className="form-control" />
                        </div>
                      <div >
                        <label className="form-label">Impuesto</label>
                        <div className="d-flex gap-2">
                        <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="noAplica" defaultChecked/>
                        <label className="form-check-label" htmlFor="noAplica">
                          N/A
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="radioIva" disabled/>
                        <label className="form-check-label" htmlFor='radioIva'>
                          15%
                        </label>
                      </div>
                        </div>
                      </div>
                      </div>
                    <div className="mb-3">
                      <label className="form-label">Precio</label>
                      <input type="number" className="form-control" onChange={(e)=>{setPrecio(e.target.value)}} placeholder="Precio"/>
                    </div>
                    <div className="d-grid">
                    <button type='submit' className='btn btn-success'>Agregar</button>
                    </div>
                  </form>
                </div>
                <div className="col-6">TABLA MOSTRAR PRODUCTOS CON EDITAR/ELIMINAR</div>
            </div>
        </div>
    </div>
    </main>
  )
}
