// queries/getSingleCollection.ts
export const GET_COLLECTION_BY_HANDLE = `
  query GetCollectionByHandle($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      title
      description
      image {
        url
        altText
      }
      products(first: 20) {
        edges {
          node {
            id
            title
            description
            handle
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
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                    currencyCode
                  }
                  availableForSale
                }
              }
            }
          }
        }
      }
    }
  }
`;