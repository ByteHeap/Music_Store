import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
    return (
        <section className="relative bg-zeedo-dark text-white h-[400px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
            <img
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop"
                alt="Studio Equipment"
                className="absolute inset-0 w-full h-full object-cover opacity-50"
            />

            <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-20">
                <div className="max-w-2xl mt-4">
                    <span className="text-zeedo-red font-bold tracking-wider uppercase mb-2 block text-sm">
                        New Arrivals
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                        Professional <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-zeedo-red to-zeedo-orange">
                            Audio Gear
                        </span>
                    </h1>
                    <p className="text-base text-gray-300 mb-6 max-w-lg leading-relaxed">
                        Discover the latest studio monitors, synthesizers, and DJ equipment from top brands. Elevate your sound with our premium selection.
                    </p>
                    <div className="flex gap-4">
                        <Link to="/category/studio" className="bg-zeedo-red hover:bg-red-700 text-white px-6 py-2 rounded font-semibold transition-colors uppercase tracking-wide text-sm">
                            Shop Now
                        </Link>
                        <Link to="/deals" className="bg-transparent border border-white hover:bg-white hover:text-black text-white px-6 py-2 rounded font-semibold transition-colors uppercase tracking-wide text-sm">
                            View Deals
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;