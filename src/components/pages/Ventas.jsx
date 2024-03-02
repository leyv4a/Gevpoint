import {useState, useEffect} from "react";
import Axios from 'axios';
import Swal from 'sweetalert2';
import { RiToolsFill } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

function Ventas() {

  //Recupera los datos del formulario
  const [codigo, setCodigo] = useState(""); 
  //Variasbles por defecto
  const tipo = 'Ingreso';
  const descripcion ='Venta';
  const [fecha, setFecha] = useState('');

  //Guarda los valores recuperados de la base de datos
  const [producto, setProducto] = useState("");
  const [precio, setPrecio] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [id, setId] = useState(0);
  const [productos, setProductos] = useState([])
  const [selectDefault, setSelectDefault] = useState(0)
  const [totalSubtotales, setTotalSubtotales] = useState(0);
  //Guarda la lista de compras
  const [carrito, setCarrito] = useState([]);
  
  const limpiarCampos = () =>{
    setCodigo("");
    setProducto("");
    setPrecio(0);
    setCantidad(0);
  }  

  const handleBorrarProducto = (productoId) => {
    // Filtra el carrito para excluir el producto con el id especificado
    const nuevoCarrito = carrito.filter(producto => producto.id !== productoId);
    setCarrito(nuevoCarrito);
  };


  const getProductos = () => {
    Axios.get('http://localhost:3001/items').then(response => {
      setProductos(response.data);
    }).catch(err => {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Algo salio mal..",
        text: `Error: ${err.message}`,
        showConfirmButton: true,
        confirmButtonColor: '#dc3545',
      });
    })

  }

  const handleSelectItem = (e) =>{
    setCodigo(e);
    setSelectDefault(0);
  }

  const generarVenta = () => {
    if (totalSubtotales == NaN || totalSubtotales == 0 || totalSubtotales == undefined || totalSubtotales == null) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "El carrito de compras está vacío.",
        showConfirmButton: true,
        confirmButtonColor: '#dc3545'
      });
      return;
    } else {
      Axios.post('http://localhost:3001/sale', {
        fecha: fecha,
        monto: totalSubtotales
      }).then(() => {
        Axios.post('http://localhost:3001/profit', {
          tipo: tipo,
          descripcion: descripcion,
          monto: totalSubtotales,
          fecha: fecha
        }).then(() => {
          carrito.forEach(producto => {
            Axios.post('http://localhost:3001/items/sale', {
              cantidad: producto.cantidad,
              id: producto.id
            }).then(() => {
              Axios.post('http://localhost:3001/transaction', {
                producto_id: producto.id,
                tipo: 'Salida',
                motivo: 'Venta',
                cantidad: producto.cantidad,
                fecha: fecha,
              }).then(() => {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Venta registrada correctamente",
                  timer: 1500
                });
                limpiarCampos();
                setCarrito([]);
              }).catch((err) => {
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "Algo salió mal al registrar la transacción.",
                  text: `Error: ${err.message}`,
                  showConfirmButton: true,
                  confirmButtonColor: '#dc3545'
                });
              });
            }).catch((err) => {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Algo salió mal al actualizar el stock.",
                text: `Error: ${err.message}`,
                showConfirmButton: true,
                confirmButtonColor: '#dc3545'
              });
            });
          });
        }).catch(() => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Algo salió mal al registrar en la tabla de ganancias.",
            showConfirmButton: true,
            confirmButtonColor: '#dc3545'
          });
        });
      }).catch(() => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Algo salió mal al registrar en la tabla de ventas.",
          showConfirmButton: true,
          confirmButtonColor: '#dc3545'
        });
      });
    }
  };

  //Hace una peticion asincrona a la base de datos 
    const getByCode = async () => {
      try {
        if (codigo.length >= 4 && codigo.length < 5) {
          const response = await Axios.get(`http://localhost:3001/items/${codigo}`);
          const productoExistente = carrito.find(item => item.id === response.data[0].id);

            if (productoExistente) {
              Swal.fire({
                title: "Cuidado",
                text: "Este producto ya ha sido agregado al carrito.",
                icon: "info",
                showConfirmButton: true,
                confirmButtonColor: "#0d6efd",
              });
              setCodigo("");
              return;
            }

          const result = await Swal.fire({
            title: `El producto es ${response.data[0].nombre}`,
            text: "Ingrese la cantidad",
            icon: "success",
            input: 'number',
            inputAttributes:{
              min: 1,
              step: 1,
              pattern: '[0-9]*',
              placeholder: 'Ingrese la cantidad'
            },
            confirmButtonColor: "#198754",
            confirmButtonText: "Confirmar"
          });
    
          if (result.isConfirmed) {
            const parsedCantidad = parseFloat(result.value);
    
            if (isNaN(parsedCantidad)) {
              // Handle the case where parsedCantidad is NaN (not a number)
              Swal.fire({
                title: "Error",
                text: "Ingrese una cantidad válida",
                icon: "error",
                showConfirmButton: true,
                confirmButtonColor: '#0d6efd'
              });
              return;
            }
            actualizarFecha();
            setCarrito(prevCarrito => [
              ...prevCarrito,
              {
                'id' : response.data[0].id,
                'producto': response.data[0].nombre,
                'precio': response.data[0].precio,
                'cantidad': parsedCantidad,
                'subtotal': response.data[0].precio * parsedCantidad

              }
            ]);
          }
          limpiarCampos();
        } else {
          Swal.fire({
            title: "¡Ingresa el codigo correctamente!",
            text: `Debe ser de 4 dígitos`,
            icon: "error",
            showConfirmButton: true,
            confirmButtonColor: '#0d6efd'
          });
        }
      } catch (error) {
        Swal.fire({
          title: "¡Algo salió mal!",
          text: `Error: ${error.message}`,
          icon: "error",
          showConfirmButton: true,
          confirmButtonColor: '#dc3545'
        });
      }
  };

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

  
  useEffect(()=>{
   const total =carrito.reduce((acumulador, producto) => acumulador + producto.subtotal, 0);
   setTotalSubtotales(total);
  },[carrito])

  useEffect(()=>{
    getProductos()
  },[])
  
  return (
    <main className="m-3">
      <div className="header">
        <h2 className="d-flex align-items-center gap-2"> Punto de venta</h2>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <div>
              <ul className="navbar-nav">
                <div className="d-flex gap-1 me-2">

              
                  <input
                    className="form-control me-2"
                    type="text"
                    placeholder="Codigo"
                    aria-label="codigo"
                    value={codigo}
                    onChange={(e) =>{ setCodigo(e.target.value.toUpperCase())}}
                  />
                  <button className="btn btn-outline-success" onClick={()=>{getByCode()}}>
                    Agregar
                  </button>
                  </div>
                <li className="nav-item">
                  <select className="form-select" onChange={(e)=>{handleSelectItem(e.target.value)}} value={selectDefault} style={{ cursor: "pointer" }}>
                    <option  value={selectDefault} disabled>
                      --Articulos--
                    </option>
                    {
                    productos.map((producto) => (
                      <option key={producto.id}  value={producto.codigo}>{producto.nombre}</option>
                    ))
                    }
                  </select>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="row">
        <div className="col-md-8 ">
          <table className="table table-striped table-hover">
            <thead className="sticky-top">
              <tr className="text-center">
                <th scope="col">Cantidad</th>
                <th scope="col">Nombre</th>
                <th scope="col">Unidad</th>
                <th scope="col">Impuesto</th>
                <th scope="col">Subtotal</th>
                <th scope="col" ><RiToolsFill className="fs-4"/></th>
              </tr>
            </thead>
            <tbody>
              {
                carrito.map(producto =>{
                  return(
                    <tr key={producto.id} className="text-center">
                      <td>{producto.cantidad}</td>
                      <td>{producto.producto}</td>
                      <td>{formatCurrencies(producto.precio)}</td>
                      <td>N/A</td>
                      <td>{formatCurrencies(producto.subtotal)}</td>
                      <td className="d-flex gap-2 justify-content-center">
                      <button className="btn btn-danger btn-sm text-center"onClick={() => handleBorrarProducto(producto.id)}>
                          <FaRegTrashAlt/>
                      </button>
                      <button className="btn btn-primary btn-sm"onClick={() => handleEditarProducto(producto.id, producto.cantidad)}>
                          <FaRegEdit/>
                      </button>
                    </td>
                 
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        <div className="col-md-4 mt-2">
          <div className="card ">
            <div className="row">
              <div className="col">
                {" "}
                <ul style={{ listStyle: "none" }}>
                  <li className="mb-2 mt-3">
                    <strong>Subtotal</strong>
                  </li>
                  <li className="mb-2">
                    <strong>Descuento</strong>
                  </li>
                  <li className="mb-2">
                    <strong>Impuesto</strong>
                  </li>
                  <li className="mb-2">
                    <strong>Total</strong>
                  </li>
                </ul>
              </div>
              <div className="col">
                {" "}
                <ul style={{ listStyle: "none" }}>
                  <li className="mb-2 mt-3">
                    {formatCurrencies(totalSubtotales)}
                  </li>
                  <li className="mb-2">
                   $0
                  </li>
                  <li className="mb-2">
                   $0
                  </li>
                  <li className="mb-2">
                   <strong>{formatCurrencies(totalSubtotales)}</strong>
                  </li>
                </ul>
              </div>
            </div>
            <div className="d-grid gap-2 p-2">
              <button className="btn btn-success" onClick={()=>{generarVenta()}}>Procesar</button>
              <button className="btn btn-danger">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Ventas;
