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
import { useShopifyCollections } from '@/hooks/useShopifyCollections';

const DropdownMenuComponent = () => {
  const { collections, loading, error } = useShopifyCollections();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 font-medium px-4 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800">
          Categories <ChevronDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-6 space-y-2">
          {collections.map((collection) => (
            <DropdownMenuItem key={collection.id}>
              <Link href={`/shop/${collection.handle}`}>
                {collection.title}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownMenuComponent;