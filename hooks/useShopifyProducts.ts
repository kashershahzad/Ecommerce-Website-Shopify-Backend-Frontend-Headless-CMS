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
        const { data } = await Shopifyclient.request(GET_PRODUCTS);
        const transformedProducts: Product[] = data.products.edges.map((edge: any) => {
          const product = edge.node;
          const id = product.id.split('/').pop();
          const variantId = product.variants.edges[0]?.node.id 

          const imageUrl = product.images.edges[0]?.node.url || "/placeholder-image.jpg";
          const price = parseFloat(product.variants.edges[0]?.node.price.amount) || 0;
          const discount = Math.floor(Math.random() * 30) + 5;
          const quantityAvailable = product.variants.edges[0]?.node.quantityAvailable
          const collection = product.collections.edges[0]?.node.title || "Uncategorized";

          return {
            id: id, 
            variantId: variantId, 
            title: product.title,
            category: collection,
            description: product.description,
            aboutItem: [product.description.substring(0, 100)],
            price: price,
            discount: discount,
            rating: 4.5,
            reviews: [],
            stockItems: quantityAvailable,
            images: [imageUrl],
          };
        });

        setProducts(transformedProducts);
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