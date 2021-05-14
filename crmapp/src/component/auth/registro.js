import React, { Component, Fragment } from 'react'
import {Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { CREAR_USUARIO } from '../../mutation'

import Error from '../Alert/Error'
const initialState = {
    usuario: '',
    password: '',
    nombre: '',
    rol: '',
    repetirPassword: ''
}

class Registro extends Component{
    state = {...initialState}

    limpiarState = ()=>{
        this.setState({...initialState})
    }
    actualizarState = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    creandoRegistro = (e, crearUsuario) => {
        e.preventDefault()

        crearUsuario().then(data => {
            this.limpiarState()
            this.props.history.push('/login')
        })
    }
    validarForm = () => {
        const {usuario, password, repetirPassword, nombre, rol} = this.state

        const noValido = !usuario || !nombre || !password || !rol || password !== repetirPassword

        return noValido
    }
    render(){
        const {usuario, password, repetirPassword, nombre, rol} = this.state
        return(
            <Fragment>
            <h1 className="text-center mb-5">Nuevo Usuario</h1>
                <div className="row  justify-content-center">
                    <Mutation
                        mutation={CREAR_USUARIO}
                        variables={{usuario, password, nombre, rol}}>
                        
                        {(crearUsuario, {loading, error, data}) =>{
                            if(loading) return "Cargando..."
                            

                            return(
                                <form 
                                    className="col-md-8"
                                    onSubmit = {e => this.creandoRegistro(e, crearUsuario)}
                                    >
                                        {error && <Error error ={error} />}
                                        <div className="form-group">
                                            <label>Usuario</label>
                                            <input 
                                                onChange={this.actualizarState}
                                                type="text" 
                                                name="usuario" 
                                                className="form-control" 
                                                placeholder="Nombre Usuario"
                                                value={usuario} 
                                                />
                                        </div>
                                        <div className="form-group">
                                            <label>Nombre Completo</label>
                                            <input 
                                                onChange={this.actualizarState}
                                                type="text" 
                                                name="nombre" 
                                                className="form-control" 
                                                placeholder="Nombre Completo"
                                                value={nombre} 
                                                />
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label>Password</label>
                                                <input 
                                                    onChange={this.actualizarState}
                                                    type="password" 
                                                    name="password" 
                                                    className="form-control" 
                                                    placeholder="Password"
                                                    value={password}
                                                    />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label>Repetir Password</label>
                                                <input 
                                                    onChange={this.actualizarState}
                                                    type="password" 
                                                    name="repetirPassword" 
                                                    className="form-control" 
                                                    placeholder="Repetir Password" 
                                                    value={repetirPassword}
                                                    />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Rol</label>
                                            <select
                                                className="form-control"
                                                value={rol}
                                                name="rol"
                                                onChange={this.actualizarState}
                                            >
                                                <option value="">Elegir opcion...</option>
                                                <option value="ADMINISTRADOR">ADMINISTRADOR</option>
                                                <option value="VENDEDOR">VENDEDOR</option>
                                            </select>
                                        </div>
                                        <button 
                                            disabled = {this.validarForm()}
                                            type="submit" 
                                            className="btn btn-success float-right">
                                                Crear Usuario
                                        </button>
                            </form>
                            )
                        }}
                                
                    </Mutation>
            </div>
        </Fragment>
        )
    }
}

export default withRouter(Registro)