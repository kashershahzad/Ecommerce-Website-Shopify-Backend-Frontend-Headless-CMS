'use client'

import React, { Suspense, useEffect } from "react";
import FilterProducts from "@/components/products/FilterProducts";
import ShopPageContainer from "@/components/products/ShopPageContainer";
import Loader from "@/components/others/Loader";
// Import the hook
import useShopifyCollections from "@/hooks/useShopifyCollections";

interface ShopPageOneProps {
  searchParams: {
    page: string;
    category: string;
    brand: string;
    search: string;
    min: string;
    max: string;
    color: string;
  };
}

const ShopPageOne = ({ searchParams }: ShopPageOneProps) => {
  // Use the hook directly
  const { collection, products, loading, error } = useShopifyCollections(searchParams.category);
  
  // Log for debugging
  useEffect(() => {
    console.log("ShopPageOne - Category param:", searchParams.category);
    console.log("ShopPageOne - Collection:", collection);
    console.log("ShopPageOne - Products count:", products.length);
    console.log("ShopPageOne - Products sample:", products.slice(0, 2));
    console.log("ShopPageOne - Error:", error);
  }, [collection, products, searchParams.category, error]);

  if (loading) return (
    <div className="flex items-center justify-center h-screen w-full flex-col gap-3">
      <Loader />
      <p>Loading collections and products...</p>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-screen w-full flex-col gap-3">
      <div className="text-red-500 font-semibold">Error: {error}</div>
      <p>Please try again or contact support if the issue persists.</p>
    </div>
  );

  return (
    <section className="max-w-screen-xl flex gap-2 mx-auto p-2 md:p-8">
      {/* <div className="hidden xl:block w-72">
        <Suspense fallback={<Loader />}>
          <FilterProducts />
        </Suspense>
      </div> */}
      <ShopPageContainer 
        gridColumn={3} 
        searchParams={searchParams} 
        products={products} 
      />
    </section>
  );
};

export default ShopPageOne;