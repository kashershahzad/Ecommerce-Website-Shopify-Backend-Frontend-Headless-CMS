import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const Shopifyclient = createStorefrontApiClient({
  storeDomain: `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}`,
  apiVersion: '2024-04',
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
});

export default Shopifyclient;