import React, { useEffect } from 'react';
import type { Product } from '../types';

interface ProductCarouselProps {
    title: string;
    data?: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ title, data = [] }) => {
    useEffect(() => {
        console.log(`ProductCarousel: Received data for "${title}"`, data);
        console.log(`ProductCarousel: Data length for "${title}":`, Array.isArray(data) ? data.length : 'Not an array');
    }, [data, title]);

    return (
        <section className="py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold text-black dark:text-white">{title}</h2>
                <p className="text-black dark:text-white">Check console for data details.</p>
            </div>
        </section>
    );
};

export default ProductCarousel;