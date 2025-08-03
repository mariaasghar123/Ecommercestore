// src/components/PromoBanner.js

import React from 'react';
import { Link } from 'react-router-dom';

const PromoBanner = ({ title, subtitle, image, linkText }) => {
    return (
        <div className="bg-gray-100 p-6 rounded-lg col-span-2 flex flex-col justify-between">
            <div>
                <span className="text-orange-500 font-bold text-sm">Only This Week</span>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mt-2">{title}</h3>
                <p className="text-gray-600 mt-1">{subtitle}</p>
                <Link to="#" className="mt-4 inline-flex items-center text-purple-700 font-semibold hover:underline">
                    {linkText || 'Shop Now'}
                    <svg className="ml-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </Link>
            </div>
            {image && (
                <div className="mt-4">
                    <img src={image} alt="Promotional Offer" className="w-full h-auto object-cover" />
                </div>
            )}
        </div>
    );
};

export default PromoBanner;