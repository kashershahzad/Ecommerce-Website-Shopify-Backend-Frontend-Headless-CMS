"use client";
import React, { useEffect, useState } from "react";
import RatingReview from "../others/RatingReview";
import Link from "next/link";
import Image from "next/image";
import ProductOptions from "./ProductOptions";
import { Product } from "@/types";
import { calculateDiscount } from "@/lib/calculateDiscount";
import { useRouter } from "next/navigation";

const SingleProductCartView = ({ product }: { product: Product }) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  const {
    category,
    discount,
    id,
    images,
    title = product.name, 
    variantId = '', 
    price,
    rating,
    reviews,
    stockItems,
  } = product;

  

  // Calculate discounted price
  const discountedPrice = calculateDiscount(price, discount || 0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Link
      href={`/shop/${id}`}
      className="relative border rounded-xl shadow-lg overflow-hidden group"
    >
      <div className={`w-full bg-gray-200 overflow-hidden`}>
        <div className="relative w-full h-[18rem] group-hover:scale-110 transition-all duration-300 rounded-md overflow-hidden">
          <Image className="object-contain" src={images[0]} alt={title} fill />
        </div>
      </div>
      <div className="hidden group-hover:block slideCartOptions absolute top-16 right-2">
        <ProductOptions product={product} />
      </div>
      <div className="my-2 space-y-1 p-4">
        <h3 className="text-xl font-fold capitalize hover:text-green-500">
          {title.slice(0, 45)}
          {title.length > 45 && "..."}
        </h3>
        <div className="text-lg font-bold space-x-3 ">
          <span className="text-xl font-bold text-green-500">
          ${price}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default SingleProductCartView;