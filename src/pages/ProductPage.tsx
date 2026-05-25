import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../api/apiClient';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';

export default function ProductPage() {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);

    const [activeImage, setActiveImage] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);

    const { addToCart } = useCart();

    useEffect(() => {
        const loadProduct = async () => {
            if (!id) return;
            setIsLoading(true);
            const fetchedProduct = await fetchProductById(id);
            if (fetchedProduct) {
                setProduct(fetchedProduct);
                setActiveImage(fetchedProduct.image);
            }
            setIsLoading(false);
        };

        loadProduct();
    }, [id]);

    if (!id) return null;

    if (isLoading) {
        return <div className="container mx-auto px-4 py-32 text-center text-gray-500 font-medium text-lg">Se încarcă produsul...</div>;
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-32 text-center">
                <h1 className="text-3xl font-semibold mb-4 text-black dark:text-white tracking-tight">Produsul nu a fost găsit</h1>
                <Link to="/" className="text-blue-500 font-medium hover:underline transition-all">Întoarce-te pe prima pagină</Link>
            </div>
        );
    }

    const displayBrand = (product.brand === 'Unknown Artist' || !product.brand) ? product.category : product.brand;


    //It fetches "main" section from its corresponding sub category
    const getMainCategory = (subCategory: string) => {
        const cat = subCategory.toLowerCase();
        if (['rock vinil', 'jazz cd', 'techno vinil', 'muzica clasica'].includes(cat)) return 'Muzica';
        if (['chitare', 'sintetizatoare', 'tobe', 'piane digitale'].includes(cat)) return 'Instrumente';
        if (['casti', 'boxe', 'interfete', 'microfoane', 'software audio', 'iluminat scena'].includes(cat)) return 'Studio';
        return 'Accesorii'; // Fallback
    };

    const mainCategory = getMainCategory(product.category);


    // Helper Function for adding "+" in URL
    const formatUrlParam = (str: string) => encodeURIComponent(str).replace(/%20/g, '+');

    // URL final format
    const categoryUrl = `/produse?main=${formatUrlParam(mainCategory)}&sub=${formatUrlParam(product.category)}`;


    let brandLink = '#';

    // 1. If it has a Brand ID (Equipment), link to the Brand page
    if (product.brandId) {
        brandLink = `/brand/${product.brandId}`;
    }
    // 2. If it has an Artist ID (Vinyl/CD), link to the Artist page
    else if (product.codArtist) {
        brandLink = `/artist/${product.codArtist}`;
    }
    // 3. Fallback: If it has neither, link to the general products page using the NEW logic
    else {
        brandLink = categoryUrl;
    }

    let specsData: Record<string, never> = {};
    try {
        specsData = typeof product.specs === 'string' ? JSON.parse(product.specs) : (product.specs || {});
    } catch (e) {
        console.error("Eroare la parsarea specificatiilor JSON:", e);
    }

    const tracklistData: { groupName: string; tracks: { name: string; duration: string }[] }[] = specsData.TracklistData || [];

    const cleanSpecsData = { ...specsData };
    delete cleanSpecsData.TracklistData;

    return (
        <div className="container mx-auto px-4 py-12 max-w-6xl">

            <div className="mb-12 text-xs font-semibold uppercase tracking-widest text-gray-400">
                <Link to="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
                <span className="mx-3 opacity-40">/</span>


                <Link to={categoryUrl} className="hover:text-black dark:hover:text-white transition-colors">
                    {product.category}
                </Link>

                <span className="mx-3 opacity-40">/</span>
                <span className="text-gray-900 dark:text-gray-100">{product.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
                <div className="flex flex-col gap-6">
                    <div className="bg-[#f5f5f7] dark:bg-[#0b0b0b] rounded-3xl p-10 flex items-center justify-center h-[500px] border border-transparent dark:border-gray-800 transition-all">
                        <img src={activeImage} alt={product.name} className="max-w-full h-auto max-h-full object-contain" />
                    </div>

                    {product.gallery && product.gallery.length > 0 && (
                        <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                            <button onClick={() => setActiveImage(product.image)} className={`flex-shrink-0 w-20 h-20 bg-[#f5f5f7] dark:bg-[#0b0b0b] rounded-2xl overflow-hidden p-2 transition-all ${activeImage === product.image ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-[#050505]' : 'hover:opacity-80'}`}>
                                <img src={product.image} alt="Main" className="w-full h-full object-contain" />
                            </button>

                            {product.gallery.map((imgUrl, index) => (
                                <button key={index} onClick={() => setActiveImage(imgUrl)} className={`flex-shrink-0 w-20 h-20 bg-[#f5f5f7] dark:bg-[#0b0b0b] rounded-2xl overflow-hidden p-2 transition-all ${activeImage === imgUrl ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-[#050505]' : 'hover:opacity-80'}`}>
                                    <img src={imgUrl} alt={`Gallery ${index + 1}`} className="w-full h-full object-contain" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex flex-col justify-center">
                    <Link to={brandLink} className="text-sm font-semibold text-blue-500 uppercase tracking-widest mb-3 hover:text-blue-600 transition-colors">
                        {displayBrand}
                    </Link>
                    <h1 className="text-4xl lg:text-5xl font-semibold text-black dark:text-white mb-6 tracking-tight leading-tight">
                        {product.name}
                    </h1>
                    <div className="text-2xl font-medium text-black dark:text-white mb-8">
                        {Number(product.price).toLocaleString()} {product.currency}
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-10 text-lg font-light">
                        {product.description}
                    </p>
                    <button
                        onClick={() => product && addToCart(product)}
                        className="bg-black dark:bg-white text-white dark:text-black hover:scale-105 font-semibold py-4 px-10 rounded-full transition-transform duration-300 w-full md:w-auto self-start text-base"
                    >
                        Adaugă în Coș
                    </button>
                </div>
            </div>

            {tracklistData && tracklistData.length > 0 && (
                <div className="w-full max-w-4xl mx-auto pt-16 border-t border-gray-200 dark:border-gray-800">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-[#2d2d2d] dark:text-white mb-10 tracking-tight">
                        Listă piese:
                    </h2>

                    <div className="space-y-10 text-lg md:text-xl">
                        {tracklistData.map((group, idx) => (
                            <div key={idx} className="flex flex-col gap-4">
                                <h3 className="font-extrabold text-[#554e46] dark:text-[#a59e96]">
                                    {group.groupName}:
                                </h3>
                                <ul className="space-y-3">
                                    {group.tracks.map((track, tIdx) => (
                                        <li key={tIdx} className="flex text-[#333333] dark:text-gray-300 font-medium">
                                            {track.name} - {track.duration}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="w-full max-w-4xl mx-auto pt-20 pb-24 mt-16 border-t border-gray-200 dark:border-gray-800">
                <h2 className="text-3xl md:text-4xl font-semibold text-black dark:text-white mb-12 tracking-tight">
                    Specificații Tehnice
                </h2>

                <div className="flex flex-col">
                    {Object.keys(cleanSpecsData).length === 0 ? (
                        <div className="py-8 text-gray-500 text-lg font-light">
                            Nu există specificații detaliate pentru acest produs.
                        </div>
                    ) : (
                        Object.entries(cleanSpecsData).map(([key, value]) => (
                            <div key={key} className="flex flex-col md:flex-row py-5 border-b border-gray-200 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-[#111] transition-colors rounded-lg px-2 -mx-2">
                                <div className="md:w-1/3 font-semibold text-gray-900 dark:text-white text-lg mb-1 md:mb-0 pr-4">
                                    {key}
                                </div>
                                <div className="md:w-2/3 text-gray-500 dark:text-gray-400 text-lg font-light leading-relaxed">
                                    {String(value)}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}