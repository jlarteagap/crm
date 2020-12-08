import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex">
        <div className="container">
            <Link to="/" className="navbar-brand text-light font-weight-bold">CRM</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navegacion" aria-controls="navegacion" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navegacion">
                <ul className="navbar-nav ml-auto text-right">
                    <li className="nav-item dropdown">
                        <button className="nav-link dropdown-toggle btn-blog btn btn-success " data-toggle="dropdown">
                            Clientes
                        </button>
                        <div className="dropdown-menu" aria-labelledby="navegation">
                            <Link to="/clients" className="dropdown-item">Ver Clientes</Link>
                            <Link to="/clients/new" className="dropdown-item">Agregar Cliente</Link>
                        </div>
                    </li>
                    <li className="ml-2 nav-item dropdown">
                        <button className="nav-link dropdown-toggle btn-blog btn btn-success " data-toggle="dropdown">
                            Productos
                        </button>
                        <div className="dropdown-menu" aria-labelledby="navegation">
                            <Link to="/products" className="dropdown-item">Ver Productos</Link>
                            <Link to="/products/new" className="dropdown-item">Agregar Productos</Link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

export default Header;