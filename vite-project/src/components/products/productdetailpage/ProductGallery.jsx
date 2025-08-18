const ProductGallery = ({ image }) => {
  return (
    <div>
      <img src={image} alt="Product" className="w-full rounded-lg shadow" />
    </div>
  );
};
export default ProductGallery;
