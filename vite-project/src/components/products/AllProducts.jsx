import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import FilterSection from './FilterSection';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 18;

  const getFilteredProducts = async (min, max) => {
  try {
    const productsRef = collection(fireDB, 'products');
    const snapshot = await getDocs(productsRef);

    const filtered = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((product) => {
        const price = parseFloat(product.price); // Convert string to number
        return !isNaN(price) && price >= min && price <= max;
      });

    setProducts(filtered);
    setCurrentPage(1); // Reset pagination
  } catch (error) {
    console.error('Error filtering products:', error);
  }
};


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(fireDB, 'products'));
        const productList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <section className="py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="mb-6">
          <div className="flex gap-5 items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">All Products</h2>
            <p className="text-gray-600 text-sm mt-1">Discover all our amazing products here.</p>
          </div>
        </div>

        {/* Main Layout: Sidebar + Products */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filter */}
          <div className="w-full lg:w-1/4">
            <FilterSection onPriceFilter={getFilteredProducts} />
          </div>

          {/* Product Grid */}
          <div className="w-full lg:w-3/4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} isExpanded={true} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 space-x-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                &lt;
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? 'bg-purple-700 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
