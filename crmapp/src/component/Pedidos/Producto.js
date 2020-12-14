import React, { Component, Fragment } from 'react'

class Producto extends Component {
    render(){
        const {producto} = this.props
        return(
            <Fragment>
                <tr>
                    <td>{producto.name}</td>
                    <td>$ {producto.price}</td>
                    <td>{producto.stock}</td>
                    <td><input type="number" className="form-control" /></td>
                    <td><button type="button" className="btn btn-danger">
                        &times; Eliminar
                        </button>
                    </td>
                </tr>
            </Fragment>
        )
    }
}

export default Producto;