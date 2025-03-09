// hooks/useShopifyProducts.ts
import { useEffect, useState } from 'react';
import { GET_PRODUCTS } from '@/queries/getProducts';
import Shopifyclient from '@/lib/shopify';
import { Product } from '@/types';

export const useShopifyProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Using the Storefront API client
        const { data } = await Shopifyclient.request(GET_PRODUCTS);

        // Transform Shopify product data to match your Product type
        const transformedProducts: Product[] = data.products.edges.map((edge: any, index: number) => {
          const product = edge.node;
          // Note the change from src to url for images in the Storefront API
          const imageUrl = product.images.edges[0]?.node.url || "/placeholder-image.jpg";
          const price = parseFloat(product.variants.edges[0]?.node.price.amount) || 0;
          
          // Calculate a dummy discount (you might want to get this from Shopify compare-at price)
          const discount = Math.floor(Math.random() * 30) + 5; // Random discount between 5-35%
          
          return {
            id: index + 1, // You might want to use the actual Shopify ID or transform it
            name: product.title,
            category: "Shopify", // You might want to get categories from Shopify collections
            description: product.description,
            aboutItem: [product.description.substring(0, 100)], // Create array from description
            price: price,
            discount: discount,
            rating: 4.5, // Dummy rating
            reviews: [], // Empty reviews array
            stockItems: 10, // Dummy stock count
            images: [imageUrl],
          };
        });

        setProducts(transformedProducts);
      } catch (err) {
        console.error("Error fetching Shopify products:", err);
        setError("Failed to fetch products from Shopify");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};