import React, { Fragment } from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

import Header from './component/Layout/Header'
import Clients from './component/Clients/Clients'
import EditClient from './component/Clients/editClient'
import NewClient from './component/Clients/newClient'

import NewProduct from './component/Product/newProduct'
import Products from './component/Product/product'
import EditProduct from './component/Product/editProduct'

import NuevoPedido from './component/Pedidos/NuevoPedido'
import PedidosCliente from './component/Pedidos/PedidosCliente';
import Registro from './component/auth/registro'
import Login from './component/auth/Login'

import Panel from './component/Panel/Panel'

import Session from './component/session'


const App = ({refetch, session}) => {

    const {obtenerUsuario} = session

    const mensaje = (obtenerUsuario) ? `Bienvenido ${obtenerUsuario.nombre}` : <Redirect to="/login" />

    return(
        <Router>
          <Fragment>
            <Header session = {session}/>
              <div className="container">
                <p className="text-right">{mensaje}</p>
                <Switch>
                  <Route exact path="/clients" render={() => <Clients session={session}/>} />
                  <Route exact path="/clients/edit/:id"><EditClient /></Route>
                  <Route exact path="/clients/new" render={() => <NewClient session={session}/>} />
                  <Route exact path="/products"><Products /> </Route>
                  <Route exact path="/products/new"><NewProduct /> </Route>
                  <Route exact path="/products/edit/:id"><EditProduct /> </Route>
                  <Route exact path="/pedidos/nuevos/:id"><NuevoPedido /></Route>
                  <Route exact path="/pedidos/:id"><PedidosCliente /></Route>
                  <Route exact path="/registro"><Registro /></Route>
                  <Route exact path="/login" render={() => <Login refetch={refetch} />} />
                  <Route exact path="/panel"><Panel /></Route>
                </Switch>
              </div>
          </Fragment>
        </Router>
    )
}

const RootSession = Session(App)
export { RootSession }
