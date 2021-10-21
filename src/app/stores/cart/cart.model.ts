export interface Cart {
  id: number;
  name: string;
  price: number;
  thumbnail: string;
  images: Array<string>;
  active: boolean;
}