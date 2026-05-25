import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // Importăm Auth pentru a ști cine e logat

export default function CartPage() {
    const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
    const { user } = useAuth(); // Extragem user-ul
    const navigate = useNavigate();

    const [isProcessing, setIsProcessing] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subtotal > 500 || cartItems.length === 0 ? 0 : 25;
    const total = subtotal + shipping;

    const handleCheckout = async () => {
        if (!user) {
            alert('Trebuie să fii autentificat pentru a plasa o comandă!');
            navigate('/login');
            return;
        }

        setIsProcessing(true);

        try {
            const response = await fetch('http://localhost:5001/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id, // SAU user.idUtilizator (depinde cum e in AuthContext)
                    total: total,
                    items: cartItems // Trimitem tot coșul direct
                })
            });

            const data = await response.json();

            if (data.success) {
                clearCart();
                setOrderSuccess(true);
            } else {
                alert(data.message || 'A apărut o eroare la plasarea comenzii.');
            }
        } catch (error) {
            console.error('Eroare de checkout:', error);
            alert('Nu ne-am putut conecta la server.');
        } finally {
            setIsProcessing(false);
        }
    };

    if (orderSuccess) {
        return (
            <div className="container mx-auto px-4 py-32 text-center max-w-2xl animate-fade-in">
                <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="text-4xl md:text-5xl font-semibold text-black dark:text-white tracking-tight mb-6">
                    Comanda a fost plasată!
                </h1>
                <p className="text-lg text-gray-500 font-light mb-12">
                    Îți mulțumim pentru comandă. Poți urmări statusul ei direct din contul tău de utilizator.
                </p>
                <div className="flex justify-center gap-4">
                    <Link to="/profile" className="inline-block bg-black dark:bg-white text-white dark:text-black font-semibold py-4 px-8 rounded-full hover:scale-105 transition-transform duration-300">
                        Vezi Comenzile
                    </Link>
                    <Link to="/produse" className="inline-block bg-gray-200 dark:bg-gray-800 text-black dark:text-white font-semibold py-4 px-8 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-300">
                        Continuă cumpărăturile
                    </Link>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-32 text-center max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-semibold text-black dark:text-white tracking-tight mb-6">
                    Coșul tău este gol.
                </h1>
                <p className="text-lg text-gray-500 font-light mb-12">
                    Nu ai adăugat încă niciun produs în coșul de cumpărături. Explorează selecția noastră pentru a găsi echipamentul perfect.
                </p>
                <Link to="/produse" className="inline-block bg-black dark:bg-white text-white dark:text-black font-semibold py-4 px-10 rounded-full hover:scale-105 transition-transform duration-300 shadow-lg">
                    Înapoi la Magazin
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16 max-w-6xl">
            <h1 className="text-4xl md:text-5xl font-semibold text-black dark:text-white tracking-tight mb-16 text-center lg:text-left">
                Coșul de cumpărături.
            </h1>

            <div className="flex flex-col lg:flex-row gap-16">
                {/* Product List */}
                <div className="lg:w-2/3 space-y-8">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row items-center gap-8 py-6 border-b border-gray-200 dark:border-gray-800 last:border-0 relative">
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="absolute top-6 right-0 sm:relative sm:top-0 sm:right-auto text-gray-400 hover:text-red-500 transition-colors p-2 z-10"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <Link to={`/product/${item.id}`} className="w-40 h-40 bg-[#f5f5f7] dark:bg-[#0b0b0b] rounded-3xl flex-shrink-0 flex items-center justify-center p-4 hover:opacity-80 transition-opacity">
                                <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                            </Link>

                            <div className="flex-grow text-center sm:text-left">
                                <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-2">
                                    {item.brand === 'Unknown Artist' || !item.brand ? item.category : item.brand}
                                </p>
                                <Link to={`/product/${item.id}`} className="text-2xl font-semibold text-black dark:text-white hover:text-blue-500 transition-colors line-clamp-2 leading-tight mb-2">
                                    {item.name}
                                </Link>
                                <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">
                                    {Number(item.price).toLocaleString()} {item.currency}
                                </p>
                            </div>

                            <div className="flex sm:flex-col items-center gap-6 sm:gap-3">
                                <div className="flex items-center bg-[#f5f5f7] dark:bg-[#111] rounded-full p-1">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-gray-800 rounded-full transition-all"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                                    </button>
                                    <span className="w-8 text-center font-semibold text-black dark:text-white text-lg">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-gray-800 rounded-full transition-all"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                    </button>
                                </div>
                                <div className="text-xl font-semibold text-black dark:text-white hidden sm:block">
                                    {(item.price * item.quantity).toLocaleString()} {item.currency}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Total */}
                <div className="lg:w-1/3 mt-8 lg:mt-0">
                    <div className="bg-[#f5f5f7] dark:bg-[#0b0b0b] rounded-3xl p-8 sticky top-28 border border-transparent dark:border-gray-800">
                        <h2 className="text-2xl font-semibold text-black dark:text-white mb-8 tracking-tight">Sumar Comandă</h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-gray-600 dark:text-gray-400 text-lg font-light">
                                <span>Subtotal</span>
                                <span className="font-medium text-black dark:text-white">{subtotal.toLocaleString()} RON</span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-gray-400 text-lg font-light">
                                <span>Cost Livrare</span>
                                <span className="font-medium text-black dark:text-white">{shipping === 0 ? 'GRATUIT' : `${shipping} RON`}</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 mb-10">
                            <div className="flex justify-between items-end">
                                <span className="text-xl font-semibold text-black dark:text-white">Total</span>
                                <div className="text-right">
                                    <span className="text-3xl font-bold text-black dark:text-white tracking-tight">{total.toLocaleString()} RON</span>
                                    <p className="text-xs text-gray-500 mt-1 font-medium">TVA Inclus</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={isProcessing}
                            className="w-full bg-black dark:bg-white disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white dark:text-black font-semibold text-lg py-4 rounded-full hover:scale-[1.02] transition-transform duration-300 shadow-lg"
                        >
                            {isProcessing ? 'Se procesează...' : 'Finalizează Comanda'}
                        </button>

                        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500 font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Plată securizată de ByteHeap
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}