'use client'

import React, { Suspense, useEffect, useState } from "react";
import FilterProducts from "@/components/products/FilterProducts";
import ShopPageContainer from "@/components/products/ShopPageContainer";
import Loader from "@/components/others/Loader";
// Import the hooks
import useShopifyCollections from "@/hooks/useShopifyCollections";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";

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
  const [finalProducts, setFinalProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { collection, products: collectionProducts, loading: collectionLoading, error: collectionError } = useShopifyCollections(searchParams.category);

  const { products: allProducts, loading: productsLoading, error: productsError } = useShopifyProducts();

  useEffect(() => {
    if (collectionLoading || productsLoading) return;

    if (collectionError) {
      setErrorMessage(collectionError);
      setIsLoading(false);
      return;
    }

    if (productsError) {
      setErrorMessage(productsError);
      setIsLoading(false);
      return;
    }

    if (!searchParams.category || searchParams.category.length === 0) {
      setFinalProducts(allProducts);
    } else {
      setFinalProducts(collectionProducts);
    }

    setIsLoading(false);
  }, [collection, collectionProducts, collectionLoading, collectionError, allProducts, productsLoading, productsError]);

  useEffect(() => {
  }, [collection, finalProducts, searchParams.category, errorMessage]);

  if (isLoading) return (
    <div className="flex items-center justify-center h-screen w-full flex-col gap-3">
      <Loader />
      <p>Loading collections and products...</p>
    </div>
  );

  if (errorMessage) return (
    <div className="flex items-center justify-center h-screen w-full flex-col gap-3">
      <div className="text-red-500 font-semibold">Error: {errorMessage}</div>
      <p>Please try again or contact support if the issue persists.</p>
    </div>
  );

  return (
    <section className="max-w-screen-xl flex gap-2 mx-auto p-2 md:p-8">
      <div className="hidden xl:block w-72">
        <Suspense fallback={<Loader />}>
          <FilterProducts />
        </Suspense>
      </div>
      <ShopPageContainer 
        gridColumn={3} 
        searchParams={searchParams} 
        products={finalProducts} 
      />
    </section>
  );
};

export default ShopPageOne;