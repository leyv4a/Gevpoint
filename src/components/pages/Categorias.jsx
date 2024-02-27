import React from "react";
import HeaderInventario from "../shared/headerInventario";
import { BiSolidCategory } from "react-icons/bi";
import { useState, useEffect } from "react";
import Axios from "axios";

export default function Categorias() {

    const [nombre, setNombre] = useState("");

    const agregarCategoria = ()=>{
        Axios.post("http://localhost:3001/category", {
            nombre: nombre
        }).then(alert('Entrada agregada con exito')).catch(error => console.log(error));

    }

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
              <form onSubmit={agregarCategoria}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Categoria
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    placeholder="Nombre"
                    onChange={(e) => {setNombre(e.target.value)}}
                  />
                </div>
                <div className="mb-3 d-flex gap-2">
            
                </div>
                <div className="mb-3 d-grid">
                    <input  className="btn btn-success" type="submit" value="Agregar" />
                </div>
              </form>
            </div>
            <div className="col-6">
              TABLA MOSTRAR PRODUCTOS CON EDITAR/ELIMINAR
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
