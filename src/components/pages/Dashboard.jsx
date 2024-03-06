import { FaChartArea } from "react-icons/fa";
import { FaCrown } from "react-icons/fa";
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";
import VentaMensual from '../charts/MesVenta';
import TopCincoProductos from "../charts/TopCincoProductos";
import MesVentaLine from "../charts/MesVentaLine";

function Dashboard() {

  //Datos para las tarjetas del dashboards
  const [mes, setMes] = useState('');
  const [gananciasB, setGananciasB] = useState(0);
  const [totales, setTotales] = useState(0);
  
  const [gananciasN, setGananciasN] = useState(0);
  const [productoTop, setProductoTop] = useState([]);
  const [ventaMensual, setVentaMensual] = useState([]);
  const [topCinco, setTopCinco] = useState([]);

  const formatCurrencies = (currency) => { 
    const formater = new Intl.NumberFormat('es-MX',{
       style: 'currency',
       currency: 'MXN'
   })
   return formater.format(currency);
}

const getTopCinco = () =>{
  Axios.get('http://localhost:3001/topcinco').then(response => {
    setTopCinco(response.data);
  }).catch(err=> {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "¡Algo salio mal!",
      text : `${err.message}`,
      showConfirmButton: false,
      timer: 1500
    });
  });
}

const getVentaMensual = () =>{
  Axios.get('http://localhost:3001/sale/daily').then(response=>{
    setVentaMensual(response.data);
  }).catch(error=>{
    Swal.fire({
      position: "center",
      icon: "error",
      title: "¡Algo salio mal!",
      text : `${error.message}`,
      showConfirmButton: false,
      timer: 1500
    });
  });
}

  const getTotales = () => {
    Axios.get('http://localhost:3001/totales').then(response=>{
    setTotales(response.data[0].GastosTotales);
    setMes(response.data[0].Mes);
    setGananciasB(response.data[0].GananciasBrutas);
    setGananciasN(response.data[0].GananciasNetas);
    }).catch(error=>{
      Swal.fire({
        position: "center",
        icon: "error",
        title: "¡Algo salio mal!",
        text : `${error.message}`,
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  const getMasVendido = ()=>{
    try {
        Axios.get('http://localhost:3001/top').then(response=>{
        setProductoTop(response.data[0]);
        }).catch(error => {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Algo salio mal...",
                showConfirmButton: false,
                timer: 1500
              });
        });
    } catch (error) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "Algo salio mal...",
            showConfirmButton: false,
            timer: 1500
          });
    }
}



  useEffect(()=>{
    getTotales();
    getMasVendido();
    getVentaMensual();
    getTopCinco();
  },[]);

  return (
    <main className="m-3" style={{ height: "83vh" }}>
       <div className="encabezado mb-1 py-1 px-2">
      <h2 className=""><FaChartArea/> Registro mensual {mes}</h2>
        </div>
      <hr />
      <div className="mt-2 h-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col text-center mb-2 py-2" style={{height: '83vh'}}>
             
              <div className="cards-info d-flex gap-2 flex-column" style={{width: '86vw'}}>
                <div className="d-flex flex-row gap-4 justify-content-evenly">
                  <div className="card text-bg-light mb-3" style={{width: '25%',maxWidth: '25%'}}>
                  <div className="card-header fs-5">Ganancias brutas</div>
                  <div className="card-body">
                    <h5 className="card-title fs-2"><strong>{formatCurrencies(gananciasB)}</strong></h5>
                  </div>
                  </div>

                  <div className="card text-bg-light mb-3" style={{width: '25%',maxWidth: '25%'}}>
                  <div className="card-header fs-5">Gastos totales</div>
                  <div className="card-body">
                    <h5 className="card-title fs-2"><strong>{formatCurrencies(totales)}</strong></h5>
                  </div>
                  </div>

                  <div className="card text-bg-light mb-3" style={{width: '25%',maxWidth: '25%'}} >
                  <div className="card-header fs-5">Ganancias netas</div>
                  <div className="card-body">
                    <h5 className="card-title fs-2"><strong>{formatCurrencies(gananciasN)}</strong></h5>
                  </div>
                  </div>

                  <div className="card text-bg-light mb-3" style={{width: '25%',maxWidth: '25%'}}>
                  <div className="card-header fs-5">Margen </div>
                  <div className="card-body">
                    <h5 className="card-title fs-3"><strong>Margen de ganancia</strong></h5>
                  </div>
                  </div>
                </div>
              </div>


              <div className=" d-flex" style={{width: '86vw'}}>
                <VentaMensual data={ventaMensual}/>
                {/* <MesVentaLine data={ventaMensual}/> */}
                
                <div className="d-flex " style={{width: '40%'}}>
                  <div className="" style={{width: '100%'}}>
                    <div>
                      <h3><strong>5 Productos mas vendidos</strong></h3>
                    </div>
                    <TopCincoProductos data={topCinco} />
                    <div className="card text-bg-light mx-auto mt-3" style={{width: '95%',maxWidth: '95%'}}>
                  <div className="fs-3 text-warning"><FaCrown /></div>
                  <div className="card-body">
                    <h5 className="card-title fs-2"><strong>{productoTop.Producto+ "  ("+ productoTop.TotalVendidoMes+")"}</strong></h5>
                  </div>
                  </div>
                  </div>
                </div>
              </div>
                  <div className="d-flex gap-2 mt-2" style={{width: '100%', height: '10%'}}>
                      <div  className="fs-1" style={{width: '20%'}}><span style={{width: '100%'}} class="badge text-bg-light">New</span></div>
                      <div  className="fs-1" style={{width: '20%'}}><span style={{width: '100%'}} class="badge text-bg-light">New</span></div>
                      <div  className="fs-1" style={{width: '20%'}}><span style={{width: '100%'}} class="badge text-bg-light">New</span></div>
                      <div  className="fs-1" style={{width: '20%'}}><span style={{width: '100%'}} class="badge text-bg-light">New</span></div>
                      <div  className="fs-1" style={{width: '20%'}}><span style={{width: '100%'}} class="badge text-bg-light">New</span></div>
                  </div>
             
             
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
