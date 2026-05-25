import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ArtistsPage from './pages/ArtistsPage';
import ArtistDetail from './pages/ArtistDetail';
import CategoryPage from './pages/CategoryPage';
import BrandPage from './pages/BrandPage';
import BrandDetail from "./pages/BrandDetail.tsx";
import CartPage from './pages/CartPage';
import RegisterPage from './pages/RegisterPage';
import UserPage from './pages/UserPage';


import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';


import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import PromotionsPage from './pages/PromotionsPage';
import AboutUsPage from "./pages/AboutUsPage.tsx";
import ContactPage from "./pages/ContactPage.tsx";
import FaqPage from "./pages/FaqPage.tsx";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage.tsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import BlogPostPage from "./pages/BlogPostPage.tsx";
import ScrollToTop from './components/ScrollTop';
import ResetPasswordPage from './pages/ResetPasswordPage';

function App() {
    return (
        <AuthProvider> {/* */}
            <CartProvider> {/* */}
                <BrowserRouter> {/* */}
                    <ScrollToTop />
                    <Routes> {/* */}
                        <Route element={<MainLayout />}> {/* */}
                            <Route path="/" element={<HomePage />} /> {/* */}
                            <Route path="/produse" element={<CategoryPage />} />
                            <Route path="/product/:id" element={<ProductPage />} /> {/* */}
                            <Route path="/artists" element={<ArtistsPage />} /> {/* */}
                            <Route path="/artist/:id" element={<ArtistDetail />} /> {/* */}
                            <Route path="/brands" element={<BrandPage />} />
                            <Route path="/brand/:id" element={<BrandDetail />} />
                            <Route path="/cart" element={<CartPage />} /> {/* */}

                            {/*<Route path="/category/:id" element={<CategoryPage />} />*/}
                            <Route path="/promotii" element={<PromotionsPage />} />
                            <Route path="/about" element={<AboutUsPage />} />
                            <Route path="/contact" element={<ContactPage />} />
                            <Route path="/faq" element={<FaqPage />} />
                            <Route path="/terms&conditions" element={<TermsAndConditionsPage/>} />
                            <Route path="/privacy" element={<PrivacyPolicyPage />} />
                            <Route path="/blog" element={<BlogPage />} />
                            <Route path="/blog/:slug" element={<BlogPostPage />} />

                            {/* Auth, Profile and Admin Control Panel */}
                            <Route path="/login" element={<LoginPage />} /> {/* */}
                            <Route path="/register" element={<RegisterPage />} /> {/* */}
                            <Route path="/profile" element={<UserPage />} /> {/* */}
                            <Route path="/admin" element={<AdminDashboard />} /> {/* */}
                            <Route path="/reset-password" element={<ResetPasswordPage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;