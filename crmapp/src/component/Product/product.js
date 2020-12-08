import React, { Component, Fragment } from 'react'
import { Query, Mutation} from 'react-apollo'
import { Link } from 'react-router-dom';
import { PRODUCTS_QUERY } from '../../queries'
import { DELETE_PRODUCT } from '../../mutation'
import Exit from '../Alert/exit';

import Paginator from '../Layout/Paginator'
class Products extends Component {
   /* limite para las paginas, se la pasamos al component paginator como props */ 
   limit = 3;
 
   
   nextPage = () => {
       this.setState({
           page: {
               offset: this.state.page.offset + this.limit,
               actual: this.state.page.actual + 1
           }
       })
   }
   prevPage = () => {
       this.setState({
           page: {
               offset: this.state.page.offset - this.limit,
               actual: this.state.page.actual - 1
           }
       })
   }
    state ={
        alert: {
            show: false,
            message: ''
        },
        page: {
            offset: 0,
            actual: 1
        }
    }
    render(){

        const {alert: {show, message} } = this.state;
        const showAlert = (show) ? <Exit message={message} /> : '';

        return(
            <Fragment>
                <h2 className="text-center mb-5">Productos</h2>

                { showAlert }
                <Query 
                    query = { PRODUCTS_QUERY } 
                    pollInterval = {1000}
                    variables = {{limit: this.limit, offset: this.state.page.offset}}
                    >
                    {({ loading, error, data, startPolling, stopPolling }) => {
                        if(loading) return "cargando...";
                        if(error) return `Error ${error.message}`
                        return(
                            <Fragment>

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
                                                <Mutation 
                                                    mutation={DELETE_PRODUCT}
                                                    // Este "data" viene desde los resolvers
                                                    onCompleted={(data) => {
                                                        // console.log(data)
                                                        this.setState({
                                                            alert:{
                                                                show: true,
                                                                message: data.deleteProduct
                                                            }
                                                        }, () => {
                                                            // Tiene un Callback que hara que se ejecute algo despues de eso.
                                                            setTimeout(() => {
                                                                this.setState({
                                                                    alert: {
                                                                        show: false,
                                                                        message: ''
                                                                    }
                                                                })
                                                            }, 3000)
                                                        }
                                                        )
                                                    }}>
                                                {deleteProduct => (
                                                    <button 
                                                    type="button" 
                                                    className="btn btn-danger"
                                                    onClick={ () => {
                                                        if(window.confirm("Seguro quieres eliminar este Producto")){
                                                            deleteProduct({
                                                                variables: {id}
                                                            })
                                                        }
                                                    }}
                                                    >&times; Eliminar
                                                    </button>
                                                    )}
                                            </Mutation>
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
                            <Paginator
                                actual = {this.state.page.actual}
                                total = {data.totalProducts}
                                limit = {this.limit}
                                prevPage = {this.prevPage}
                                nextPage = {this.nextPage}
                            />
                        </Fragment>
                        
                        )
                    }}


                </Query>

                
            </Fragment>
        )
    }
}

export default Products;