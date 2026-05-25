import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// FAQ Data structured by categories
const faqCategories = [
    {
        title: "Comenzi & Livrare",
        items: [
            {
                id: "q1",
                question: "Cât durează și cât costă livrarea?",
                answer: "Pentru comenzile de peste 500 RON, livrarea este GRATUITĂ oriunde în România. Pentru comenzile sub această sumă, costul este de 25 RON. Produsele aflate în stoc sunt livrate de obicei în 24-48 de ore lucrătoare."
            },
            {
                id: "q2",
                question: "Cum pot urmări statusul comenzii mele?",
                answer: "Imediat ce comanda ta a fost predată curierului, vei primi un email cu numărul de AWB (tracking). De asemenea, poți verifica oricând statusul din secțiunea 'Istoric Comenzi' a contului tău."
            },
            {
                id: "q3",
                question: "Livrăm și în afara României?",
                answer: "În acest moment livrăm standard doar pe teritoriul României. Pentru cereri speciale și livrări internaționale, te rugăm să ne contactezi direct."
            }
        ]
    },
    {
        title: "Garanție & Retur",
        items: [
            {
                id: "q4",
                question: "Câte zile am la dispoziție pentru a returna un produs?",
                answer: "Ai la dispoziție 14 zile calendaristice de la primirea coletului pentru a returna orice produs, fără a fi nevoie de o justificare. Produsul trebuie să fie în starea originală, cu toate accesoriile incluse."
            },
            {
                id: "q5",
                question: "Cât timp beneficiază produsele de garanție?",
                answer: "Toate echipamentele noi beneficiază de o garanție comercială de 24 de luni pentru persoanele fizice și 12 luni pentru persoanele juridice. Garanția acoperă defectele de fabricație."
            }
        ]
    },
    {
        title: "Echipamente & Consultanță",
        items: [
            {
                id: "q6",
                question: "Oferiți consultanță pentru amenajarea unui studio?",
                answer: "Da! Echipa noastră este formată din specialiști în sunet. Ne poți contacta oricând pentru a te ajuta să alegi monitoarele, interfețele sau tratamentul acustic potrivit spațiului tău."
            },
            {
                id: "q7",
                question: "Efectuați instalări de echipamente (PA / Iluminat)?",
                answer: "Pentru proiecte complexe (cluburi, săli de concerte, studiouri mari), oferim servicii de instalare și calibrare pe bază de proiect. Te rugăm să ne contactezi pe email pentru o ofertă personalizată."
            }
        ]
    }
];

const FAQPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const [openId, setOpenId] = useState<string | null>(null);

    const toggleAccordion = (id: string) => {
        setOpenId(openId === id ? null : id);
    };

    // Filter categories and questions based on search input
    const filteredCategories = faqCategories.map(category => {
        const filteredItems = category.items.filter(item =>
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return { ...category, items: filteredItems };
    }).filter(category => category.items.length > 0);

    return (
        <div className="min-h-screen bg-[#f5f5f7] dark:bg-[#050505] pb-24">

            {/* Header */}
            <div className="pt-24 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h1 className="text-4xl md:text-6xl font-semibold text-black dark:text-white mb-6 tracking-tight">
                        Cum te putem ajuta?
                    </h1>
                    <p className="text-xl text-gray-500 font-light mb-12">
                        Găsește răspunsuri rapide la cele mai comune întrebări.
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-2xl mx-auto">
                        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                            <svg className="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Caută (ex: retur, livrare, garanție)..."
                            className="w-full bg-white dark:bg-[#111] border border-transparent dark:border-gray-800 text-black dark:text-white rounded-full pl-16 pr-6 py-5 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm text-lg font-light"
                        />
                    </div>
                </div>
            </div>

            {/* Main Content - Accordion */}
            <div className="container mx-auto px-4 max-w-3xl mt-8">

                {filteredCategories.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-gray-500 dark:text-gray-400 text-xl font-light">
                            Nu am găsit niciun rezultat pentru căutarea ta.<br/> Încearcă alte cuvinte cheie!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-16">
                        {filteredCategories.map((category, index) => (
                            <div key={index}>
                                <h2 className="text-3xl font-semibold text-black dark:text-white mb-8 tracking-tight pl-2">
                                    {category.title}
                                </h2>
                                <div className="space-y-4">
                                    {category.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="bg-white dark:bg-[#0b0b0b] border border-transparent dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm transition-all duration-300"
                                        >
                                            <button
                                                onClick={() => toggleAccordion(item.id)}
                                                className="w-full flex justify-between items-center text-left p-6 md:p-8 focus:outline-none group"
                                            >
                                                <span className="text-lg md:text-xl font-medium text-black dark:text-white pr-4 group-hover:text-blue-500 transition-colors">
                                                    {item.question}
                                                </span>
                                                <span className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 ${openId === item.id ? 'bg-[#f5f5f7] dark:bg-[#111] text-black dark:text-white rotate-180' : 'bg-[#f5f5f7] dark:bg-[#111] text-gray-400'}`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </span>
                                            </button>

                                            <div
                                                className={`transition-all duration-300 ease-in-out px-6 md:px-8 overflow-hidden ${openId === item.id ? 'max-h-[500px] opacity-100 pb-8' : 'max-h-0 opacity-0 pb-0'}`}
                                            >
                                                <p className="text-gray-500 dark:text-gray-400 font-light leading-relaxed text-lg">
                                                    {item.answer}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Still need help? CTA */}
            <div className="container mx-auto px-4 mt-32 text-center max-w-4xl">
                <div className="bg-white dark:bg-[#0b0b0b] rounded-[3rem] p-16 border border-transparent dark:border-gray-800 shadow-sm">
                    <h3 className="text-3xl md:text-4xl font-semibold text-black dark:text-white mb-6 tracking-tight">
                        Nu ai găsit răspunsul dorit?
                    </h3>
                    <p className="text-xl text-gray-500 font-light mb-10 max-w-xl mx-auto">
                        Echipa noastră de specialiști este gata să îți răspundă la orice întrebare tehnică sau legată de comenzi.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-block bg-black dark:bg-white text-white dark:text-black font-semibold text-lg py-4 px-10 rounded-full hover:scale-105 transition-transform duration-300 shadow-xl shadow-black/10 dark:shadow-white/10"
                    >
                        Contactează-ne
                    </Link>
                </div>
            </div>

        </div>
    );
};

export default FAQPage;