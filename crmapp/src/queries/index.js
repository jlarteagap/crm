import gql from 'graphql-tag'

export const CLIENTS_QUERY = gql`
    query getClients($limit:Int, $offset:Int){
    getClients(limit: $limit, offset: $offset){
      id
      name
      lastname
      enterprise
    }
    totalClients
  }
`;

export const CLIENT_QUERY = gql `
  query ConsultarCliente($id:ID){
    getClient(id: $id){
      id
      name
      lastname
      age
      enterprise
      category
      emails{
        email
      }
    }
  }
`;

export const PRODUCTS_QUERY = gql`
query getProducts($limit:Int, $offset:Int, $stock: Boolean){
    getProducts(limit: $limit, offset: $offset, stock: $stock){
      id
      name
      price
      stock
    }
    totalProducts
  }
`;

export const PRODUCT_QUERY = gql`
  query getProduct($id :ID){
    getProduct(id: $id){
      name
      price
      stock
    }
}`;

export const OBTENER_PEDIDOS = gql`
query obtenerPedidos($cliente: String){
  obtenerPedidos(cliente: $cliente){
    id
    fecha
    total
    pedido{
      id
      cantidad
    }
    estado
  }
}`

export const TOP_CLIENTES = gql`
query topClientes {
  topClientes{
    total,
    cliente{
      name
    }
  }
}
`

export const OBTENER_USUARIO = gql`
  query obtenerUsuario{
    obtenerUsuario{
      usuario
    }
  }
`