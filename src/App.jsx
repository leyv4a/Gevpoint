import React from 'react'
import Sidebar from './components/shared/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Routes} from "react-router-dom";
import Productos from "./components/pages/Productos";
import Dashboard from "./components/pages/Dashboard";
import ProductosEntradas from "./components/pages/ProductosEntradas";
import Ventas from "./components/pages/Ventas";


function App() {
  return (
     <div className='container-fluid bg-dark-subtle '>
     <div className='row'> 
        <div className='col-auto bg-dark col-md-1 order-first border-end border-3 border-light' style={{"--bs-border-opacity": ".5", height: '100vh'}}>
            <Sidebar/>
        </div>
        <div className='col-auto col-md-11 order-last ' style={{overflowY: 'hidden'}}   >
          <Routes>
            <Route path="/productos" element={<Productos/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/productos/entradas" element={<ProductosEntradas/>}/>
            <Route path="/ventas" element={<Ventas/>}/>
          </Routes>
        </div>
     </div>
      </div>
  )
}

export default App