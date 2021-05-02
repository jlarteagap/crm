import React, { Fragment } from 'react'
import {withRouter} from 'react-router-dom'

import {Query } from 'react-apollo'
import {OBTENER_PEDIDOS} from '../../queries'
import Pedido from './Pedidos'
const PedidosCliente = (props) => {

    const cliente = props.match.params.id

    return(
        <Fragment>
            <h2 className="text-center my-4">Pedidos del cliente</h2>
            <div className="row">
                <Query query={OBTENER_PEDIDOS} variables={{cliente}} pollInterval={1500}>
                    {({loading, error, data, startPolling, stopPolling}) => {
                        if(loading) return 'cargando..'
                        if(error) return `Error ${error.message}`
                        return(
                          data.obtenerPedidos.map(pedido => (
                              <Pedido
                                key = {pedido.id}
                                pedido = {pedido}
                                cliente = {cliente}
                                />
                          )
                          )
                        )
                    }}
                </Query>
            </div>
        </Fragment>
    )
}

export default withRouter(PedidosCliente);