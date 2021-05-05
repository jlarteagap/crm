import React from 'react'
import {Query, Mutation } from 'react-apollo'
import { PRODUCT_QUERY } from '../../queries'
import {ACTUALIZAR_ESTADO} from '../../mutation'
import ResumenPedidos from './ResumenPedido'

const Pedido = (props) => {
    const {pedido} = props
    const {id, estado} = pedido
    const fecha = new Date(Number(pedido.fecha))

    let border
    if (estado === "PENDIENTE" ){
        border = "border-light"
    } else if (estado === "CANCELADO"){
        border = "border-danger"
    } else {
        border = "border-success"
    }

    return(
        <div className="col-md-4">
            <div className={`card mb-3 ${border}`} >
                <div className="card-body">
                    <p className="card-text font-weight-bold ">Estado:
                        <Mutation mutation={ACTUALIZAR_ESTADO}>
                            {actualizarEstado => (

                                <select 
                                    className="form-control my-3" 
                                    defaultValue={pedido.estado}
                                    onChange = { e => {

                                        const input = {
                                            id,
                                            pedido: pedido.pedido,
                                            fecha: pedido.fecha,
                                            total: pedido.total,
                                            cliente: props.cliente,
                                            estado: e.target.value
                                        }
                                        
                                        actualizarEstado({
                                            variables: {input}
                                        })
                                    }}
                                    >
                                        <option value="PENDIENTE">PENDIENTE</option>
                                        <option value="APROBADO">APROBADO</option>
                                        <option value="CANCELADO">CANCELADO</option>
                                </select>
                            )
                            }
                        </Mutation>
                    </p> 
                    <p className="card-text font-weight-bold">Pedido ID:
                        <span className="font-weight-normal"> {pedido.id}</span>
                    </p> 
                    <p className="card-text font-weight-bold">Fecha Pedido: 
                        <span className="font-weight-normal"> {fecha.toLocaleDateString("es-BO")}</span>
                    </p>
                    <p className="card-text font-weight-bold">Total: 
                        <span className="font-weight-normal"> {pedido.total}</span>
                    </p>

                    <h3 className="card-text text-center mb-3">Artículos del pedido</h3>
                    {pedido.pedido.map(producto => {
                        const {id} = producto
                        return(
                            <Query key={producto.id} query={PRODUCT_QUERY} variables={{id}}>
                                {({loading, error, data}) => {
                                    if(loading) return 'cargando..'
                                    if(error) return `Error ${error.message}`
                                    
                                    return(
                                        <ResumenPedidos 
                                            producto = {data.getProduct}
                                            cantidad = {producto.cantidad}
                                            key = {producto.id}
                                        />
                                    )}
                                }
                            </Query>
                        )
                    })}
                </div>
            </div>
        </div>
    )   
}

export default Pedido