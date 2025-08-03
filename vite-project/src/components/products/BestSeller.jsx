import React from 'react';
import { Link } from 'react-router-dom';
import { } from 'react';
import ProductCard from './ProductCard'; 
import PromoBanner from './PromoBanner'; 
import allProducts from '../../data/Products'; 
import { useNavigate } from 'react-router-dom';


const displayItems = [
    allProducts[0], // Product: Philadelphia Cream Cheese
    allProducts[1], // Product: Cantaloupe Melon
    {
        type: 'banner',
        title: 'We are always here to help you with your grocery',
        subtitle: 'A different kind of grocery store',
        image: '/media/images/banner-01.jpg.png', // apni image path yahan dalein
        linkText: 'Shop Now',
    },
    allProducts[2], // Product: Pearl Milling Syrup
    allProducts[3], // Product: Evolve Protein Shake
   
    allProducts[4], // Product: Great Value Pizza
    allProducts[5], // Product: California Pizza
     {
        type: 'banner',
        title: 'With your favorite food, we will make your mood',
        subtitle: 'Only this week. Don\'t miss...',
        image: '/media/images/banner-02.jpg.png', // apni image path yahan dalein
        linkText: 'Shop Now',
    },
    allProducts[6], // Product: Great Value Frozen Pizza
    allProducts[7], // Product: Simply Orange Juice
];

const BestSeller = () => {
    const handleCardClick = (index, product) => {
  navigate(`/all-products/${product.id}`);
};
const navigate = useNavigate();
    

    return (

        <section className=" py-12 px-4 md:px-8">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex flex-col">
                        <div className='flex gap-5 items-center'>
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Best Sellers</h2>
                            <p className="text-gray-600 text-sm mt-1">Some of the new products arriving this week</p>
                        </div>
                    </div>
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
                    {displayItems.map((item, index) => {
                        if (item.type === 'banner') {
                            return <PromoBanner key={index} {...item} />;
                        }
                        return <ProductCard key={index} product={item} onClick={()=> handleCardClick(index, item)}/>;
                    })}
                </div>
            </div>
        </section>
    );
};

export default BestSeller;