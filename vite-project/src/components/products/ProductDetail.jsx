import React from 'react';
import { useParams } from 'react-router-dom';
import allProducts from '../../data/Products';

import Breadcrumb from './productdetailpage/BreadCrumb';
import ProductGallery from './productdetailpage/ProductGallery';
import ProductInfo from './productdetailpage/ProductInfo';
import ProductHighlights from './productdetailpage/ProductHighlights';
import ProductTabs from './productdetailpage/ProductTabs';
import RelatedProducts from './productdetailpage/RelatedProducts';

const ProductDetail = () => {
  const { id } = useParams();
  const product = allProducts.find((p) => p.id === id); // find product by id

  if (!product) {
    return <div className="text-center py-10 text-red-500">Product not found!</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProductGallery image={product.image} />
        <ProductInfo product={product} />
      </div>

      <ProductHighlights product={product} />
      <ProductTabs product={product} />
      <RelatedProducts currentId={id} allProducts={allProducts} />
    </div>
  );
};

export default ProductDetail;
