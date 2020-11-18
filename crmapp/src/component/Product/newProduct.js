import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import { ADD_PRODUCT } from '../../mutation'
import { Mutation } from 'react-apollo'

const initialState = {
    name: '',
    price: '',
    stock: ''
}
class NewProduct extends Component {
    state = {
        ...initialState
    }

    cleanState = () => {
        this.setState({
            ...initialState
        })
    }
    updateProducto = e => {
        const {name, value} = e.target

        this.setState({
            [name] : value
        })
    }

    disableForm = () => {
        const {name, price, stock} = this.state;
        const noValidate = !name || !price || !stock;
        return noValidate;
    }

    createNewProduct = (e, newProduct) => {
        e.preventDefault();

        // insertando en la base de datos
        newProduct().then(data =>{
            // console.log(data)
            this.cleanState()
            this.props.history.push('/products')
        })
    }

    render(){

        const {name, price, stock } = this.state

        const input = {
            name, 
            price: Number(price),
            stock: Number(stock)
        }

        return(
            <Fragment>
                <h1 className="text-center mb-5">Agregar nuevo prodcuto</h1>
                <div className="row justify-content-center">
                    <Mutation 
                        mutation = { ADD_PRODUCT } 
                        variables = {{input }}>
                        {(NewProduct, {loading, error, data}) => {
                            return(
                                <form className="col-md-8" onSubmit = {e => this.createNewProduct(e, NewProduct)}>
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input 
                            type="text" 
                            name="name" 
                            placeholder="Nombre del producto" 
                            className="form-control"
                            onChange = {this.updateProducto}
                            />
                        </div>
                        <div className="form-group">
                            <label>Precio:</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">$</div>
                                </div>
                            </div>
                            <input 
                                type="number" 
                                name="price" 
                                className="form-control" 
                                onChange = {this.updateProducto}
                                />
                        </div>
                        <div className="form-group">
                            <label>Stocl:</label>
                            <input 
                                type="number" 
                                name="stock" 
                                placeholder="Stock" 
                                className="form-control"
                                onChange = {this.updateProducto}
                                />
                        </div>
                        <button 
                            disabled = { this.disableForm() }
                            type="submit" 
                            className="btn btn-primary float-right">Agregar producto</button>
                    </form>
                    
                            )
                        }}
                    </Mutation>
                </div>
            </Fragment>
        )
    }
}

export default withRouter(NewProduct);

