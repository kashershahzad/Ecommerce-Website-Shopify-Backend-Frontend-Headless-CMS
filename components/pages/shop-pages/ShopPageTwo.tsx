import LatestBlogPosts from "@/components/blog/LatestBlogPosts";
import ShopPageContainer from "@/components/products/ShopPageContainer";
import useShopifyCollections from "@/hooks/useShopifyCollections";
import Link from "next/link";

import React from "react";

interface ShopPageTwoProps {
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

const ShopPageTwo = ({ searchParams }: ShopPageTwoProps) => {
  const { collection, products, loading, error } = useShopifyCollections(searchParams.category);

  return (
    <section>
      <div className="p-10 w-full bg-gray-300 dark:bg-gray-800 text-4xl flex items-center justify-center gap-2">
        <Link href={"/"}>Home</Link>
        <p>/</p>
        <Link href={"/shop"}>Shop</Link>
      </div>

      <div className="p-4 lg:px-16">
        <ShopPageContainer 
          products={products} 
          gridColumn={4} 
          searchParams={searchParams} 
        />
      </div>
      <LatestBlogPosts twoColunmHeader={true} />
    </section>
  );
};

export default ShopPageTwo;