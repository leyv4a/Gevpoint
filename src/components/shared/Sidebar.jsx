import React from "react";
import { IoIosSpeedometer } from "react-icons/io";
import { FaTag, FaShoppingCart } from "react-icons/fa";
import {Link, NavLink } from "react-router-dom";
import Gevpoint from "../../../public/gevpoint.svg";
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
function Sidebar() {
  //Collapse inventario
  const [open, setOpen] = useState(false);

  return (
        <div>
            <Link to={"/"} className="mt-2 text-dark fs-5 d-flex justify-content-start ">
                <span className="mx-auto">
                <svg width="40.4" height="61.6" viewBox="0 0 202 308" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M46 75V57.75C46 27.5124 70.5124 3 100.75 3V3C130.988 3 155.5 27.5124 155.5 57.75V75" stroke="#63116A" strokeWidth="5"/>
                  <path d="M0 270.5V75H175.5V270.5H0Z" fill="#791682"/>
                  <path d="M0 75L28 57H202L176 75H0Z" fill="#610D68"/>
                  <path d="M175 271V75L201.626 57.2496V253.25L175 271Z" fill="#63116A"/>
                  <path d="M38 75V57.75C38 27.5124 62.5124 3 92.75 3V3C122.988 3 147.5 27.5124 147.5 57.75V75" stroke="#791682" strokeWidth="5"/>
                  <path d="M130.045 151C128.483 146.218 126.423 141.933 123.866 138.145C121.357 134.31 118.35 131.043 114.847 128.344C111.39 125.645 107.46 123.585 103.057 122.165C98.6534 120.744 93.8239 120.034 88.5682 120.034C79.9508 120.034 72.1146 122.259 65.0597 126.71C58.0047 131.161 52.3939 137.719 48.2273 146.384C44.0606 155.048 41.9773 165.678 41.9773 178.273C41.9773 190.867 44.0843 201.497 48.2983 210.162C52.5123 218.827 58.2178 225.384 65.4148 229.835C72.6117 234.286 80.7083 236.511 89.7045 236.511C98.0379 236.511 105.377 234.736 111.722 231.185C118.114 227.586 123.085 222.52 126.636 215.986C130.235 209.404 132.034 201.663 132.034 192.761L137.432 193.898H93.6818V178.273H149.08V193.898C149.08 205.877 146.523 216.294 141.409 225.148C136.343 234.002 129.335 240.867 120.386 245.744C111.485 250.574 101.258 252.989 89.7045 252.989C76.8258 252.989 65.5095 249.958 55.7557 243.898C46.0492 237.837 38.4735 229.22 33.0284 218.045C27.6307 206.871 24.9318 193.614 24.9318 178.273C24.9318 166.767 26.4706 156.421 29.5483 147.236C32.6733 138.003 37.0767 130.143 42.7585 123.656C48.4403 117.17 55.1638 112.198 62.929 108.741C70.6941 105.285 79.2405 103.557 88.5682 103.557C96.2386 103.557 103.388 104.717 110.017 107.037C116.693 109.31 122.635 112.553 127.844 116.767C133.099 120.934 137.479 125.929 140.983 131.753C144.487 137.529 146.902 143.945 148.227 151H130.045Z" fill="#BABABA"/>
                  <path d="M124.045 151C122.483 146.218 120.423 141.933 117.866 138.145C115.357 134.31 112.35 131.043 108.847 128.344C105.39 125.645 101.46 123.585 97.0568 122.165C92.6534 120.744 87.8239 120.034 82.5682 120.034C73.9508 120.034 66.1146 122.259 59.0597 126.71C52.0047 131.161 46.3939 137.719 42.2273 146.384C38.0606 155.048 35.9773 165.678 35.9773 178.273C35.9773 190.867 38.0843 201.497 42.2983 210.162C46.5123 218.827 52.2178 225.384 59.4148 229.835C66.6117 234.286 74.7083 236.511 83.7045 236.511C92.0379 236.511 99.3769 234.736 105.722 231.185C112.114 227.586 117.085 222.52 120.636 215.986C124.235 209.404 126.034 201.663 126.034 192.761L131.432 193.898H87.6818V178.273H143.08V193.898C143.08 205.877 140.523 216.294 135.409 225.148C130.343 234.002 123.335 240.867 114.386 245.744C105.485 250.574 95.2576 252.989 83.7045 252.989C70.8258 252.989 59.5095 249.958 49.7557 243.898C40.0492 237.837 32.4735 229.22 27.0284 218.045C21.6307 206.871 18.9318 193.614 18.9318 178.273C18.9318 166.767 20.4706 156.421 23.5483 147.236C26.6733 138.003 31.0767 130.143 36.7585 123.656C42.4403 117.17 49.1638 112.198 56.929 108.741C64.6941 105.285 73.2405 103.557 82.5682 103.557C90.2386 103.557 97.3883 104.717 104.017 107.037C110.693 109.31 116.635 112.553 121.844 116.767C127.099 120.934 131.479 125.929 134.983 131.753C138.487 137.529 140.902 143.945 142.227 151H124.045Z" fill="white"/>
                  <path d="M122.738 276.122L109.821 190.259C109.154 185.831 114.197 182.827 117.774 185.522L185.116 236.261C188.485 238.799 187.391 244.111 183.294 245.112L160.598 250.657L182.504 286.508C183.888 288.774 183.26 291.726 181.074 293.232L173.577 298.397C171.196 300.038 167.925 299.323 166.445 296.839L145.228 261.217L131.608 278.476C128.896 281.912 123.39 280.451 122.738 276.122Z" fill="#201F1F"/>
                  <path d="M122.738 274.122L109.821 188.259C109.154 183.831 114.197 180.827 117.774 183.522L185.116 234.261C188.485 236.799 187.391 242.111 183.294 243.112L160.598 248.657L182.504 284.508C183.888 286.774 183.26 289.726 181.074 291.232L173.577 296.397C171.196 298.038 167.925 297.323 166.445 294.839L145.228 259.217L131.608 276.476C128.896 279.912 123.39 278.451 122.738 274.122Z" fill="#3A3939"/>
                </svg>
                </span>
            </Link>
            <hr className="text-white"/>
        <div className="mt-4">
          <ul className="nav nav-pills flex-column align-items-center text-white text-decoration-none gap-4">
              <li><NavLink to={"/ventas"} data-bs-toggle="tooltip" data-bs-title="Default tooltip"><FaShoppingCart className="fs-2 text-white"/></NavLink></li>
              <li><NavLink to={"/dashboard"} data-bs-toggle="tooltip" data-bs-title="Default tooltip"><IoIosSpeedometer className="fs-2 text-white"/></NavLink></li>
              <li>
              <a style={{"cursor" : "pointer"}}  onClick={() => setOpen(!open)} aria-controls="collapseItems" aria-expanded={open}><FaTag className="fs-3 text-white"/></a>
                <Collapse in={open}>
                  <div id="collapseItems" className="mt-3">
                    <ul className="nav d-flex flex-column gap-2">
                      <li className="nav-item"><NavLink to={"/productos"} data-bs-toggle="tooltip" data-bs-title="Default tooltip" style={{"textDecoration": "none"}} className={"text-white"}>Stock</NavLink></li>
                      <li className="nav-item"><NavLink to={"/productos/entradas"} data-bs-toggle="tooltip" data-bs-title="Default tooltip" style={{"textDecoration": "none"}} className={"text-white"}>Entradas</NavLink></li>
                      <li className="nav-item"><NavLink to={"/productos/salidas"} data-bs-toggle="tooltip" data-bs-title="Default tooltip" style={{"textDecoration": "none"}} className={"text-white"}>Salidas</NavLink></li>
                      <li className="nav-item"><NavLink to={"/productos/agregar"} data-bs-toggle="tooltip" data-bs-title="Default tooltip" style={{"textDecoration": "none"}} className={"text-white"}>Productos</NavLink></li>
                      <li className="nav-item"><NavLink to={"/productos/categorias"} data-bs-toggle="tooltip" data-bs-title="Default tooltip" style={{"textDecoration": "none"}} className={"text-white"}>Categorias</NavLink></li>
                    </ul>
                  </div>
                </Collapse>
              </li>
         </ul>
        </div>
        </div>
  );
}

export default Sidebar;
