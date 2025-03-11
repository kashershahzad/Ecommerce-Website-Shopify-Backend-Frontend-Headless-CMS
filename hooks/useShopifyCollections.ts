'use client';

import { useEffect, useState } from 'react';
import { GET_COLLECTIONS } from '@/queries/getCollections';
import { GET_PRODUCTS_BY_COLLECTION } from '@/queries/fetchProductsForCollection';
import Shopifyclient from '@/lib/shopify';
import { Collection, Product } from '@/types';

const useShopifyCollections = (category?: string) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [collection, setCollection] = useState<Collection | null>(null);
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
        
        if (category) {
          const selectedCollection = transformedCollections.find(
            c => c.handle.toLowerCase() === category.toLowerCase()
          );
          
          if (selectedCollection) {
            setCollection(selectedCollection);
            const collectionProducts = await fetchProductsForCollection(selectedCollection.id);
            console.log("Fetched products for selected collection:", collectionProducts);
            setProducts(collectionProducts);
          } else {
            setError(`Collection with category "${category}" not found`);
          }
        } else {
          // If no category is specified, fetch products from the first collection
          if (transformedCollections.length > 0) {
            setCollection(transformedCollections[0]);
            const collectionProducts = await fetchProductsForCollection(transformedCollections[0].id);
            console.log("Fetched products for default collection:", collectionProducts);
            setProducts(collectionProducts);
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
  }, [category]);

  const fetchProductsForCollection = async (collectionId: string): Promise<Product[]> => {
    try {
      const formattedId = collectionId.includes("gid://shopify/Collection/") 
        ? collectionId 
        : `gid://shopify/Collection/${collectionId}`;

      const { data } = await Shopifyclient.request(GET_PRODUCTS_BY_COLLECTION, {
        variables: { collectionId: formattedId },
      });

      if (!data.collection) {
        console.error("Collection not found in response:", data);
        setError("Collection not found");
        return [];
      }

      if (!data.collection.products || !data.collection.products.edges) {
        console.error("No products found in collection:", data.collection);
        return [];
      }

      return data.collection.products.edges.map((edge: any) => {
        const product = edge.node;
        const productImage = product.images?.edges[0]?.node.url || null;
        const priceAmount = product.variants?.edges[0]?.node.price?.amount || '0';
        
        return {
          id: product.id,
          title: product.title,
          handle: product.handle,
          description: product.description,
          imageUrl: productImage,
          image: productImage, 
          price: parseFloat(priceAmount),
          currencyCode: product.variants?.edges[0]?.node.price?.currencyCode || 'USD',
          category: data.collection.title || '',
          brand: product.vendor || '',
          color: [],
          size: [],
        };
      });
    } catch (err) {
      console.error("Error fetching products for collection:", err);
      setError("Failed to fetch products for collection");
      return [];
    }
  };

  return { collections, collection, products, loading, error };
};

export default useShopifyCollections;
