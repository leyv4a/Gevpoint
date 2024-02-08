import React from 'react'

function Ventas() {
  return (
    <main className='m-3'>
        <div className="header">
        <h2 className='d-flex align-items-center gap-2'> Punto de venta</h2>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div >
                    <ul className="navbar-nav">
                        <form className="d-flex me-2" role="search">
                            <input className="form-control me-2" type="text" placeholder="Codigo" aria-label="codigo"/>
                            <button className="btn btn-outline-success" type="submit">Agregar</button>
                        </form>
                        <li className="nav-item">
                            <select className='form-select' style={{"cursor" : "pointer"}}>
                                <option selected disabled>
                                    --Articulos--
                                </option>
                            </select>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        </div>
        <div className='row'>
            <div className='col-md-8 mt-2'>
            <table className="table table-striped">
         <thead className='sticky-top'>
            <tr>
                <th scope="col">Cantidad</th>
                <th scope="col">Nombre</th>
                <th scope="col">Unidad</th>
                <th scope='col'>Impuesto</th>
            </tr>
         </thead>
         <tbody>
            <tr>
                <td width={"5"}><input min="0" type="number"/></td>
                <td>Manzana</td>
                <td>32</td>
                <td>N/A</td>
            </tr>
     
         </tbody>
        </table>
            </div>
            <div className='col-md-4 mt-2'>
                <ul>
                   <li>Subtotal</li> 
                   <li>Descuento</li>
                   <li>Impuesto</li>
                   <li>Total</li>   
                   <div>
                    <button className='btn btn-success'>Procesar</button>
                    <button className='btn btn-danger'>Cancelar</button>
                   </div>
                </ul>
            </div>
        </div>
    
    </main>
  )
}

export default Ventas