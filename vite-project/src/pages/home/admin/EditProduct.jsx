import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { fireDB } from '../../../firebase/FirebaseConfig';
import toast from 'react-hot-toast';

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
  { name: "drinks" },
];

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();


  const [product, setProduct] = useState({
    title: '',
    price: '',
    oldPrice: '',
    discount: '',
    productImageUrl: '',
    category: '',
    description: '',
    availableItems: '',
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(fireDB, 'products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          toast.error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    

    try {
      const docRef = doc(fireDB, 'products', id);
      await updateDoc(docRef, product);
      toast.success("Product updated successfully");
      navigate('/admin-dashboard'); // redirect after update
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error("Update failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleUpdate}
        className="bg-purple-50 px-8 py-6 border border-purple-100 rounded-xl shadow-md w-full max-w-xl"
      >
        <h2 className="text-center text-2xl font-bold mb-5">Edit Product</h2>

        <div className="space-y-4">
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            placeholder="Product Title"
            className="w-full px-3 py-2 border rounded"
            required
          />

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Product Price"
            className="w-full px-3 py-2 border rounded"
            required
          />

          <input
            type="text"
            name="productImageUrl"
            value={product.productImageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full px-3 py-2 border rounded"
          />

          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option disabled value="">
              Select Product Category
            </option>
            {categoryList.map((item, i) => (
              <option key={i} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>

          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Product Description"
            rows="4"
            className="w-full px-3 py-2 border rounded"
          ></textarea>

          <input
            type="number"
            name="oldPrice"
            value={product.oldPrice}
            onChange={handleChange}
            placeholder="Old Price"
            className="w-full px-3 py-2 border rounded"
          />

          <input
            type="number"
            name="discount"
            value={product.discount}
            onChange={handleChange}
            placeholder="Discount %"
            className="w-full px-3 py-2 border rounded"
          />

          <input
            type="number"
            name="availableItems"
            value={product.availableItems}
            onChange={handleChange}
            placeholder="Available Items"
            className="w-full px-3 py-2 border rounded"
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isOrganic"
              checked={product.isOrganic}
              onChange={handleChange}
            />
            <label>Is Organic?</label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isColdSale"
              checked={product.isColdSale}
              onChange={handleChange}
            />
            <label>Is Cold Sale?</label>
          </div>
            <Link to="/admin/admin-dashboard/products">
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
          >
            Update Product
          </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
