import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { collection, getDocs } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireDB, 'products'));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData.slice(0, 6));
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-8 md:py-12 px-4 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-y-4">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              New Arrivals
            </h2>
            <p className="text-gray-600 text-sm">
              Don't miss this opportunity at a special discount just for this week.
            </p>
          </div>

          {products.length >= 6 && (
            <Link
              to="/all-products"
              className="text-purple-700 font-semibold flex items-center hover:underline whitespace-nowrap"
            >
              View All
              <svg
                className="ml-2 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Link>
          )}
        </div>

        {/* Moving Products */}
        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee space-x-4">
            {products.concat(products).map((product, index) => (
              <div key={index} className="w-48 flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            animation: marquee 15s linear infinite;
            width: max-content;
          }
        `}
      </style>
    </section>
  );
};

export default NewArrivals;
