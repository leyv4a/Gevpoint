import { FaChartArea } from "react-icons/fa";
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";

function Dashboard() {

  //Datos para las tarjetas del dashboards
  const [mes, setMes] = useState('');
  const [gananciasB, setGananciasB] = useState(0);
  const [totales, setTotales] = useState(0);
  const [gananciasN, setGananciasN] = useState(0);
  const [productoTop, setProductoTop] = useState([]);

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
            <div className="col text-center mb-2 py-2">
             
              <div className="cards-info d-flex gap-2 flex-column">
                <div className="d-flex flex-row gap-4">
                  <div className="card text-bg-warning mb-3" style={{width: '12rem',maxWidth: '18rem'}}>
                  <div className="card-header fs-5">Ganancias brutas</div>
                  <div className="card-body">
                    <h5 className="card-title fs-2">{gananciasB}</h5>
                  </div>
                  </div>

                  <div className="card text-bg-danger mb-3" style={{width: '12rem',maxWidth: '18rem'}}>
                  <div className="card-header fs-5">Gastos totales</div>
                  <div className="card-body">
                    <h5 className="card-title fs-2">{totales}</h5>
                  </div>
                  </div>

                  <div className="card text-bg-success mb-3" style={{width: '12rem',maxWidth: '18rem'}}>
                  <div className="card-header fs-5">Ganancias netas</div>
                  <div className="card-body">
                    <h5 className="card-title fs-2">{gananciasN}</h5>
                  </div>
                  </div>

                  <div className="card text-bg-success mb-3" style={{width: '12rem',maxWidth: '18rem'}}>
                  <div className="card-header fs-5">Producto TOP</div>
                  <div className="card-body">
                    <h5 className="card-title fs-3">{productoTop.Producto+ "  ("+ productoTop.TotalVendidoMes+")"}</h5>
                  </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
