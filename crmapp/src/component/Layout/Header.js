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
                    <li className="nav-item active">
                        <Link className="btn btn-success mr-2" to="/client/add">Nuevo Cliente</Link>
                        <Link className="btn btn-success" to="/products/new">Nuevo Producto</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

export default Header;