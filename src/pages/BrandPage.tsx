import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllBrands } from '../api/apiClient';
import type { Brand } from '../types';

export default function BrandsPage() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadBrands = async () => {
            setIsLoading(true);
            try {
                const apiBrands = await fetchAllBrands();
                setBrands(apiBrands);
            } catch (error) {
                console.error("Error loading brands:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadBrands();
    }, []);

    return (
        <div className="container mx-auto px-4 py-16 max-w-7xl min-h-screen">

            {/* Header */}
            <div className="mb-16 text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl font-semibold text-black dark:text-white tracking-tight mb-4">
                    Branduri.
                </h1>
                <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto lg:mx-0">
                    Echipamente și instrumente de la cei mai renumiți producători mondiali.
                </p>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-32">
                    <div className="text-xl font-medium text-gray-500 animate-pulse">
                        Se încarcă brandurile...
                    </div>
                </div>
            ) : brands.length === 0 ? (
                <div className="bg-[#f5f5f7] dark:bg-[#111] p-10 rounded-3xl text-center border border-transparent dark:border-gray-800">
                    <h2 className="text-2xl font-semibold text-black dark:text-white mb-3 tracking-tight">Nu s-au găsit branduri.</h2>
                    <p className="text-gray-500 font-light">Baza de date nu conține nicio înregistrare momentan.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {brands.map((brand) => (
                        <Link
                            key={brand.id}
                            to={`/brand/${brand.id}`}
                            className="group bg-[#f5f5f7] dark:bg-[#0b0b0b] border border-transparent dark:border-gray-800 rounded-3xl p-8 hover:scale-[1.03] hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5 transition-all duration-300 flex items-center justify-center min-h-[160px]"
                        >
                            <h2 className="text-2xl font-semibold text-black dark:text-white group-hover:text-blue-500 transition-colors tracking-tight text-center">
                                {brand.name}
                            </h2>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}