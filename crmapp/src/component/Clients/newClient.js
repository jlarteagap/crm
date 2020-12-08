import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import { ADD_CLIENT } from '../../mutation';
import { Mutation } from 'react-apollo'

class NewClient extends Component{
    state = {
        client: {
            name: "",
            lastname: "",
            enterprise: "",
            age: "",
            email: "",
            category: "",
        },
        error: false,
        emails:[]
    }

    newFieldEmail = () => {
        this.setState({
            emails: this.state.emails.concat([{email: ''}])
        }) 
    }

    deleteFieldEmail = i => () => {
        this.setState({
            emails: this.state.emails.filter((email, index) => i !== index)
        })
    }
    readField = i => e => {
        const newEmail = this.state.emails.map((email, index) => {
            if(i !== index) return email;
            return {
                ...email,
                email: e.target.value
            }
        });

        this.setState({
            emails: newEmail
        })
    }

    render(){
        return(
            <Fragment>
                <h2 className="text-center">Nuevo Cliente</h2>
                <div className="row justify-content-center">
                <Mutation 
                    mutation={ADD_CLIENT}
                    onCompleted = {() => this.props.history.push('/clients')}>
                    
                    {newclient => (
                    <form className="col-md-8 m-3" 
                        
                    onSubmit = { e => {
                    
                            e.preventDefault();
                        
                            const {name, lastname, enterprise, category, age} = this.state.client;

                            const {emails} = this.state;
                        
                            if(name === '' || lastname==='' || enterprise==='' || emails==='' || category==='' || age===''){
                                this.setState({
                                    error: true
                                });
                                return
                            }
                            this.setState({
                                error: false
                            })
                            const input = {
                                name,
                                lastname,
                                enterprise,
                                emails, 
                                category,
                                age: Number(age)
                            };
                            newclient({
                                variables: {input }
                            })
                            }
                        }
                    >
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Nombre</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Nombre"
                                    onChange = {e =>{
                                        this.setState({
                                            client: {
                                                ...this.state.client,
                                                name: e.target.value
                                            } 
                                        })
                                    }}
                                    />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Apellido</label>
                                <input type="text" className="form-control" placeholder="Apellido"
                                onChange = {e =>{
                                    this.setState({
                                        client: {
                                            ...this.state.client,
                                            lastname: e.target.value
                                        } 
                                    })
                                }}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label>Empresa</label>
                                <input type="text" className="form-control" placeholder="Empresa"
                                onChange = {e =>{
                                    this.setState({
                                        client: {
                                            ...this.state.client,
                                            enterprise: e.target.value
                                        } 
                                    })
                                }}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            {this.state.emails.map((input, index) => (
                                <div key={index} className="form-group col-md-12">
                                    <label>Correo {index + 1}: </label>
                                    <div className="input-group">
                                        <input
                                            onChange={this.readField(index)}
                                            type="email"
                                            placeholder="Correo"
                                            className="form-control"
                                        />
                                        <div className="input-group-append">
                                            <button 
                                                onClick={this.deleteFieldEmail(index)}
                                                className="btn btn-danger">
                                                &times; Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="form-group col-md-12 d-flex justify-content-center">
                                <button className="btn btn-warning" onClick={this.newFieldEmail}>
                                    + Agregar Correo
                                </button>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Edad</label>
                                <input type="text" className="form-control" placeholder="Edad" onChange = {e =>{
                                        this.setState({
                                            client: {
                                                ...this.state.client,
                                                age: e.target.value
                                            } 
                                        })
                                    }}/>
                            </div>
                            <div className="form-group col-md-6">
                                <label>Tipo Cliente</label>  
                                <select className="form-control" onChange = {e =>{
                                        this.setState({
                                            client: {
                                                ...this.state.client,
                                                category: e.target.value
                                            } 
                                        })
                                    }}>
                                    <option value="">Elegir...</option>
                                    <option value="PREMIUM">PREMIUM</option>
                                    <option value="BASICO">BÁSICO</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success float-right">Agregar Cliente</button>
                    </form>
                    )}
                </Mutation>
                </div>
            </Fragment>
        )
    }
}

export default withRouter(NewClient)