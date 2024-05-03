'use client'
import React from "react";
import CartItemsDetails from "./CartItemsDetails";
import { Separator } from "../ui/separator";
import useCartStore from "@/store/cartStore";

const OrderSummaryForCheckout = () => {

  const {getTotalPrice,getTax,getShippingFee,getTotalAmount} = useCartStore()

  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
      {/* ordered items details */}
      <div>
        <h2 className="text-lg font-semibold my-2">Order Items</h2>
        <CartItemsDetails />
        <Separator className="dark:bg-white/50 mb-2"/>
      </div>

      {/* order summary for order place */}
      <div className="">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Order Summary
        </h2>
        <div className="flex justify-between mb-4">
          <span className="text-gray-700 dark:text-gray-300">Subtotal:</span>
          <span className="text-gray-900 dark:text-white">${getTotalAmount()}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-700 dark:text-gray-300">Shipping:</span>
          <span className="text-gray-900 dark:text-white">${getShippingFee()}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-700 dark:text-gray-300">Tax:</span>
          <span className="text-gray-900 dark:text-white">${getTax()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            Total:
          </span>
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            ${getTotalAmount()}
          </span>
        </div>
        <button className="text-xl mt-6 bg-blue-500 dark:bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderSummaryForCheckout;
