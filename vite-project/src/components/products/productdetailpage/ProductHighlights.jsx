const ProductHighlights = ({ product }) => {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-2">Highlights</h2>
      <ul className="list-disc list-inside text-gray-700 space-y-1">
        <li>Organic: {product.isOrganic ? 'Yes' : 'No'}</li>
        <li>Cold Sale: {product.isColdSale ? 'Yes' : 'No'}</li>
      </ul>
    </div>
  );
};
export default ProductHighlights;