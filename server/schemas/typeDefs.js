const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    categoryName: String
    categoryImage: String
  }
  type SubCategory {
    _id: ID
    subCategoryName: String
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
    quantity: Int
    createdAt: String
  }
  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
  }
  type Checkout {
    session: ID
  }
  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    category(_id: ID!): Category
    subCategories: [SubCategory]
    subCategory(_id: ID!): SubCategory
    products(categoryID: ID, subCategoryID: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
