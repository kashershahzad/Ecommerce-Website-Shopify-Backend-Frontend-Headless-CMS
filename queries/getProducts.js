// lib/getproducts.js
import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query GetProducts {
    products(first: 10) {
      edges {
        node {
          id
          title
          description
          handle
          tags
          images(first: 5) {
            edges {
              node {
                src
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
                quantityAvailable
              }
            }
          }
          collections(first: 1) {
            edges {
              node {
                title
              }
            }
          }
        }
      }
    }
  }
`;