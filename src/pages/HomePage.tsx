import Hero from '../components/Hero'; //
import ProductGrid from '../components/ProductGrid'; //
import CategoryGrid from '../components/CategoryGrid'; //

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen bg-apple-gray-100 dark:bg-dark-background">
            <Hero />

            <ProductGrid limit={4} />

            <CategoryGrid />
        </div>
    );
}