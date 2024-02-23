import React from 'react'
import HeaderInventario from '../shared/headerInventario'
import { MdCreateNewFolder } from "react-icons/md";
import { useState, useEffect} from 'react';
import Axios from 'axios';
export default function ProductosAgregar() {

  //Lista las categorias de la base de datos
  const [categorias, setCategorias] = useState([]);
  //Recupera el codigo en base a
  const [codigo, setCodigo] = useState('');
  const [unidad, setUnidad] = useState('');
 
  //Recupera los cambios del <Select> de categorias y asigna automaticamente el codigo y la unidad
  const handeChange = (e) =>{
  var code = "";
   var unidad = e.target.value;
    if (unidad.includes("Frutas") && unidad.includes("U")){
      setCodigo("M");
      setUnidad('U');
      console.log(codigo);
    }else if (unidad.includes("Frutas") && !unidad.includes("U")) {
      setCodigo("F");
      setUnidad('kg');
    }else{
     console.log("A");
     setUnidad('U');
    }
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
                      <input type="text" className="form-control" placeholder="Nombre" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Categoria</label>
                      <select className='form-select' onChange={handeChange
                      }>
                        {
                          categorias.map((categoria, index) => (
                            <option key={index} value={categoria.nombre}>{categoria.nombre}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Codigo</label>
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">{codigo}</span>
                        <input type="text" className="form-control" placeholder="Ejemplo: 001" aria-label="Username" aria-describedby="basic-addon1"/>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Unidad</label>
                      <input type="text" disabled className="form-control" value={unidad} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Impuesto</label>
                      <input type="text" className="form-control" placeholder="Impuesto" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Precio</label>
                      <input type="text" className="form-control" placeholder="Precio" />
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
