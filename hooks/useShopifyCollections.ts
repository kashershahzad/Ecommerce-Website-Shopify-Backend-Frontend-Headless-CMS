// hooks/useShopifyCollections.ts
import { useEffect, useState } from 'react';
import { GET_COLLECTIONS } from '@/queries/getCollections';
import Shopifyclient from '@/lib/shopify';
import { Collection } from '@/types';

// hooks/useShopifyCollections.ts
export const useShopifyCollections = (category?: string) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [products, setProducts] = useState<any[]>([]); // Add state for products
  const [collection, setCollection] = useState<Collection | null>(null); // Add state for selected collection
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        setLoading(true);
        
        const { data } = await Shopifyclient.request(GET_COLLECTIONS);
        
        if (!data.collections) {
          setError("Collections not found");
          return;
        }
        
        const transformedCollections: Collection[] = data.collections.edges.map((edge: any) => {
          const collection = edge.node;
          return {
            id: collection.id,
            title: collection.title,
            handle: collection.handle,
            description: collection.description,
            imageUrl: collection.image?.url || null,
            productsCount: collection.products.edges.length,
          };
        });
        
        setCollections(transformedCollections);
        
        // If category is provided, find the matching collection and set its products
        if (category) {
          const selectedCollection = transformedCollections.find(
            c => c.handle.toLowerCase() === category.toLowerCase()
          );
          
          if (selectedCollection) {
            setCollection(selectedCollection);
            // You would need to fetch products for this collection
            // This is a placeholder - you'll need to implement the actual product fetching
            const collectionProducts = await fetchProductsForCollection(selectedCollection.id);
            setProducts(collectionProducts);
          } else {
            setError(`Collection with category "${category}" not found`);
          }
        }
      } catch (err) {
        console.error("Error fetching Shopify collections:", err);
        setError("Failed to fetch collections from Shopify");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCollections();
  }, [category]); // Add category to the dependency array
  
  return { collections, collection, products, loading, error };
};

// You would need to implement this function to fetch products for a collection
async function fetchProductsForCollection(collectionId: string) {
  // Implement the logic to fetch products for a specific collection
  // Return the products array
  return [];
}