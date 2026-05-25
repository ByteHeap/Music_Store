import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#f5f5f7] dark:bg-[#050505] pb-24">
            {/* Hero Section */}
            <section className="container mx-auto px-4 py-24 lg:py-32 text-center max-w-5xl">
                <h1 className="text-5xl md:text-7xl font-semibold text-black dark:text-white tracking-tight mb-8 leading-tight">
                    Sunetul tău. <br className="hidden md:block" />
                    <span className="text-blue-500">Pasiunea noastră.</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 leading-relaxed font-light max-w-3xl mx-auto">
                    ByteHeap este destinația ta premium pentru echipamente audio profesionale, aparatură de studio,
                    echipamente DJ și instrumente muzicale. Susținem artiștii să își atingă potențialul maxim.
                </p>
            </section>

            {/* Image Feature */}
            <section className="container mx-auto px-4 pb-24 max-w-6xl">
                <div className="w-full h-[400px] md:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/10 dark:shadow-white/5 border border-transparent dark:border-gray-800">
                    <img
                        src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop"
                        alt="Professional recording studio"
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>

            <section className="container mx-auto px-4 pb-32 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white dark:bg-[#0b0b0b] border border-transparent dark:border-gray-800 rounded-3xl p-10 hover:scale-[1.02] transition-transform duration-500 shadow-sm hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5 flex flex-col items-center text-center md:items-start md:text-left">
                        <div className="w-16 h-16 bg-[#f5f5f7] dark:bg-[#111] text-blue-500 rounded-2xl flex items-center justify-center mb-8">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold text-black dark:text-white mb-4 tracking-tight">Calitate Garantată</h3>
                        <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed text-lg">
                            Colaborăm exclusiv cu branduri de top din industrie pentru a ne asigura că echipamentul tău livrează performanță la cel mai înalt nivel.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-[#0b0b0b] border border-transparent dark:border-gray-800 rounded-3xl p-10 hover:scale-[1.02] transition-transform duration-500 shadow-sm hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5 flex flex-col items-center text-center md:items-start md:text-left">
                        <div className="w-16 h-16 bg-[#f5f5f7] dark:bg-[#111] text-blue-500 rounded-2xl flex items-center justify-center mb-8">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold text-black dark:text-white mb-4 tracking-tight">Expertiză Tehnică</h3>
                        <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed text-lg">
                            Echipa noastră este formată din ingineri de sunet și muzicieni profesioniști gata să îți ofere consultanță gratuită.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-[#0b0b0b] border border-transparent dark:border-gray-800 rounded-3xl p-10 hover:scale-[1.02] transition-transform duration-500 shadow-sm hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5 flex flex-col items-center text-center md:items-start md:text-left">
                        <div className="w-16 h-16 bg-[#f5f5f7] dark:bg-[#111] text-blue-500 rounded-2xl flex items-center justify-center mb-8">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold text-black dark:text-white mb-4 tracking-tight">Comunitate</h3>
                        <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed text-lg">
                            Nu suntem doar un magazin, suntem un hub pentru pasionații de muzică. Oferim suport pe termen lung pentru proiectele tale.
                        </p>
                    </div>
                </div>
            </section>

            <section className="container mx-auto px-4 pb-32 max-w-4xl text-center">
                <h2 className="text-4xl font-semibold text-black dark:text-white mb-10 tracking-tight">Povestea Noastră.</h2>
                <div className="space-y-8 text-gray-500 dark:text-gray-400 font-light leading-relaxed text-xl text-left md:text-center">
                    <p>
                        ByteHeap a luat naștere din pasiunea pentru sunetul perfect. Am observat că muzicienii și producătorii au nevoie nu doar de un loc de unde să cumpere echipamente, ci de un partener de încredere care înțelege diferența dintre un cablu oarecare și conexiunea perfectă pentru un mixaj curat.
                    </p>
                    <p>
                        De la sintetizatoare analogice la cele mai noi interfețe audio digitale, am selectat cu atenție fiecare produs din catalogul nostru. Scopul nostru este simplu: să îți aducem instrumentele de care ai nevoie pentru a-ți transforma ideile în realitate, rapid, sigur și cu sprijinul unor profesioniști.
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-4 text-center max-w-5xl">
                <div className="bg-white dark:bg-[#0b0b0b] rounded-[3rem] p-16 md:p-24 border border-transparent dark:border-gray-800 shadow-sm">
                    <h2 className="text-4xl md:text-5xl font-semibold text-black dark:text-white mb-6 tracking-tight">Pregătit să creezi?</h2>
                    <p className="text-xl text-gray-500 font-light mb-12 max-w-2xl mx-auto">
                        Explorează catalogul nostru și găsește echipamentul ideal pentru următorul tău mare proiect.
                    </p>
                    <Link
                        to="/produse"
                        className="inline-block bg-black dark:bg-white text-white dark:text-black font-semibold text-lg py-5 px-12 rounded-full hover:scale-105 transition-transform duration-300 shadow-xl shadow-black/10 dark:shadow-white/10"
                    >
                        Explorează Magazinul
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;