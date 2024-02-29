import React from "react";

function Ventas() {
  return (
    <main className="m-3">
      <div className="header">
        <h2 className="d-flex align-items-center gap-2"> Punto de venta</h2>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <div>
              <ul className="navbar-nav">
                <form className="d-flex me-2" role="search">
                  <input
                    className="form-control me-2"
                    type="text"
                    placeholder="Codigo"
                    aria-label="codigo"
                  />
                  <button className="btn btn-outline-success" type="submit">
                    Agregar
                  </button>
                </form>
                <li className="nav-item">
                  <select className="form-select" style={{ cursor: "pointer" }}>
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
      <div className="row">
        <div className="col-md-8 ">
          <table className="table table-striped table-hover">
            <thead className="sticky-top">
              <tr>
                <th scope="col">Cantidad</th>
                <th scope="col">Nombre</th>
                <th scope="col">Unidad</th>
                <th scope="col">Impuesto</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td width={"5"}>
                  <input min="0" type="number" />
                </td>
                <td>Manzana</td>
                <td>32</td>
                <td>N/A</td>
              </tr>
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
                    $125
                  </li>
                  <li className="mb-2">
                   $0
                  </li>
                  <li className="mb-2">
                   $0
                  </li>
                  <li className="mb-2">
                   <strong>$125</strong>
                  </li>
                </ul>
              </div>
            </div>
            <div className="d-grid gap-2 p-2">
              <button className="btn btn-success">Procesar</button>
              <button className="btn btn-danger">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Ventas;
