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
query Query($categoryId: ID) {
  products(categoryID: $categoryId) {
    _id
    name
    image
    description
    price
    salePrice
    createdAt
    categoryID {
      categoryName
      _id
    }
    subCategoryID {
      subCategoryName
    }
  }
}
`;