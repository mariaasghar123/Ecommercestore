// import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaRegHeart, FaHeart, FaStar, FaExpandAlt } from 'react-icons/fa';
import { BsArrowsFullscreen } from "react-icons/bs";
import { useCart } from '../../context/Context';

import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, isExpanded , onClick}) => {
  // const [isFavourite, setIsFavourite] = useState(false);
   const { addToCart } = useCart(); // use context
  const navigate = useNavigate();
  

  // const toggleFavourite = () => setIsFavourite(!isFavourite);

  const { wishlistItems, addToWishlist, removeFromWishlist } = useCart();

  const isFavourite = wishlistItems.some(item => item.id === product.id);

  const toggleFavourite = (e) => {
    e.stopPropagation();
    if (isFavourite) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation(); // prevent triggering card expansion
    navigate(`/all-products/${product.id}`); // assumes dynamic route setup
  };

  return (
    <div
      className={`relative border border-gray-200 rounded-lg p-4 flex flex-col justify-between transition-all duration-300 cursor-pointer h-full ${
        isExpanded ? 'shadow-2xl scale-105 bg-white z-10' : ''
      }`}
      onClick={onClick}
    >
      {/* Top content */} 
      <div>
        {product.discount && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            {product.discount}%
          </div>
        )}
       {isExpanded && (
  <div className="absolute top-2 right-2 flex space-x-2">
    {/* View Details Icon */}
    <button
      onClick={handleViewDetails}
      className="text-white text-lg font-bold bg-purple-600 p-2 rounded hover:text-xl transition"
    >
      <BsArrowsFullscreen />

    </button>

    {/* Heart Icon */}
    <button
      onClick={(e) => {
        // e.stopPropagation();
        toggleFavourite(e);
      }}
      className="text-purple-600 text-lg"
    >
      {isFavourite ? <FaHeart /> : <FaRegHeart />}
    </button>
  </div>
)}

        <div className="text-center mb-4">
          <img
            src={product.productImageUrl}
            alt={product.title}
            className="w-full h-auto object-cover"
          />
        </div>

        {isExpanded && (
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-1 text-yellow-400 text-sm">
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} />
              ))}
            </div>
            <div className="bg-purple-700 text-white rounded-full p-1 text-xs cursor-pointer">
              <AiOutlinePlus onClick={handleAddToCart}/>
            </div>
          </div>
        )}

        <div className="mb-4">
          {product.isOrganic && (
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full mb-2 mr-2 inline-block">
              ORGANIC
            </span>
          )}
          {product.isColdSale && (
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full mb-2 inline-block">
              COLD SALE
            </span>
          )}

          <h4
            className="text-sm font-semibold mt-2 hover:underline cursor-pointer"
            onClick={handleViewDetails}
          >
            {product.title}
          </h4>
          {isExpanded && (
            <p className="text-xs text-gray-500 mt-1">
              Available: {product.availableItems || 10} items
            </p>
          )}
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
        </div>
      </div>

      {/* Bottom button */}
      <div className="mt-auto space-y-2">
        <button className="w-full text-purple-700 border border-purple-700 rounded-full 
        py-2 hover:bg-purple-50 transition-colors duration-200 flex items-center justify-center space-x-2" onClick={handleAddToCart}>
          <AiOutlinePlus />
          <span>Add to cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
