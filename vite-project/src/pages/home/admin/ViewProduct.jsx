import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, addDoc, getDocs } from "firebase/firestore";
import { fireDB } from "../../../firebase/FirebaseConfig";

export default function ViewProduct() {
  const { id } = useParams(); // product ID from URL
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0); // for user input
  const [ratingsList, setRatingsList] = useState([]); // all ratings

  // Get product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(fireDB, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting product:", error);
      }
    };

    const fetchRatings = async () => {
      const ratingsRef = collection(fireDB, "products", id, "ratings");
      const querySnapshot = await getDocs(ratingsRef);
      const allRatings = querySnapshot.docs.map((doc) => doc.data().value);
      setRatingsList(allRatings);
    };

    fetchProduct();
    fetchRatings();
  }, [id]);

  const handleRatingSubmit = async () => {
    if (rating < 1 || rating > 5)
      return alert("Please give rating between 1 to 5");

    try {
      const ratingsRef = collection(fireDB, "products", id, "ratings");
      await addDoc(ratingsRef, {
        value: rating,
        createdAt: new Date(),
      });
      setRating(0);
      alert("Thanks for your rating!");
    } catch (err) {
      console.error("Error submitting rating:", err);
    }
  };

  if (!product) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  const averageRating =
    ratingsList.length > 0
      ? (ratingsList.reduce((a, b) => a + b, 0) / ratingsList.length).toFixed(1)
      : "No ratings yet";

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <img
          src={product.productImageUrl}
          alt={product.title}
          className="w-full rounded-2xl shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-xl text-orange-500 font-semibold mb-2">
            $.{product.price}
          </p>
          <p className="text-gray-600 mb-4">{product.description}</p>

          {product.category && (
            <p className="text-sm text-gray-500">
              Category: {product.category}
            </p>
          )}
          {product.available && (
            <p className="text-sm text-gray-500">
              In Stock: {product.available}
            </p>
          )}

          {/* ⭐ Show Average Rating */}
          <div className="mt-4">
            <p className="text-sm">Average Rating: {averageRating} ⭐</p>
          </div>

          {/* ⭐ User Rating Form */}
          <div className="mt-4">
            <p className="mb-2">Your Rating:</p>
            <div className="flex gap-2 items-center">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setRating(num)}
                  className={`text-2xl ${
                    rating >= num ? "text-yellow-400" : "text-gray-400"
                  }`}
                >
                  ★
                </button>
              ))}
              <button
                onClick={handleRatingSubmit}
                className="ml-4 bg-orange-500 text-white px-3 py-1 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
