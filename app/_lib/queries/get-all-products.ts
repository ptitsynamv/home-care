const getAllProductsQuery = `
query getAllProducts($first: Int = 20, $query: String) {
  products(first: $first, query: $query) {
    pageInfo {
    hasNextPage
    hasPreviousPage
  }
    edges {
      node {
        id
        title
        vendor
        handle
        description
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images(first: 1) {
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          edges {
            node {
              originalSrc
              altText
              width
              height
            }
          }
        }
      }
    }
  }
}
`;

export default getAllProductsQuery;
