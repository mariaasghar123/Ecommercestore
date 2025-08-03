import { useState } from "react";

const ProductTabs = ({ product }) => {
  const [tab, setTab] =useState("description");

  return (
    <div className="mt-8">
      <div className="flex space-x-4 border-b pb-2">
        <button
          onClick={() => setTab("description")}
          className={`pb-2 ${tab === "description" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`}
        >
          Description
        </button>
        <button
          onClick={() => setTab("reviews")}
          className={`pb-2 ${tab === "reviews" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`}
        >
          Reviews
        </button>
      </div>
      <div className="mt-4 text-gray-700">
        {tab === "description" ? (
          <p>This is a sample description for {product.name}.</p>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};
export default ProductTabs;