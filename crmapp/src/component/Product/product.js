import React, { Component, Fragment } from 'react'
import { Query} from 'react-apollo'
import { Link } from 'react-router-dom';
import { PRODUCTS_QUERY } from '../../queries'

class Products extends Component {
    render(){
        return(
            <Fragment>
                <h2 className="text-center mb-5">Productos</h2>
                <Query query = { PRODUCTS_QUERY } pollInterval = {1000}>
                    {({ loading, error, data, startPolling, stopPolling }) => {
                        if(loading) return "cargando...";
                        if(error) return `Error ${error.message}`

                        console.log(data)

                        return(
                            <table className="table">
                                <thead>
                                    <tr className="table-primary">
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">Stock</th>
                                        <th scope="col">Eliminar</th>
                                        <th scope="col">Editar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.getProducts.map(item => {
                                        const {id} = item;

                                        return(
                                            <tr key={id}>
                                                <td>{item.name}</td>
                                                <td>{item.price}</td>
                                                <td>{item.stock}</td>
                                                <td>
                                                    <button type="button" className="btn btn-danger">
                                                        &times; Eliminar
                                                    </button> 
                                                </td>
                                                <td>
                                                    <Link to={`products/edit/${id}`} className="btn btn-success">
                                                        Editar
                                                    </Link>
                                                </td>
                                            </tr>
                                        )

                                    })}
                                </tbody>
                            </table>
                        )
                    }}
                </Query>
            </Fragment>
        )
    }
}

export default Products;