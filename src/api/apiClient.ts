import type { Product, Artist, Brand } from '../types';

const API_BASE_URL = 'http://localhost:5001/api';

export const fetchAllProducts = async (): Promise<Product[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch products from MySQL API:", error);
        return [];
    }
};

export const fetchProductById = async (id: string | number): Promise<Product | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch product ${id} from MySQL API:`, error);
        return null;
    }
};

export const fetchAllArtists = async (): Promise<Artist[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/artists`);
        if (!response.ok) throw new Error('Failed to fetch artists');
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch artists:", error);
        return [];
    }
};

export const fetchAllBrands = async (): Promise<Brand[]> => {
    const response = await fetch('http://localhost:5001/api/brands');
    if (!response.ok) throw new Error('Failed to fetch brands');
    return response.json();
};

export const fetchProductsByArtistId = async (artistId: string | number): Promise<Product[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/products?artistId=${artistId}`);
        if (!response.ok) throw new Error('Failed to fetch artist products');

        const allProducts: Product[] = await response.json();
        return allProducts;
    } catch (error) {
        console.error(`Failed to fetch products for artist ${artistId}:`, error);
        return [];
    }
};