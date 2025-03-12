// hooks/useShopifyProducts.ts
import { useEffect, useState } from 'react';
import { GET_PRODUCTS } from '@/queries/getProducts';
import Shopifyclient from '@/lib/shopify';
import { Product } from '@/types';

export const useShopifyProducts = (productId?: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
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

          // Extract the numeric part of the Shopify Global ID
          const id = product.id.split('/').pop(); // Extracts "14695216152940" from "gid://shopify/Product/14695216152940"

          const imageUrl = product.images.edges[0]?.node.url || "/placeholder-image.jpg";
          const price = parseFloat(product.variants.edges[0]?.node.price.amount) || 0;
          const discount = Math.floor(Math.random() * 30) + 5;

          return {
            id: id, // Use the extracted numeric ID
            title: product.title,
            category: "Shopify",
            description: product.description,
            aboutItem: [product.description.substring(0, 100)],
            price: price,
            discount: discount,
            rating: 4.5,
            reviews: [],
            stockItems: 10,
            images: [imageUrl],
          };
        });

        setProducts(transformedProducts);

        // If productId is provided, find the specific product
        if (productId) {
          const foundProduct = transformedProducts.find((p) => p.id === productId);
          setProduct(foundProduct || null);
        }
      } catch (err) {
        console.error("Error fetching Shopify products:", err);
        setError("Failed to fetch products from Shopify");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [productId]);

  return { products, product, loading, error };
};