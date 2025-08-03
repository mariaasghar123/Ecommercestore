import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ProductCard from './ProductCard'; // Importing the ProductCard component
import allProducts from '../../data/Products'; // Importing the products data


const NewArrivals = () => {
    const productsToShow = allProducts.slice(0, 6);
    const [selectedProductIndex, setSelectedProductIndex] = useState(null);
    
        const handleCardClick = (index) => {
            if (selectedProductIndex === index) {
                setSelectedProductIndex(null); // collapse if same card clicked
            } else {
                setSelectedProductIndex(index); // expand
            }};

    return (
        <section className=" py-12 px-4 md:px-8">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex flex-col">
                        <div className='flex gap-5 items-center'>
 <h2 className="text-2xl md:text-3xl font-bold text-gray-900">New Arrivals</h2>
                        <p className="text-gray-600 text-sm mt-1">Don't miss this opportunity at a special discount just for this week.</p>
                        </div>
                       
                    </div>
                    {/* view button */}
                    {allProducts.length > 6 && (
                         <Link to="/all-products" className="text-purple-700 font-semibold flex items-center hover:underline">
                            View All
                            <svg className="ml-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                        </Link>
                    )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {productsToShow.map((product, index) => (
                        <div onClick={() => handleCardClick(index)} key={index}>
                            <ProductCard
                                product={product}
                                isExpanded={selectedProductIndex === index}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewArrivals;