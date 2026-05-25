import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
    return (
        <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center bg-gray-900 dark:bg-[#050505] overflow-hidden">

            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black/50 to-black z-0 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>

            {/* Hero Content */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center mt-[-50px]">
                <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                    Echipamentul perfect, <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                    la un click distanta.
                </span>
                </h1>

                <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl font-light">
                    Descopera instrumente muzicale, accesorii si echipamente audio de top. Bun venit in noua experienta <span className="font-semibold text-white">ByteHeap</span>.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Link
                        to="/produse"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2"
                    >
                        Exploreaza Produsele
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </Link>

                    {/* Secondary Action Button */}
                    <Link
                        to="/deals"
                        className="bg-white/5 hover:bg-white/10 backdrop-blur-md text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 border border-white/10 flex items-center justify-center"
                    >
                        Vezi Promotiile
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;