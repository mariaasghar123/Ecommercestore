import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlinePlus } from 'react-icons/ai';
import { fireDB } from "../../firebase/FirebaseConfig"; // make sure firebase is initialized
import { collection, getDocs } from "firebase/firestore";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Firestore se products lena
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireDB, "products"));
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
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

  const productsToShow = products.slice(0, 6);

  const handleCardClick = (index, product) => {
    navigate(`/all-products/${product.id}`);
  };

  if (loading) {
    return <div className="text-center py-10">Loading featured products...</div>;
  }

  return (
    <section className="py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <div className="flex gap-5 items-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Products</h2>
              <p className="text-gray-600 text-sm mt-1">Do not miss the current offers until the end of March.</p>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productsToShow.map((product, index) => (
            <div
              key={product.id}
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200 rounded-lg overflow-hidden"
              onClick={() => handleCardClick(index, product)}
            >
              <div className="flex shadow-md rounded-lg overflow-hidden h-full">
                <div className="w-1/2 relative">
                  <img src={product.productImageUrl} alt={product.name} className="object-cover w-full h-full" />
                  {product.discount && (
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {product.discount}%
                    </div>
                  )}
                </div>

                <div className="w-1/2 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    {/* <p className="text-gray-600 text-sm mt-1">{product.description}</p> */}
                  </div>
                  {/* <div className="mt-2 text-purple-700 font-bold">${product.price}</div> */}
                   <div className="flex items-center mt-1">
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
