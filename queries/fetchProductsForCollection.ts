// queries/getProductsByCollection.ts
export const GET_PRODUCTS_BY_COLLECTION = `
  query GetProductsByCollection($collectionId: ID!) {
    collection(id: $collectionId) {
      id
      title
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            description
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;