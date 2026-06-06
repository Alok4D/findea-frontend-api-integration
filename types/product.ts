export interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  image: string;
  hasGiftCard?: boolean;
}

export interface Category {
  name: string;
  count: number;
  sub?: string[];
}
