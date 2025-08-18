import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { fireDB } from "../../firebase/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch products from Firestore on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireDB, "products"));
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Show only the first 6 products for the "Featured Products" section
  const productsToShow = products.slice(0, 6);

  const handleCardClick = (product) => {
    navigate(`/all-products/${product.id}`);
  };

  if (loading) {
    return (
      <div className="text-center py-10">Loading featured products...</div>
    );
  }

  return (
    <section className="py-8 md:py-12 px-4">
      <div className="container mx-auto">
        {/* Header section with responsive layout */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-y-4">
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              Featured Products
            </h2>
            <p className="text-gray-600 text-sm">
              Do not miss the current offers until the end of March.
            </p>
          </div>
          {products.length > 6 && (
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

        {/* Responsive grid for product cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsToShow.map((product) => (
            <div
              key={product.id}
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200 rounded-lg overflow-hidden h-full"
              onClick={() => handleCardClick(product)}
            >
              {/* Product card layout, which is responsive */}
              <div className="flex flex-col sm:flex-row shadow-md rounded-lg overflow-hidden h-full">
                {/* Image section: full width on mobile, half width on larger screens */}
                <div className="w-full sm:w-1/2 relative h-48 sm:h-auto">
                  <img
                    src={product.productImageUrl}
                    alt={product.title}
                    className="object-cover w-full h-full"
                  />
                  {product.discount && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {product.discount}%
                    </div>
                  )}
                </div>

                {/* Details section: full width on mobile, half width on larger screens */}
                <div className="w-full sm:w-1/2 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                  </div>
                  <div className="flex items-center mt-2">
                    <span className="text-red-600 font-bold text-xl">
                      ${product.price}
                    </span>
                    {product.oldPrice && (
                      <span className="text-gray-500 line-through text-sm ml-2">
                        ${product.oldPrice}
                      </span>
                    )}
                  </div>
                  <div className="mt-auto space-y-2">
                    <button className="w-full text-purple-700 border border-purple-700 rounded-full py-2 hover:bg-purple-50 transition-colors duration-200 flex items-center justify-center space-x-2">
                      <AiOutlinePlus />
                      <span>Add to cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
