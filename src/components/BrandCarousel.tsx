import React from 'react';
import { Link } from 'react-router-dom';

const brands = [
    { id: '1', name: 'Pioneer DJ', slug: 'pioneer-dj' },
    { id: '2', name: 'Yamaha', slug: 'yamaha' },
    { id: '3', name: 'Roland', slug: 'roland' },
    { id: '4', name: 'Korg', slug: 'korg' },
    { id: '5', name: 'Shure', slug: 'shure' },
    { id: '6', name: 'Adam Audio', slug: 'adam-audio' },
    { id: '7', name: 'Focusrite', slug: 'focusrite' },
    { id: '8', name: 'Sennheiser', slug: 'sennheiser' },
];

const BrandCarousel: React.FC = () => {
    return (
        <section className="py-12 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
                    {brands.map((brand) => (
                        <Link 
                            key={brand.id} 
                            to={`/brand/${brand.slug}`}
                            className="text-xl md:text-2xl font-bold uppercase tracking-wider text-gray-400 hover:text-zeedo-dark transition-colors cursor-pointer"
                        >
                            {brand.name}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrandCarousel;