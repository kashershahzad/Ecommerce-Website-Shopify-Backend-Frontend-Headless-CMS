'use client'

import ProductGallery from "@/components/product/ProductGallery";
import React, { useEffect, useState } from "react";
import RelatedProducts from "@/components/products/RelatedProducts";
import BreadcrumbComponent from "@/components/others/Breadcrumb";
import ProductDetails from "@/components/product/ProductDetails";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { Product } from "@/types";


interface ProductIdPageProps {
  params: { productId: string };
}

const ProductIdPage = ({ params }: ProductIdPageProps) => {
  // Use your Shopify hook to get the product data
  const { product, loading, error } = useShopifyProducts(params.productId);
  console.log("Products loaded: ", product);
  
  // You might also need to fetch related products from Shopify
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // If you want to implement related products, you'll need to define this function
    // or modify the approach
    if (product?.category) {
      // For now, let's just set an empty array
      setRelatedProducts([]);
      
      // If you have a real implementation, uncomment this:
      // fetchRelatedProducts(product.category).then(setRelatedProducts);
    }
  }, [product]);

  // Show loading state
  if (loading) return <div>Loading...</div>;
  // Show error state
  if (error) return <div>Error loading product</div>;
  
  // Show product not found
  if (!product) return <div>Product not found</div>;

  return (
    <div className="max-w-screen-xl mx-auto p-4 md:p-8 flex flex-col items-start gap-2 min-h-screen">
      <div className="my-2">
        <BreadcrumbComponent links={["/shop"]} pageText={product.name} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        <ProductGallery isInModal={false} images={product.images} />
        <ProductDetails product={product} />
      </div>
      <RelatedProducts products={relatedProducts} />
    </div>
  );
};

export default ProductIdPage;