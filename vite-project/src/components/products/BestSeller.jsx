import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import PromoBanner from './PromoBanner';
import { fireDB } from '../../firebase/FirebaseConfig'; // <-- Make sure firebase is properly initialized
import { collection, getDocs } from 'firebase/firestore';

const BestSeller = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(fireDB, 'products');
        const snapshot = await getDocs(productsCollection);
        const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCardClick = (product) => {
    navigate(`/all-products/${product.id}`);
  };

  // 🔧 Manually inserted promo banners
  const banners = [
    {
      type: 'banner',
      title: 'We are always here to help you with your grocery',
      subtitle: 'A different kind of grocery store',
      image: '/media/images/banner-01.jpg.png',
      linkText: 'Shop Now',
    },
    {
      type: 'banner',
      title: 'With your favorite food, we will make your mood',
      subtitle: 'Only this week. Don\'t miss...',
      image: '/media/images/banner-02.jpg.png',
      linkText: 'Shop Now',
    }
  ];

  // 🧠 Inserting banners in specific positions
  const combinedItems = [...products];
  if (products.length >= 3) combinedItems.splice(2, 0, banners[0]);
  if (products.length >= 7) combinedItems.splice(7, 0, banners[1]);

  return (
    <section className="py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <div className='flex gap-5 items-center'>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Best Sellers</h2>
              <p className="text-gray-600 text-sm mt-1">Some of the new products arriving this week</p>
            </div>
          </div>
          {products.length > 6 && (
            <Link to="/all-products" className="text-purple-700 font-semibold flex items-center hover:underline">
              View All
              <svg className="ml-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </Link>
          )}
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {combinedItems.map((item, index) =>
              item.type === 'banner' ? (
                <PromoBanner key={index} {...item} />
              ) : (
                <ProductCard key={item.id} product={item} onClick={() => handleCardClick(item)} />
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSeller;
