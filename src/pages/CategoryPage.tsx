import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { fetchAllProducts } from '../api/apiClient';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';

const CATEGORY_MAP: Record<string, string[]> = {
    'Muzica': ['Rock Vinil', 'Jazz CD', 'Techno Vinil', 'Muzica Clasica'],
    'Instrumente': ['Chitare', 'Sintetizatoare', 'Tobe', 'Piane Digitale'],
    'Echipamente Studio': ['Casti', 'Boxe', 'Interfete', 'Microfoane', 'Software Audio'],
    'Scena & Accesorii': ['Accesorii', 'Iluminat Scena']
};

export default function ProductsPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    // Read initial state from URL so direct links still work!
    const initialMain = searchParams.get('main') || 'all';
    const initialSub = searchParams.get('sub') || 'all';

    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [mainCategory, setMainCategory] = useState<string>(initialMain);
    const [subCategory, setSubCategory] = useState<string>(initialSub);
    const [isLoading, setIsLoading] = useState(true);

    const { addToCart } = useCart();

    useEffect(() => {
        const loadProducts = async () => {
            setIsLoading(true);
            try {
                const products = await fetchAllProducts();
                setAllProducts(products);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadProducts();
    }, []);

    const handleMainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newMain = e.target.value;
        setMainCategory(newMain);
        setSubCategory('all'); // Reset subcategory when main changes

        // Update URL
        if (newMain === 'all') {
            setSearchParams({});
        } else {
            setSearchParams({ main: newMain });
        }
    };

    const handleSubChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSub = e.target.value;
        setSubCategory(newSub);

        // Update URL to include both
        if (newSub === 'all') {
            setSearchParams({ main: mainCategory });
        } else {
            setSearchParams({ main: mainCategory, sub: newSub });
        }
    };


    const displayedProducts = allProducts.filter(p => {

        if (mainCategory === 'all') return true;


        const validSubCategories = CATEGORY_MAP[mainCategory] || [];

        if (subCategory === 'all') {
            return validSubCategories.includes(p.category);
        }

        return p.category === subCategory;
    });

    const activeSubcategories = CATEGORY_MAP[mainCategory] || [];

    return (
        <div className="min-h-screen bg-[#f5f5f7] dark:bg-[#050505] pb-24">
            <div className="container mx-auto px-4 pt-16 max-w-7xl">

                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-black dark:text-white mb-2">
                            {mainCategory === 'all' ? 'Toate Produsele.' : `${mainCategory}.`}
                        </h1>
                        <p className="text-lg text-gray-500 font-light">
                            {subCategory === 'all' ? 'Explorează colecția noastră completă.' : `Rezultate pentru ${subCategory}.`}
                        </p>
                    </div>

                    {/* Dropdowns Section */}
                    <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">

                        {/* MAIN CATEGORY */}
                        <div className="w-full sm:w-64">
                            <select
                                value={mainCategory}
                                onChange={handleMainChange}
                                className="w-full bg-white dark:bg-[#111] border border-transparent dark:border-gray-800 text-gray-900 dark:text-white text-sm font-medium rounded-full focus:ring-2 focus:ring-blue-500 block p-3.5 px-6 shadow-sm transition-colors cursor-pointer outline-none appearance-none hover:shadow-md"
                                style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='gray' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.2rem center', backgroundSize: '1em' }}
                            >
                                <option value="all">Toate Departamentele</option>
                                {Object.keys(CATEGORY_MAP).map(mainCat => (
                                    <option key={mainCat} value={mainCat}>{mainCat}</option>
                                ))}
                            </select>
                        </div>

                        {/* SUB-CATEGORY */}
                        {mainCategory !== 'all' && (
                            <div className="w-full sm:w-64 animate-fade-in">
                                <select
                                    value={subCategory}
                                    onChange={handleSubChange}
                                    className="w-full bg-white dark:bg-[#111] border border-transparent dark:border-gray-800 text-gray-900 dark:text-white text-sm font-medium rounded-full focus:ring-2 focus:ring-blue-500 block p-3.5 px-6 shadow-sm transition-colors cursor-pointer outline-none appearance-none hover:shadow-md"
                                    style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='gray' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.2rem center', backgroundSize: '1em' }}
                                >
                                    <option value="all">Toate din {mainCategory}</option>
                                    {activeSubcategories.map(sub => (
                                        <option key={sub} value={sub}>{sub}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Grid */}
                {isLoading ? (
                    <div className="flex justify-center items-center py-32">
                        <div className="text-xl font-medium text-gray-500 animate-pulse">
                            Se caută produsele...
                        </div>
                    </div>
                ) : displayedProducts.length === 0 ? (
                    <div className="bg-white dark:bg-[#111] p-10 rounded-3xl text-center border border-transparent dark:border-gray-800 py-32 shadow-sm">
                        <h2 className="text-2xl font-semibold text-black dark:text-white mb-3 tracking-tight">Niciun produs găsit.</h2>
                        <p className="text-gray-500 font-light">Încearcă să modifici filtrele pentru a găsi ceea ce cauți.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {displayedProducts.map((product) => {
                            const displayBrand = (product.brand === 'Unknown Artist' || !product.brand) ? product.category : product.brand;

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
                                                {displayBrand}
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