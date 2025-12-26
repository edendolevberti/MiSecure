export interface Product {
  id: string;
  name: string;
  category: 'indoor' | 'outdoor';
  price: number;
  description: string;
  features: string[];
  imageUrl: string;
  resolution: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
}