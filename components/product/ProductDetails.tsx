"use client";
import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import ProductTab from "./ProductTab";
import BuyNowBtn from "../buttons/BuyNowBtn";
import AddToCartBtn from "../buttons/AddToCartBtn";
import ProductQuantityChange from "./ProductQuantityChange";
import RatingReview from "../others/RatingReview";
import ProductDescription from "./ProductDescription";
import ProductColorSelection from "./ProductColorSelection";
import { Product } from "@/types";
import Link from "next/link";
import { calculateDiscount } from "@/lib/calculateDiscount";

const ProductDetails = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");

  // Function to get the description before the first period
  const getTruncatedDescription = (description: string) => {
    const periodIndex = description.indexOf('.');
    return periodIndex !== -1 ? description.substring(0, periodIndex + 1) : description;
  };

  return (
    <div className="space-y-2 mt-2">

      <h2 className="text-2xl md:text-3xl font-bold capitalize">
        {product?.title}
      </h2>
      <div className="flex items-center gap-6">
        <div className="">
          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold text-green-500 border-green-500 border py-2 px-6 rounded-lg">
            ${product?.price}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4 !my-6">
        <AddToCartBtn product={{ ...product, quantity, selectedColor }} />
        <BuyNowBtn product={{ ...product, quantity, selectedColor }} />
      </div>
      <Separator className="!mt-4" />
      <ProductDescription description={product?.description as string} />
    </div>
  );
};

export default ProductDetails;