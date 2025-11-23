export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  description: string;
  images: string[];
  stock: number;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
