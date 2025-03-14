import Shopifyclient from '@/lib/shopify';
import { CartItem } from '@/types';

export const createCheckout = async (items: CartItem[]) => {
  try {
    // Convert to Shopify's Global ID format for variants
    const lineItems = items.map(item => ({
      merchandiseId: item.variantId, 
      quantity:  item.stockItems,
    }));

    console.log('Line Items:', lineItems);
    console.log('Shopify Client Config:', {
      domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
      hasToken: !!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    });

    if (lineItems.length === 0) {
      throw new Error('Cart is empty, cannot create checkout');
    }

    // Step 1: Create a cart using the Cart API
    const CART_CREATE_MUTATION = `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

    console.log('GraphQL Query:', CART_CREATE_MUTATION);
    console.log('Variables:', { input: { lines: lineItems } });

    const { data: cartData, errors: cartErrors } = await Shopifyclient.request(CART_CREATE_MUTATION, {
      variables: { input: { lines: lineItems } },
    });

    console.log('Cart Creation Response:', { cartData, cartErrors });

    // Handle GraphQL API-level errors
    if (cartErrors) {
      console.error('GraphQL Errors:', cartErrors);
      throw new Error('Failed to create cart due to API error');
    }

    // Handle Shopify-specific cart errors
    const cartUserErrors = cartData.cartCreate.userErrors;
    if (cartUserErrors.length > 0) {
      console.error('Shopify Cart Errors:', cartUserErrors);
      throw new Error(cartUserErrors[0].message);
    }

    if (!cartData.cartCreate.cart?.checkoutUrl) {
      throw new Error('Missing checkout URL');
    }

    // Return the cart object with the checkout URL
    return cartData.cartCreate.cart;
  } catch (error) {
    console.error('Checkout Creation Error:', error);
    throw error;
  }
};