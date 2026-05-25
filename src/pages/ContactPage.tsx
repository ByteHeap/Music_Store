import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('http://localhost:5001/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' }); // Clear the form

                // Go back to normal state after 5 seconds
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                alert(data.message || 'A apărut o eroare.'); // Basic error handling
            }
        } catch (error) {
            console.error('Eroare rețea:', error);
            setStatus('error');
            alert('Nu ne-am putut conecta la server. Încearcă din nou.');
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f5f7] dark:bg-[#050505] pb-24">

            {/* Header Section */}
            <div className="pt-24 pb-16">
                <div className="container mx-auto px-4 max-w-6xl text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-semibold text-black dark:text-white mb-6 tracking-tight">
                        Contactează-ne.
                    </h1>
                    <p className="text-xl text-gray-500 font-light max-w-2xl leading-relaxed">
                        Ai o întrebare despre un echipament, o comandă sau ai nevoie de consultanță pentru studioul tău?
                        Suntem aici să te ajutăm.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 max-w-6xl mt-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Contact Info */}
                    <div className="flex flex-col gap-12">
                        <div>
                            <div className="space-y-10">
                                {/* Phone */}
                                <div className="flex items-start gap-6 group">
                                    <div className="w-16 h-16 bg-white dark:bg-[#111] text-blue-500 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-sm border border-transparent dark:border-gray-800 group-hover:scale-105 transition-transform duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div className="pt-1">
                                        <h3 className="text-xl font-semibold text-black dark:text-white tracking-tight">Telefon</h3>
                                        <p className="text-gray-500 font-light mt-1">Luni - Vineri: 09:00 - 18:00</p>
                                        <a href="tel:+40700000000" className="text-blue-500 font-medium hover:text-blue-600 transition-colors mt-1 inline-block">
                                            +40 (700) 000 000
                                        </a>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start gap-6 group">
                                    <div className="w-16 h-16 bg-white dark:bg-[#111] text-blue-500 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-sm border border-transparent dark:border-gray-800 group-hover:scale-105 transition-transform duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="pt-1">
                                        <h3 className="text-xl font-semibold text-black dark:text-white tracking-tight">Email</h3>
                                        <p className="text-gray-500 font-light mt-1">Răspundem în maxim 24 de ore.</p>
                                        <a href="mailto:andreiclashroyale7@gmail.com" className="text-blue-500 font-medium hover:text-blue-600 transition-colors mt-1 inline-block">
                                            contact@byteheap.ro
                                        </a>
                                    </div>
                                </div>

                                {/* Locațion */}
                                <div className="flex items-start gap-6 group">
                                    <div className="w-16 h-16 bg-white dark:bg-[#111] text-blue-500 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-sm border border-transparent dark:border-gray-800 group-hover:scale-105 transition-transform duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div className="pt-1">
                                        <h3 className="text-xl font-semibold text-black dark:text-white tracking-tight">Showroom & Depozit</h3>
                                        <p className="text-gray-500 font-light mt-1 leading-relaxed">
                                            Strada Magazinului, Nr. 1<br/>
                                            Sector 1, București, România
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FAQ */}
                        <div className="bg-white dark:bg-[#0b0b0b] rounded-[2.5rem] p-10 border border-transparent dark:border-gray-800 shadow-sm mt-4">
                            <h3 className="text-2xl font-semibold text-black dark:text-white mb-3 tracking-tight">Ajutor rapid?</h3>
                            <p className="text-gray-500 font-light mb-6">
                                Verifică secțiunea noastră de întrebări frecvente. Este posibil să găsești răspunsul acolo.
                            </p>
                            <Link to="/faq" className="text-blue-500 font-medium hover:text-blue-600 transition-colors inline-flex items-center gap-2 group">
                                Mergi la FAQ
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <div className="bg-white dark:bg-[#0b0b0b] rounded-[3rem] p-10 lg:p-14 shadow-xl shadow-black/5 dark:shadow-white/5 border border-transparent dark:border-gray-800 relative overflow-hidden">
                            <h2 className="text-3xl font-semibold text-black dark:text-white mb-10 tracking-tight">
                                Trimite un mesaj
                            </h2>

                            {status === 'success' ? (
                                <div className="absolute inset-0 bg-white dark:bg-[#0b0b0b] z-10 flex flex-col items-center justify-center p-10 text-center animate-fade-in">
                                    <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-3xl font-semibold text-black dark:text-white mb-3 tracking-tight">Mesaj Trimis.</h3>
                                    <p className="text-gray-500 font-light text-lg">Îți mulțumim că ne-ai contactat. Vom reveni cu un răspuns în cel mai scurt timp posibil.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6 relative z-0">

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">
                                                Nume Complet
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full bg-[#f5f5f7] dark:bg-[#111] border border-transparent text-black dark:text-white rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-[#1a1a1a] outline-none transition-all"
                                                placeholder="Numele tău"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">
                                                Adresa de Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full bg-[#f5f5f7] dark:bg-[#111] border border-transparent text-black dark:text-white rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-[#1a1a1a] outline-none transition-all"
                                                placeholder="adresa@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">
                                            Subiect
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            required
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full bg-[#f5f5f7] dark:bg-[#111] border border-transparent text-black dark:text-white rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-[#1a1a1a] outline-none transition-all appearance-none cursor-pointer"
                                            style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='gray' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.2rem center', backgroundSize: '1em' }}
                                        >
                                            <option value="" disabled>Selectează un subiect...</option>
                                            <option value="Suport Comenzi">Suport Comenzi / Livrare</option>
                                            <option value="Consultanta">Consultanță Tehnică</option>
                                            <option value="Garantie">Garanție și Retur</option>
                                            <option value="Altele">Altele</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 px-2">
                                            Mesajul Tău
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full bg-[#f5f5f7] dark:bg-[#111] border border-transparent text-black dark:text-white rounded-3xl px-5 py-5 focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-[#1a1a1a] outline-none transition-all resize-none"
                                            placeholder="Cum te putem ajuta?"
                                        ></textarea>
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className="w-full bg-black dark:bg-white text-white dark:text-black font-semibold py-4 rounded-full hover:scale-[1.02] transition-transform duration-300 disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-lg"
                                        >
                                            {status === 'loading' ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Se trimite...
                                                </>
                                            ) : (
                                                'Trimite Mesajul'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;