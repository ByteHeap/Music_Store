import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';

const ResetPasswordPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token'); // Extragem token-ul din adresa URL
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    if (!token) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center dark:bg-[#121212]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Link invalid</h2>
                    <Link to="/" className="text-blue-600 hover:underline">Întoarce-te pe pagina principală</Link>
                </div>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setStatus('error');
            setMessage('Parolele nu se potrivesc!');
            return;
        }

        if (password.length < 6) {
            setStatus('error');
            setMessage('Parola trebuie să aibă minim 6 caractere.');
            return;
        }

        setStatus('loading');

        try {
            const response = await fetch('http://localhost:5001/api/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword: password })
            });

            const data = await response.json();

            if (data.success) {
                setStatus('success');
                setMessage('Parola a fost schimbată cu succes! Te vom redirecționa la login...');
                setTimeout(() => navigate('/login'), 3000);
            } else {
                setStatus('error');
                setMessage(data.message); // Ex: "Token expirat"
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setStatus('error');
            setMessage('A apărut o eroare de rețea.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#121212] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                    Setează noua parolă
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white dark:bg-[#1c1c1e] py-8 px-4 shadow-xl border border-gray-100 dark:border-gray-800 sm:rounded-2xl sm:px-10">

                    {status === 'success' ? (
                        <div className="text-center text-green-600 dark:text-green-400 font-medium">
                            {message}
                        </div>
                    ) : (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {message && status === 'error' && (
                                <div className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-500/10 p-3 rounded-lg">
                                    {message}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Noua parolă</label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm bg-transparent text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirmă noua parolă</label>
                                <input
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-xl shadow-sm bg-transparent text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {status === 'loading' ? 'Se salvează...' : 'Salvează parola'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;