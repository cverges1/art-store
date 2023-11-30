import { gql } from "@apollo/client";

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      categoryImage
      categoryName
    }
  }
`;

export const PRODUCTS_BY_CATEGORY = gql`
query Products_By_Category($categoryId: ID) {
  products(categoryID: $categoryId) {
    _id
    createdAt
    image
    description
    name
    price
    salePrice
    subCategoryID {
      _id
      subCategoryName
    }
    categoryID {
      categoryName
    }
  }
}`