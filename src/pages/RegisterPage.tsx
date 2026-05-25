import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
    const [numeComplet, setNumeComplet] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');


        if (password !== confirmPassword) {
            setError('Parolele nu se potrivesc!');
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ numeComplet, email, password })
            });

            const data = await response.json();

            if (data.success) {

                login(data.user);
                // Redirect them to the homepage to start shopping
                navigate('/');
            } else {
                setError(data.message); // Will show "Email deja folosit" if it exists
            }
        } catch (err) {
            setError('Eroare de conexiune la server.');
        }
    };

    return (
        <div className="min-h-screen bg-apple-gray-100 dark:bg-dark-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white uppercase tracking-wider">
                    Creeaza un cont nou
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                    Ai deja cont?{' '}
                    <Link to="/login" className="font-medium text-zeedo-orange hover:text-zeedo-red transition-colors">
                        Autentifica-te aici
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white dark:bg-dark-surface py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200 dark:border-gray-700">

                    {error && (
                        <div className="mb-6 bg-red-50 border-l-4 border-zeedo-red p-4 text-red-700 text-sm">
                            {error}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleRegister}>
                        <div>
                            <label htmlFor="numeComplet" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Nume Complet
                            </label>
                            <div className="mt-1">
                                <input
                                    id="numeComplet"
                                    type="text"
                                    required
                                    value={numeComplet}
                                    onChange={(e) => setNumeComplet(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-zeedo-orange focus:border-zeedo-orange dark:bg-gray-800 dark:text-white sm:text-sm"
                                    placeholder="Ion Popescu"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Adresa de Email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-zeedo-orange focus:border-zeedo-orange dark:bg-gray-800 dark:text-white sm:text-sm"
                                    placeholder="nume@exemplu.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Parola
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-zeedo-orange focus:border-zeedo-orange dark:bg-gray-800 dark:text-white sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Confirma Parola
                            </label>
                            <div className="mt-1">
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-zeedo-orange focus:border-zeedo-orange dark:bg-gray-800 dark:text-white sm:text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-zeedo-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zeedo-orange uppercase tracking-wider transition-colors"
                            >
                                Inregistrare
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}