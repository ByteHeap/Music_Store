import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface SearchResult {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const Header: React.FC = () => {
  const { cartCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === 'INPUT' || activeTag === 'TEXTAREA' || activeTag === 'SELECT') {
        return;
      }

      if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
        setIsSearchOpen(true);
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 10);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const delayDebounceFn = setTimeout(async () => {
      try {
        const res = await fetch(`http://localhost:5001/api/products/search?q=${encodeURIComponent(searchQuery)}`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data);
        }
      } catch (err) {
        console.error("Eroare la căutare:", err);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/produse?q=${searchQuery}`);
    }
  };

  const openSearch = () => {
    setIsSearchOpen(true);
    setTimeout(() => searchInputRef.current?.focus(), 10);
  };

  const closeSearch = () => {
    setTimeout(() => {
      if (!searchQuery) {
        setIsSearchOpen(false);
      }
      setSearchResults([]);
    }, 200);
  };

  const getUserIconRoute = () => {
    if (!user) return "/login";
    if (user.rol === 'admin') return "/admin";
    return "/profile";
  };

  return (
      <header className="bg-white/80 dark:bg-[#0b0b0b]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">

            {/* Logo & Navigation */}
            <div className="flex items-center">
              {/* Interactive Glowing Logo Identity */}
              <Link to="/" className="relative text-2xl font-bold text-black dark:text-white tracking-tight group flex items-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-8 bg-blue-500/20 dark:bg-blue-600/30 blur-[14px] rounded-full pointer-events-none transition-all duration-500 group-hover:bg-blue-500/40 dark:group-hover:bg-blue-500/50 group-hover:w-28 group-hover:blur-[20px]"></div>
                <span className="relative z-10">
                                Byte<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-400 transition-all duration-300">Heap</span>
                            </span>
              </Link>

              <nav className="hidden md:flex space-x-8 ml-10">
                <Link to="/produse" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">PRODUSE</Link>
                <Link to="/promotii" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">PROMOTII</Link>
                <Link to="/artists" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">ARTISTI</Link>
                <Link to="/brands" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">BRANDURI</Link>
                <Link to="/blog" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">BLOG</Link>
              </nav>
            </div>

            {/* Action Icons */}
            <div className="flex items-center space-x-6">

              {/* ANIMATED SEARCH BAR */}
              <div className={`hidden sm:flex items-center relative transition-all duration-300 ease-in-out h-10 ${isSearchOpen ? 'w-64' : 'w-5'}`}>

                <form
                    onSubmit={handleSearch}
                    className={`absolute right-0 w-64 transition-all duration-300 ease-in-out origin-right z-20 ${
                        isSearchOpen ? 'opacity-100 scale-x-100 pointer-events-auto' : 'opacity-0 scale-x-90 pointer-events-none'
                    }`}
                >
                  <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onBlur={closeSearch}
                      placeholder="Caută produse..."
                      className="bg-gray-100 dark:bg-gray-900 border border-transparent dark:border-gray-800 text-gray-900 dark:text-white rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm transition-all shadow-sm"
                  />
                  <button type="submit" className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500 hover:text-blue-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>

                  {/* SEARCH RESULTS DROPDOWN*/}
                  {searchQuery.length > 0 && (
                      <div className="absolute top-full right-0 mt-2 w-full bg-white dark:bg-[#141416] border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-50 animate-fade-in">

                        {isSearching ? (
                            <div className="p-4 text-center text-sm text-gray-500">Se caută...</div>
                        ) : searchResults.length > 0 ? (
                            <div className="flex flex-col">
                              {searchResults.map((result) => (
                                  <Link
                                      key={result.id}
                                      to={`/product/${result.id}`}
                                      onClick={() => {
                                        setSearchQuery('');
                                        setSearchResults([]);
                                        setIsSearchOpen(false);
                                      }}
                                      className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-[#1a1a1c] transition-colors border-b border-gray-50 dark:border-gray-800/50 last:border-0"
                                  >
                                    <div className="w-10 h-10 bg-gray-100 dark:bg-black rounded-lg p-1 flex-shrink-0 flex items-center justify-center">
                                      <img src={result.image} alt={result.name} className="max-w-full max-h-full object-contain" />
                                    </div>
                                    <div className="flex flex-col flex-grow overflow-hidden">
                                      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">{result.name}</span>
                                      <span className="text-[10px] uppercase font-bold text-blue-500 tracking-wider">{result.category}</span>
                                    </div>
                                    <div className="text-sm font-bold text-gray-900 dark:text-white whitespace-nowrap">
                                      {Number(result.price).toLocaleString()} <span className="text-xs text-gray-500">RON</span>
                                    </div>
                                  </Link>
                              ))}
                            </div>
                        ) : (
                            <div className="p-4 text-center text-sm text-gray-500">Niciun produs găsit.</div>
                        )}
                      </div>
                  )}
                </form>

                <button
                    onClick={openSearch}
                    className={`absolute right-0 text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300 ${
                        isSearchOpen ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100'
                    }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>

              {/* User Icon */}
              <Link to={getUserIconRoute()} className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>

              {/* Cart Icon */}
              <Link to="/cart" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm">
                                    {cartCount}
                                </span>
                )}
              </Link>
            </div>

          </div>
        </div>
      </header>
  );
};

export default Header;