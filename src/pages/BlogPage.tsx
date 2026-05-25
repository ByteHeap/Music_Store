import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/BlogData';

const BlogPage: React.FC = () => {
    return (
        <div className="bg-white dark:bg-[#121212] min-h-screen pb-24">
            {/* Header */}
            <div className="bg-gray-50 dark:bg-[#1a1a1c] border-b border-gray-200 dark:border-gray-800 pt-20 pb-16 text-center">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                        ByteHeap Blog
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
                        Noutăți din industrie, tutoriale de producție și ghiduri pentru alegerea echipamentului perfect.
                    </p>
                </div>
            </div>

            {/* Articles Grid*/}
            <div className="container mx-auto px-4 max-w-6xl mt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {blogPosts.map((post) => (
                        <Link
                            key={post.slug}
                            to={`/blog/${post.slug}`}
                            className="group flex flex-col bg-white dark:bg-[#1c1c1e] rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="h-64 overflow-hidden relative">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4 font-medium">
                                    <span>{post.date}</span>
                                    <span>•</span>
                                    <span>{post.readTime} citire</span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                    {post.title}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 font-light leading-relaxed mb-6 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <span className="mt-auto text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                                    Citește Articolul <span>&rarr;</span>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;