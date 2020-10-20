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