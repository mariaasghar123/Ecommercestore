// CategoryProducts.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';


const CategoryProducts = () => {
  const { categoryName } = useParams(); 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
    const navigate = useNavigate();


  useEffect(() => {
    fetchCategoryProducts();
  }, [categoryName]);

  const fetchCategoryProducts = async () => {
    try {
      setLoading(true);
      setError('');
      
      
      const productsRef = collection(fireDB, 'products');
      const q = query(productsRef, where('category', '==', categoryName));
      const querySnapshot = await getDocs(q);
      
      const categoryProducts = [];
      querySnapshot.forEach((doc) => {
        categoryProducts.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      setProducts(categoryProducts);
    } catch (error) {
      console.error('Error fetching category products:', error);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  
  const formatCategoryName = (category) => {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <button 
            onClick={fetchCategoryProducts}
            className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-8">
          <nav className="text-sm text-gray-500 mb-4">
            <span>Home</span> / <span>Categories</span> / <span className="text-purple-600">{formatCategoryName(categoryName)}</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {formatCategoryName(categoryName)}
          </h1>
          <p className="text-gray-600">
            {products.length > 0 
              ? `Found ${products.length} products in this category`
              : 'Explore our products in this category'
            }
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                onClick={() => {
                  
                  navigate(`/all-products/${product.id}`);
                }}
              />
            ))}
          </div>
        ) : (
          // No Products Found
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-6">📦</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No Products Found
              </h2>
              <p className="text-gray-600 mb-8">
                No products matched with "{formatCategoryName(categoryName)}" category. 
                Please check other categories or try again later.
              </p>
              <button 
                onClick={() => window.history.back()}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        )}

      
        {products.length > 0 && products.length >= 20 && (
          <div className="text-center mt-12">
            <button className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors">
              Load More Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;