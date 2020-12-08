import React, { Component, Fragment } from 'react'
import { withRouter} from 'react-router-dom'
import { CLIENT_QUERY } from '../../queries';
import {Query } from 'react-apollo';

import FormClient from './FormEditClient';

class EditClient extends Component{
    render(){
        const {id } = this.props.match.params;

        return(
            <Fragment>
                <h2 className="text-center">Editar Cliente</h2>
                <div className="row justify-content-center">
                    <Query query={CLIENT_QUERY} variables={{id}}>
                        {({ loading, error, data, refetch}) =>{
                            if(loading) return "Cargango";
                            if(error) return `Error ${error.message}`;

                            return(
                                <FormClient 
                                    client = {data.getClient}
                                    refetch = {refetch}
                                />
                            )
                        }}
                    </Query>
                </div>
            </Fragment>
        )
    }
}

export default withRouter(EditClient)