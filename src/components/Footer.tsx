import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="bg-apple-gray-100 dark:bg-dark-surface text-gray-800 dark:text-apple-gray-400 pt-16 pb-8 border-t border-apple-gray-300 dark:border-gray-700 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Brand Info */}
                    <div>
                        <Link to="/" className="text-2xl font-bold tracking-tighter mb-6 inline-block text-black dark:text-white">
                            Byte<span className="text-apple-blue dark:text-dark-primary">Heap</span>
                        </Link>
                        <p className="text-sm leading-relaxed mb-6">
                            Your premium destination for professional audio, studio equipment, DJ gear, and musical instruments.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-black dark:text-white text-sm font-bold uppercase tracking-wider mb-4">Information</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/about" className="hover:text-apple-blue dark:hover:text-dark-primary transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="hover:text-apple-blue dark:hover:text-dark-primary transition-colors">Contact</Link></li>
                            <li><Link to="/terms&conditions" className="hover:text-apple-blue dark:hover:text-dark-primary transition-colors">Terms & Conditions</Link></li>
                            <li><Link to="/privacy" className="hover:text-apple-blue dark:hover:text-dark-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="text-black dark:text-white text-sm font-bold uppercase tracking-wider mb-4">Customer Service</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link to="/profile" className="hover:text-apple-blue dark:hover:text-dark-primary transition-colors">My Account</Link></li>
                            <li><Link to="/orders" className="hover:text-apple-blue dark:hover:text-dark-primary transition-colors">Order History</Link></li>
                            <li><Link to="/faq" className="hover:text-apple-blue dark:hover:text-dark-primary transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-black dark:text-white text-sm font-bold uppercase tracking-wider mb-4">Newsletter</h4>
                        <p className="text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
                        <form className="flex">
                            <input 
                                type="email" 
                                placeholder="Email address" 
                                className="w-full bg-apple-gray-200 dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-apple-blue dark:focus:ring-dark-primary border border-apple-gray-300 dark:border-gray-700"
                            />
                            <button 
                                type="button" 
                                className="bg-apple-blue hover:bg-blue-600 dark:bg-dark-primary dark:hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-r-md transition-colors"
                            >
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-apple-gray-300 dark:border-gray-700 pt-8 text-center text-xs">
                    <p>&copy; {new Date().getFullYear()} ByteHeap. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;