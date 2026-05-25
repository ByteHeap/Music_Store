import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAllProducts, fetchAllArtists } from '../api/apiClient';
import { useCart } from '../context/CartContext';
import type { Product, Artist } from '../types';

export default function ArtistDetail() {
    const { id } = useParams<{ id: string }>();
    const [artist, setArtist] = useState<Artist | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { addToCart } = useCart();

    useEffect(() => {
        const loadData = async () => {
            if (!id) return;
            setIsLoading(true);

            try {
                const allArtists = await fetchAllArtists();
                const foundArtist = allArtists.find(a => a.id.toString() === id);
                setArtist(foundArtist || null);

                const allProducts = await fetchAllProducts();
                const matchedProducts = allProducts.filter(p => p.codArtist?.toString() === id);

                setProducts(matchedProducts);
            } catch (error) {
                console.error("Eroare la încărcarea detaliilor artistului:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#f5f5f7] dark:bg-[#050505] flex justify-center items-center">
                <div className="text-xl font-medium text-gray-500 animate-pulse">
                    Se caută detaliile...
                </div>
            </div>
        );
    }

    if (!artist) {
        return (
            <div className="min-h-screen bg-[#f5f5f7] dark:bg-[#050505] flex flex-col justify-center items-center p-4">
                <h1 className="text-3xl font-semibold text-black dark:text-white mb-4 tracking-tight">Artistul nu a fost găsit</h1>
                <Link to="/artists" className="text-blue-500 hover:text-blue-600 transition-colors font-medium">
                    Înapoi la lista de artiști
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f5f5f7] dark:bg-[#050505] pb-24">
            <div className="container mx-auto px-4 pt-12 max-w-7xl">

                {/* Breadcrumbs */}
                <div className="mb-12 text-xs font-semibold uppercase tracking-widest text-gray-400">
                    <Link to="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
                    <span className="mx-3 opacity-40">/</span>
                    <Link to="/artists" className="hover:text-black dark:hover:text-white transition-colors">Artiști</Link>
                    <span className="mx-3 opacity-40">/</span>
                    <span className="text-gray-900 dark:text-gray-100">{artist.name}</span>
                </div>

                {/* Header Section */}
                <div className="mb-16 text-center lg:text-left">
                    <h1 className="text-4xl md:text-5xl font-semibold text-black dark:text-white tracking-tight mb-4">
                        {artist.name}.
                    </h1>
                    <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto lg:mx-0">
                        Origine: <span className="font-medium text-black dark:text-white">{artist.country}</span> •
                        Activ din: <span className="font-medium text-black dark:text-white">{artist.startYear}</span>
                    </p>
                </div>

                {/* Product Grid*/}
                {products.length === 0 ? (
                    <div className="bg-white dark:bg-[#111] p-10 rounded-3xl text-center border border-transparent dark:border-gray-800 py-32 shadow-sm">
                        <h2 className="text-2xl font-semibold text-black dark:text-white mb-3 tracking-tight">Nu s-au găsit albume sau produse.</h2>
                        <p className="text-gray-500 font-light">Nu avem articole pe stoc pentru acest artist momentan.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product) => {
                            // Extragem valoarea discountului pentru a o afișa ca un "Badge" roșu dacă e la promoție
                            let specsObj: Record<string, any> = {};
                            try { specsObj = typeof product.specs === 'string' ? JSON.parse(product.specs) : (product.specs || {}); } catch(e) {}
                            const promoKey = Object.keys(specsObj).find(key => key.toLowerCase().includes('promo') || key.toLowerCase().includes('discount') || key.toLowerCase().includes('reducere'));
                            const discountValue = promoKey ? specsObj[promoKey] : '';

                            return (
                                <div key={product.id} className="group relative">
                                    <Link
                                        to={`/product/${product.id}`}
                                        className="bg-white dark:bg-[#111] rounded-3xl p-6 h-full flex flex-col hover:shadow-2xl transition-all duration-500 border border-transparent dark:border-gray-800"
                                    >
                                        {discountValue && (
                                            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-md">
                                                {discountValue}
                                            </div>
                                        )}

                                        <div className="w-full h-56 bg-transparent flex items-center justify-center mb-6 relative">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500 mix-blend-multiply dark:mix-blend-normal"
                                                style={product.category.toLowerCase().includes('vinil') ? { borderRadius: '4px', objectFit: 'cover' } : {}}
                                            />
                                        </div>

                                        <div className="flex flex-col flex-grow text-center">
                                            <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-2">
                                                {product.specs?.['Categorie'] || product.category || 'Generic'}
                                            </p>

                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 leading-snug">
                                                {product.name}
                                            </h3>

                                            <div className="mt-auto pt-4 flex flex-col items-center">
                                                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                                    {Number(product.price).toLocaleString()} {product.currency}
                                                </p>

                                                <button
                                                    className="bg-black dark:bg-white text-white dark:text-black rounded-full px-6 py-2.5 font-semibold hover:scale-[1.03] transition-transform w-full shadow-lg"
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