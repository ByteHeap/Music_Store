import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { blogPosts } from '../data/BlogData';
import { fetchProductById } from '../api/apiClient';
import type { Product } from '../types';

const InlineProductLink: React.FC<{ productId: string; children: React.ReactNode }> = ({ productId, children }) => {
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const loadProd = async () => {
            try {
                const p = await fetchProductById(productId);
                setProduct(p);
            } catch (err) {
                console.error("Eroare la incarcarea produsului pentru link:", err);
            }
        };
        loadProd();
    }, [productId]);

    if (!product) {
        return <span className="text-blue-600 dark:text-blue-400 font-medium">{children}</span>;
    }

    return (
        <span className="relative inline-block group">

            <Link
                to={`/product/${product.id}`}
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline transition-colors"
            >
                {children}
            </Link>


            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-56 bg-white/80 dark:bg-[#1c1c1e]/80 backdrop-blur-xl border border-gray-200 dark:border-gray-700 rounded-3xl shadow-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none">
                <div className="flex flex-col items-center text-center gap-2">
                    <div className="w-24 h-24 flex items-center justify-center">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="max-w-full max-h-full object-contain drop-shadow-md"
                        />
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight">
                        {product.name}
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                        {Number(product.price).toLocaleString()} {product.currency}
                    </span>
                </div>
            </div>
        </span>
    );
};

const BlogPostPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = blogPosts.find(p => p.slug === slug);

    /* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
    const customRenderers = {
        h1: ({ node: _, ...props }: any) => <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-12 mb-6" {...props} />,
        h2: ({ node: _, ...props }: any) => <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4" {...props} />,
        p: ({ node: _, ...props }: any) => <p className="mb-6 text-gray-800 dark:text-gray-300 text-lg font-light leading-relaxed" {...props} />,
        ul: ({ node: _, ...props }: any) => <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />,
        li: ({ node: _, ...props }: any) => <li className="pl-2" {...props} />,
        blockquote: ({ node: _, ...props }: any) => <blockquote className="border-l-4 border-blue-600 pl-6 italic text-gray-600 dark:text-gray-400 my-8 bg-gray-50 dark:bg-[#1a1a1c] p-6 rounded-r-xl" {...props} />,
        strong: ({ node: _, ...props }: any) => <strong className="font-bold text-gray-900 dark:text-white" {...props} />,

        a: ({ node: _, href, children, ...props }: any) => {
            if (href && href.startsWith('#PRODUCT:')) {
                const productId = href.split(':')[1];
                return <InlineProductLink productId={productId}>{children}</InlineProductLink>;
            }
            return <a href={href} className="text-blue-600 dark:text-blue-400 hover:underline font-medium" {...props}>{children}</a>;
        }
    };
    /* eslint-enable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */

    if (!post) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 dark:bg-[#121212]">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Articolul nu a fost găsit</h1>
                <Link to="/blog" className="text-blue-600 hover:underline">Înapoi la Blog</Link>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-[#121212] min-h-screen pb-24">
            <div className="w-full h-[40vh] md:h-[60vh] relative">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>

            <div className="container mx-auto px-4 -mt-32 relative z-10 max-w-4xl">
                <div className="bg-white dark:bg-[#1c1c1e] rounded-3xl p-8 md:p-16 shadow-2xl border border-gray-100 dark:border-gray-800">

                    <div className="text-center mb-12">
                        <span className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-sm mb-4 block">
                            {post.category}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6 tracking-tight">
                            {post.title}
                        </h1>
                        <div className="text-gray-500 dark:text-gray-400 font-medium text-sm">
                            {post.date} • {post.readTime} citire
                        </div>
                    </div>

                    <hr className="border-gray-200 dark:border-gray-800 mb-12" />

                    <div className="prose dark:prose-invert max-w-none">
                        <ReactMarkdown components={customRenderers}>
                            {post.content}
                        </ReactMarkdown>
                    </div>

                    <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
                        <Link to="/blog" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline transition-colors">
                            &larr; Înapoi la toate articolele
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPostPage;