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
  const { product, products, loading, error } = useShopifyProducts(params.productId);
  console.log("Products loaded: ", product);
  
  // State for related products
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    if (product?.category) {
      // Filter products by the current product's category
      const filteredProducts = products.filter(p => p.category === product.category && p.id !== product.id);
      setRelatedProducts(filteredProducts);
    }
  }, [product, products]);

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