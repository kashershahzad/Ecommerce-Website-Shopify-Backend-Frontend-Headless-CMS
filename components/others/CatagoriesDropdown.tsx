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

interface CatagoriesDropdownProps {
  title?: string;
}

const CatagoriesDropdown: React.FC<CatagoriesDropdownProps> = ({ title = "Collections" }) => {
  const { collections, loading, error } = useShopifyCollections();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // console.log("Collections:", collections);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 font-medium px-4 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
          {title} <ChevronDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-6 space-y-2">
          {collections.map((collection) => {
            if (collection.handle === "feature-products") {
              return null;
            }
            // console.log("Collection Handle:", collection.handle);
            const collectionTitle = collection.handle === "mob" ? "Smartphones" : collection.title;

            return (
              <DropdownMenuItem key={collection.id}>
                <Link href={`/shop?category=${collection.handle}`}>
                  {collectionTitle}
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CatagoriesDropdown;