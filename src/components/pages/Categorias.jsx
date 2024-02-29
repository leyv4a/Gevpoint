import React from "react";
import HeaderInventario from "../shared/headerInventario";
import { MdMiscellaneousServices } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { useState, useEffect } from "react";
import Axios from "axios";
import Swal from 'sweetalert2';

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

    const eliminarCategoria = (id)=>{
      Swal.fire({
        icon: 'question',
        title: `<p>¿Quieres eliminar la categoria <b>${nombre}</b>?</p>`,
        showDenyButton: true,
        confirmButtonText: "Cancelar",
        denyButtonText: `Eliminar`,
        confirmButtonColor: "#198754",
        denyButtonColor: "#d33",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire({
            position: "center",
            icon: "info",
            title: "Categoria no eliminada",
            showConfirmButton: false,
            timer: 1500
          });
        } else if (result.isDenied) {
          Axios.delete(`http://localhost:3001/category/${id}`).then(()=>{Swal.fire({
            position: "center",
            icon: "success",
            title: "Categoria eliminada.",
            showConfirmButton: false,
            timer: 1500
          }); limpiarCampos();  getCategorias(); }).catch(error => console.log(error));
        }
      });
    }

    const updateCategorias = ()=>{
      if (nombre.trim() === '') {
        Swal.fire({
          title: "¡Debe llenar el campo nombre!",
          icon: "info",
          showConfirmButton: false,
          timer: 1000
        });
        return;
      }else if(id == 0){
        Swal.fire({
          title: "¡Seleccione una categoria!",
          icon: "info",
          showConfirmButton: false,
          timer: 1000
        });
        return;
      }else{
        Axios.put('http://localhost:3001/category',{
          nombre: nombre,
          id: id
        }).then(()=>{Swal.fire({
          position: "center",
          icon: "success",
          title: "Categoria actualizada correctamente.",
          showConfirmButton: false,
          timer: 1500
        }); getCategorias(); limpiarCampos()}).catch(error=> console.log(error));
      }
    }
    //Hace una peticion post a la base de datos para agregar una categoria
    const agregarCategoria = ()=>{
      nombre == "" ? 
      Swal.fire({
        title: "¡Debe llenar el campo nombre!",
        icon: "info",
        showConfirmButton: false,
        timer: 1000
      }):
        Axios.post("http://localhost:3001/category", {
            nombre: nombre
        }).then(()=>{limpiarCampos(); getCategorias(); Swal.fire({
          position: "center",
          icon: "success",
          title: "Categoria agregada correctamente.",
          showConfirmButton: false,
          timer: 1500
        })}).catch(error => console.log(error));
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
        <BiSolidCategory /> Agregar categoria
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
            <div className=' bg-light' style={{overflowY: 'scroll', maxHeight: '80vh'}}>
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
                    <button className='btn btn-outline-danger ' onClick={()=>{eliminarCategoria(categoria.id)}}>Eliminar</button>
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
