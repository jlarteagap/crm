import gql from 'graphql-tag'

export const ADD_CLIENT = gql`
mutation newClient($input: ClientInput){
    newClient(input: $input){
      id
      name
      lastname
    }
  }
`;

export const UPDATE_CLIENT = gql`
mutation updateClient($input: ClientInput){
  updateClient(input: $input){
    id
    name
    lastname
    enterprise
    emails{
      email
    }
    age
    category
  }
}
`;

export const DELETE_CLIENT = gql`
mutation deleteClient($id: ID!){
  deleteClient(id: $id)
}

`;

export const ADD_PRODUCT = gql`
  mutation newProduct ($input: ProductInput){
    newProduct(input: $input){
      name
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($input: ProductInput){
    updateProduct(input: $input){
      name
      price
      stock
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!){
    deleteProduct(id: $id)
  }

`;

export const NUEVO_PEDIDO = gql`
  mutation nuevoPedido($input: PedidoInput){
    nuevoPedido(input: $input){
      id
    }
  }
`

export const ACTUALIZAR_ESTADO = gql`
  mutation actualizarEstado($input: PedidoInput){
    actualizarEstado(input: $input)
  }
`

export const CREAR_USUARIO = gql`
  mutation crearUsuario($usuario: String!, $password: String!, $nombre: String!, $rol: String!){
    crearUsuario(usuario:$usuario, password:$password, nombre:$nombre, rol: $rol)
}`

export const LOGIN_USUARIO = gql`
  mutation autenticarUsuario($usuario: String!, $password: String!){
    autenticarUsuario(usuario:$usuario, password: $password){
      token
    }
  }
`