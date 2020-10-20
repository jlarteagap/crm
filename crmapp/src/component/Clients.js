import React, { Component, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import { CLIENTS_QUERY } from '../queries'
import { DELETE_CLIENT } from '../mutation'

import Paginator from './Paginator'

class Clients extends Component {
     /* limite para las paginas, se la pasamos al component paginator como props */ 
    limit = 10;
    state = {
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
        return(    
            <Query query = { CLIENTS_QUERY } pollInterval = {1000} variables = {{ limit: this.limit, offset: this.state.page.offset }}>
        {({ loading, error, data, startPolling, stopPolling }) => {
            if(loading) return "cargando...";
            if(error) return `Error ${error.message}`

            return(
                <Fragment>
                    <h2>Listado de clientes</h2>
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
                                            <Mutation mutation={DELETE_CLIENT}>
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
                                            <Link to={`/client/edit/${client.id}`} className="btn btn-success d-block d-md-inline-block">
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
                        totalClients = {data.totalClients}
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