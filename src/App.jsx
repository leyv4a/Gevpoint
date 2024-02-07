import React from 'react'
import Sidebar from './components/shared/sidebar'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from "react-router-dom";
import Productos from "./components/pages/productos";
import Dashboard from "./components/pages/Dashboard";
import ProductosEntradas from "./components/pages/ProductosEntradas";


function App() {
  return (
     <div className='container-fluid bg-dark-subtle '>
     <div className='row'> 
        <div className='col-auto bg-dark col-md-1 order-first min-vh-100 border-end border-3 border-light' style={{"--bs-border-opacity": ".5"}}>
            <Sidebar/>
        </div>
        <div className='col-auto col-md-11 order-last'>
          <Routes>
            <Route path="/productos" element={<Productos/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/productos/entradas" element={<ProductosEntradas/>}/>
          </Routes>
        </div>
     </div>
      </div>
  )
}

export default App