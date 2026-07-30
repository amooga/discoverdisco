export type AdvertisementStatus =
  | "draft"
  | "published"
  | "expired";

export interface Advertisement {
  id: string;
  businessId: string;
  title: string;
  description: string;
  image: string;
  category: string;
  status: AdvertisementStatus;
  createdAt: string;
  validUntil?: string;
  views: number;
  clicks: number;
  shares: number;
}