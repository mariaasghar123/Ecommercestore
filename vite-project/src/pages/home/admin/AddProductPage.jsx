import { Timestamp, addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { fireDB } from "../../../firebase/FirebaseConfig";
import { useNavigate } from "react-router";

// Corrected and updated category list
const categoryList = [
  { name: "Fruits & Vegetables" },
  { name: "Meats & Seafood" },
  { name: "Breakfast & Dairy" },
  { name: "Breads & Bakery" },
  { name: "Beverages" },
  { name: "Frozen Foods" },
  { name: "Biscuits & Snacks" },
  { name: "Grocery & Staples" },
  { name: "Household Needs" },
  { name: "Healthcare" },
  { name: "Baby & Pregnancy" },
];

const AddProductPage = () => {
  // navigate hook for redirection
  const navigate = useNavigate();

  // state to manage product form data
  const [product, setProduct] = useState({
    title: "",
    price: "",
    oldPrice: "",
    discount: "",
    productImageUrl: "",
    category: "",
    description: "",
    availableItems: "",
    isOrganic: false,
    isColdSale: false,
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // Function to handle adding a new product to Firestore
  const addProductFunction = async () => {
    // Input validation
    if (
      product.title === "" ||
      product.price === "" ||
      product.productImageUrl === "" ||
      product.category === "" ||
      product.description === ""
    ) {
      return toast.error("All fields are required");
    }

    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, product);
      toast.success("Product added successfully");
      navigate("/admin/dashboard"); // Redirect to a dashboard page
    } catch (error) {
      console.error(error);
      toast.error("Add product failed");
    }
  };

  // Generic input change handler to update state
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      {/* Responsive Form Container */}
      <div className="bg-purple-50 px-6 py-8 md:px-8 md:py-10 border border-purple-100 rounded-xl shadow-md w-full max-w-lg">
        {/* Top Heading */}
        <div className="mb-6">
          <h2 className="text-center text-2xl font-bold text-gray-800">
            Add Product
          </h2>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          {/* Input: Title */}
          <div>
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleInputChange}
              placeholder="Product Title"
              className="w-full bg-purple-100 border text-gray-800 border-purple-200 px-4 py-2 rounded-md outline-none placeholder-gray-400"
            />
          </div>

          {/* Input: Price */}
          <div>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              placeholder="Product Price"
              className="w-full bg-purple-100 border text-gray-800 border-purple-200 px-4 py-2 rounded-md outline-none placeholder-gray-400"
            />
          </div>

          {/* Input: Old Price */}
          <div>
            <input
              type="number"
              name="oldPrice"
              value={product.oldPrice}
              onChange={handleInputChange}
              placeholder="Old Price"
              className="w-full bg-purple-100 border text-gray-800 border-purple-200 px-4 py-2 rounded-md outline-none placeholder-gray-400"
            />
          </div>

          {/* Input: Discount */}
          <div>
            <input
              type="number"
              name="discount"
              value={product.discount}
              onChange={handleInputChange}
              placeholder="Discount %"
              className="w-full bg-purple-100 border text-gray-800 border-purple-200 px-4 py-2 rounded-md outline-none placeholder-gray-400"
            />
          </div>

          {/* Input: Image URL */}
          <div>
            <input
              type="text"
              name="productImageUrl"
              value={product.productImageUrl}
              onChange={handleInputChange}
              placeholder="Product Image URL"
              className="w-full bg-purple-100 border text-gray-800 border-purple-200 px-4 py-2 rounded-md outline-none placeholder-gray-400"
            />
          </div>

          {/* Input: Category Dropdown */}
          <div>
            <select
              name="category"
              value={product.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 text-gray-800 bg-purple-100 border border-purple-200 rounded-md outline-none"
            >
              <option value="" disabled>
                Select Product Category
              </option>
              {categoryList.map((value, index) => (
                <option key={index} value={value.name}>
                  {value.name}
                </option>
              ))}
            </select>
          </div>

          {/* Input: Available Items */}
          <div>
            <input
              type="number"
              name="availableItems"
              value={product.availableItems}
              onChange={handleInputChange}
              placeholder="Available Items"
              className="w-full bg-purple-100 border text-gray-800 border-purple-200 px-4 py-2 rounded-md outline-none placeholder-gray-400"
            />
          </div>

          {/* Input: Description */}
          <div>
            <textarea
              name="description"
              value={product.description}
              onChange={handleInputChange}
              placeholder="Product Description"
              rows="5"
              className="w-full px-4 py-2 text-gray-800 bg-purple-100 border border-purple-200 rounded-md outline-none placeholder-gray-400"
            ></textarea>
          </div>

          {/* Checkbox: Is Organic */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isOrganic"
              checked={product.isOrganic}
              onChange={handleInputChange}
              className="form-checkbox h-4 w-4 text-purple-600 rounded-md"
            />
            <label className="text-gray-700">Is Organic?</label>
          </div>

          {/* Checkbox: Is Cold Sale */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isColdSale"
              checked={product.isColdSale}
              onChange={handleInputChange}
              className="form-checkbox h-4 w-4 text-purple-600 rounded-md"
            />
            <label className="text-gray-700">Is Cold Sale?</label>
          </div>
        </div>

        {/* Add Product Button */}
        <div className="mt-6">
          <button
            onClick={addProductFunction}
            type="button"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 rounded-md transition-colors duration-200"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
