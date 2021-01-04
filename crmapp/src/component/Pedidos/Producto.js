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
                    <td>
                        <input 
                        min = "1"
                        type="number" 
                        className="form-control"
                        onChange={e => {
                                if(e.target.value > producto.stock){
                                    e.target.value = 0
                                }
                                this.props.actualizarCantidad(e.target.value, this.props.index)
                                } 
                            }
                        />
                    </td>
                    <td><button 
                    
                        type="button" 
                        className="btn btn-danger"
                        onClick = {e => this.props.eliminarProducto(producto.id)}
                        >
                        &times; Eliminar
                        </button>
                    </td>
                </tr>
            </Fragment>
        )
    }
}

export default Producto;