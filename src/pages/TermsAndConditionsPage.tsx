import React from 'react';
import { Link } from 'react-router-dom';

const TermsPage: React.FC = () => {
    return (
        <div className="bg-white dark:bg-[#121212] min-h-screen pb-24">

            {/* Header Section */}
            <div className="bg-gray-50 dark:bg-[#1a1a1c] border-b border-gray-200 dark:border-gray-800 pt-20 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                        Termeni și Condiții
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                        Te rugăm să citești cu atenție acești termeni înainte de a utiliza platforma noastră.
                        Ultima actualizare: Mai 2026.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 max-w-4xl mt-16">
                <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800">

                    <div className="space-y-10 text-gray-600 dark:text-gray-400 font-light leading-relaxed text-lg">

                        {/* Section 1 */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
                                1. Dispoziții Generale
                            </h2>
                            <p className="mb-4">
                                Acest document stabilește termenii și condițiile de utilizare a site-ului web ByteHeap și condițiile de achiziționare a produselor și serviciilor comercializate prin intermediul acestui site.
                            </p>
                            <p>
                                Prin utilizarea site-ului, logarea în contul de utilizator și plasarea de comenzi, confirmi că ești de acord cu acești Termeni și Condiții. Dacă nu ești de acord, te rugăm să nu folosești serviciile noastre.
                            </p>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
                                2. Produse și Prețuri
                            </h2>
                            <p className="mb-4">
                                Ne străduim să oferim informații cât mai exacte despre echipamentele, instrumentele și accesoriile prezentate. Cu toate acestea, nu garantăm că descrierile produselor sau alte tipuri de conținut sunt complet lipsite de erori.
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Toate prețurile afișate pe site sunt exprimate în RON și includ TVA.</li>
                                <li>Prețurile pot fi modificate fără notificare prealabilă, însă comenzile deja plasate și confirmate vor păstra prețul de la momentul achiziției.</li>
                                <li>Imaginile produselor au caracter informativ și pot exista mici diferențe față de produsul real (ex. nuanțe de culoare).</li>
                            </ul>
                        </section>

                        {/* Section 3 */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
                                3. Comenzi și Plată
                            </h2>
                            <p className="mb-4">
                                Plasarea unei comenzi reprezintă o ofertă fermă din partea ta de a cumpăra produsele selectate. Contractul de vânzare-cumpărare se consideră încheiat în momentul în care primești emailul de confirmare a expedierii comenzii.
                            </p>
                            <p>
                                Metodele de plată acceptate sunt: plata cu cardul online (prin procesator securizat), plata ramburs la curier sau transfer bancar (doar pentru persoane juridice).
                            </p>
                        </section>

                        {/* Section 4 */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
                                4. Livrare
                            </h2>
                            <p className="mb-4">
                                Livrarea se face prin intermediul firmelor de curierat partenere pe întreg teritoriul României. Costul livrării este afișat în coșul de cumpărături înainte de finalizarea comenzii.
                            </p>
                            <p>
                                Comenzile care depășesc o anumită valoare (afișată pe site) beneficiază de transport gratuit. Timpul estimat de livrare este de 24-48 ore lucrătoare pentru produsele aflate în stocul propriu.
                            </p>
                        </section>

                        {/* Section 5 */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
                                5. Politica de Retur (Dreptul de Retragere)
                            </h2>
                            <p className="mb-4">
                                Conform legislației în vigoare (O.U.G. 34/2014), consumatorii au dreptul de a returna produsele achiziționate online în termen de <strong>14 zile calendaristice</strong> de la primirea coletului, fără invocarea unui motiv.
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Produsul trebuie returnat în aceeași stare în care a fost livrat, de preferat în ambalajul original, cu toate accesoriile și documentele care l-au însoțit.</li>
                                <li>Anumite produse (ex. software desigilat, căști in-ear din motive de igienă) nu pot fi returnate dacă au fost desigilate/folosite.</li>
                                <li>Costul transportului pentru retur este suportat de către client.</li>
                            </ul>
                        </section>

                        {/* Section 6 */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
                                6. Drepturi de Autor și Proprietate Intelectuală
                            </h2>
                            <p>
                                Întregul conținut al site-ului ByteHeap (imagini, texte, grafice, simboluri, elemente de grafică web, scripturi, programe) este proprietatea noastră sau a partenerilor noștri și este apărat de legea pentru protecția drepturilor de autor. Folosirea fără acordul nostru a oricăror elemente enumerate mai sus se pedepsește conform legislației în vigoare.
                            </p>
                        </section>

                    </div>

                </div>
            </div>

            {/* Need Help Footer */}
            <div className="container mx-auto px-4 max-w-4xl mt-16 text-center">
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                    Ai nelămuriri cu privire la termenii noștri?
                    <Link to="/contact" className="text-blue-600 dark:text-blue-500 hover:underline ml-2 transition-colors">
                        Contactează echipa de suport
                    </Link>
                </p>
            </div>

        </div>
    );
};

export default TermsPage;