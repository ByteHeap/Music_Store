import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchAllProducts } from '../api/apiClient';
import type { Product } from '../types';

interface MusicItem {
    id: string | number;
    title: string;
    artist: string;
    genre: string;
    format: string;
    price: number;
    currency: string;
    image: string;
    stock: number;
}

export default function MusicPage() {
    const { t } = useTranslation();
    const [musicProducts, setMusicProducts] = useState<MusicItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadMusic = async () => {
            setIsLoading(true);
            const apiProducts = await fetchAllProducts();

            const dbMusic = apiProducts.filter(p => p.category.toLowerCase().includes('vinil') || p.category.toLowerCase().includes('cd') || p.category === 'music');

            if (dbMusic.length > 0) {
                const formattedMusic = dbMusic.map((dbProduct: Product) => ({
                    id: dbProduct.id,
                    title: dbProduct.name,
                    artist: dbProduct.brand,
                    genre: dbProduct.category || 'Generic',
                    format: (dbProduct.category || '').toLowerCase().includes('vinil') ? 'Vinyl' : 'CD',
                    price: dbProduct.price,
                    currency: dbProduct.currency,
                    image: dbProduct.image,
                    stock: 5
                }));

                setMusicProducts(formattedMusic);
            }
            setIsLoading(false);
        };

        loadMusic();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
                <div>
                    <h1 className="text-3xl font-bold text-zeedo-dark border-l-4 border-zeedo-orange pl-4 uppercase tracking-wider">
                        {t('nav.music', { defaultValue: 'Music Collection' })}
                    </h1>
                    <p className="text-gray-500 mt-2 ml-5">Browse our database of Vinyl and CDs.</p>
                </div>
            </div>

            {isLoading ? (
                <div className="text-center text-gray-500 py-12">Loading Database...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {musicProducts.map((album) => (
                        <Link to={`/product/${album.id}`} key={album.id} className="group flex flex-col bg-white border border-gray-100 rounded-lg overflow-hidden hover:shadow-xl transition-shadow relative cursor-pointer">
                            <div className={`absolute top-2 left-2 z-10 px-2 py-1 text-xs font-bold uppercase rounded text-white ${album.format === 'Vinyl' ? 'bg-zeedo-dark' : 'bg-gray-500'}`}>
                                {album.format}
                            </div>

                            <div className="relative h-64 w-full p-4 flex items-center justify-center bg-gray-50 overflow-hidden">
                                <img
                                    src={album.image}
                                    alt={album.title}
                                    className="max-h-full max-w-full object-cover shadow-md transform group-hover:scale-105 transition-transform duration-300"
                                    style={album.format === 'Vinyl' ? { borderRadius: '2px' } : { borderRadius: '4px' }}
                                />
                            </div>

                            <div className="p-4 flex flex-col flex-grow">
                                <span className="text-xs text-zeedo-orange uppercase font-semibold mb-1">{album.genre}</span>
                                <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1 line-clamp-1 group-hover:text-zeedo-red transition-colors">
                                    {album.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-2">
                                    {album.artist === 'Unknown Artist' ? 'Various Artists' : album.artist}
                                </p>

                                <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
                                    <span className="text-xl font-bold text-zeedo-dark">{Number(album.price).toLocaleString()} {album.currency}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}