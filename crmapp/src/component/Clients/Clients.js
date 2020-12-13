import React, { Component, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import { CLIENTS_QUERY } from '../../queries'
import { DELETE_CLIENT } from '../../mutation'

import Exit from '../Alert/exit';
import Paginator from '../Layout/Paginator'

class Clients extends Component {
     /* limite para las paginas, se la pasamos al component paginator como props */ 
    limit = 10;
    state = {
        alert: {
            show: false,
            message: ''
        },
        page: {
            offset: 0,
            actual: 1
        }
    }
    
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

    render(){
        // Mostrar alerta
        const {alert: {show, message} } = this.state;
        const showAlert = (show) ? <Exit message={message} /> : '';

        return(    
            <Query query = { CLIENTS_QUERY } pollInterval = {1000} variables = {{ limit: this.limit, offset: this.state.page.offset }}>
        {({ loading, error, data, startPolling, stopPolling }) => {
            if(loading) return "cargando...";
            if(error) return `Error ${error.message}`

            return(
                <Fragment>
                    <h2>Listado de clientes</h2>
                    {/* Alerta */}
                    { showAlert }

                    <ul className="list-group m-4">
                        {data.getClients.map(client => {
                            const {id} = client
                            return(
                                <li key={client.id} className="list-group-item">
                                    <div className="row justify-content-between aling-items-center">
                                        <div className="col-md-8 d-flex justify-content-between aling-items-center">
                                            {client.name} {client.lastname}
                                        </div>
                                        <div className="col-md-4 d-flex justify-content-end">
                                            <Link to={`/pedidos/nuevos/${id}`}
                                                className="btn btn-warning mr-2 d-block d-md-inline-block"
                                            >
                                                &#43; Nuevo Pedido
                                            </Link>
                                            <Mutation 
                                                mutation={DELETE_CLIENT}
                                                onCompleted={(data) => {
                                                    // console.log(data)
                                                    this.setState({
                                                        alert:{
                                                            show: true,
                                                            message: data.deleteClient
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
                                                }}
                                                >
                                                {deleteClient => (
                                                    <button 
                                                    type="button" 
                                                    className="btn btn-danger d-block d-md-inline-block mr-2"
                                                    onClick={ () => {
                                                        if(window.confirm("Seguro quieres eliminar este cliente")){
                                                            deleteClient({
                                                                variables: {id}
                                                            })
                                                        }
                                                    }}
                                                    >&times; Eliminar
                                                    </button>
                                                    )}
                                            </Mutation>
                                            <Link to={`/clients/edit/${client.id}`} className="btn btn-success d-block d-md-inline-block">
                                                Editar cliente
                                            </Link>
                                        </div> 
                                    </div>
                                </li>
                            )
                        } )}
                    </ul>
                    <Paginator
                        actual = {this.state.page.actual}
                        total = {data.totalClients}
                        limit = {this.limit}
                        prevPage = {this.prevPage}
                        nextPage = {this.nextPage}
                    />
                </Fragment>
            )
        }}
    </Query>
        )
    }
}

export default Clients;