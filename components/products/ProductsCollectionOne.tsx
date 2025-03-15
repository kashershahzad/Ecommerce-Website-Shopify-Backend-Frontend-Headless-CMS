"use client";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import SingleProductCartView from "../product/SingleProductCartView";
import client from '@/lib/contentfulClient';
import { gql } from "@apollo/client";
import useShopifyCollections from "@/hooks/useShopifyCollections";

interface featuretitle {
  sys: {
    id: string;
  };
  title: string;
}

const GET_FEATURED_TITLE = gql`
  query getFeaturedTitle {
    featureProductsCollection {
      items {
        title
      }
    }
  }
`;

const fetchtitle = async (): Promise<featuretitle[]> => {
  const { data } = await client.query({ query: GET_FEATURED_TITLE });
  return data.featureProductsCollection.items;
};

const ProductsCollectionOne = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [titleData, setTitleData] = useState<featuretitle[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Use the Shopify collections hook with the "feature-products" collection
  const { products, loading, error: shopifyError } = useShopifyCollections("feature-products");

  React.useEffect(() => {
    fetchtitle()
      .then((data) => {
        setTitleData(data);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch title data");
      });
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (error || shopifyError) {
    return <div>{error || shopifyError}</div>;
  }

  if (loading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  return (
    <section className="max-w-screen-xl mx-auto py-16 px-4 md:px-8 w-full">
      <Tabs defaultValue="top-rated" className="w-full space-y-8 mx-0">
        <div className="flex items-center flex-col md:flex-row justify-between gap-2 flex-wrap w-full">
          <h2 className="text-3xl md:text-5xl font-semibold border-l-4 border-l-rose-500 p-2">
            {titleData[0]?.title}
          </h2>
        </div>
        <TabsContent value="top-rated" className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {products?.slice(0, 8)?.map((product) => {
              return (
                <SingleProductCartView key={product.id} product={product} />
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default ProductsCollectionOne;