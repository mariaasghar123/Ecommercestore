import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";

import Breadcrumb from "./productdetailpage/BreadCrumb";
import ProductGallery from "./productdetailpage/ProductGallery";
import ProductInfo from "./productdetailpage/ProductInfo";
import ProductHighlights from "./productdetailpage/ProductHighlights";
import ProductTabs from "./productdetailpage/ProductTabs";
import RelatedProducts from "./productdetailpage/RelatedProducts";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(fireDB, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          setProduct(null);
        }

        const snapshot = await getDocs(collection(fireDB, "products"));
        const all = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setAllProducts(all);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return <div className="text-center py-10 text-gray-500">Loading...</div>;

  if (!product)
    return (
      <div className="text-center py-10 text-red-500">Product not found!</div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb name={product.title} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProductGallery image={product.productImageUrl} />
        <ProductInfo product={product} />
      </div>

      <ProductHighlights product={product} />
      <ProductTabs product={product} />
      <RelatedProducts currentId={id} allProducts={allProducts} />
    </div>
  );
};

export default ProductDetail;
