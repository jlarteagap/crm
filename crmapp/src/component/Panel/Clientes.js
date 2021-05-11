import React from 'react'
import {Query } from 'react-apollo'
import { TOP_CLIENTES} from '../../queries'
import {BarChart, YAxis, Tooltip, Bar, CartesianGrid, XAxis} from 'recharts'

const Clientes = () => {
    return(
        <Query query={TOP_CLIENTES}>
            {({loading, error, data}) => {
                if(loading) return "cargando"
                if(error) return (error.message)

                const totalGrafica = []
                
                data.topClientes.map((pedido, index)=> {
                    totalGrafica[index] = {
                        ...pedido.cliente[0],
                        total: pedido.total
                    }
                })
                
                
                return(
                    <BarChart data={totalGrafica} width={500}
                    height={300}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey = "total" fill="#888333"/>
                    </BarChart>
                )
            }}
        </Query>
    )
}

export default Clientes