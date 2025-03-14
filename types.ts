// change or modify the types as your requirement

export type Product = {
  id: string ;
  name: string;
  title?: string; // Make optional
  category: string;
  description: string;
  aboutItem: string[];
  price: number;
  discount: number;
  rating: number;
  reviews: Review[];
  brand?: string;
  color?: string[];
  stockItems: number;
  images: string[];
  variantId?: string; // Make optional
  quantity?: number; // Make optional
};

export interface CheckoutCreateInput {
  lineItems: {
    variantId: string;
    quantity: number;
  }[];
}

export interface Collection {
  id: string;
  title: string;
  handle: string;
  description: string | null;
  imageUrl: string | null;
  productsCount: number;
}

export type Review = {
  author: string;
  image: string;
  content: string;
  rating:number
  date: Date;
};

export type SearchParams = {
  page: string;
  category: string;
  brand: string;
  search: string;
  min: string;
  max: string;
  color: string;
};

export type CartItem = Product & {
  selectedColor: string;
  quantity: number;
  variantId?: string; // Make optional
  id: string ; // Change to string
};