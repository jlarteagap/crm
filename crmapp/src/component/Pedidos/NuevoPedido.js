import React, { Component, Fragment } from 'react'
import { Query } from 'react-apollo'
import { PRODUCTS_QUERY} from '../../queries'

import ContenidoProducto from './ContenidoProducto'
import {withRouter} from 'react-router-dom'
import DatosCliente from './DatosCliente'

class NuevoPedido extends Component{
    render(){
        const { id } = this.props.match.params
        return(
            <Fragment>
                <h2 className="text-center my-5">Nuevo Pedido</h2>
                <div className="row">
                    <div className="col-md-3">
                        <DatosCliente
                            id = { id }
                        />
                    </div>
                    <div className="col-md-9">
                        <Query query={PRODUCTS_QUERY}>
                            {({loading, error, data})=> {
                                if(loading) return "Cargando...";
                                if(error) return `Error ${error.message}`

                                return(
                                    <ContenidoProducto
                                        id = {id}
                                        productos = {data.getProducts}
                                    />
                                )
                            }}
                        </Query>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default withRouter(NuevoPedido);