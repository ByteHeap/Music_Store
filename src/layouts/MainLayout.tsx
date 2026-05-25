import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-white dark:bg-dark-background">
            <Header />

            {/* Outlet is where the current page content gets injected */}
            <main className="flex-grow flex flex-col bg-zeedo-gray dark:bg-dark-background">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}