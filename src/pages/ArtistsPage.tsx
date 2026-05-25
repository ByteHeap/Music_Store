import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllArtists } from '../api/apiClient';
import type { Artist } from '../types';

export default function ArtistsPage() {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadArtists = async () => {
            setIsLoading(true);
            try {
                const apiArtists = await fetchAllArtists();
                setArtists(apiArtists);
            } catch (error) {
                console.error("Eroare la încărcarea artiștilor:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadArtists();
    }, []);

    return (
        <div className="container mx-auto px-4 py-16 max-w-7xl min-h-screen">

            {/* Header Secțiune - Apple Style */}
            <div className="mb-16 text-center lg:text-left">
                <h1 className="text-4xl md:text-5xl font-semibold text-black dark:text-white tracking-tight mb-4">
                    Artiști.
                </h1>
                <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto lg:mx-0">
                    Descoperă creatorii și muzicienii din spatele sunetului.
                </p>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-32">
                    <div className="text-xl font-medium text-gray-500 animate-pulse">
                        Se încarcă artiștii...
                    </div>
                </div>
            ) : artists.length === 0 ? (
                <div className="bg-[#f5f5f7] dark:bg-[#111] p-10 rounded-3xl text-center border border-transparent dark:border-gray-800">
                    <h2 className="text-2xl font-semibold text-black dark:text-white mb-3 tracking-tight">Nu a fost găsit niciun artist.</h2>
                    <p className="text-gray-500 font-light">Asigură-te că baza de date MySQL rulează și serverul backend este conectat.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {artists.map((artist) => (
                        <Link
                            key={artist.id}
                            to={`/artist/${artist.id}`}
                            className="group bg-[#f5f5f7] dark:bg-[#0b0b0b] border border-transparent dark:border-gray-800 rounded-3xl p-8 hover:scale-[1.03] hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5 transition-all duration-300 flex flex-col justify-between min-h-[220px]"
                        >
                            <div>
                                <h2 className="text-2xl font-semibold text-black dark:text-white mb-8 group-hover:text-blue-500 transition-colors tracking-tight leading-snug">
                                    {artist.name}
                                </h2>

                                <div className="flex flex-col gap-4 text-sm text-gray-500 dark:text-gray-400">
                                    <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-3">
                                        <span className="font-light">Origine</span>
                                        <span className="font-medium text-black dark:text-white">{artist.country}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-light">Activ din</span>
                                        <span className="font-medium text-black dark:text-white">{artist.startYear}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}