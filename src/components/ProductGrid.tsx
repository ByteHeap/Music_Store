import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllProducts } from '../api/apiClient';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductGridProps {
    limit?: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({ limit }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { addToCart } = useCart();

    useEffect(() => {
        const getProducts = async () => {
            try {
                setIsLoading(true);
                const data = await fetchAllProducts();
                setProducts(data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch products. Is the backend server running?');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        getProducts();
    }, []);

    if (isLoading) {
        return <div className="container mx-auto px-4 py-8 text-center text-black dark:text-white">Loading products...</div>;
    }

    if (error) {
        return <div className="container mx-auto px-4 py-8 text-center text-red-500">{error}</div>;
    }

    const displayedProducts = limit ? products.slice(0, limit) : products;

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-10 text-black dark:text-white">
                {limit ? 'Produse Recomandate' : 'Featured Products'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {displayedProducts.map((product) => (
                    <div key={product.id} className="group">
                        <Link
                            to={`/product/${product.id}`}
                            className="bg-white dark:bg-dark-surface rounded-lg shadow-sm overflow-hidden border border-apple-gray-200 dark:border-gray-700 h-full flex flex-col block hover:shadow-md transition-shadow" //
                        >
                            <div className="w-full h-48 bg-apple-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            <div className="p-4 flex flex-col flex-grow">
                                <h3 className="text-lg font-semibold text-black dark:text-white truncate group-hover:text-apple-blue transition-colors">
                                    {product.name}
                                </h3>

                                <p className="text-sm text-gray-600 dark:text-apple-gray-500 flex-grow mt-1">
                                    {product.brand === 'Unknown Artist' || !product.brand ? product.category : product.brand}
                                </p>

                                <div className="mt-4 flex justify-between items-center">
                                    <p className="text-xl font-bold text-black dark:text-white">
                                        {Number(product.price).toLocaleString()} {product.currency}
                                    </p>

                                    <button
                                        className="bg-apple-blue text-white rounded-full p-2 hover:bg-blue-600 transition-colors relative z-10"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addToCart(product);
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;