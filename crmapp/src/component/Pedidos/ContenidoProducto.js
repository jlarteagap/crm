import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import GenerarPedido from './GenerarPedido';
import Resumen from './Resumen';
import Error from '../Alert/Error'
class ContenidoProducto extends Component{
    state = {
        productos: [],
        total: 0
    }
    
    seleccionarProducto = (seleccion) => {
        this.setState({
            productos: seleccion
        })
    }

    actualizarTotal = () => {
        const productos = this.state.productos

        if(productos.length === 0){
            this.setState({
                total: 0
            });

            return
        }
        let nuevoTotal = 0

        productos.map(producto => nuevoTotal += (producto.cantidad * producto.price))

        this.setState({
            total: nuevoTotal
        })

    }
    actualizarCantidad = (cantidad, index) => {
        // console.log(cantidad)
        const productos = this.state.productos

        productos[index].cantidad = Number(cantidad)
        
        // console.log(productos)
        this.setState({
            productos,
        }, ()=> {
            this.actualizarTotal()
        })
    }

    eliminarProducto = (id) => {
        // console.log(id)

        const productos = this.state.productos;

        const productosRestantes = productos.filter(producto => producto.id !== id);

        this.setState({
            productos: productosRestantes
        }, ()=> {
            this.actualizarTotal()
        })
    }
    render(){

        const mensaje = (this.state.total < 0 ) ? <Error error="Las cantidadades no pueden ser negativas" /> : '';
        
        return(
            <Fragment>
                <h3 className="text-center">Productos</h3>
                {mensaje}
                <Select
                    onChange = {this.seleccionarProducto}
                    options = {this.props.productos}
                    isMulti = {true}
                    components = {makeAnimated()}
                    placeholder="Seleccionar Producto"
                    getOptionValue = {(options) => options.id}
                    getOptionLabel = {(options) => options.name}
                    value = {this.state.productos}
                />
                <Resumen
                    productos = {this.state.productos}
                    actualizarCantidad = {this.actualizarCantidad}
                    eliminarProducto = {this.eliminarProducto}
                />
                <p className="float-right mt-3">
                    Total: <span>$ {this.state.total}</span>
                </p>
                <GenerarPedido
                    productos = {this.state.productos}
                    total = {this.state.total}
                    // enviamos el id del Cliente
                    clienteID = {this.props.id}
                />
            </Fragment>
        )
    }
}

export default ContenidoProducto;