// change or modify the types as your requirement

export type Product = {
  id: number;
  name: string;
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
};

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
};
