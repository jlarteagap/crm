import React from 'react'
import { ApolloConsumer } from 'react-apollo'
import { withRouter } from 'react-router-dom'

const cerrarSessionUsuario = (cliente, history) =>{
    localStorage.removeItem('token', '')
    cliente.resetStore()

    history.push("/login")
}
const CerrarSession = ({history}) => (

    <ApolloConsumer>
        {cliente =>{
            return(
                <button
                    onClick= {() => cerrarSessionUsuario(cliente, history) }
                    className="btn btn-danger ml-2 mt-2 mt-sm-0">Cerrar Sesion
                </button>
            )
        }
        }
    </ApolloConsumer>
)
    

export default withRouter(CerrarSession)