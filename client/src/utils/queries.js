import { gql } from "@apollo/client";

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      categoryName
      categoryImage {
        _id
        encoding
        filename
        mimetype
        url
      }
    }
  }
`;

export const QUERY_PRODUCTS = gql`
query Product($subCategoryId: ID, $categoryId: ID, $name: String) {
  products(subCategoryID: $subCategoryId, categoryID: $categoryId, name: $name) {
    _id
    name
    images {
      _id
      encoding
      filename
      mimetype
      url
    }
    price
    salePrice
    description
    quantity
    categoryID {
      categoryName
      _id
      categoryImage {
        _id
        encoding
        filename
        mimetype
        url
      }
    }
    subCategoryID {
      subCategoryName
      _id
    }
    createdAt
  }
}
`;

export const QUERY_SINGLE_PROD = gql`
query SingProduct($id: ID!) {
  product(_id: $id) {
    _id
    name
    images {
      _id
      encoding
      filename
      mimetype
      url
    }
    description
    price
    salePrice
    quantity
    categoryID {
      categoryName
      categoryImage {
        _id
        encoding
        filename
        mimetype
        url
      }
    }
    subCategoryID {
      subCategoryName
      _id
    }
    createdAt
  }
}
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;