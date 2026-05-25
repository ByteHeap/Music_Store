import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllProducts } from '../api/apiClient';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';

export default function PromotionsPage() {
    const [promoProducts, setPromoProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchPromotions = async () => {
            setIsLoading(true);
            try {
                const allProducts = await fetchAllProducts();
                const filtered = allProducts.filter(p => {
                    // eslint-disable-next-line no-useless-assignment
                    let specsObj: Record<string, never> = {};
                    try {
                        specsObj = typeof p.specs === 'string' ? JSON.parse(p.specs) : (p.specs || {});
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    } catch (e) {
                        return false;
                    }


                    // Verify the JSON KEY is found in discount/promo section
                    return Object.keys(specsObj).some(key =>
                        key.toLowerCase().includes('promo') ||
                        key.toLowerCase().includes('discount') ||
                        key.toLowerCase().includes('reducere')
                    );
                });

                setPromoProducts(filtered);
            } catch (error) {
                console.error("Eroare la încărcarea promoțiilor:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPromotions();
    }, []);

    return (
        <div className="min-h-screen bg-[#f5f5f7] dark:bg-[#050505] pb-24">

            <div className="bg-black text-white py-24 px-4 text-center">
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                    Oferte Exclusive.
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto">
                    Descoperă echipamente și muzică la prețuri speciale. Timp limitat.
                </p>
            </div>

            <div className="container mx-auto px-4 pt-16 max-w-7xl">
                {isLoading ? (
                    <div className="text-center py-20 text-xl font-medium text-gray-500">
                        Se caută ofertele...
                    </div>
                ) : promoProducts.length === 0 ? (
                    <div className="text-center py-32">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">Nu sunt promoții active momentan.</h2>
                        <p className="text-gray-500 text-lg">Revino mai târziu pentru noi oferte speciale!</p>
                        <Link to="/" className="inline-block mt-8 text-blue-500 font-semibold hover:underline">
                            Întoarce-te la magazin
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {promoProducts.map((product) => {

                            const specsObj: Record<string, never> = typeof product.specs === 'string' ? JSON.parse(product.specs) : (product.specs || {});
                            const promoKey = Object.keys(specsObj).find(key => key.toLowerCase().includes('promo') || key.toLowerCase().includes('discount') || key.toLowerCase().includes('reducere'));
                            const discountValue = promoKey ? specsObj[promoKey] : '';

                            return (
                                <div key={product.id} className="group relative">
                                    <Link
                                        to={`/product/${product.id}`}
                                        className="bg-white dark:bg-[#111] rounded-3xl p-6 h-full flex flex-col hover:shadow-2xl transition-all duration-500 border border-transparent dark:border-gray-800"
                                    >
                                        {/* Promotions Badge*/}
                                        {discountValue && (
                                            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-md">
                                                {discountValue}
                                            </div>
                                        )}

                                        <div className="w-full h-56 bg-transparent flex items-center justify-center mb-6 relative">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>

                                        <div className="flex flex-col flex-grow text-center">
                                            <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-2">
                                                {product.brand === 'Unknown Artist' || !product.brand ? product.category : product.brand}
                                            </p>

                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 leading-snug">
                                                {product.name}
                                            </h3>

                                            <div className="mt-auto pt-4 flex flex-col items-center">
                                                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                                    {Number(product.price).toLocaleString()} {product.currency}
                                                </p>

                                                <button
                                                    className="bg-black dark:bg-white text-white dark:text-black rounded-full px-6 py-2.5 font-semibold hover:scale-105 transition-transform w-full shadow-lg"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        addToCart(product);
                                                    }}
                                                >
                                                    Adaugă în Coș
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}