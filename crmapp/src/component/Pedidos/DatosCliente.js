import React, { Fragment } from 'react';
import { Query } from 'react-apollo'
import { CLIENT_QUERY } from '../../queries'

const DatosCliente = ({id}) => {
    
    return(
        <Fragment>
            <h3>Resumen de Cliente</h3>
            {/* Poll interval es por si se hacen cambios y estos se actualicen automaticamente */}
            <Query query={CLIENT_QUERY} variables={{id}} pollInterval={500}>
                {({loading, error, data, startPolling, stopPolling}) => {
                    if(loading) return 'Cargando...'
                    if(error) return `Error ${error.message}`

                    const {name, lastname, enterprise, age, category, emails} = data.getClient;
                    return(
                        <ul className="list-unstyled my-5">
                            <li className="border font-weight-bold">Nombre:
                                <span className="font-weight-normal"> { name } { lastname }</span>
                            </li>
                            <li className="border font-weight-bold">Correos:
                                <span className="font-weight-normal"> { emails.map(mail => ` ${mail.email}`) }</span>
                            </li>
                            <li className="border font-weight-bold">Empresa:
                                <span className="font-weight-normal"> { enterprise }</span>
                            </li>
                            <li className="border font-weight-bold">Edad:
                                <span className="font-weight-normal"> { age }</span>
                            </li>
                            <li className="border font-weight-bold">Categoria:
                                <span className="font-weight-normal"> { category }</span>
                            </li>
                        </ul>
                    )
                }}
            </Query>
        </Fragment>
    )
}

export default DatosCliente;