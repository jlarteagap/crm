import React from 'react'
import { Query } from 'react-apollo'
import { OBTENER_USUARIO } from '../queries'

const Session = Component => props => (
    <Query query={OBTENER_USUARIO}>
        {({loading, error, data, refetch}) => {
            if(loading) return null

            return <Component {...props} refetch={refetch} session={data} />
            
        }}
    </Query>
)
export default Session