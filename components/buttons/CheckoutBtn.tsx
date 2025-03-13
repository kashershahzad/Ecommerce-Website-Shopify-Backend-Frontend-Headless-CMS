import React, { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { CartItem } from "@/types"; // Import the CartItem type
import { createCheckout } from '@/lib/checkoutService'; // Import the createCheckout function

interface CheckoutBtnProps {
  cartItems: CartItem[]; // Define the prop type
}

const CheckoutBtn: React.FC<CheckoutBtnProps> = ({ cartItems }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);

      // Debug: Log cart items being used for checkout
      console.log('Cart Items for checkout:', cartItems);

      // Prepare line items for checkout
      const lineItems: CartItem[] = cartItems.map(item => ({
        ...item, // Spread all properties of the item
        variantId: item.variantId, // Ensure variantId is included
        quantity: item.stockItems, // Default quantity to 1 if not provided
      }));

      console.log('Creating checkout with line items:', lineItems);

      // Create a Shopify checkout with the cart items
      const checkout = await createCheckout(lineItems);
      console.log('Checkout created successfully:', checkout);

      // Redirect to Shopify checkout
      if (checkout?.checkoutUrl) {
        console.log('Redirecting to:', checkout.checkoutUrl);
        window.location.href = checkout.checkoutUrl;
      } else {
        console.error('No checkout URL returned');
      }

    } catch (error) {
      console.error('Error creating checkout:', error);
      // Provide more detailed error message
      if (error instanceof Error) {
        alert(`Checkout error: ${error.message}`);
      } else {
        alert('There was an error processing your order. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-3 my-2 text-xl bg-blue-500 dark:bg-blue-600 text-white py-3 px-8 rounded-full hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
    >
      {isLoading ? (
        <Loader2 size={30} className='animate-spin' />
      ) : (
        <ArrowRight size={30} />
      )}
      {isLoading ? 'Processing...' : 'Checkout Now'}
    </button>
  );
};

export default CheckoutBtn;