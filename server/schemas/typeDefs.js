const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type Category {
    _id: ID
    categoryName: String
    categoryImage: String
  }
  type Product {
    _id: ID
    name: String
    description: String
    categoryID: Category
    subCategoryID: SubCategory
    image: String
    price: Float
    salePrice: Float
    createdAt: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Checkout {
    session: ID
  }

  type Query {
    categories: [Category]
    category(_id: ID!): Category
    subCategory(_id: ID!): SubCategory
    products(categoryID: ID, subCategoryID: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(
      firstName: String!,
      lastName: String!,
      email: String!,
      password: String!,
    ): Auth
    updateUser(
      firstName: String,
      lastName: String,
      email: String,
      password: String,
    ): User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
