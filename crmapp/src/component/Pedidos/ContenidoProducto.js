import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Resumen from './Resumen';


class ContenidoProducto extends Component{
    state = {
        productos: []
    }
    
    seleccionarProducto = (seleccion) => {
        this.setState({
            productos: seleccion
        })
    }
    render(){
        return(
            <Fragment>
                <h3 className="text-center">Productos</h3>
                <Select
                    onChange = {this.seleccionarProducto}
                    options = {this.props.productos}
                    isMulti = {true}
                    components = {makeAnimated()}
                    placeholder="Seleccionar Producto"
                    getOptionValue = {(options) => options.id}
                    getOptionLabel = {(options) => options.name}
                />
                <Resumen
                    productos = {this.state.productos}
                />
            </Fragment>
        )
    }
}

export default ContenidoProducto;