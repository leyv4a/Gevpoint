import React from "react";
import HeaderInventario from "../shared/headerInventario";
import { MdMiscellaneousServices } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { useState, useEffect } from "react";
import Axios from "axios";

export default function Categorias() {

  //Guarda el valor nombre del formulario
    const [nombre, setNombre] = useState("");
    //Guarda la lista de categorias recuperada de la base de datos
    const [categorias, setCategorias] = useState([]);
    const [id, setId] = useState(0);

    const [editarCategoria, setEditarCategoria] = useState(false);

    const limpiarCampos = ()=>{
      setNombre("");
      setId(0);
      setEditarCategoria(false);
    }

    const updateCategoria = (categoria) =>{
      setEditarCategoria(true);
      setNombre(categoria.nombre);
      setId(categoria.id);
    }

    const eliminarProducto = (id)=>{
      Axios.delete(`http://localhost:3001/category/${id}`).then(alert('Categoria eliminada con exito')).catch(error => console.log(error));
      limpiarCampos();
      getCategorias();
    }

    const updateCategorias = ()=>{
      if (nombre.trim() === '') {
        alert('Debe llenar el campo nombre')
        return;
      }else if(id == 0){
        alert('Seleccione una categoria');
        return;
      }else{
        Axios.put('http://localhost:3001/category',{
          nombre: nombre,
          id: id
        }).then(()=>{alert('Categoria actualizada con exito'); getCategorias(); limpiarCampos()}).catch(error=> console.log(error));
      }
    }
    //Hace una peticion post a la base de datos para agregar una categoria
    const agregarCategoria = ()=>{
      nombre == "" ? 
      alert("Debes ingresar un nombre para la categoria") :
        Axios.post("http://localhost:3001/category", {
            nombre: nombre
        }).then(()=>{limpiarCampos(); getCategorias(); alert('Entrada agregada con exito')}).catch(error => console.log(error));
    }

    //Hace una peticion get a la base de datos para recuperar las categorias
    const getCategorias =() => {
      Axios.get('http://localhost:3001/category').then(response =>{setCategorias(response.data)}
      ).catch(error => console.log(error));
    }

    useEffect(() => {
    getCategorias();
    }, []);
    

  return (
    <main className="m-3" style={{ height: "83vh" }}>
      <HeaderInventario>
        <BiSolidCategory /> Agregar productos
      </HeaderInventario>
      <hr />
      <div className="mt-2 bg-light h-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Categoria
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => {setNombre(e.target.value)}}
                  />
                </div>
                <div className="mb-3 d-flex gap-2">
            
                </div>
                <div className="mb-3">
                  {
                    editarCategoria?
                    <div className="d-flex gap-2">
                    <input type='submit' className="btn btn-warning"  value="Editar" onClick={()=>{updateCategorias()}}/> 
                    <input type='submit' className="btn btn-danger"  onClick={()=>{limpiarCampos()}} value="Cancelar" />
                    </div>:
                    <input  type='submit' className="btn btn-success"  value="Agregar" onClick={()=>agregarCategoria()}/>
                  }
                </div>
            </div>
            <div className="col-6">
            <div className='mt-2 bg-light' style={{overflowY: 'scroll', maxHeight: '80vh'}}>
        <table className="table table-striped table-hover">
         <thead className='sticky-top'>
            <tr>
                <th scope="col">Nombre</th>
                <th scope="col"><p className='fs-5'><MdMiscellaneousServices/></p></th>
            </tr>
         </thead>
         <tbody >
           {
             categorias.map(categoria => {
               return (
                 <tr key={categoria.id}>
                   <td>{categoria.nombre}</td>
                   <td className='d-flex flex-row gap-1'>
                    <button className='btn btn-outline-warning' onClick={()=>{updateCategoria(categoria)}}>Editar</button>
                    <button className='btn btn-outline-danger ' onClick={()=>{eliminarProducto(categoria.id)}}>Eliminar</button>
                   </td>
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
  );
}
