import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const categories = [
    {
        id: 'studio',
        nameKey: 'nav.studio',
        image: 'https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=2070&auto=format&fit=crop',
        link: '/produse?main=Echipamente Studio'
    },
    {
        id: 'music',
        nameKey: 'nav.music',
        image: 'https://dj.studio/_next/image?url=%2Fi%2FAZP3iduqVRfOSQTcco1Yhz%2Fresize%3Dwidth%3A736%2Cheight%3A490%2FbBj77LSSywZ6IYOKyvsg&w=1487&q=30',
        link: '/produse?main=Muzica'
    },
    {
        id: 'instruments',
        nameKey: 'nav.instruments',
        image: 'https://media.sweetwater.com/m/insync/2019/05/guitar-parts-hero.jpg?width=1024&height=535&fit=cover',
        link: '/produse?main=Instrumente'
    },
    {
        id: 'all',
        nameKey: 'nav.all',
        image: 'https://www.mencheymusic.com/wp-content/uploads/2025/06/IMG_7779-scaled-700x400.jpg',
        link: '/produse'
    }
];

const CategoryGrid: React.FC = () => {
    const { t } = useTranslation();

    return (
        <section className="py-12 bg-zeedo-gray">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-8 uppercase tracking-wider text-zeedo-dark border-l-4 border-zeedo-red pl-4">
                    {t('home.shopByCategory' as any)}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            to={cat.link}
                            className="group relative h-64 overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow bg-white"
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all z-10"></div>
                            <img
                                src={cat.image}
                                alt={t(cat.nameKey as any)}
                                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-black to-transparent">
                                <h3 className="text-white text-xl font-bold uppercase">{t(cat.nameKey as any)}</h3>
                                <span className="text-zeedo-red text-sm font-semibold uppercase tracking-wider group-hover:text-white transition-colors">
                                    Explore &rarr;
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;