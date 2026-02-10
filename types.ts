
export interface Product {
  id: string;
  name: string;
  brand: string;
  series: string;
  price: number;
  image: string;
  description: string;
  category: 'Phone' | 'Tablet';
  rating: number;
  reviews: Review[];
  specs?: Record<string, string>;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export type PaymentMethod = 'gopay' | 'dana' | 'seabank' | 'paypal';
