import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAllProducts, fetchAllBrands } from '../api/apiClient';
import { useCart } from '../context/CartContext';
import type { Product, Brand } from '../types';

export default function BrandDetail() {
    const { id } = useParams<{ id: string }>();
    const [products, setProducts] = useState<Product[]>([]);
    const [brand, setBrand] = useState<Brand | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const { addToCart } = useCart();

    useEffect(() => {
        const loadData = async () => {
            if (!id) return;
            setIsLoading(true);

            try {
                // 1. Fetch all brands to find the current one's name
                const allBrands = await fetchAllBrands();
                const foundBrand = allBrands.find(b => b.id.toString() === id);
                setBrand(foundBrand || null);

                // 2. Fetch all products and filter by the new brandId from the database
                const allProducts = await fetchAllProducts();
                const matchedProducts = allProducts.filter(p => p.brandId?.toString() === id);

                setProducts(matchedProducts);
            } catch (error) {
                console.error("Eroare la încărcarea detaliilor brandului:", error);
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

    if (!brand) {
        return (
            <div className="min-h-screen bg-[#f5f5f7] dark:bg-[#050505] flex flex-col justify-center items-center p-4">
                <h1 className="text-3xl font-semibold text-black dark:text-white mb-4 tracking-tight">Brandul nu a fost găsit</h1>
                <Link to="/brands" className="text-blue-500 hover:text-blue-600 transition-colors font-medium">
                    Înapoi la lista de branduri
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
                    <Link to="/brands" className="hover:text-black dark:hover:text-white transition-colors">Branduri</Link>
                    <span className="mx-3 opacity-40">/</span>
                    <span className="text-gray-900 dark:text-gray-100">{brand.name}</span>
                </div>

                {/* Header */}
                <div className="mb-16 text-center lg:text-left">
                    <h1 className="text-4xl md:text-5xl font-semibold text-black dark:text-white tracking-tight mb-4">
                        {brand.name}.
                    </h1>
                    <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto lg:mx-0">
                        Descoperă colecția completă de echipamente și instrumente de la {brand.name}.
                    </p>
                </div>

                {/* Product Grid */}
                {products.length === 0 ? (
                    <div className="bg-white dark:bg-[#111] p-10 rounded-3xl text-center border border-transparent dark:border-gray-800 py-32 shadow-sm">
                        <h2 className="text-2xl font-semibold text-black dark:text-white mb-3 tracking-tight">Nu s-au găsit produse.</h2>
                        <p className="text-gray-500 font-light">Nu avem produse pe stoc pentru acest brand momentan.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product) => {
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