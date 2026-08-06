export interface LoginRequest {
    email: string;
    password: string;
    
}

export interface RegisterRequest {
    name: string;
    ownerName: string;
    email: string;
    phone: string;
    password: string;
    address: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
}   