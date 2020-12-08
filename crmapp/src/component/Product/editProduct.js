import React, { Component, Fragment } from 'react'
import { withRouter} from 'react-router-dom'
import {Query } from 'react-apollo'

import { PRODUCT_QUERY } from '../../queries';
import FormProduct from './formProduct';

class EditProduct extends Component{
    render(){
        // tomar el id 
        const {id } = this.props.match.params;
        return(
            <Fragment>
                <h2 className="text-center mb-5">Editar prodcuto </h2>

                <div className="row justify-content-center">

                    <Query query={ PRODUCT_QUERY } variables= {{id}}>
                        {({loading, error, data, refetch}) => {
                            if(loading) return "Cargando..."
                            if(error)return `error ${error.message}`

                            return(
                                <FormProduct
                                    product = {data.getProduct}
                                    id = {id}
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

export default withRouter(EditProduct);