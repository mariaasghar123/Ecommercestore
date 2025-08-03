// components/FeaturedProducts.jsx


import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { AiOutlinePlus } from 'react-icons/ai';
import allProducts from "../../data/Products";
import { useNavigate } from "react-router-dom";


const FeaturedProducts = () => {
    const navigate = useNavigate();
  const productsToShow = allProducts.slice(0, 6);
//   const [selectedProductIndex, setSelectedProductIndex] = useState(null);

//   const handleCardClick = (index) => {
//     if (selectedProductIndex === index) {
//       setSelectedProductIndex(null); // collapse if same card clicked
//     } else {
//       setSelectedProductIndex(index); // expand
//     }
//   };

const handleCardClick = (index, product) => {
  navigate(`/all-products/${product.id}`);
};
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
      {productsToShow.length > 6 && (
        <Link to="/all-products" className="text-purple-700 font-semibold flex items-center hover:underline">
          View All
          <svg className="ml-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
        </Link>
      )}
    </div>

    {/* 3 Column Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {productsToShow.map((product, index) => (
        <div
          key={index}
          className="cursor-pointer hover:shadow-lg transition-shadow duration-200 rounded-lg overflow-hidden"
          onClick={() => handleCardClick(index, product)}
        >
          {/* Flex Row Wrapper */}
          <div className="flex shadow-md rounded-lg overflow-hidden h-full">
            {/* Image Section */}
            <div className="w-1/2 relative">
              <img src={product.image} alt={product.name} className=" object-cover w-full h-full" />

              {product.discount && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            {product.discount}
          </div>
        )}
            </div>

            {/* Detail Section */}
            <div className="w-1/2 p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{product.description}</p>
              </div>
              <div className="mt-2 text-purple-700 font-bold">${product.price}</div>
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
