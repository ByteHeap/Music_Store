// src/types.ts
export interface Product {
    id: number;
    name: string;
    price: number;
    currency: string;
    image: string;
    category: string;
    brand: string;
    brandId?: number;
    codArtist?: number;
    description: string;
    specs: Record<string, string> ;
    gallery: string[];
}

export interface Artist {
    id: number;
    name: string;
    country: string;
    startYear: number;
}

export interface Brand {
    id: number;
    name: string;
}