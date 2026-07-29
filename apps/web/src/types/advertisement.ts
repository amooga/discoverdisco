export interface Advertisement {
  id: number;
  title: string;
  businessName: string;
  image: string;
  category: string;
  location: string;
  distance: string;
  offer?: string;
  featured?: boolean;
}