// queries/getCollections.ts
export const GET_COLLECTIONS = `
  query GetCollections {
    collections(first: 10) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
          products(first: 5) {
            edges {
              node {
                id
                title
              }
            }
          }
        }
      }
    }
  }
`;