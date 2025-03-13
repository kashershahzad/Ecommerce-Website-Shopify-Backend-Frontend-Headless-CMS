'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { ArrowRight, Loader2 } from 'lucide-react'
import { CartItem } from '@/types'
import { createCheckout } from '@/lib/checkoutService'

const BuyNowBtn = ({product}:{product:CartItem}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleBuyNow = async () => {
  try {
    setIsLoading(true)
    
    // Debug: Log product being used for checkout
    console.log('Product for checkout:', product);
    
    // Check if product has a valid variantId
    if (!product.variantId) {
      console.error('Missing variantId in product:', product);
      alert('Product is missing required variant ID. Please contact support.');
      return;
    }
    
    // Create an array with just this product for the checkout
    const items = [{
      ...product,
      quantity: product.stockItems,
      variantId: product.variantId
    }]
    
    console.log('Creating checkout with items:', items);
    
    // Create a Shopify checkout with only this product
    const checkout = await createCheckout(items)
    console.log('Checkout created successfully:', checkout);
    
    // Add to cart for tracking purposes (optional)
    
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
    setIsLoading(false)
  }
}

  return (
    <Button 
      onClick={handleBuyNow} 
      disabled={isLoading}
      className='bg-gradient-to-r from-blue-500 to-blue-800 hover:bg-blue-500 hover:ring-2 duration-300 text-white text-xl p-8 rounded-full w-full flex items-center gap-4'
    >
      {isLoading ? (
        <Loader2 size={30} className='animate-spin' />
      ) : (
        <ArrowRight size={30} className='animate-pulse' />
      )}
      {isLoading ? 'Processing...' : 'Buy Now'}
    </Button>
  )
}

export default BuyNowBtn