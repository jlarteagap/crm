import React from 'react'

const ResumenPedidos = ({cantidad, producto}) => {
    
    return(
        <>
            <div className="border mb-4 p-4">
                <p className="card-text font-weight-bold">Producto: 
                    <span className="font-weight-normal"> {producto.name}</span>
                </p>
                <p className="card-text font-weight-bold">Cantidad: 
                    <span className="font-weight-normal"> {cantidad}</span>
                </p>
                <p className="card-text font-weight-bold">Precio: 
                    <span className="font-weight-normal"> {producto.price}</span>
                </p>
    
            </div>
        </>
    ) 
}
export default ResumenPedidos