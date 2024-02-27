import React from 'react'
import HeaderInventario from '../shared/headerInventario'
import { MdCreateNewFolder, MdMiscellaneousServices } from "react-icons/md";
import { useState, useEffect} from 'react';
import Axios from 'axios';
export default function ProductosAgregar() {

  //Guarda los valores del formulario
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState(0);
  const [minimo, setMinimo] = useState(0);
  const [codigo, setCodigo] = useState(0);
  const [categoria, setCategoria] = useState(0);
  const [unidadMedida, setUnidad] = useState('');
  const impuesto = 0.0;

  //Lista las categorias de la base de datos
  const [categorias, setCategorias] = useState([]);
  //Guarda los productos de la base de datos
  const [productos, setProductos] = useState([]);
  const [editarProducto, setEditarProductos] = useState(false); //

  //Recupera el codigo en base a la categoria
  const [inicialCodigo, setInicialCodigo] = useState("");


  const limpiarCampos = () => {
    setNombre('');
    setPrecio(0);
    setMinimo(0);
    setCodigo(0);
    setCategoria(0);
    setUnidad('');
    setInicialCodigo('');
  }

  const editarProductos = (producto) =>{
    setEditarProductos(true)
    setNombre(producto.nombre);
    setCodigo(producto.codigo.substr(1));
    setMinimo(producto.cantidadMinima);
    setPrecio(producto.precio);

  }
 
  //Hace una peticion POST la servidor para agregar un registro
  const agregarProducto = ()=>{
    if ( nombre.trim() === '' ||
    precio === null ||
    minimo === null ||
    codigo === null ||
    categoria === null ||
    unidadMedida.trim() === '' ) { 
      alert("Llena todos los campos");
      return
    }else{
    Axios.post('http://localhost:3001/items', {
      nombre: nombre,
      codigo: codigo,
      unidad: unidadMedida,
      impuesto : impuesto,
      precio: precio,
      cantidadMinima: minimo,
      categoria: categoria
    }).then(()=>{ limpiarCampos(); alert("Producto agregado con exito") }).catch(error => console.log(error));
  }
  }
//Recupera los productos de la base de datos mediante una peticion get
  const getProductos = (val) => {
    Axios.get('http://localhost:3001/items')
   .then(response => {
        setProductos(response.data);
        console.log("Data readed successfully"+ response.data);
      })
   .catch(error => {
        console.log(error);
      });
  }
  //Recupera las categorias de la base de datos mediante una peticion get
  const getCategorias = (val) => {
    Axios.get('http://localhost:3001/category').then(response =>{setCategorias(response.data)}
    ).catch(error => console.log(error));
  }

  //Recupera la categoria por id
  const getCategoriaId = (val) =>{
    Axios.get(`http://localhost:3001/category/${categoria}`).then(response => {
    setInicialCodigo(Array.isArray(response.data) ? response.data[0].nombre.charAt(0): " s ")
  }).catch(error => console.log(error));
  };

  //ESCUCHA LOS CAMBIOS DE categoria PARA BUSCAR POR ID
  useEffect(() => {
    getCategoriaId();
  }, [categoria]);

  useEffect(() => {
    getCategorias();
    getProductos();
  }, []);

  return (
    <main className='m-3' style={{"height" : "83vh"}}>
    <HeaderInventario ><MdCreateNewFolder/> Agregar productos</HeaderInventario>
    <hr/>
    <div className='mt-2 bg-light h-100'>
        <div className="container-fluid">
            <div className="row">
                <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Nombre</label>
                      <input type="text" className="form-control" value={nombre} onChange={(e) => {setNombre(e.target.value)}} placeholder="Nombre" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Categoria</label>
                      <select value={categoria ? categoria.id : "0"} className='form-select' onChange={(e)=>{setCategoria(parseFloat(e.target.value))}} >
                        <option value="0" disabled > ----Seleccione una categoria ----</option>
                        {
                          categorias.map((cat) => (
                            <option key={cat.id}  value={cat.id}>{cat.nombre}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Codigo</label>
                      <div className="input-group mb-3">
                        <span className="input-group-text" >{inicialCodigo}</span>
                        <input type="text" className="form-control" value={codigo} onChange={(e)=>{setCodigo(inicialCodigo+e.target.value)}} placeholder="Ejemplo: 001" aria-label="Username" aria-describedby="basic-addon1"/>
                      </div>
                    </div>
                      <div className="d-flex gap-3 mb-3">
                      <div>
                      <label className="form-label">Unidad</label>
                      <div className="d-flex gap-2">
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="radioUnidad" id="kg" value={"Kg"} onClick={(e)=>setUnidad(e.target.value)}/>
                          <label className="form-check-label" htmlFor="kg">
                            Kg
                          </label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="radioUnidad" id="unidad" value={"Unidad"} onClick={(e)=>setUnidad(e.target.value)} />
                          <label className="form-check-label" htmlFor='unidad'>
                            Unidad
                          </label>
                        </div>
                      </div>
                    </div>
                        <div className="">
                        <label className="form-label">Stock Min.</label>
                         <input type="number" pattern="^[0-9]+(\.[0-9]+)?$" value={minimo} onChange={(e)=>{setMinimo(parseFloat(e.target.value))}} className="form-control" />
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
                      <input type="number" className="form-control" value={precio} onChange={(e)=>{setPrecio(parseFloat(e.target.value))}} placeholder="Precio"/>
                    </div>
                    {
                      editarProducto ?
                     <div className="d-flex gap-2">
                       <button type='submit' className='btn btn-warning px-5' >Editar</button>
                      <button  className='btn btn-primary px-5' onClick={()=>{setEditarProductos(false); limpiarCampos()}}>Cancelar</button>
                     </div>
                      :
                      <button type='submit' className='btn btn-success px-5' onClick={agregarProducto}>Agregar</button>
                    }
                </div>
                <div className="col-6">
                <div className='mt-2 bg-light' style={{overflowY: 'scroll', maxHeight: '80vh'}}>
        <table className="table table-striped table-hover">
         <thead className='sticky-top'>
            <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Codigo</th>
                <th scope="col">Unidad</th>
                <th scope="col">Impuesto</th>
                <th scope="col">Precio</th>
                <th scope="col">Categoria</th>
                <th scope="col">Cantidad Min.</th>
                <th scope="col"><MdMiscellaneousServices/></th>
            </tr>
         </thead>
         <tbody >
           {
             productos.map(producto => {
               return (
                 <tr key={producto.id}>
                   <td>{producto.nombre}</td>
                   <td>{producto.codigo}</td>
                   <td>{producto.unidad}</td>
                   <td>{producto.impuesto == 0 ? "N/A" : producto.impuesto}</td>
                   <td>{producto.precio}</td>
                   <td>{producto.Categoria}</td>
                   <td >{producto.cantidadMinima}</td>
                   <td>
                    <button onClick={()=>{editarProductos(producto)}}>Editar</button>
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
  )
}
