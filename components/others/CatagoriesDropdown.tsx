import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import useShopifyCollections from '@/hooks/useShopifyCollections';

const DropdownMenuComponent = () => {
  const { collections, loading, error } = useShopifyCollections();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log("Collections:", collections);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 font-medium px-4 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
          Collections <ChevronDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-6 space-y-2">
          {collections.map((collection) => {
            // Skip rendering if the collection handle is "feature-products"
            if (collection.handle === "feature-products") {
              return null;
            }

            // Log the handle for each collection
            console.log("Collection Handle:", collection.handle);

            // Check if the collection handle is "mob" and change the title to "Smartphones"
            const title = collection.handle === "mob" ? "Smartphones" : collection.title;

            return (
              <DropdownMenuItem key={collection.id}>
                <Link href={`/shop?category=${collection.handle}`}>
                  {title}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownMenuComponent;