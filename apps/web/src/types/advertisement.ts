export interface Post {
  id: string;
  title: string;
  businessName: string;
  category: string;
  image: string;
  description: string;
  address: string;
  phone: string;
  validUntil?: string;
  tags?: string[];
  createdAt: string;
}