"use client";
import React, { useEffect, useState } from "react";
import BuyNowBtn from "../buttons/BuyNowBtn";
import AddToCartBtn from "../buttons/AddToCartBtn";
import ProductDescription from "../product/ProductDescription";
import RatingReview from "../others/RatingReview";
import ProductGallery from "../product/ProductGallery";
import { useProductQuickViewStore } from "@/store/productQuickViewStore";
import { Button } from "../ui/button";
import { Minus, Plus, X } from "lucide-react";
import ProductColorSelection from "../product/ProductColorSelection";
import ProductQuantityChange from "../product/ProductQuantityChange";
import ProductTab from "../product/ProductTab";

const ProductQuickViewModal = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { isOpen, closeModal, product } = useProductQuickViewStore();

  useEffect(() => {
    if (isOpen) {
      // Prevent background scrolling when modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Restore background scrolling when modal is closed
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    // Close the modal when clicking outside of it
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 m-auto flex items-center justify-center bg-black/70"
          onClick={handleCloseModal}
        >
          <div className="absolute top-0 right-0 m-4 z-50">
            {/* Close button */}
            <Button
              variant={"outline"}
              className="p-2 text-white rounded-full bg-black/50 hover:bg-black/70"
              onClick={closeModal}
            >
              <X />
            </Button>
          </div>
          <div className="bg-white dark:bg-slate-800 p-4 lg:p-8 rounded-lg shadow-lg h-[95%] w-[90%] lg:w-[80%] lg:h-[90%] overflow-auto hide-scrollbar">
            {product && (
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                {/* Product Gallery */}
                <ProductGallery isInModal images={product.images} />
                <div className="space-y-1">
                  {/* Category */}
                  <small className="bg-lime-500 py-1 px-4 rounded-full w-fit">
                    {product.category}
                  </small>
                  {/* Product Name */}
                  <h2 className="text-2xl md:text-3xl font-bold capitalize">
                    {product.name}
                  </h2>
                  {/* Rating and Review */}
                  <RatingReview
                    rating={product.rating || 0}
                    review={product.reviews || 0}
                  />
                  {/* Product Description */}
                  <ProductDescription description={product.description} />

                  {/* product colors */}
                  <ProductColorSelection color={selectedColor} setColor={setSelectedColor} />

                  <div className="flex items-center gap-6 !my-4">
                   <div className="">
                     {/* Original Price */}
                     <p className="text-muted-foreground line-through">
                      ${product.price}
                    </p>
                    {/* Discounted Price */}
                    <p className="text-3xl font-bold text-green-500">
                      $
                      {(product.price / product.discount) *
                        (product.discount - 1)}
                    </p>
                   </div>
                   <ProductQuantityChange quantity={quantity} setQuantity={setQuantity}/>
                  </div>
                  <div className="flex flex-col md:flex-row items-center gap-2" onClick={closeModal}>
                    {/* Add To Cart Button */}
                    <AddToCartBtn
                      id={product.id}
                      name={product.name}
                      image={product.images[0]}
                      price={product.price}
                      quantity={1}
                    />
                    {/* Buy Now Button */}
                    <BuyNowBtn
                      id={product.id}
                      name={product.name}
                      image={product.images[0]}
                      price={product.price}
                      quantity={1}
                    />
                  </div>
                  <ProductTab aboutItem={product?.aboutItem!} />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductQuickViewModal;
