import React from 'react';
import {Mutation} from 'react-apollo';
import {NUEVO_PEDIDO} from '../../mutation'
import {withRouter} from 'react-router-dom'


const validarPedido = (props) => {
    let noValido = !props.productos || props.total < 0
    return noValido
}

const GenerarPedido = (props ) => {
    return(
        <Mutation 
            mutation={NUEVO_PEDIDO}
            
           onCompleted= { () => props.history.push('/clients')}
           >
            {nuevoPedido => (
                <button
                    disabled = { validarPedido(props) }
                    type="button"
                    className="btn btn-warning mt-5"
                    onClick = {e => {
                        // Quitamos lo que no se necesita para crear el input  en este caso, name, stock y price
                        const productosInput = props.productos.map(({ name, stock, price, ...objeto}) => objeto);

                        // Creamos el input con los datos para enviar en el mutation 
                        const input = {
                            pedido: productosInput,
                            total: props.total,
                            cliente: props.clienteID
                        }

                        nuevoPedido({
                            variables: {input}
                        })
                    }}
                    >
                        Generar Pedido
                </button>
            )}
        </Mutation>
    )
}

export default withRouter(GenerarPedido);