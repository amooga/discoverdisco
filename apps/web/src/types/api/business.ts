export interface Business {
    id: string;
    name: string;
    category: string;
    ownerName: string;
    phone: string;
    email?: string;
    address: string;
    locality: string;
    city: string;
    logo?: string;
    coverImage?: string;
    verified: boolean;
    description?: string;
    website?: string;
    openingTime?: string;
    closingTime?: string;
    createdAt: string;
    latitude?: number;
    longitude?: number;
    updatedAt: string;
}

export interface BusinessResponse {
    id: string;
    name: string;
    locality: string;
    city: string;
    logoUrl?: string;
}