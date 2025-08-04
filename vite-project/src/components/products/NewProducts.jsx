import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { collection, getDocs } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireDB, 'products'));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData.slice(0, 6)); // only first 6 for "New Arrivals"
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCardClick = (index) => {
    if (selectedProductIndex === index) {
      setSelectedProductIndex(null);
    } else {
      setSelectedProductIndex(index);
    }
  };

  return (
    <section className="py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <div className="flex gap-5 items-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                New Arrivals
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Don't miss this opportunity at a special discount just for this week.
              </p>
            </div>
          </div>

          {products.length >= 6 && (
            <Link
              to="/all-products"
              className="text-purple-700 font-semibold flex items-center hover:underline"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {products.map((product, index) => (
            <div onClick={() => handleCardClick(index)} key={product.id}>
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
