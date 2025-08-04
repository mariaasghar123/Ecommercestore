import { Timestamp, addDoc, collection } from "firebase/firestore";
// import myContext from "../../context/myContext";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { fireDB } from "../../../firebase/FirebaseConfig";
import { useNavigate } from "react-router";

const categoryList = [
  {
    name: "Fruits & Vegetables",
  },
  {
    name: "Meats & Seafood",
  },
  {
    name: "Breakfast & Dairy",
  },
  {
    name: "Breads & Bakery",
  },
  {
    name: "Beverages",
  },
  {
    name: "Frozen Foods",
  },
  {
    name: "Biscuits & Snacks",
  },
  {
    name: "Grocery & Staples",
  },
  {
    name: "Household Needs",
  },
  {
    name: "Household Needs",
  },
  {
    name: "Healthcare",
  },
  {
    name: "drinks",
  },
];

const AddProductPage = () => {
  // navigate
  const navigate = useNavigate();

  // product state
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

  // Add Product Function
  const addProductFunction = async () => {
    if (
      product.title == "" ||
      product.price == "" ||
      product.productImageUrl == "" ||
      product.category == "" ||
      product.description == ""
    ) {
      return toast.error("all fields are required");
    }

    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, product);
      toast.success("Add product successfully");
      navigate("/admin/admin-dashboard/add-product");
    } catch (error) {
      console.log(error);

      toast.error("Add product failed");
    }
  };
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        {/* Login Form  */}
        <div className="login_Form bg-purple-50 px-8 py-6 border border-purple-100 rounded-xl shadow-md">
          {/* Top Heading  */}
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold ">Add Product</h2>
          </div>

          {/* Input One  */}
          <div className="mb-3">
            <input
              type="text"
              name="title"
              value={product.title}
              onChange={(e) => {
                setProduct({
                  ...product,
                  title: e.target.value,
                });
              }}
              placeholder="Product Title"
              className="bg-pink-50 border text-pink-800 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            />
          </div>

          {/* Input Two  */}
          <div className="mb-3">
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={(e) => {
                setProduct({
                  ...product,
                  price: e.target.value,
                });
              }}
              placeholder="Product Price"
              className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            />
          </div>

          {/* Input Three  */}
          <div className="mb-3">
            <input
              type="text"
              name="productImageUrl"
              value={product.productImageUrl}
              onChange={(e) => {
                setProduct({
                  ...product,
                  productImageUrl: e.target.value,
                });
              }}
              placeholder="Product Image Url"
              className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            />
          </div>

          {/* Input Four  */}
          <div className="mb-3">
            <select
              value={product.category}
              onChange={(e) => {
                setProduct({
                  ...product,
                  category: e.target.value,
                });
              }}
              className="w-full px-1 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none  "
            >
              <option disabled>Select Product Category</option>
              {categoryList.map((value, index) => {
                const { name } = value;
                return (
                  <option
                    className=" first-letter:uppercase"
                    key={index}
                    value={name}
                  >
                    {name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Input Five  */}
          <div className="mb-3">
            <textarea
              value={product.description}
              onChange={(e) => {
                setProduct({
                  ...product,
                  description: e.target.value,
                });
              }}
              name="description"
              placeholder="Product Description"
              rows="5"
              className=" w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300 "
            ></textarea>
          </div>
          {/* Input Six  */}
          <div className="mb-3">
            <input
              type="number"
              name="oldPrice"
              value={product.oldPrice}
              onChange={(e) => {
                setProduct({
                  ...product,
                  oldPrice: e.target.value,
                });
              }}
              placeholder="Old Price"
              className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            />
          </div>
          {/* Input Seven  */}
          <div className="mb-3">
            <input
              type="number"
              name="discount"
              value={product.discount}
              onChange={(e) => {
                setProduct({
                  ...product,
                  discount: e.target.value,
                });
              }}
              placeholder="Discount %"
              className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            />
          </div>
          {/* Input Eight  */}
          <div className="mb-3">
            <input
              type="number"
              name="availableItems"
              value={product.availableItems}
              onChange={(e) => {
                setProduct({
                  ...product,
                  availableItems: e.target.value,
                });
              }}
              placeholder="Available Items"
              className="bg-pink-50 border text-pink-300 border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            />
          </div>
          {/* Input Nine  */}
          <div className="mb-3 flex items-center gap-2">
            <input
              type="checkbox"
              checked={product.isOrganic}
              onChange={(e) => {
                setProduct({
                  ...product,
                  isOrganic: e.target.checked,
                });
              }}
            />
            <label>Is Organic?</label>
          </div>
          {/* Input Ten  */}
          <div className="mb-3 flex items-center gap-2">
            <input
              type="checkbox"
              checked={product.isColdSale}
              onChange={(e) => {
                setProduct({
                  ...product,
                  isColdSale: e.target.checked,
                });
              }}
            />
            <label>Is Cold Sale?</label>
          </div>

          {/* Add Product Button  */}
          <div className="mb-3">
            <button
              onClick={addProductFunction}
              type="button"
              className="bg-purple-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md "
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
