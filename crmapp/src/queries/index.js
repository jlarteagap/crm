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
{
  getProducts{
    id
    name
    price
    stock
  }
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

