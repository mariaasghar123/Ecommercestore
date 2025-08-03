import React, { useState } from 'react';
import ProductCard from './ProductCard';
import allProducts from '../../data/Products';

const AllProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 18;

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = allProducts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(allProducts.length / productsPerPage);

  return (
    <section className="py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="mb-6">
          <div className="flex gap-5 items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">All Products</h2>
            <p className="text-gray-600 text-sm mt-1">Discover all our amazing products here.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {paginatedProducts.map((product, index) => (
            <ProductCard key={index} product={product} isExpanded={true} />// pass function/>
          ))}
        </div>
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
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
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  );
};

export default AllProducts;
