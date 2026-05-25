import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


interface OrderItem {
    productId: number;
    name: string;
    quantity: number;
    price: string;
    image: string;
}

interface Order {
    id: number;
    date: string;
    status: 'Noua' | 'Procesata' | 'Livrata' | 'Anulata';
    total: string;
    items: OrderItem[];
}

export default function UserPage() {
    const { user, logout } = useAuth();

    const [currentView, setCurrentView] = useState<'menu' | 'address'>('menu');
    const [adresaInput, setAdresaInput] = useState('');
    const [addressStatus, setAddressStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [addressMessage, setAddressMessage] = useState('');
    const [resetStatus, setResetStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');


    const [orders, setOrders] = useState<Order[]>([]);
    const [ordersLoading, setOrdersLoading] = useState(true);
    const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);


    useEffect(() => {
        if (user) {
            if (user.adresa) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setAdresaInput(user.adresa);
            }


            const fetchOrders = async () => {
                try {
                    const res = await fetch(`http://localhost:5001/api/users/${user.id}/orders`);
                    if (res.ok) {
                        const data = await res.json();
                        setOrders(data);
                    }
                } catch (error) {
                    console.error("Eroare la încărcarea comenzilor:", error);
                } finally {
                    setOrdersLoading(false);
                }
            };
            fetchOrders();
        }
    }, [user]);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Livrata': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'Procesata': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            case 'Noua': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'Anulata': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
        }
    };

    const toggleOrder = (orderId: number) => {
        setExpandedOrderId(prev => prev === orderId ? null : orderId);
    };


    const handlePasswordResetRequest = async () => {
        setResetStatus('loading');
        try {
            const response = await fetch('http://localhost:5001/api/request-password-reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email, idUtilizator: user.id })
            });
            const data = await response.json();
            if (data.success) {
                setResetStatus('success');
                setTimeout(() => setResetStatus('idle'), 5000);
            } else {
                setResetStatus('error');
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setResetStatus('error');
        }
    };


    const handleSaveAddress = async (e: React.FormEvent) => {
        e.preventDefault();
        if (adresaInput.length > 30) {
            setAddressStatus('error');
            setAddressMessage('Adresa nu poate depăși 30 de caractere.');
            return;
        }

        setAddressStatus('loading');
        try {
            const response = await fetch('http://localhost:5001/api/update-address', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idUtilizator: user.id, adresa: adresaInput })
            });
            const data = await response.json();

            if (data.success) {
                setAddressStatus('success');
                setAddressMessage('Adresă salvată cu succes!');

                // eslint-disable-next-line react-hooks/immutability
                user!.adresa = adresaInput;
                setTimeout(() => {
                    setCurrentView('menu');
                    setAddressStatus('idle');
                    setAddressMessage('');
                }, 2000);
            } else {
                setAddressStatus('error');
                setAddressMessage(data.message || 'Eroare la salvare.');
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setAddressStatus('error');
            setAddressMessage('Eroare de conexiune cu serverul.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <div className="bg-white dark:bg-[#0b0b0b] rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-700 dark:to-blue-500"></div>

                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-12 mb-8">
                        <div className="w-24 h-24 rounded-full border-4 border-white dark:border-[#0b0b0b] bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-3xl font-bold text-gray-400 dark:text-gray-500 overflow-hidden shadow-sm">
                            {user.numeComplet ? user.numeComplet.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <button onClick={logout} className="px-6 py-2 bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 font-semibold rounded-full hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors text-sm">
                            Deconectare
                        </button>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1 tracking-tight">
                        {user.numeComplet}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-10 flex items-center gap-2 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {user.email}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">


                        <div className="p-6 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-gray-800/60 flex flex-col max-h-[600px] overflow-hidden flex-grow">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Istoric Comenzi
                            </h2>

                            <div className="overflow-y-auto pr-2 custom-scrollbar flex-grow">
                                {ordersLoading ? (
                                    <div className="animate-pulse space-y-4">
                                        <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
                                        <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
                                    </div>
                                ) : orders.length === 0 ? (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Nu ai plasat nicio comandă până acum.</p>
                                        <Link to="/produse" className="text-blue-500 hover:text-blue-400 font-medium transition-colors">
                                            Începe cumpărăturile &rarr;
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-4 pb-4">
                                        {orders.map(order => (
                                            <div key={order.id} className="border border-gray-200 dark:border-gray-800/60 rounded-xl bg-white dark:bg-[#1a1a1c] overflow-hidden transition-all duration-300">


                                                <div
                                                    onClick={() => toggleOrder(order.id)}
                                                    className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#222] transition-colors flex justify-between items-center"
                                                >
                                                    <div>
                                                        <div className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                                            Comanda #{order.id}
                                                        </div>
                                                        <div className="text-xs text-gray-500 mt-1">
                                                            {new Date(order.date).toLocaleDateString('ro-RO')}
                                                        </div>
                                                    </div>
                                                    <div className="text-right flex items-center gap-4">
                                                        <div className="flex flex-col items-end gap-1">
                                                            <span className="font-bold text-gray-900 dark:text-white">{Number(order.total).toLocaleString()} RON</span>
                                                            <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full ${getStatusStyle(order.status)}`}>
                                                                {order.status}
                                                            </span>
                                                        </div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${expandedOrderId === order.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                </div>

                                                {/* Detaliile Produselor (Expandate) */}
                                                {expandedOrderId === order.id && (
                                                    <div className="bg-gray-50 dark:bg-[#111] p-4 border-t border-gray-100 dark:border-gray-800 animate-fade-in">
                                                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Produse Comandate</h4>
                                                        <ul className="space-y-3">
                                                            {order.items.map(item => (
                                                                <li key={item.productId} className="flex items-center justify-between gap-4">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="w-10 h-10 bg-white dark:bg-black rounded-lg p-1 flex-shrink-0 flex items-center justify-center">
                                                                            <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                                                                        </div>
                                                                        <div className="text-sm">
                                                                            <Link to={`/product/${item.productId}`} className="font-medium text-gray-900 dark:text-white hover:text-blue-500 transition-colors line-clamp-1">
                                                                                {item.name}
                                                                            </Link>
                                                                            <div className="text-xs text-gray-500">Buc: {item.quantity}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-sm font-semibold text-gray-900 dark:text-white whitespace-nowrap">
                                                                        {(Number(item.price) * item.quantity).toLocaleString()} RON
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>


                        <div className="p-6 rounded-2xl bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-gray-800/60 h-fit">
                            {currentView === 'menu' && (
                                <>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        </svg>
                                        Setări Cont
                                    </h2>

                                    {resetStatus === 'success' && (
                                        <div className="mb-6 p-3 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-lg text-sm font-medium animate-fade-in">
                                            Ți-am trimis un email cu instrucțiunile de resetare!
                                        </div>
                                    )}

                                    <ul className="space-y-2">
                                        <li
                                            onClick={handlePasswordResetRequest}
                                            className={`flex justify-between items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-[#222] p-3 rounded-xl transition-colors ${resetStatus === 'loading' ? 'opacity-50 pointer-events-none' : ''}`}
                                        >
                                            <span className="font-medium text-gray-800 dark:text-gray-200">{resetStatus === 'loading' ? 'Se trimite email...' : 'Schimbă parola'}</span>
                                            <span className="text-gray-400">&gt;</span>
                                        </li>
                                        <li
                                            onClick={() => setCurrentView('address')}
                                            className="flex justify-between items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-[#222] p-3 rounded-xl transition-colors"
                                        >
                                            <span className="flex flex-col">
                                                <span className="font-medium text-gray-800 dark:text-gray-200">Adresă de livrare</span>
                                                {user.adresa && <span className="text-xs text-blue-500 mt-1">Sunteti Logat Din: {user.adresa}</span>}
                                            </span>
                                            <span className="text-gray-400">&gt;</span>
                                        </li>
                                    </ul>
                                </>
                            )}

                            {currentView === 'address' && (
                                <form onSubmit={handleSaveAddress} className="animate-fade-in">
                                    <div className="flex items-center gap-2 mb-6">
                                        <button type="button" onClick={() => { setCurrentView('menu'); setAddressStatus('idle'); }} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Modifică Adresa</h2>
                                    </div>

                                    {addressMessage && (
                                        <div className={`mb-4 p-3 rounded-lg text-sm font-medium ${addressStatus === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                                            {addressMessage}
                                        </div>
                                    )}

                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                                            Adresă de livrare
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            maxLength={30}
                                            value={adresaInput}
                                            onChange={(e) => setAdresaInput(e.target.value)}
                                            placeholder="Ex: Str. Muzicii, Nr. 9, Bl. A"
                                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-[#1a1a1c] text-gray-900 dark:text-white outline-none focus:border-blue-500 transition-colors shadow-sm"
                                        />
                                        <div className="text-[10px] text-right mt-1 text-gray-400">
                                            {adresaInput.length} / 30 caractere
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={addressStatus === 'loading' || addressStatus === 'success'}
                                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-bold rounded-xl transition-colors shadow-sm"
                                    >
                                        {addressStatus === 'loading' ? 'Se salvează...' : addressStatus === 'success' ? 'Salvată!' : 'Salvează adresa'}
                                    </button>
                                </form>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}