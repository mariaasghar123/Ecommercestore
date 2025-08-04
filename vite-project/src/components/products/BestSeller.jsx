import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePlus } from 'react-icons/ai';
import { fireDB } from "../../firebase/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import ProductCard from './ProductCard'; // Assuming ProductCard is a component
import PromoBanner from './PromoBanner'; // Assuming PromoBanner is a component

const BestSeller = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch products from Firestore on component mount
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

  // Manually inserted promo banners
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

  // Limit the number of products to a maximum of 8
  const limitedProducts = products.slice(0, 8);

  // Inserting banners in specific positions within the limited product list
  const combinedItems = [...limitedProducts];
  if (limitedProducts.length >= 3) combinedItems.splice(2, 0, banners[0]);
  if (limitedProducts.length >= 7) combinedItems.splice(7, 0, banners[1]);

  return (
    <section className="py-8 md:py-12 px-4">
      <div className="container mx-auto">
        {/* Responsive header section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-y-4 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">Best Sellers</h2>
            <p className="text-gray-600 text-sm">Some of the new products arriving this week</p>
          </div>
          {products.length > 6 && (
            <Link to="/all-products" className="text-purple-700 font-semibold flex items-center hover:underline whitespace-nowrap">
              View All
              <svg
                className="ml-2 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
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
                <div key={index} className="col-span-1 sm:col-span-2 md:col-span-2">
                  <PromoBanner {...item} />
                </div>
              ) : (
                <div key={item.id} className="col-span-1">
                  <ProductCard product={item} onClick={() => handleCardClick(item)} />
                </div>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSeller;