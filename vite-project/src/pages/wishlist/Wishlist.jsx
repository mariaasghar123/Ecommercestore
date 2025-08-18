import React from "react";
import { useCart } from "../../context/Context";
import ProductCard from "../../components/products/ProductCard";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const { wishlistItems } = useCart();
  const navigate = useNavigate();

  // For card click → navigate to details
  const handleCardClick = (productId) => {
    navigate(`/all-products/${productId}`);
  };

  return (
    <div className="p-4 w-3/4 mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {wishlistItems.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isExpanded={true} // Can adjust if you want expansion
              onClick={() => handleCardClick(product.id)} // Optional: expand feature
            />
          ))}
        </div>
      )}
    </div>
  );
}
