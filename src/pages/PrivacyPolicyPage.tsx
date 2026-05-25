import React from 'react';

const PrivacyPage: React.FC = () => {
    return (
        <div className="bg-white dark:bg-[#121212] min-h-screen pb-24">

            {/* Header */}
            <div className="bg-gray-50 dark:bg-[#1a1a1c] border-b border-gray-200 dark:border-gray-800 pt-20 pb-16">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                        Politica de Confidențialitate
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                        Respectăm intimitatea ta și ne angajăm să îți protejăm datele personale.
                        Află cum colectăm, utilizăm și protejăm informațiile tale.
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
                        Ultima actualizare: Mai 2026
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
                                1. Introducere
                            </h2>
                            <p>
                                Această Politică de Confidențialitate descrie modul în care ByteHeap ("noi", "nostru" sau "magazinul") colectează, utilizează, procesează și protejează datele tale cu caracter personal atunci când utilizezi site-ul nostru web și serviciile aferente, în conformitate cu Regulamentul General privind Protecția Datelor (GDPR).
                            </p>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
                                2. Ce date personale colectăm?
                            </h2>
                            <p className="mb-4">
                                Colectăm doar informațiile strict necesare pentru a-ți oferi o experiență de cumpărături sigură și eficientă. Acestea includ:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Date de identificare:</strong> Nume, prenume.</li>
                                <li><strong>Date de contact:</strong> Adresă de email, număr de telefon, adresă de facturare și adresă de livrare.</li>
                                <li><strong>Date financiare:</strong> Detalii referitoare la tranzacții (nu stocăm datele cardului tău, acestea fiind procesate direct de platforma securizată de plată).</li>
                                <li><strong>Date tehnice:</strong> Adresa IP, tipul de browser, istoricul de navigare pe site-ul nostru (prin utilizarea cookie-urilor).</li>
                            </ul>
                        </section>

                        {/* Section 3 */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
                                3. Cum folosim datele tale?
                            </h2>
                            <p className="mb-4">
                                Utilizăm datele pe care ni le furnizezi în următoarele scopuri:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Pentru a procesa și livra comenzile plasate pe site.</li>
                                <li>Pentru a-ți oferi suport tehnic și a răspunde la solicitările tale trimise prin formularul de contact.</li>
                                <li>Pentru a-ți trimite notificări despre statusul comenzii (ex: AWB curier).</li>
                                <li>Pentru marketing direct (Newsletter), <strong>doar dacă</strong> ți-ai dat consimțământul explicit în acest sens.</li>
                            </ul>
                        </section>

                        {/* Section 4 */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
                                4. Partajarea datelor cu terți
                            </h2>
                            <p className="mb-4">
                                ByteHeap nu vinde și nu închiriază datele tale personale către terți. Partajăm informații doar cu partenerii noștri de încredere, strict pentru a putea onora comenzile:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Firme de curierat:</strong> (ex. Fan Courier, DPD) pentru a-ți putea livra produsele.</li>
                                <li><strong>Procesatori de plăți:</strong> pentru a facilita tranzacțiile online în condiții de maximă siguranță.</li>
                                <li><strong>Furnizori de servicii IT:</strong> pentru găzduirea site-ului și trimiterea emailurilor automate.</li>
                            </ul>
                        </section>

                        {/* Section 5 */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
                                5. Securitatea datelor
                            </h2>
                            <p>
                                Am implementat măsuri tehnice și organizatorice de securitate adecvate pentru a proteja datele tale personale împotriva pierderii, utilizării incorecte, accesului neautorizat sau divulgării. Accesul la datele tale este limitat doar la angajații și partenerii care au nevoie de aceste informații pentru a-și îndeplini atribuțiile.
                            </p>
                        </section>

                        {/* Section 6 */}
                        <section>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
                                6. Drepturile tale (GDPR)
                            </h2>
                            <p className="mb-4">
                                Conform legislației aplicabile, beneficiezi de următoarele drepturi în legătură cu datele tale personale:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Dreptul de acces:</strong> poți solicita o copie a datelor pe care le deținem despre tine.</li>
                                <li><strong>Dreptul la rectificare:</strong> poți cere corectarea datelor inexacte sau incomplete.</li>
                                <li><strong>Dreptul la ștergere ("dreptul de a fi uitat"):</strong> poți solicita ștergerea datelor tale din sistemele noastre.</li>
                                <li><strong>Dreptul la retragerea consimțământului:</strong> te poți dezabona oricând de la newsletter printr-un simplu click pe link-ul de "Dezabonare" din email.</li>
                            </ul>
                        </section>

                    </div>

                </div>
            </div>

            {/* Privacy Contact Footer */}
            <div className="container mx-auto px-4 max-w-4xl mt-16 text-center">
                <p className="text-gray-500 dark:text-gray-400 font-medium">
                    Ai întrebări despre cum îți gestionăm datele? Trimite-ne un email la
                    <a href="mailto:privacy@byteheap.ro" className="text-blue-600 dark:text-blue-500 hover:underline ml-1 transition-colors">
                        privacy@byteheap.ro
                    </a>
                </p>
            </div>

        </div>
    );
};

export default PrivacyPage;