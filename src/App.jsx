import React from 'react'
import Sidebar from './components/shared/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from "react-router-dom";
import Productos from "./components/pages/Productos";
import ProductosEntradas from "./components/pages/ProductosEntradas";
import ProductosAgregar from "./components/pages/ProductosAgregar";
import Ingresos from './components/pages/Ingresos';
import Egresos from './components/pages/Egresos';
import Categorias from "./components/pages/Categorias";
import Dashboard from "./components/pages/Dashboard";
import Ventas from "./components/pages/Ventas";
import ProductosSalidas from './components/pages/ProductosSalidas';


function App() {
  return (
     <div className='container-fluid bg-dark-subtle d-sm-none d-none d-md-block d-lg-block d-xl-block'>
     <div className='row'> 
        <div className='col-auto bg-dark col-md-1 order-first border-end border-3 border-light' style={{"--bs-border-opacity": ".5", height: '100vh'}}>
            <Sidebar/>
        </div>
        <div className='col-auto col-md-11 order-last ' style={{overflowY: 'hidden'}}   >
          <Routes>
            <Route path="/productos" element={<Productos/>}/>
            <Route path="/productos/entradas" element={<ProductosEntradas/>}/>
            <Route path="/productos/salidas" element={<ProductosSalidas/>}/>
            <Route path="/productos/agregar" element={<ProductosAgregar/>}/>
            <Route path="/productos/categorias" element={<Categorias/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/ventas" element={<Ventas/>}/>
            <Route path="/ingresos" element={<Ingresos/>}/>
            <Route path="/egresos" element={<Egresos/>}/>

          </Routes>
        </div>
     </div>
      </div>
  )
}

export default App