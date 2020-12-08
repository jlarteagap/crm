import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {Mutation} from 'react-apollo'
import { UPDATE_PRODUCT } from '../../mutation'

const initialState = {
    name: '',
    price: '',
    stock: ''
}

class FormProduct extends Component{

    state = {
        ...this.props.product
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

    editProductForm = (e, updateProduct) => {
        e.preventDefault();

        updateProduct().then(data => {
            this.setState({
                ...initialState
            })
        })
    }

    render(){

        const {name, price, stock } = this.state
        const {id} = this.props

        const input = {
            id,
            name, 
            price: Number(price),
            stock: Number(stock)
        }
        return(
            <Mutation 
                mutation={UPDATE_PRODUCT} 
                variables={{input}} 
                key={ id }
                onCompleted = {() => this.props.refetch().then(() => {
                    this.props.history.push('/products')
                })}>

                {(updateProduct, {loading, error, data}) =>{
                    return(                
                        <form className="col-md-8"
                            onSubmit={e => this.editProductForm( e, updateProduct)}
                        >
                <div className="form-group">
                    <label>Nombre:</label>
                    <input 
                        onChange={this.updateProducto}
                        name="name"
                        className="form-control"
                        placeholder="Nombre del producto"
                        defaultValue={name}
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
                                defaultValue={price}
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
                                defaultValue={stock}
                                />
                        </div>
                        <button 
                            disabled = { this.disableForm() }
                            type="submit" 
                            className="btn btn-primary float-right">Editar producto
                        </button>
            </form>
                    )    
                }}
            </Mutation>
        )
    }
}

export default withRouter(FormProduct);