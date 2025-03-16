"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import useShopifyCollections from "@/hooks/useShopifyCollections";
import Link from "next/link";

// Define types for the collection and product
interface Collection {
  handle: string;
  title: string;
}

interface Product {
  id: string;
  title?: string; // Make title optional
  images: string[];
}

interface CollectionCardProps {
  collection: Collection;
  onCollectionClick: (collectionHandle: string) => void;
}

const CategoriesCollection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { collections, loading, error } = useShopifyCollections();

  const handleCollectionClick = (collectionHandle: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", collectionHandle);
    router.push(`shop?${params.toString()}`);
  };

  if (loading) {
    return <div className="text-center py-16">Loading collections...</div>;
  }

  if (error) {
    return <div className="text-center py-16 text-red-500">Error loading collections: {error}</div>;
  }

  // Filter out the "feature-products" collection
  const filteredCollections = collections.filter(collection => collection.handle !== "feature-products");

  return (
    <section className="py-16 bg-slate-200 dark:bg-slate-800">
      <div className="max-w-screen-xl px-4 md:px-8 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-wrap">
        {filteredCollections.slice(0, 3).map((collection) => (
          <CollectionCard 
            key={collection.handle}
            collection={collection}
            onCollectionClick={handleCollectionClick}
          />
        ))}
      </div>
    </section>
  );
};

// Separate component for each collection card
const CollectionCard: React.FC<CollectionCardProps> = ({ collection, onCollectionClick }) => {
  const { products, loading } = useShopifyCollections(collection.handle);

  return (
    <div
      onClick={() => onCollectionClick(collection.handle)}
      className="flex flex-col gap-4 items-start justify-between p-4 md:p-8 rounded-xl bg-white dark:bg-slate-900 shadow-md"
    >
      <h2 className="text-xl md:text-2xl text-center font-semibold my-4 w-full">
        Best Deals For You On <span className="text-2xl font-bold">{collection.title}</span>
      </h2>
      <div className="grid grid-cols-2 gap-4 place-content-center w-full">
        {loading ? (
          <div className="col-span-2 text-center">Loading products...</div>
        ) : (
          products.slice(0, 4).map((product: Product) => (
            <div
              key={product.id}
              className="flex flex-col items-center justify-center text-center gap-2"
            >
              <Image
                src={product.images[0] || "/placeholder-image.jpg"}
                alt={product.title || "Product image"} // Handle undefined title
                width={100}
                height={100}
                className="object-contain rounded-md"
              />
              <div className="flex items-center flex-col">
                <Link
                  href={`/shop/${product.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="font-semibold hover:text-green-500"
                >
                  {product.title && (product.title.length > 15 ? `${product.title.slice(0, 15)}...` : product.title)}
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
      <Button
        className="mt-4 flex items-center gap-4 text-lg font-semibold w-full"
        variant={"outline"}
        size={"lg"}
      >
        <ArrowRight /> Collections
      </Button>
    </div>
  );
};

export default CategoriesCollection;