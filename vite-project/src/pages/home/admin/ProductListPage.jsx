import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { fireDB } from "../../../firebase/FirebaseConfig";
import { Link } from "react-router-dom";
import { FiEye, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from Firebase
  const getAllProducts = async () => {
    try {
      const productsRef = collection(fireDB, "products");
      const snapshot = await getDocs(productsRef);
      const productData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productData);
    } catch {
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(fireDB, "products", id));
      toast.success("Product deleted");
      getAllProducts(); // refresh list
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product List</h1>
        <Link to="/admin/admin-dashboard/add-product">
          <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            <FiPlus /> Add Product
          </button>
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-purple-100 text-left">
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Old Price</th>
                <th className="px-4 py-3">Discount</th>
                <th className="px-4 py-3">Available</th>
                <th className="px-4 py-3">Organic</th>
                <th className="px-4 py-3">Cold Sale</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-3">
                    <img
                      src={product.productImageUrl}
                      alt={product.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3">{product.title}</td>
                  <td className="px-4 py-3 capitalize">{product.category}</td>
                  <td className="px-4 py-3">${product.price}</td>
                  <td className="px-4 py-3 text-gray-500">${product.oldPrice || '-'}</td>
                  <td className="px-4 py-3 text-green-600">{product.discount ? `${product.discount}%` : '-'}</td>
                  <td className="px-4 py-3">{product.availableItems || '-'}</td>
                  <td className="px-4 py-3">{product.isOrganic ? "Yes" : "No"}</td>
                  <td className="px-4 py-3">{product.isColdSale ? "Yes" : "No"}</td>
                  <td className="px-4 py-3">{product.date}</td>
                  <td className="px-4 py-3 text-right flex justify-end gap-2">
                    <Link to={`/admin/admin-dashboard/view-product/${product.id}`}>
                      <button className="text-blue-600 hover:text-blue-800">
                        <FiEye />
                      </button>
                    </Link>
                    <Link to={`/admin/admin-dashboard/edit-product/${product.id}`}>
                      <button className="text-green-600 hover:text-green-800">
                        <FiEdit2 />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductListPage;
