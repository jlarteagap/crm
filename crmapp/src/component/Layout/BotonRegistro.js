import React from 'react'
import {Link } from 'react-router-dom'
const BotonRegistro = ({session}) => {
    const { rol } = session.session.obtenerUsuario
    if(rol !== "ADMINISTRADOR") return null
    return(
        <Link to="/registro"
            className="btn btn-warning ml-2 mt-2 mt-sm-0">Registro Clientes
        </Link>
    )
}

export default BotonRegistro