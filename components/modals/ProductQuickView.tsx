"use client";
import React, { useEffect, useState } from "react";
import BuyNowBtn from "../buttons/BuyNowBtn";
import AddToCartBtn from "../buttons/AddToCartBtn";
import ProductDescription from "../product/ProductDescription";
import RatingReview from "../others/RatingReview";
import ProductGallery from "../product/ProductGallery";
import { useProductQuickViewStore } from "@/store/productQuickViewStore";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import ProductColorSelection from "../product/ProductColorSelection";
import ProductQuantityChange from "../product/ProductQuantityChange";
import ProductTab from "../product/ProductTab";
import { calculateDiscount } from "@/lib/calculateDiscount";

const ProductQuickViewModal = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { isOpen, closeModal, product } = useProductQuickViewStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ProductGallery isInModal={true} images={product.images} />
                <div className="space-y-2">
                  <h2 className="text-2xl md:text-3xl font-bold capitalize">
                    {product.name}
                  </h2>
                  <ProductDescription description={product.description} />
                  <div className="flex items-center gap-6 !my-4">
                    <div className="">
                      <p className="text-3xl font-bold text-green-500">
                      ${product.price}
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex flex-col md:flex-row items-center gap-2"
                    onClick={closeModal}
                  >
                    <AddToCartBtn
                      product={{ ...product, quantity, selectedColor }}
                    />
                    <BuyNowBtn
                      product={{ ...product, quantity, selectedColor }}
                    />
                  </div>
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
