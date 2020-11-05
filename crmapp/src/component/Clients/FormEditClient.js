import React, { Component } from 'react';
import {UPDATE_CLIENT} from '../../mutation';
import {Mutation} from 'react-apollo';
import { withRouter } from 'react-router-dom'


class FormEdit extends Component {

    state =  {
        client: this.props.client,
        emails: this.props.client.emails
    }

    nuevoCampo = () => {
        this.setState({
            emails: this.state.emails.concat([{email:''}])
        })
    }

    leerCampo = i => e => {
        const nuevoMail = this.state.emails.map((email, index) => {
                if (i !== index) return email;
                return { ...email, email: e.target.value };
        });
        this.setState({ emails: nuevoMail });
    }

    quitarCampo = i => () => {
        this.setState({
            emails: this.state.emails.filter((s, index) => i !== index)
        });
    }



    render() { 
            const { name, lastname, age, category, enterprise } = this.state.client;
            const {emails} = this.state;
           
            return (
                <Mutation 
                    mutation={UPDATE_CLIENT}
                    onCompleted = {() => this.props.refetch().then(() => {
                        this.props.history.push('/')
                    })}
                    >
                    {updateClient => (
                        <form className="col-md-8 m-3" onSubmit={ e => {
                            e.preventDefault();
                            const {id, name, lastname, enterprise, age, category} = this.state.client;
                            const {emails} = this.state;
                            
                            const input ={
                                id,
                                name,
                                lastname,
                                enterprise,
                                age: Number(age),
                                category,
                                emails
                            }

                            updateClient({
                                variables: {input}
                            });
                        }}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Nombre</label>
                                    <input
                                        type="text" 
                                        className="form-control"
                                        defaultValue={name}
                                        onChange = { e => {
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
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        defaultValue={lastname}
                                        onChange = { e => {
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
                                    <input
                                        type="text" 
                                        className="form-control"
                                        defaultValue={enterprise}
                                        onChange = { e => {
                                            this.setState({
                                                client: {
                                                    ...this.state.client,
                                                    enterprise: e.target.value
                                                }
                                            })
                                        }}
                                    />
                                </div>

                                {emails.map((input, index) => (
                                    <div key={index} className="form-group col-md-12">
                                        <label>Email {index + 1} : </label>
                                        <div className="input-group">
                                        
                                            <input 
                                                type="email"
                                                placeholder={`Email`}
                                                className="form-control" 
                                                onChange={this.leerCampo(index)}
                                                defaultValue={input.email}
                                            />
                                            <div className="input-group-append">
                                                <button 
                                                    className="btn btn-danger" 
                                                    type="button" 
                                                    onClick={this.quitarCampo(index)}> 
                                                    &times; Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="form-group d-flex justify-content-center col-md-12">
                                    <button 
                                        onClick={this.nuevoCampo}
                                        type="button" 
                                        className="btn btn-warning"
                                    >+ Agregar Email</button>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Edad</label>
                                    <input
                                        type="text" 
                                        className="form-control" 
                                        defaultValue={age}
                                        onChange = { e => {
                                            this.setState({
                                                client: {
                                                    ...this.state.client,
                                                    age: e.target.value
                                                }
                                            })
                                        }}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Tipo Cliente</label>  
                                    <select 
                                        className="form-control"
                                        value={category}
                                        onChange = { e => {
                                            this.setState({
                                                client: {
                                                    ...this.state.client,
                                                    category: e.target.value
                                                }
                                            })
                                        }}
                                    >
                                        <option value="">Elegir...</option>
                                        <option value="PREMIUM">PREMIUM</option>
                                        <option value="BASICO">BÁSICO</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success float-right">Guardar Cambios</button>
                        </form>
                
                    )}
                </Mutation>
            )      
    }
}
 

export default withRouter(FormEdit);