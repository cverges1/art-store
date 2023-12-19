import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        images
        price
        quantity
        categoryID {
          categoryName
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_PRODUCT_QUANTITY = gql`
mutation UpdateProduct($id: ID!, $quantity: Int!) {
  updateProduct(_id: $id, quantity: $quantity) {
    _id
  }
}
`

export const SINGLE_UPLOAD = gql`
mutation SingleUpload($file: Upload!) {
  singleUpload(file: $file){
    _id
    encoding
    filename
    mimetype
    url
  }
}
`